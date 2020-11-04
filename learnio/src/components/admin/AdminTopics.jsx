import React,{useState} from 'react';
import { makeStyles,withStyles} from '@material-ui/core/styles';
import backgroundIMG from '../../images/learniobg10-15.png';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import AddTopicPU from './AddTopicPU';
import Icon from '@material-ui/core/Icon';

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
    const classes=useStyles();
    var linkage='contacts' ;
    


    const rows=[
      { id: 1, topic:'Trigonometry 1', ao:'4',d:'5'},
      { id: 2, topic:'Geometry 1', ao:'1',d:'9'},
      { id: 3, topic:'Basic Calculus 3', ao:'2',d:'3'},
      { id: 4, topic:'Trigonometry 2', ao:'3',d:'4'},
      { id: 5, topic:'Basic Calculus 2', ao:'3',d:'3'},
      { id: 6, topic:'Trigonometry 3', ao:'4',d:'3'},
      
    ]
    const columns=[
        {field: "topic", width: 200, type:'string', renderHeader: () => (<strong>{"Topic"}</strong>),},
        {field: "id", headerName:'ID'},
        {field: "ao", headerName: 'AO'},
        {field: "d", headerName:'D'},
        {field: 'open', headerName: `${' '}`, renderCell: (params) => (<Link to={'/topic/'+ linkage}><Button><Icon style={{color:"#27AE60",fontSize:'2em'}}>edit_outlined_icon </Icon> </Button></Link>),},
        {field: 'delete', headerName: `${' '}` ,renderCell: (params) => (<Button onClick={() =>props.handleDelete()}><Icon style={{color:"#EB4949",fontSize:'2em'}}>delete_forever_rounded_icon</Icon></Button>), },
    ];


    return(
        <div style={{display: "flex", flexDirection: "column",justifyContent:"space-evenly", alignItems:"center"}} className={classes.background}>
            <Typography color="primary"><span className={classes.topicTitle}>Topics</span></Typography>
            <div className={classes.tabela}>
                <DataGrid onRowHover={(Row)=>{linkage=Row.data.id}} pageSize={5} components={{pagination: CustomPagination,}} rows={rows} columns={columns} />               
            </div>
           <Button variant="contained" color="primary" className={classes.addButton} onClick={()=>setOpenAddTopic(true)}>Add topic</Button>
           <AddTopicPU openAddTopic={openAddTopic} setOpenAddTopic={setOpenAddTopic} id/>
        </div>
         
    )
};
export default AdminTopics;