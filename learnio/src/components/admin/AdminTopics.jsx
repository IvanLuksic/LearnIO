import React,{useState} from 'react';
import { makeStyles,withStyles} from '@material-ui/core/styles';
import backgroundIMG from '../../images/learniobg10-15.png';
import { Typography } from '@material-ui/core';
import { DataGrid, Row } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import AddTopicPU from './AddTopicPU';
import Icon from '@material-ui/core/Icon';
import topici from './topics.json';
import Alert from '@material-ui/lab/Alert';

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
        width:"50%",
      },
      [theme.breakpoints.up('xl')]: {
        width:"40%",
      },
    },
    topicTitle:{
        fontFamily:'Lobster',
        fontSize:'6vh',
        [theme.breakpoints.down('sm')]: {
          paddingTop:"10vh",
        },
        [theme.breakpoints.up('md')]: {
          paddingTop:"1vh",
        },
    },
    addButton:{
      [theme.breakpoints.up('md')]: {
        paddingLeft:"4em",
        paddingRight:"4em",
      },
    },
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

    const[openAddTopic,setOpenAddTopic]=useState(false);
    const[rows,setRows]=useState(topici);
    const classes=useStyles();
    
    var linkage='contacts' ;
    
    // brisanje topica iz liste
    const handleDelete=(id)=>{
      console.log(id);
      console.log("pozvan delete");
      var polje=rows;
      setRows(
          [ ...rows.filter(polje=> ((polje.id!==id)))]
      ); 
    };
    // dodavanje novog topica u listu i id tom topicu
    // problem s id kad se izbrise jedan i ide dodat novi ne radi!!!
   const addQuestion=(value)=>{
      console.log("pozvan add");
      console.log(value);
      var polje=rows;
      let nextID;
      nextID=polje.length+1;
      value.id=nextID;
      polje=[...polje,value];
      polje=polje.sort((a,b)=>(a.id-b.id));
      
      setRows(polje);
    }

   
        
    const columns=[
        {field: "topic", width: 200, type:'string', renderHeader: () => (<strong>{"Topic"}</strong>),},
        {field: "id", headerName:'ID',
        valueGetter: (params) => `${params.getValue('id')}`,},
        {field: "ao", headerName: 'AO'},
        {field: "d", headerName:'D'},
        {field: 'open', headerName: `${' '}`, renderCell: (params) => (<Link to={'/topic/'+ linkage}><Button><Icon style={{color:"#27AE60",fontSize:'2em'}}>edit_outlined_icon </Icon> </Button></Link>),},
        {field: 'delete', headerName: `${' '}` ,renderCell: (params) => (<Button onClick={() =>handleDelete(params.data.id)}><Icon style={{color:"#EB4949",fontSize:'2em'}}>delete_forever_rounded_icon</Icon></Button>), },
    ];


    return(
        <div style={{display: "flex", flexDirection: "column",justifyContent:"space-evenly", alignItems:"center"}} className={classes.background}>
            <Typography color="primary"><span className={classes.topicTitle}>Topics</span></Typography>
            <div className={classes.tabela}>
                <DataGrid onRowHover={(Row)=>{linkage=Row.data.id}} pageSize={5} components={{pagination: CustomPagination,}} rows={rows} columns={columns} />               
            </div>
           <Button variant="contained" color="primary" className={classes.addButton} onClick={()=>setOpenAddTopic(true)}>Add topic</Button>
           <AddTopicPU openAddTopic={openAddTopic} setOpenAddTopic={setOpenAddTopic} addTopic={addQuestion}/>
        </div>
         
    )
};
export default AdminTopics;