import React,{useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import backgroundIMG from '../../images/learniobg10-15.png';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import Pagination from '@material-ui/lab/Pagination';
import fakeBackendResults from './backendResults.json';
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
      color: "#ffffff",
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
      color: "#ffffff",
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

function AdminTopics(){
    const[data,setData]=useState(()=>{return fakeBackendResults});
    const classes=useStyles();
    const [loading,setLoading]=useState(true);//potrebno ga postavit na false da bi radilo
    

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
      }
    }
    
    const fetchData=()=>{
      const requestOptions = {
        method: 'GET',
        mode:'cors',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include'
      };

      fetch('http://127.0.0.1:3000/results', requestOptions)
      .then(response => response.json())
            .then(dataFetch => {  
              setData(dataFetch);
              setLoading(true);//mice skeleton da prikaze podatke PO MENI BI TAKO TRIBALO BIT
      })
      .catch((error)=>{
        console.log('Error in fetch function '+ error);
      });
    };

    // useEffect(() => {
    //   console.log("saljem");
    //   fetchData();
    // },[]);

    //podaci za datagrid se dobivaju restrukturiranjem fetchanih podataka tj. destrukturiranjem objekta niza stupaca u niz propertyja stupaca
    
    let maxNumberOfColumns=0;//maksimalan broj AO-ova
    for(let j=0;j<data.length;j++){
      if(maxNumberOfColumns<data[j].columns) maxNumberOfColumns=data[j].columns;
    };

    let rows=[];
    for(let j=0;j<data.length;j++){
      let fetchedDataRestructured={
        id: data[j].topic_id,
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

    const columns=[
        {field: "id", type:'number',headerAlign:'center', align:'center', renderHeader: () => (<strong>{"ID"}</strong>)},
        {field: "topic",width:150 ,type:'string',headerAlign:'center', align:'center', renderHeader: () => (<div ><strong>{"Topic"}</strong></div>),},
        {field: "course",width:150, headerName:'Course',type:'string',headerAlign:'center', align:'center'},
        {field: "subject",width:150, headerName:'Subject',type:'string',headerAlign:'center', align:'center'},
        {field: "name", headerName:'Name',type:'string',headerAlign:'center', align:'center'},
        {field: "surname", headerName:'Surname',type:'string',headerAlign:'center', align:'center'},
        {field: "class_name", headerName:'Class',type:'string',headerAlign:'center', align:'center'},
        {field: "class_year",width:110, headerName:'Year',type:'string',headerAlign:'center', align:'center'},
        {field: "grade", headerName:'Grade',type:'number',headerAlign:'center', align:'center', renderCell:(params)=>renderGrade(params.getValue('grade'))},
        ...destructuredColumnsDataGrid
       
    ];

    return(
      <div>
      {loading?(
        <div style={{display: "flex", flexDirection: "column",justifyContent:"none", alignItems:"center"}} className={classes.background}>
            <Typography color="primary" className={classes.topicTitle}>Results</Typography>
            <div className={classes.tabela}>
                <DataGrid disableSelectionOnClick={true} pageSize={6} components={{pagination: CustomPagination,}} rows={rows} columns={columns} />               
            </div>
        </div>
      )
      :
      (
        <div className={classes.skeleton}>
          <Skeleton variant="text" animation="wave" style={{paddingBottom:"10vh"}} /> 
          <Skeleton variant="reck" animation="wave" height={300} />
        </div>
      )
      }
      </div>
    )
};
export default AdminTopics;

