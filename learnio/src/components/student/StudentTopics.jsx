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
import fakeLoadingTopics from '../../sampleData/student/topics.json'
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
    const class_id=props.class_id;
    const subject_id=props.subject_id;
    const dispatch=useDispatch();//rows su podaci
    const [data,setData]=useState(()=>{return fakeLoadingTopics});//koristi ove dok ne učita da ne bi bilo undefined
    const [loading,setLoading]=useState(offline);//OFFLINE:true
    const classes = useStyles();
    //red 1, blue 2, grey 3, green 4 - ovo je mislavova signalizacija iz APIja
    function RenderStatusButton(id,status,name){
      if(status==1) return (<Button onClick={()=>{dispatch(topicSelected(id,name))}} style={{color:'#FFFFFF'}} className={classes.ColorButtonRed} component={Link} to={`/student/topic/${id}`} size="small"> Start </Button>);
      else if(status==2) return (<Button onClick={()=>{dispatch(topicSelected(id,name))}} style={{color:'#FFFFFF'}} className={classes.ColorButtonBlue} component={Link} to={`/student/topic/${id}`} size="small"> Continue </Button>);
      else if(status==4) return (<Button onClick={()=>{dispatch(topicSelected(id,name))}} style={{color:'#FFFFFF'}} className={classes.ColorButtonGreen} component={Link} to={`/student/topic/${id}`} size="small"> Revise </Button>);
      else return <p>UNLUCKY</p>;
    };

    
    const renderGrade=(value)=>{
      switch(value){

        case 1:{
          return <p className={classes.redGrade}>{value}</p>;//return <Icon className={classes.blueGrade}>looks_1</Icon>;
        }
        case 2:{
          return <p className={classes.greyGrade}>{value}</p>;
        }
        case 3:{
          return <p className={classes.blueGrade}>{value}</p>;
        }
        case 4:{
          return <p className={classes.greenGrade}>{value}</p>;
        }
        case 5:{
          return <div className={classes.goldGrade}>{value}</div>;
        }
        default:{
          return <p className={classes.whiteGrade}>{value}</p>;//return <Icon className={classes.blueGrade}>looks_1</Icon>;
        }
      }
    }
    


    const fetchData=()=>{
      const requestOptions = {
        method: 'GET',
        mode:'cors',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include'
      };
      fetch(`/api/topic/${1}/${1}/${1}`, requestOptions)// class subject course
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
      

    useEffect(() => {
      (!offline)&&fetchData();
    },[]);

    //podaci za datagrid se dobivaju restrukturiranjem fetchanih podataka tj. destrukturiranjem objekta niza stupaca u niz propertyja stupaca
    
    let maxNumberOfColumns=0;//maksimalan broj AO-ova
    for(let j=0;j<data.length;j++){
      if(maxNumberOfColumns<data[j].result_array_by_columns.length) maxNumberOfColumns=data[j].result_array_by_columns.length;
    };

    let rows=[];
    for(let j=0;j<data.length;j++){
      let fetchedDataRestructured={
        id: data[j].topic_id,
        name: data[j].name,
        grade: data[j].grade,
      };

      let destructuredColumns=[];
      for(let i=0; i<data[j].result_array_by_columns.length;i++){
        destructuredColumns={...destructuredColumns,
          [`ao${i+1}`]: data[j].result_array_by_columns[i]
      }};

      let filler=-1;
      for(let i=data[j].result_array_by_columns.length; i<maxNumberOfColumns;i++){
        destructuredColumns={...destructuredColumns,
          [`ao${i+1}`]: filler
      }};

      let fetchedDataRestructured2={
        status: data[j].status
      };
      
      rows=[...rows,{...fetchedDataRestructured,...destructuredColumns,...fetchedDataRestructured2}];
    }

    //ovo koristimo za tamplate u datagridu
    let destructuredColumnsDataGrid=[];
    for(let i=0; i<maxNumberOfColumns;i++){
      destructuredColumnsDataGrid=[...destructuredColumnsDataGrid,
        { field: `ao${i+1}`, hide: true , type:'number'},
        { field: `ao${i+1}P`,headerAlign:'center', align:'center',headerName:`AO ${i+1}`,
          valueGetter: (params) => {
             var val=params.getValue(`ao${i+1}`);
             if(val===-1) return `∅`;
             else return `${val}`;
          },
          sortComparator: (v1, v2, row1, row2) => {
          var c=`ao${i+1}`;
          return(row1.data[c] - row2.data[c]);},
        }
      ]
    }

    //tamplate u datagridu
    const columns = [
      { field: 'id', headerName:'ID',headerAlign:'center', align:'center', renderHeader: () => (<strong>{"ID"}</strong>)},
      { field: 'name',width:200, type:'string',headerAlign:'center', align:'center', renderHeader: () => (<strong>{"Topic"}</strong>),},
      { field: 'grade',headerAlign:'center', align:'center', headerName:'Grade',renderCell:(params)=>renderGrade(params.getValue('grade'))},
      ...destructuredColumnsDataGrid,
      { field: 'status', hide: true},
      { field: 'open', sortable:false,headerAlign:'center', align:'center', headerName: `${' '}`, renderCell: (params) => (RenderStatusButton(params.getValue('id'),params.getValue('status'),params.getValue('name'))) },
    ];


    return( 
      loading?        
        <div style={{display: "flex", flexDirection: "column", justifyContent:"none", alignItems:"center"}} className={classes.background} >
          <Typography color="primary" className={classes.topicTitle}>Topics</Typography>
          <div className={classes.tabela}>
            <DataGrid disableSelectionOnClick={true} pageSize={5} components={{pagination: CustomPagination,}} rows={rows} columns={columns}/>
          </div>  
          <div style={{width:"40vw", marginTop:"20vh", marginBottom:"40vh"}}>
            <CustomAccordion/>
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