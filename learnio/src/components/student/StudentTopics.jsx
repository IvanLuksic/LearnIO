import React, { useState, useEffect } from 'react';
import { makeStyles,withStyles} from '@material-ui/core/styles';
import { DataGrid} from '@material-ui/data-grid';
import backgroundIMG from '../../images/learniobg10-15.png';
import { Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {topicSelected} from '../../redux/actions/topicID';
import fakeLoadingTopics from './fetchedTopics.json'
import Skeleton from '@material-ui/lab/Skeleton';

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
      paddingTop:"15vh",
      paddingLeft:"25%",
      paddingRight:"25%",
      marginBottom:"0",
    }
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
    const dispatch=useDispatch();//rows su podaci
    const [data,setData]=useState(()=>{return fakeLoadingTopics});//koristi ove dok ne učita da ne bi bilo undefined
    const [loading,setLoading]=useState(true);//potrebno ga postavit na false da bi radilo
    const classes = useStyles();
   //red 1, blue 2, grey 3, green 4 - ovo je mislavova signalizacija iz APIja
    function RenderStatusButton(id,status,name){
      if(status==1) return (<Button onClick={()=>{dispatch(topicSelected(id,name))}} style={{color:'#FFFFFF'}} className={classes.ColorButtonRed} component={Link} to={`/topic/${id}`} size="small"> Start </Button>);
      else if(status==2) return (<Button onClick={()=>{dispatch(topicSelected(id,name))}} style={{color:'#FFFFFF'}} className={classes.ColorButtonBlue} component={Link} to={`/topic/${id}`} size="small"> Continue </Button>);
      else if(status==4) return (<Button onClick={()=>{dispatch(topicSelected(id,name))}} style={{color:'#FFFFFF'}} className={classes.ColorButtonGreen} component={Link} to={`/topic/${id}`} size="small"> Revise </Button>);
      else return <p>sranje</p>;
    };
    


    const fetchData=()=>{
      const requestOptions = {
        method: 'POST',
        mode:'cors',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ course_id:1, subject_id:1}),
        credentials: 'include'
      };
      fetch('http://127.0.0.1:3000/topic', requestOptions)
      .then(response => response.json())
            .then(dataFetch => {  
              console.log(JSON.stringify(dataFetch));
              console.log(dataFetch[0].grade+dataFetch[0].result_array_by_columns);
              setData(dataFetch);
              setLoading(true);//mice skeleton da prikaze podatke PO MENI BI TAKO TRIBALO BIT 
      })
      .catch((error)=>{
        console.log('Error in fetch function '+ error);
      });
    };
      

    useEffect(() => {
      console.log("saljem");
      fetchData();
    });

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
    console.log(rows);

    //ovo koristimo za tamplate u datagridu
    let destructuredColumnsDataGrid=[];
    for(let i=0; i<maxNumberOfColumns;i++){
      destructuredColumnsDataGrid=[...destructuredColumnsDataGrid,
        { field: `ao${i+1}`, hide: true , type:'number'},
        { field: `ao${i+1}P`,headerAlign:'center', align:'center',headerName:`AO ${i+1}`,
          valueGetter: (params) => {
             var val=params.getValue(`ao${i+1}`);
             if(val===-1) return `∅`;
             else return `${val}%`;
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
      { field: 'grade',headerAlign:'center', align:'center', headerName:'Grade'},
      ...destructuredColumnsDataGrid,
      // { field: 'ao1', hide: true},
      // { field: 'ao1P', headerName:'AO 1',
      //   valueGetter: (params) => `${params.getValue('ao1')}%`,
      //   sortComparator: (v1, v2, row1, row2) => row1.data.ao1 - row2.data.ao1,},
      // { field: 'ao2', hide: true},
      // { field: 'ao2P', headerName:'AO 2',
      // valueGetter: (params) => `${params.getValue('ao2')}%`,
      // sortComparator: (v1, v2, row1, row2) => row1.data.ao2 - row2.data.ao2,},
      // { field: 'ao3', hide: true},
      // { field: 'ao3P', headerName:'AO 3',
      // valueGetter: (params) => `${params.getValue('ao3')}%`,
      // sortComparator: (v1, v2, row1, row2) => row1.data.ao3 - row2.data.ao3,},
      { field: 'status', hide: true},
      { field: 'open', sortable:false,headerAlign:'center', align:'center', headerName: `${' '}`, renderCell: (params) => (RenderStatusButton(params.getValue('id'),params.getValue('status'),params.getValue('name'))) },
    ];

    console.log(columns);
    console.log(rows);

    return( 
    <div>
    {loading?(
      <div style={{display: "flex", flexDirection: "column", justifyContent:"none", alignItems:"center"}} className={classes.background} >
        <Typography color="primary" className={classes.topicTitle}>Topics</Typography>
        <div className={classes.tabela}>
            <DataGrid disableSelectionOnClick={true} pageSize={5} components={{pagination: CustomPagination,}} rows={rows} columns={columns} />
        </div>   
      </div>)
    :
      <div className={classes.skeleton}>
        <Skeleton variant="text" animation="wave" style={{paddingBottom:"10vh"}} /> 
        <Skeleton variant="reck" animation="wave" height={500} />
      </div>
    }
    </div>
    );

};

export default StudentTopics;