import React, { useState, useEffect } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { DataGrid} from '@material-ui/data-grid';
import backgroundIMG from '../../images/learniobg10-15.png';
import { Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import fakeLoadingCourses from '../../sampleData/student/courses.json'
import Skeleton from '@material-ui/lab/Skeleton';
import {subjectSelected} from '../../redux/actions/subjectID';
import {classSelected} from '../../redux/actions/classID';
import NotFound from '../common/NotFound';
import CustomSnackbar from '../common/Snackbar.jsx';
//-------------------------------------
import CustomAccordion from './Accordion.jsx';
//-------------------------------------

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

    tabela:{
      borderColor: "transparent !important",
      height:"25em",
      [theme.breakpoints.down('sm')]: {
        width:"90%",
      },
      [theme.breakpoints.up('md')]: {
        width:"60%",
      },
      [theme.breakpoints.up('xl')]: {
        width:"50%",
      },
    },
    topicTitle:{
      fontFamily:'Lobster',
      fontSize:'8vh',
      marginTop:"15vh",
      marginBottom:"5vh",
    },
    ColorButtonGrey: {
      border: 0,
      MarginRight: 0,
      marginLeft: "auto",
      color: "#FFFFFF",
      fontFamily: "Lobster !important",
      borderRadius:"25px",
      backgroundColor: "#8c8c8c",
      maxHeight: 30,
      '&:hover': {
      backgroundColor: "#595959",
    },},
    ColorButtonRed: {
      border: 0,
      MarginRight: 0,
      marginLeft: "auto",
      color: "#FFFFFF",
      fontFamily: "Lobster !important",
      borderRadius:"25px",
      backgroundColor: "#EB4949",
      maxHeight: 30,
      '&:hover': {
        backgroundColor: "#b81414",
    },},
    ColorButtonGreen: {
      border: 0,
      MarginRight: 0,
      marginLeft: "auto",
      color: "#FFFFFF",
      fontFamily: "Lobster !important",
      borderRadius:"25px",
      backgroundColor: "#27ae60",
      maxHeight: 30,
      '&:hover': {
          backgroundColor: "#1f894b",
    },},
    ColorButtonBlue: {
      border: 0,
      MarginRight: 0,
      marginLeft: "auto",
      color: "#FFFFFF",
      fontFamily: "Lobster !important",
      borderRadius:"25px",
      backgroundColor: "#4373ec",
      maxHeight: 35,
      '&:hover': {
          backgroundColor: "#0e318b",
    },},
    skeleton:{
      width:"50%",
      //height:"100%",
      paddingTop:"25vh",
      paddingLeft:"25%",
      paddingRight:"25%",
      marginBottom:"0",
    },
    redGrade:{
      backgroundColor: "#EB4949",
      padding:"0 1.4em",
      color: "#ffffff",
      fontSize:"1.1em",
      fontWeight:"bold",
      borderRadius:"50%"
    },
    greyGrade:{
      backgroundColor: "#8f8e8b",
      padding:"0 1.4em",
      color: "#ffffff",
      fontSize:"1.1em",
      fontWeight:"bold",
      borderRadius:"50%"
    },
    blueGrade:{
      backgroundColor: "#4373ec",
      padding:"0 1.4em",
      color: "#ffffff",
      fontSize:"1.1em",
      fontWeight:"bold",
      borderRadius:"50%"
    },
    greenGrade:{
      backgroundColor: "#27ae60",
      padding:"0 1.4em",
      color: "#ffffff",
      fontSize:"1.1em",
      fontWeight:"bold",
      borderRadius:"50%"
    },
    goldGrade:{
      padding:"0 1.4em",
      backgroundColor: "#DAA520",
      color: "#ffffff",
      fontSize:"1.1em",
      fontWeight:"bold",
      borderRadius:"50%"
    },
    whiteGrade:{
      padding:"0 1.4em",
      backgroundColor: "#FFFFFF",
      color: "#000000",
      fontSize:"1.1em",
      fontWeight:"bold",
      borderRadius:"50%"
    },
  }));

