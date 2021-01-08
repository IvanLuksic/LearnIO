import React, { useState, useEffect } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { DataGrid} from '@material-ui/data-grid';
import backgroundIMG from '../../images/learniobg10-15.png';
import { Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {topicSelected} from '../../redux/actions/topicID';
import fakeLoadingCourses from '../../sampleData/student/courses.json'
import Skeleton from '@material-ui/lab/Skeleton';

//-------------------------------------
import CustomAccordion from './AccordionTemp/Accordion.jsx';
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


function StudentTopics(props){
    const offline= useSelector(state=>state.offline);
    const [expanded,setExpanded]=useState(()=>null);
    const dispatch=useDispatch();//rows su podaci
    const [data,setData]=useState(()=>{return fakeLoadingCourses});//koristi ove dok ne učita da ne bi bilo undefined
    const [loading,setLoading]=useState(offline);//OFFLINE:true
    const classes = useStyles();


    const fetchData=()=>{
      const requestOptions = {
        method: 'GET',
        mode:'cors',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include'
      };
      fetch(`http://127.0.0.1:3000/topic/${1}/${1}/${1}`, requestOptions)// class subject course
      .then(response => response.json())
            .then(dataFetch => {  
              console.log(JSON.stringify(dataFetch));
              setData(dataFetch);
              setLoading(true);//mice skeleton da prikaze podatke PO MENI BI TAKO TRIBALO BIT 
      })
      .catch((error)=>{
        console.log('Error in fetch function '+ error);
      });
    };
      
    console.log(props);
    useEffect(() => {
      (!offline)&&fetchData();
    },[]);


    function handleChange(course){
        setExpanded( (course&&(course.course_id!==expanded))? course.course_id:false);
        console.log("čenđ")
      };

    return( 
      loading?        
        <div style={{display: "flex", flexDirection: "column", justifyContent:"none", alignItems:"center"}} className={classes.background} >
          <Typography color="primary" className={classes.topicTitle}>Units</Typography>
          <div style={{width:"50vw", marginTop:"5rem", marginBottom:"40vh"}}>{/*sredi*/}
            <CustomAccordion courses={data} expanded={expanded} handleChange={handleChange} pageProps={props}/>
          </div> 
        </div>
        :
        <div className={classes.skeleton}>
          <Skeleton variant="text" animation="wave" height={60}/> 
          <Skeleton variant="reck" animation="wave" height={350}/>
          <Skeleton variant="text" animation="wave"  height={60}/>
        </div>
    )

};

export default StudentTopics;