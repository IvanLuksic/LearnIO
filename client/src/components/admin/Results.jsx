import React,{useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import backgroundIMG from '../../images/learniobg10-15.png';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import Pagination from '@material-ui/lab/Pagination';
import fakeBackendResults from '../../sampleData/admin/allResults.json';
import Skeleton from '@material-ui/lab/Skeleton';
import { useSelector} from 'react-redux';
import NotFound from '../common/NotFound';
import CustomSnackbar from '../common/Snackbar.jsx';
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
    tabela:{
      borderColor: "transparent !important",
      height:"25em",
      [theme.breakpoints.down('xl')]: {
        width:"94%",
      },
      [theme.breakpoints.up('xl')]: {
        width:"80%",
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
    skeleton:{
      width:"80%",
      height:"100%",
      paddingTop:"23vh",
      paddingLeft:"10%",
      paddingRight:"10%",
      marginBottom:"0",
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

function Results(){
    const offline= useSelector(state=>state.offline);
    const[data,setData]=useState(()=>{return fakeBackendResults});
    const classes=useStyles();
    const [loading,setLoading]=useState(offline);//potrebno ga postavit na false da bi radilo
    const [noError,setNoError]=useState(()=> true);
    const [snackbarText,setSnackbarText]=useState(()=>"");
    const [snackbarStatus,setSnackbarStatus]=useState(()=>"");
    const [errorStatus,setErrorStatus]=useState(()=>"");
    const [snackbarOpen,setSnackbarOpen]=useState(()=>false);
    const [savedData,setSavedData]=useState(()=>data);

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

      fetch('/api/results', requestOptions)
      .then((response)=>{
        if(response.status===200)
        {
          Promise.resolve(response).then(response => response.json())
          .then(dataFetch => {  
            setData(dataFetch);
            setSavedData(dataFetch);
            setSnackbarStatus("success");
            setSnackbarText("Results loaded successfully.");
            setSnackbarOpen(true);
            setLoading(true);
          })
        }      
        else{
          setNoError(false);
          setSnackbarStatus("error");
          setErrorStatus(response.status);
          setSnackbarText("Results did not load successfully.");
          setSnackbarOpen(true);
      }})
      .catch((error)=>{
        setNoError(false);
        setSnackbarStatus("error");
        setErrorStatus("Oops");
        setSnackbarText('Error in fetch function '+ error);
        setSnackbarOpen(true);
        console.log('Error in fetch function '+ error);
      });
    };
    //   .then(response => response.json())
      // .then(dataFetch => {  
      //         setData(dataFetch);
      //         setLoading(true);//mice skeleton da prikaze podatke PO MENI BI TAKO TRIBALO BIT
      // })
    //   .catch((error)=>{
    //     console.log('Error in fetch function '+ error);
    //   });
    // };

    useEffect(() => {
      (!offline)&&fetchData();
    },[]);

    //podaci za datagrid se dobivaju restrukturiranjem fetchanih podataka tj. destrukturiranjem objekta niza stupaca u niz propertyja stupaca
    
    let maxNumberOfColumns=0;//maksimalan broj AO-ova
    for(let j=0;j<data.length;j++){
      if(maxNumberOfColumns<data[j].columns) maxNumberOfColumns=data[j].columns;
    };
    

    let rows=[];
    for(let j=0;j<data.length;j++){
      let topic_dig=Math.pow(10,(4-data[j].topic_id.toString().length))*data[j].topic_id;
      let student_dig=Math.pow(10,(4-data[j].student_id.toString().length))*data[j].student_id;
      let course_dig=Math.pow(10,(4-data[j].course_id.toString().length))*data[j].course_id;

      let fetchedDataRestructured={
        id: ""+topic_dig+student_dig+course_dig+ data[j].class_name,
        topic_id: data[j].topic_id,
        topic: data[j].topic,
        course: data[j].course,
        subject: data[j].subject,
        name: data[j].name,
        surname: data[j].surname,
        class_name: data[j].class_name,
        class_year: data[j].class_year,
        grade: data[j].grade,
      };

      let destructuredColumns=[];
      for(let i=0; i<data[j].result_array_by_columns.length;i++){
        destructuredColumns={...destructuredColumns,
          [`ao${i+1}`]: ((data[j].result_array_by_columns[i]/data[j].rows)*100)
      }};

      let filler=-1;
      for(let i=data[j].result_array_by_columns.length; i<maxNumberOfColumns;i++){
        destructuredColumns={...destructuredColumns,
          [`ao${i+1}`]: filler
      }};

      rows=[...rows,{...fetchedDataRestructured,...destructuredColumns}];
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
             else return `${val}%`;
          },
          sortComparator: (v1, v2, row1, row2) => {
          var c=`ao${i+1}`;
          return(row1.data[c] - row2.data[c]);},
        }
      ]
    }

    const columns=[
        {field: "id", hide:true},
        {field: "topic_id", type:'number',headerAlign:'center', align:'center', renderHeader: () => (<strong>{"ID"}</strong>)},
        {field: "topic",width:150 ,type:'string',headerAlign:'center', align:'center', renderHeader: () => (<div ><strong>{"Topic"}</strong></div>),},
        {field: "course",width:150, headerName:'Unit',type:'string',headerAlign:'center', align:'center'},
        {field: "subject",width:150, headerName:'Subject',type:'string',headerAlign:'center', align:'center'},
        {field: "name", headerName:'Name',type:'string',headerAlign:'center', align:'center'},
        {field: "surname", headerName:'Surname',type:'string',headerAlign:'center', align:'center'},
        {field: "class_name", headerName:'Class',type:'string',headerAlign:'center', align:'center'},
        {field: "class_year",width:110, headerName:'Year',type:'string',headerAlign:'center', align:'center'},
        {field: "grade", headerName:'Grade',type:'number',headerAlign:'center', align:'center', renderCell:(params)=>renderGrade(params.getValue('grade'))},
        ...destructuredColumnsDataGrid
       
    ];

    return(
      (!noError)?<NotFound code={errorStatus}/>
      :<div>
      {loading?(
        <div style={{display: "flex", flexDirection: "column",justifyContent:"none", alignItems:"center"}} className={classes.background}>
            <Typography color="primary" className={classes.topicTitle}>Results</Typography>
            <div className={classes.tabela}>
              <Filter data={data} savedData={savedData} setData={setData} listOfProperties={[
                {name:"topic_id",nameToDisplay:"Topic ID"},
                {name:"topic",nameToDisplay:"Topic Name"},
                {name:"course",nameToDisplay:"Unit"},
                {name:"subject",nameToDisplay:"Subject"},
                {name:"name",nameToDisplay:"Name"},
                {name:"surname",nameToDisplay:"Surname"},
                {name:"class_name",nameToDisplay:"Class"},
                {name:"class_year",nameToDisplay:"Year"},
                {name:"grade",nameToDisplay:"Grade"}
              ]}/>
                <DataGrid disableSelectionOnClick={true} pageSize={6} components={{pagination: CustomPagination,}} rows={rows} columns={columns} />               
            </div>
            {
              snackbarOpen ? <CustomSnackbar handleClose={()=>{setSnackbarOpen(false);}} open={snackbarOpen} text={snackbarText} status={snackbarStatus}/>
              : null
            } 
        </div>
      )
      :
      (
        <div className={classes.skeleton}>
          <Skeleton variant="text" animation="wave" height={60} /> 
          <Skeleton variant="reck" animation="wave" height={350} />
          <Skeleton variant="text" animation="wave" height={60} />
        </div>
      )
      }
      </div>
    )
};
export default Results;