// function CustomPagination(props) {
//     const { paginationProps } = props;
//     const classes = useStyles();
  
//     return (
//       <Pagination
//         className={classes.root}
//         color="primary"
//         page={paginationProps.page}
//         count={paginationProps.pageCount}
//         onChange={(event, value) => paginationProps.setPage(value)}
//       />
//     );
// }

const randomColor=()=>{
  let colors=["#27ae60","#4373ec","#8f8e8b","#EB4949"];
  return colors[(Math.floor(Math.random()*10000))%4];
};


function StudentTopics(props){
    const offline= useSelector(state=>state.offline);
    const [expanded,setExpanded]=useState(()=>null);
    const dispatch=useDispatch();//rows su podaci
    const [data,setData]=useState(()=>{return fakeLoadingCourses});//koristi ove dok ne učita da ne bi bilo undefined
    const [loading,setLoading]=useState(offline);//OFFLINE:true
    const [noError,setNoError]=useState(()=> true);
    const [snackbarText,setSnackbarText]=useState(()=>"");
    const [snackbarStatus,setSnackbarStatus]=useState(()=>"");
    const [errorStatus,setErrorStatus]=useState(()=>"");
    const [snackbarOpen,setSnackbarOpen]=useState(()=>false);
    dispatch(subjectSelected(parseInt(props.match.params.subject_id)));
    dispatch(classSelected(parseInt(props.match.params.class_id)));


    const classes = useStyles();


    const fetchData=()=>{
      const requestOptions = {
        method: 'GET',
        mode:'cors',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include'
      };
      fetch(`/api/courses/${props.match.params.subject_id}`, requestOptions)// class subject course
      .then((response)=>{
        if(response.status===200)
        {
          Promise.resolve(response).then(response => response.json())
          .then(dataFetch => {
            let t=dataFetch.map((d)=>{d.color=randomColor(); return d;});  
            setData(t);
            setSnackbarStatus("success");
            setSnackbarText("Courses loaded successfully.");
            setSnackbarOpen(true);
            setLoading(true);
          })
        }      
        else{
          setNoError(false);
          setSnackbarStatus("error");
          setErrorStatus(response.status);
          setSnackbarText("Courses did not load successfully.");
          setSnackbarOpen(true);
        }
      })
      .catch((error)=>{
        setNoError(false);
        setSnackbarStatus("error");
        setErrorStatus("Oops");
        setSnackbarText("Error in fetch function "+error);
        setSnackbarOpen(true);
        console.log('Error in fetch function '+ error);
      });
    };
      
    useEffect(() => {
      (!offline)&&fetchData();
    },[]);


    function handleChange(course){
        setExpanded( (course&&(course.course_id!==expanded))? course.course_id:false);
      };

    return( 
      (!noError)?<NotFound code={errorStatus}/>
      :<div>
        {
        loading?        
          <div style={{display: "flex", flexDirection: "column", justifyContent:"none", alignItems:"center"}} className={classes.background} >
            <Typography color="primary" className={classes.topicTitle}>Units</Typography>
            <div style={{width:"50vw", marginTop:"5rem", marginBottom:"40vh"}}>{/*sredi*/}
              <CustomAccordion courses={data} expanded={expanded} handleChange={handleChange} pageProps={props}/>
            </div> 
            {
              snackbarOpen ? <CustomSnackbar handleClose={()=>{setSnackbarOpen(false);}} open={snackbarOpen} text={snackbarText} status={snackbarStatus}/>
              : null
            } 
          </div>
          :
          <div className={classes.skeleton}>
            <Skeleton variant="text" animation="wave" height={60}/> 
            <Skeleton variant="reck" animation="wave" height={350}/>
            <Skeleton variant="text" animation="wave"  height={60}/>
          </div>
        }
      </div>
    )

};

export default StudentTopics;