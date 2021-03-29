import React,{useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import backgroundIMG from '../../images/learniobg10-15.png';
import { Grid, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import Pagination from '@material-ui/lab/Pagination';
import fakeBackendStudents from '../../sampleData/admin/students.json';
import Skeleton from '@material-ui/lab/Skeleton';
import { useSelector} from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import PopupDialog from '../common/PopupDialog';
import ConfirmDialog from '../common/ConfirmDialog';
import hat from '../../images/hat.png';
import EditStudentPU from '../admin/editComponents/EditStudentPU';
import fakeAllClasses from '../../sampleData/admin/allClasses.json'
import NotFound from '../common/NotFound';
import CustomSnackbar from '../common/Snackbar.jsx';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({

    background:{
      backgroundImage:"url("+backgroundIMG+")",
      backgroundSize: "cover",
      backgroundPosition: "fixed",
      backgroundAttachment: "fixed",
      backgroundRepeat: "repeat-y",
      width: "100%",
      minHeight: "100vh",

    },
    tabelaOkvir:{
      borderColor: "transparent !important",
      height:"30rem",
      [theme.breakpoints.down('md')]: {
        width:"90%",
      },
      [theme.breakpoints.up('lg')]: {
        width:"70rem",
      },
    },
    lowerPart:{
      marginTop:"3rem",
      borderColor: "transparent !important",
      height:"30rem",
      [theme.breakpoints.down('md')]: {
        width:"90%",
      },
      [theme.breakpoints.up('lg')]: {
        width:"70rem",
      },
    },
    tabela:{
        height:"28em",
        width:"100%"
    },
    topicTitle:{
      textAlign:"center",
      fontFamily:'Lobster',
      fontSize:'8vh',
      marginTop:"15vh",
      marginBottom:"5vh",
      textShadow: "-5px 5px #30303033",
      color: "#3b3a3a"
    },
    addButton:{
      marginTop:"-0.12em",
      position:'relative',
      marginLeft:"auto",
      marginRight:"1em", 
      borderRadius:'25px',
      maxWidth:"3em",
      minWidth:"3em",
      backgroundColor:"transparent"
    },
    popupStyle:{
      minWidth:'60%',
      minHeight: '40%'
    },
    skeleton:{
      width:"80%",
      height:"100%",
      paddingTop:"1rem",
      paddingLeft:"10%",
      paddingRight:"10%",
      marginBottom:"0",
    },
    search: {
      display: "inline-flex",
      verticalAlign: "middle",
      margin:"16px",
      backgroundColor:"white",
      borderRadius:"10px"
    },
    searchBox:{
      display:"inline-block",
      backgroundColor:"#f7f5f5",/* ededed */
      border:"0.5px solid darkgrey",
      borderRadius:"10px"
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    formControl2: {
      margin: theme.spacing(1),
      minWidth: 80,
    },
    selectList: {
      margin: theme.spacing(1),
      [theme.breakpoints.down('md')]: {
        minWidth: "80%",
      },
      [theme.breakpoints.up('lg')]: {
        minWidth: "27%",
      },
    },
    selectEmpty: {
      margin: theme.spacing(2),
    },
    buttonBlue: {
      color: "#FFFFFF",
      fontFamily: "Lobster !important",
      borderRadius:"10px",
      backgroundColor: "#4373ec",
      maxHeight: 35,
      '&:hover': {
          backgroundColor: "#0e318b",
    },},
    hat:{
      width:"20rem",
      height:"auto",
    }
}))

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
        width: 200,
      },
    },
};

function CustomPagination(props) {
  const { paginationProps } = props;
  const classes = useStyles();

  return (
    <Pagination
      className={classes.root}
      color="primary"
      page={paginationProps.page}
      count={paginationProps.pageCount}
      onChange={(event, value) => paginationProps.setPage(value)}
    />
  );
};

