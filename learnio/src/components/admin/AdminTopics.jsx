import React,{useState,useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { Typography  } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import AddTopicPU from './addComponents/AddTopicPU';
import Icon from '@material-ui/core/Icon';
import fakeBackendTopics from '../../sampleData/admin/allTopics.json';
import PopupDialog from '../common/PopupDialog';
import ConfirmDialog from '../common/ConfirmDialog';
import { useDispatch} from 'react-redux';
import {topicSelected} from '../../redux/actions/topicID';
import Skeleton from '@material-ui/lab/Skeleton';
import { useSelector} from 'react-redux';
import backgroundIMG from '../../images/learniobg10-15.png';
import { DataGrid } from '@material-ui/data-grid';
import Pagination from '@material-ui/lab/Pagination';
import Filter from '../common/Filter';

const useStyles = makeStyles((theme) => ({

    background:{
      backgroundImage:"url("+backgroundIMG+")",
      backgroundSize: "cover",
      backgroundPosition: "fixed",
      backgroundAttachment: "fixed",
      backgroundRepeat: "repeat-y",
      width: "100%",
      [theme.breakpoints.down('sm')]: {
        minHeight: "100vh",
      },
      [theme.breakpoints.up('md')]: {
        minHeight: "100vh",
      },
    },
    rootChips: {
      margin: "0 1rem 0 0",
      display: "inline-flex",
      boxShadow:"none !important",
      justifyContent: 'center',
      backgroundColor:"transparent",
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
    },
    tabela:{
      borderColor: "transparent !important",
      height:"25em",
      [theme.breakpoints.down('sm')]: {
        width:"90%",
      },
      [theme.breakpoints.up('md')]: {
        width:"58%",
      },
      [theme.breakpoints.up('xl')]: {
        width:"53%",
      },
    },
    topicTitle:{
      fontFamily:'Lobster',
      fontSize:'8vh',
      marginTop:"15vh",
      marginBottom:"5vh",
      textShadow:" -5px 5px #30303033"
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
      width:"50%",
      //height:"100%",
      paddingTop:"25vh",
      paddingLeft:"25%",
      paddingRight:"25%",
      marginBottom:"0",
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
    search: {
      display: "inline-flex",
      verticalAlign: "middle",
      margin:"16px",
      backgroundColor:"white",
      borderRadius:"10px"
    },
    searchBox:{
      margin:"0 0 2rem 0",
      display:"inline-block",
      backgroundColor:"#f7f5f5",/* ededed */
      border:"0.5px solid darkgrey",
      borderRadius:"10px"
    },
    formControl: {
      margin: `${theme.spacing(1)}px 2rem ${theme.spacing(1)}px 1rem`,
      minWidth: 120,
    }
}))

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
}

function AdminTopics(props){
    const offline= useSelector(state=>state.offline);
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(offline);//OFFLINE:true
    const [data,setData]=useState(()=>fakeBackendTopics);
    const [open,setOpen]=useState(false); 
    const [openPopup,setOpenPopup]=useState(false);
    const [item,setItem]=useState(0);
    const classes=useStyles();

    const [savedData,setSavedData]=useState(()=>fakeBackendTopics);
    const [searched,setSearched]=useState(()=>null);
    const [selectedProperty, setSelectedProperty]=useState(()=>null);
    const [activeFilters, setActiveFilters]=useState(()=>[]);

    const fetchTopics=()=>{
      const requestOptions = {
          method: 'GET',
          mode:'cors',
          headers: { 'Content-Type': 'application/json'},
          credentials: 'include'
      };

      fetch('http://127.0.0.1:3000/api/admin/topics', requestOptions)
      .then(response => response.json())
      .then(data => {  
        setData(data.Topics);
        setLoading(true);
      })
      .catch((error)=>{
          console.log('Error in fetch function '+ error);
      });
    };

    useEffect(()=>{
      fetchTopics();
    },[]);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    // brisanje topica iz liste
    const handleDelete=(id)=>{
      let array=[];
      data.map(polje=>{if(polje.topic_id!==id){array.push(polje)};});
      setData(array); 
    };
    // dodavanje novog topica u listu i id tom topicu
    // problem s id kad se izbrise jedan i ide dodat novi ne radi!!!
   const addQuestion=(value)=>{
      var polje=data;
      polje=[...polje,value];
      polje=polje.sort((a,b)=>(a.id-b.id));
      
      setData(polje);
    };
    //dodatne dvi funkcije 
    //postavljamo vrijednost id drugoj varijabli
    //drugom funkcijom pozivamo samo handleDelete(bez nje san uvik upada u loop)
    const Confirm=(data)=>{
      setOpenPopup(true); 
      setItem(data);
    };
    const requestDeleteTopic=()=>{
      offline&&handleDelete(item);

      const requestOptions = {
          method: 'DELETE',
          mode:'cors',
          headers: { 'Content-Type': 'application/json'},
          credentials: 'include'
      };
      fetch(`http://127.0.0.1:3000/api/admin/topics/delete/${item}`, requestOptions)
      .then(() =>{handleDelete(item);})
      .catch((error)=>{console.log('Error in fetch function '+ error);});
    };
    

    let rows=[];
    for(let i=0;i<data.length;i++){
      let topic_dig=Math.pow(10,(4-data[i].topic_id.toString().length))*data[i].topic_id;
      let subject_dig=Math.pow(10,(4-data[i].subject_id.toString().length))*data[i].subject_id;
      let course_dig=Math.pow(10,(4-data[i].course_id.toString().length))*data[i].course_id;

      rows=[...rows,{
        id: ''+subject_dig+topic_dig+course_dig,
        topic_id:data[i].topic_id,
        name: data[i].topic_name,
        course: data[i].course_name,
        subject: data[i].subject_name
      }]
    };

    const columns=[
        {field: "id", hide:true},
        {field: "topic_id",headerName:'ID',headerAlign:'center', align:'center'},
        {field: "name", width: 200, type:'string',headerAlign:'center', align:'center', renderHeader: () => (<div ><strong>{"Topic"}</strong><Button onClick={()=>handleOpen()} className={classes.addButton} ><Icon style={{color:"white"}}>add_circle</Icon></Button></div>),},
        {field: "course", width: 200,headerName:'Course',type:'string',headerAlign:'center', align:'center'},                                                                                                                          
        {field: "subject", width: 200, headerName:'Subject',type:'string',headerAlign:'center', align:'center'},
        {field: 'open', headerName: 'Edit',headerAlign:'center', align:'center',sortable: false , renderCell: (params) => (<Link to={`/admin-topic/${params.getValue('topic_id')}`} onClick={()=>{dispatch(topicSelected(params.getValue('topic_id')))}}><Button><Icon style={{color:"#27AE60",fontSize:'2em'}}>edit_outlined_icon </Icon> </Button></Link>)},
        {field: 'delete', headerName: 'Delete ' ,headerAlign:'center', align:'center',sortable: false , renderCell: (params) => (<Button onClick={()=>{Confirm(params.data.topic_id)}}><Icon style={{color:"#EB4949",fontSize:'2em'}}>delete_forever_rounded_icon</Icon></Button>)},
    ];

    return(
      <div>
      { loading?(
        <div>
          <ConfirmDialog setOpenPopup={setOpenPopup} openPopup={openPopup} text="Do you really want to delete this topic?" functionToConfirm={requestDeleteTopic}/>
          {
          <div style={{display: "flex", flexDirection: "column",justifyContent:"none", alignItems:"center"}} className={classes.background}>
            <Typography color="primary" className={classes.topicTitle}>Topics</Typography>
            <div className={classes.tabela}>
              <Filter data={data} savedData={savedData} setData={setData} listOfProperties={[{name:"topic_id",nameToDisplay:"ID"},{name:"topic_name",nameToDisplay:"NAME"}]}/>
              <DataGrid disableSelectionOnClick={true}  pageSize={5} components={{pagination: CustomPagination,}} rows={rows} columns={columns} />               
            </div>

            <PopupDialog openPopup={open} setOpenPopup={handleClose} clickAway={false} style={{minWidth:'60%',minHeight:'30%'}}>
              <AddTopicPU closePopup={handleClose} addTopic={addQuestion}/>
            </PopupDialog>
          </div>
          }
        </div> )
        :
          <div className={classes.skeleton}>
            <Skeleton variant="text" height={60} /> 
            <Skeleton variant="reck"  height={350} />
            <Skeleton variant="text" height={60} /> 
          </div>
      }
      </div>
    )
};
export default AdminTopics;

//onClick={() =>{handleDelete(params.data.id)}}
//{field: "results", headerName: 'Results',hide:true, renderCell: (params) => (<Link to={`/topic/${params.getValue('id')}`} onClick={()=>{dispatch(topicSelected(params.getValue('id')))}}><Button><Icon style={{color:"#27AE60",fontSize:'2em'}}>school_icon </Icon> </Button></Link>)},
