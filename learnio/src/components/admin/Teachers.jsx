import React,{useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import backgroundIMG from '../../images/learniobg10-15.png';
import { Grid, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import Pagination from '@material-ui/lab/Pagination';
import fakeBackendTeachers from '../../sampleData/admin/teachers.json';
import Skeleton from '@material-ui/lab/Skeleton';
import { useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import PopupDialog from '../common/PopupDialog';
import ConfirmDialog from '../common/ConfirmDialog';
import EditTeacherPU from '../admin/editComponents/EditTeacherPU';
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

function Teachers(){
    const offline= useSelector(state=>state.offline);
    const [data, setData]=useState(()=>fakeBackendTeachers);
    const [confirmDialogOpen, setConfirmDialogOpen]=useState(()=>false);
    const [editDialogOpen, setEditDialogOpen]=useState(()=>false);
    const [loading,setLoading]=useState(offline);//potrebno ga postavit na false da bi radilo
    const [selectedTeacher,setSelectedTeacher]=useState(()=>[]);
    const [snackbarText,setSnackbarText]=useState(()=>"");
    const [snackbarStatus,setSnackbarStatus]=useState(()=>"");
    const [errorStatus,setErrorStatus]=useState(()=>"");
    const [snackbarOpen,setSnackbarOpen]=useState(()=>false);
    const classes=useStyles();
    const [noError,setNoError]=useState(()=> true);
    const role=useSelector(state=>state.login);
    

    const fetchTeachers=()=>{

        if(!offline){
            const requestOptions = {
              method: 'GET',
              mode:'cors',
              headers: { 'Content-Type': 'application/json'},
              credentials: 'include'
            };
      
            fetch(`/api/admin/students/all/class`, requestOptions)
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
        
    };

    useEffect(() => {
      (!offline)&&fetchTeachers();
    },[]);

/*=============================================================================================================================== */
const editTeacher=(teacherToEdit)=>{


  if(offline){
    let array = data.filter((person)=>person.id!==teacherToEdit.id);
    array.push(teacherToEdit);
    setData(array);
  }
  else if(!offline){
    const requestOptions = {
      method: 'PUT',
      mode:'cors',
      headers: { 'Content-Type': 'application/json'},
      credentials: 'include',
      body:JSON.stringify(teacherToEdit)
    };

    fetch(`/api/teachers/update`, requestOptions)
    .then((response)=>{
      if(response.status===200)
      {
        Promise.resolve(response.status)
        .then(() => {  
          // changeOfClass(selectedClassID);
          setSnackbarStatus("success");
          setSnackbarText("Teacher edited successfully.");
          setSnackbarOpen(true);
          let array=data.filter((person)=>person.id!==teacherToEdit.id);
          array.push(teacherToEdit);
          setData(array);
        })
      }      
      else{
        setSnackbarStatus("error");
        setSnackbarText("Teacher did not edit successfully.");
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
    const deleteTeacher=()=>{

      if(!offline){
        const requestOptions = {
          method: 'DELETE',
          mode:'cors',
          headers: { 'Content-Type': 'application/json'},
          credentials: 'include'
        };
  
        fetch(`/api/teachers/delete/${selectedTeacher.id}`, requestOptions)
        .then((response)=>{
          if(response.status===200)
          {
            Promise.resolve(response.status)
              .then(() => {
                setSnackbarStatus("success");
                setSnackbarText("Teacher deleted successfully.");
                setSnackbarOpen(true);
                setLoading(true);//mice skeleton da prikaze podatke PO MENI BI TAKO TRIBALO BIT
                setData(data.filter((teacher)=>teacher.id!==selectedTeacher.id));
              })
          }
          else{
            setSnackbarStatus("error");
            setErrorStatus(response.status);            
            setSnackbarText("Teacher did not delete successfully.");
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
      else setData(data.filter((teacher)=>teacher.id!==selectedTeacher.id));
    };


    var cols=[
        {field: "id", headerName:'ID',type:'number',headerAlign:'center', align:'center'},
        {field: "username", width:100, headerName:'Username',type:'string',headerAlign:'center', align:'center'},
        {field: "name", width:100, headerName:'Name',type:'string',headerAlign:'center', align:'center'},
        {field: "surname", width:100, headerName:'Surname',type:'string',headerAlign:'center', align:'center'},
        {field: "email", width:200, headerName:'e-mail',type:'string',headerAlign:'center', align:'center'},
        {field: "created", width:150, headerName:'Created',type:'date',headerAlign:'center', align:'center'},
        {field: 'open', headerName: 'Edit',headerAlign:'center', align:'center',sortable: false , renderCell: (params) => (<Tooltip title={"Edit teacher account"} placement="right" arrow><Button  onClick={()=>{setSelectedTeacher(params.data) ;setEditDialogOpen(true)}}><Icon style={{color:"#27AE60",fontSize:'2em'}}>edit_outlined_icon </Icon> </Button></Tooltip>)},
        {field: 'delete', headerName: 'Delete ' ,headerAlign:'center', align:'center',sortable: false , renderCell: (params) => (<Tooltip title={"Delete teacher account"} placement="right" arrow><Button  onClick={()=>{setSelectedTeacher(params.data); setConfirmDialogOpen(true);}}><Icon style={{color:"#EB4949",fontSize:'2em'}}>delete_forever_rounded_icon</Icon></Button></Tooltip>)}
      
    ];


    const columns=cols;

    return(
      (!noError)?<NotFound code={errorStatus}/>
      :<div style={{display: "flex", flexDirection: "column",justifyContent:"none", alignItems:"center"}} className={classes.background}>
            <PopupDialog openPopup={editDialogOpen} setOpenPopup={setEditDialogOpen} clickAway={false} style={{minHeight:'30%',width:"35rem"}}>
              <EditTeacherPU setOpenPopup={setEditDialogOpen} editTeacher={editTeacher} teacher={selectedTeacher} style={{borderRadius:'25px'}}/>
            </PopupDialog>
            <ConfirmDialog functionToConfirm={deleteTeacher} text={"Do you really want to delete this teacher?"} setOpenPopup={setConfirmDialogOpen} openPopup={confirmDialogOpen}></ConfirmDialog>
            <Grid container flexDirection="row" alignItems="center" justify="center">
                <Grid item xs={12}>
                    <Typography color="primary" className={classes.topicTitle}>Teachers</Typography>
                </Grid>

                <Grid container flexDirection="column" alignItems="center" justify="center" item xs={12} className={classes.lowerPart}>
                    { 
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
export default Teachers;