function Students(){
    const offline= useSelector(state=>state.offline);
    const [fakeData, setFakeData]=useState(()=>fakeBackendStudents);
    const [data, setData]=useState(()=>null);
    const [confirmDialogOpen, setConfirmDialogOpen]=useState(()=>false);
    const [editDialogOpen, setEditDialogOpen]=useState(()=>false);
    const [loading,setLoading]=useState(offline);//potrebno ga postavit na false da bi radilo
    const [selectedClassID,setSelectedClassID]=useState(()=>null);
    const [selectedStudent,setSelectedStudent]=useState(()=>[]);
    const [allClasses,setAllClasses]=useState(()=>fakeAllClasses);
    const [studentClasses,setStudentClasses]=useState(()=>null);
    const [snackbarText,setSnackbarText]=useState(()=>"");
    const [snackbarStatus,setSnackbarStatus]=useState(()=>"");
    const [errorStatus,setErrorStatus]=useState(()=>"");
    const [snackbarOpen,setSnackbarOpen]=useState(()=>false);
    const classes=useStyles();
    const [noError,setNoError]=useState(()=> true);
    const [listOfGroups,setListOfGroups]=useState(()=>[{class_name:"All",class_id:-1},...allClasses]); 
    const role=useSelector(state=>state.login);
    

    
    const fetchClasses=()=>{
      const requestOptions = {
        method: 'GET',
        mode:'cors',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include'
      };

      let apiUri;
      if(role==="admin") apiUri=`/api/admin/all/classes`
      else if(role==="teacher") apiUri=`/api/teacher/all/classes`;

      fetch(apiUri, requestOptions)
      .then(response => {
        if(response.status===200)
        {
          Promise.resolve(response).then(response => response.json())
          .then(dataFetch => {  
            setListOfGroups([{class_name:"All",class_id:-1},...dataFetch]);
            setAllClasses(dataFetch);
           // setLoading(true);//mice skeleton da prikaze podatke PO MENI BI TAKO TRIBALO BIT
            setSnackbarStatus("success");
            setSnackbarText("Classes loaded successfully.");
            setSnackbarOpen(true);
          })
        }
        else{
          setNoError(false);
          setSnackbarStatus("error");
          setErrorStatus(response.status);
          setSnackbarText("Classes did not load successfully.");
          setSnackbarOpen(true);
        }
      })
      .catch((error)=>{
        setNoError(false);
        setSnackbarStatus("error");
        setErrorStatus("Oops");
        setSnackbarText("Classes loaded successfully.");
        setSnackbarOpen(true);
        console.log('Error in fetch function '+ error);
      });
    };

    useEffect(() => {
      (!offline)&&fetchClasses();
    },[]);
/*=====================================================================================================================================================================================0 */
 //lista razreda ZA TABLICUUU
    const renderGroupsList=(list)=>{
      return(
          <FormControl className={classes.formControl2}>
            <InputLabel id="demo-simple-select-label">Classes</InputLabel>
            <Select>
            {
              list.map((group)=>{
                return <MenuItem disabled value={group.class_name}>{group.class_name}</MenuItem>
              })
            }
            </Select>
        </FormControl>
      )
    };
/*=====================================================================================================================================================================================00 */
/*ZA -1 POKAZUJE SVE */
    const changeOfClass=(value)=>{

      if(!offline){
          const requestOptions = {
            method: 'GET',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include'
          };
          
          let apiUri;
          if(role==="admin"){
            if(value===-1){apiUri=`/api/admin/students/all/class`}
            else{apiUri=`/api/students/class/${value}`};
          } 
          else if(role==="teacher"){
            if(value===-1){apiUri=`/api/teacher/students/all/class`}
            else{apiUri=`/api/students/class/${value}`};
          };
    
          fetch(apiUri, requestOptions)
          .then((response)=>{
            if(response.status===200)
            {
              Promise.resolve(response).then(response => response.json())
                .then(dataFetch => {
                  setData(dataFetch);
                  setLoading(true);//mice skeleton da prikaze podatke PO MENI BI TAKO TRIBALO BIT
                  setSnackbarStatus("success");
                  setSnackbarText("Students loaded successfully.");
                  setSnackbarOpen(true);
                })
            }      
            else{
              setSnackbarStatus("error");
              setSnackbarText("Students did not load successfully.");
              setSnackbarOpen(true);
          }})
          .catch((error)=>{
            setSnackbarStatus("error");
            setSnackbarText("Error in fetch function "+error);
            setSnackbarOpen(true);
            console.log('Error in fetch function '+ error);
          });
      }
      else if(value!==-1&&offline){
          let newData=[];
          fakeData.map((student)=>{
            let inClass=false;
            for(let group of student.classes){
              if(group.class_id===value){inClass=true;}
            };
            if(inClass){newData.push(student)};
          });
          setData(newData);
      }
      else setData(fakeData);

      setSelectedClassID(value);

    };

/*=============================================================================================================================== */
const editStudent=(studentToEdit)=>{

  if(offline){
    let ar = fakeData.filter((person)=>person.id!==studentToEdit.id);
    ar.push(studentToEdit);
    setFakeData(ar);
    ar=data.filter((person)=>person.id!==studentToEdit.id);
    ar.push(studentToEdit);
    setData(ar);
  
    changeOfClass(selectedClassID);
  }
  else if(!offline){
    const requestOptions = {
      method: 'PUT',
      mode:'cors',
      headers: { 'Content-Type': 'application/json'},
      credentials: 'include',
      body:JSON.stringify(studentToEdit)
    };

    fetch(`/api/students/update`, requestOptions)
    .then((response)=>{
      if(response.status===200)
      {
        Promise.resolve(response.status)
        .then(() => {  
          // changeOfClass(selectedClassID);
          setSnackbarStatus("success");
          setSnackbarText("Student edited successfully.");
          setSnackbarOpen(true);
          changeOfClass(selectedClassID);//????????????????????????????
          let array=data.filter((person)=>person.id!==studentToEdit.id);
          array.push(studentToEdit);
          setData(array);
        
        })
      }      
      else{
        setSnackbarStatus("error");
        setSnackbarText("Student did not edit successfully.");
        setSnackbarOpen(true);
    }})
    .catch((error)=>{
      setSnackbarStatus("error");
      setSnackbarText("Error in fetch function " + error);
      setSnackbarOpen(true);
      console.log('Error in fetch function '+ error);
    });};
};

/*=============================================================================================================================== */
    const removeStudent=()=>{
      let stud=selectedStudent;
      let clas=selectedStudent.classes.filter((cl)=>cl.class_id!=selectedClassID);
      stud.classes=clas;
      editStudent(stud);
    };

    const deleteStudent=()=>{

      if(!offline){
        const requestOptions = {
          method: 'DELETE',
          mode:'cors',
          headers: { 'Content-Type': 'application/json'},
          credentials: 'include'
        };
  
        fetch(`/api/students/delete/${selectedStudent.id}`, requestOptions)
        .then((response)=>{
          if(response.status===200)
          {
            Promise.resolve(response.status)
              .then(() => {
                changeOfClass(selectedClassID);
                setSnackbarStatus("success");
                setSnackbarText("Student deleted successfully.");
                setSnackbarOpen(true);
                setLoading(true);//mice skeleton da prikaze podatke PO MENI BI TAKO TRIBALO BIT
                setData(data.filter((student)=>student.id!==selectedStudent.id));

              })
          }
          else{
            setSnackbarStatus("error");
            setErrorStatus(response.status);            
            setSnackbarText("Student did not delete successfully.");
            setSnackbarOpen(true);
          }
        })
        .catch((error)=>{
          setSnackbarStatus("error");
          setSnackbarText("Error in fetch function "+ error);
          setSnackbarOpen(true);
          console.log('Error in fetch function '+ error);        
        });
      }
      else if(offline){
        setFakeData(fakeData.filter((student)=>student.id!==selectedStudent.id));    
        setData(data.filter((student)=>student.id!==selectedStudent.id));
  
      }
        

      }
/*=================================================================================================================================00 */
    const RenderClassesList=()=>{

      return(
        <FormControl className={classes.selectList}>
          <InputLabel id="demo-simple-select-label">Classes</InputLabel>
          <Select value={selectedClassID} onChange={(event)=>changeOfClass(event.target.value)}>
          {
            listOfGroups.map((group)=>{
              return <MenuItem value={group.class_id}>{group.class_name}</MenuItem>
            })
          }
          </Select>
      </FormControl>
    )
    };

    var cols=[
        {field: "id", headerName:'ID',type:'number',headerAlign:'center', align:'center'},
        {field: "username", width:100, headerName:'Username',type:'string',headerAlign:'center', align:'center'},
        {field: "name", width:100, headerName:'Name',type:'string',headerAlign:'center', align:'center'},
        {field: "surname", width:100, headerName:'Surname',type:'string',headerAlign:'center', align:'center'},
        {field: "email", width:200, headerName:'e-mail',type:'string',headerAlign:'center', align:'center'},
        {field: "created", width:150, headerName:'Created',type:'date',headerAlign:'center', align:'center'}
    ];

    if(role=="admin"){
    cols=[...cols,
      {field: "classes", headerName:'Classes',type:'number',headerAlign:'center', align:'center',sortable: false , renderCell:(params)=>{ if(params.getValue('classes').length==0){return "None"}else{return renderGroupsList(params.getValue('classes'))}}},
      {field: 'open', headerName: 'Edit',headerAlign:'center', align:'center',sortable: false , renderCell: (params) => (<Tooltip title={"Edit student account"} placement="right" arrow><Button  onClick={()=>{setSelectedStudent(params.data) ;setEditDialogOpen(true)}}><Icon style={{color:"#27AE60",fontSize:'2em'}}>edit_outlined_icon </Icon> </Button></Tooltip>)},
      {field: 'delete', headerName: 'Delete ' ,headerAlign:'center', align:'center',sortable: false , renderCell: (params) => (<Tooltip title={"Delete student account"} placement="right" arrow><Button  onClick={()=>{setSelectedStudent(params.data); setConfirmDialogOpen(true);}}><Icon style={{color:"#EB4949",fontSize:'2em'}}>delete_forever_rounded_icon</Icon></Button></Tooltip>)}];
    }
    else if(role=="teacher"){
      cols=[...cols,
        {field: "classes", headerName:'Classes',type:'number',headerAlign:'center', align:'center',sortable: false , renderCell:(params)=>{ if(params.getValue('classes').length==0){return "None"}else{return renderGroupsList(params.getValue('classes'))}}},
      ];
      if(selectedClassID!=-1)cols=[...cols,{field: 'delete', headerName: 'Remove ' ,headerAlign:'center', align:'center',sortable: false , renderCell: (params) => (<Tooltip title={"Remove student from this class"} placement="right" arrow><Button onClick={()=>{setSelectedStudent(params.data); console.log(params.data); setConfirmDialogOpen(true);}}><Icon style={{color:"#EB4949",fontSize:'2em'}}>delete_forever_rounded_icon</Icon></Button></Tooltip>)}];
    };

        // {field: 'open',width:350, headerName: 'Edit',headerAlign:'center', align:'center',sortable: false , renderCell: (params) =>{
        //   let stud=params.data;
        //   let ids=stud.classes.map((z)=>z.id);
        //   return(        
        //   <FormControl variant="outlined" style={{width:"90%"}} >
        //     <Select style={{width:"90%",height:"40px",marginTop:"4px"}}
        //       multiple 
        //       value={ids} 
        //       onChange={(e)=>{
        //         let cids=e.target.value;
        //         let st = cids.map((cl)=>{for(let i of allClasses){if(i.id==cl){return {name:i.name,id:i.id}}}});
        //         let itemToSave={
        //           id: stud.id,
        //           created:stud.created,
        //           username: stud.username,
        //           name: stud.name,
        //           surname: stud.surname,
        //           email: stud.email,
        //           password: stud.password,
        //           classes: st
        //         };
        //         editStudent(itemToSave);
        //         setStudentClasses(cids);
        //       }} 
        //       renderValue={(selected) => {
        //       let array=selected.map((selClass)=>{for(let cl of allClasses){if(cl.id==selClass)return `${cl.name}`}}); return array.join(`, `);} } MenuProps={MenuProps2}>
        //       {allClasses.map((oneClass) => {
        //         return(
        //           <MenuItem key={oneClass.id} value={oneClass.id}>
        //           {/* <Checkbox checked={checkIfIn(oneClass)}/> */}
        //           <ListItemText primary={`${oneClass.name} #${oneClass.id}`}  />
        //         </MenuItem>
        //         )})}
        //     </Select>
        //   </FormControl>
        //   )}},

    const columns=cols;

    return(
      (!noError)?<NotFound code={errorStatus}/>
      :<div style={{display: "flex", flexDirection: "column",justifyContent:"none", alignItems:"center"}} className={classes.background}>
            <PopupDialog openPopup={editDialogOpen} setOpenPopup={setEditDialogOpen} clickAway={false} style={{minHeight:'30%',width:"35rem"}}>
              <EditStudentPU allClasses={allClasses} setOpenPopup={setEditDialogOpen} editStudent={editStudent} student={selectedStudent} style={{borderRadius:'25px'}}/>
            </PopupDialog>
            {(role=="admin")?<ConfirmDialog functionToConfirm={deleteStudent} text={"Do you really want to delete this student?"} setOpenPopup={setConfirmDialogOpen} openPopup={confirmDialogOpen}></ConfirmDialog>
            :<ConfirmDialog functionToConfirm={removeStudent} text={"Do you really want to remove this student from this class?"} setOpenPopup={setConfirmDialogOpen} openPopup={confirmDialogOpen}></ConfirmDialog>
            }
            <Grid container flexDirection="row" alignItems="center" justify="center">
                <Grid item xs={12}>
                    <Typography color="primary" className={classes.topicTitle}>Students</Typography>
                </Grid>
                <Grid item xs={12} style={{textAlign:"center"}}>
                      <RenderClassesList/>
                </Grid>
                <Grid container flexDirection="column" alignItems="center" justify="center" item xs={12} className={classes.lowerPart}>
                    {/* <Grid container item xs={12} alignItems="flex-start" justify="center">

                    </Grid> */}
                    { 
                          (selectedClassID!==null)?
                            <Grid container flexDirection="column" alignItems="flex-start" item className={classes.tabelaOkvir}>
                            {
                                loading?
                                  <Grid item xs={12} className={classes.tabela}>
                                    <DataGrid className={classes.tabela} disableSelectionOnClick={true} pageSize={6} components={{pagination: CustomPagination,}} rows={data} columns={columns} />  
                                  </Grid>
                                  :
                                  <div className={classes.skeleton}>
                                    <Skeleton variant="text" animation="wave" height={60}/> 
                                    <Skeleton variant="reck" animation="wave" height={350}/>
                                    <Skeleton variant="text" animation="wave" height={60}/>
                                  </div>
                              }
                              </Grid>
                            :
                            <Grid container flexDirection="column" alignItems="flex-start" item className={classes.tabelaOkvir}>
                              <Grid item xs={12} className={classes.tabela} style={{textAlign:"center"}}>
                                <img className={classes.hat} src={hat} alt="Oops, the image went missing..."/>
                                <Typography style={{ fontSize: "1.3rem", fontFamily: "inherit",textShadow: "rgba(48, 48, 48, 0.2) -3px 3px", color: "rgb(123 123 123)"}}>Select the group of students you want to look into!</Typography>
                              </Grid> 
                            </Grid> 
                    }
                    </Grid>
                </Grid>
                {
                  snackbarOpen ? <CustomSnackbar handleClose={()=>{setSnackbarOpen(false);}} open={snackbarOpen} text={snackbarText} status={snackbarStatus}/>
                  : null
                } 
         </div>
    )
};
export default Students;
//search-filter
                        {/* <Grid item xs={12}>
                            <div className={classes.searchBox}>
                              <div className={classes.search}>
                                  <SearchIcon style={{alignSelf:"center",margin:" 0 5px"}} />
                                  <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }}/>
                                  <Button variant="contained" calssName={classes.buttonBlue}>Search</Button>
                              </div>
                              <div style={{display:"inline-flex"}}> 
                                <FormControl className={classes.formControl}>
                                  <InputLabel>Age</InputLabel>
                                  <Select
                                    // value={age}
                                    // onChange={handleChange}
                                  >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                              {/* <div style={{display:"inline-flex"}}> 
                                <ChipsArray/> 
                              </div>    

                            </div>   
                        </Grid> */}