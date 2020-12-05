import React, { useState } from 'react';
import { makeStyles,withStyles} from '@material-ui/core/styles';
import { DataGrid} from '@material-ui/data-grid';
import backgroundIMG from '../../images/learniobg10-15.png';
import { Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {topicSelected} from '../../redux/actions/topicID';
import fetchedTopics from './fetchedTopics.json'


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
      backgroundColor: "#D54646",
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
          backgroundColor: "rgb(41, 97, 65)",
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


function StudentTopics(){
    const dispatch=useDispatch();
    const [rows,setRows]=useState(fetchedTopics);
    const classes = useStyles();

    function RenderStatusButton(id,status){
      if(status=='locked') return (<Button size="small" className={classes.ColorButtonGrey}> Locked </Button>);
      else if(status=='unlocked') return (<Link to={`/topic/${id}`} onClick={()=>{dispatch(topicSelected(id))}}><Button size="small" className={classes.ColorButtonRed}> Start </Button></Link>);
      else if(status=='continue') return (<Link to={`/topic/${id}`} onClick={()=>{dispatch(topicSelected(id))}}><Button size="small" className={classes.ColorButtonBlue}> Continue </Button></Link>);
      else if(status=='revise') return (<Link to={`/topic/${id}`} onClick={()=>{dispatch(topicSelected(id))}}><Button size="small" className={classes.ColorButtonGreen}> Revise </Button></Link>);
      else return <p>sranje</p>;
    };

    const columns = [
      { field: 'topic', width: 200, type:'string', renderHeader: () => (<strong>{"Topic"}</strong>),},
      { field: 'id', headerName:'ID'},
      { field: 'ao1', hide: true},
      { field: 'ao1P', headerName:'AO 1',
        valueGetter: (params) => `${params.getValue('ao1')}%`,
        sortComparator: (v1, v2, row1, row2) => row1.data.ao1 - row2.data.ao1,},
      { field: 'ao2', hide: true},
      { field: 'ao2P', headerName:'AO 2',
      valueGetter: (params) => `${params.getValue('ao2')}%`,
      sortComparator: (v1, v2, row1, row2) => row1.data.ao2 - row2.data.ao2,},
      { field: 'ao3', hide: true},
      { field: 'ao3P', headerName:'AO 3',
      valueGetter: (params) => `${params.getValue('ao3')}%`,
      sortComparator: (v1, v2, row1, row2) => row1.data.ao3 - row2.data.ao3,},
      { field: 'status', hide: true},
      { field: 'open',sortable:false, headerName: `${' '}`, renderCell: (params) => (RenderStatusButton(params.getValue('id'),params.getValue('status'))) },
    ];

    return(  
    <div style={{display: "flex", flexDirection: "column", justifyContent:"none", alignItems:"center"}} className={classes.background} >
        <Typography color="primary" className={classes.topicTitle}>Topics</Typography>
        <div className={classes.tabela}>
          <DataGrid disableSelectionOnClick={true} pageSize={5} components={{pagination: CustomPagination,}} rows={rows} columns={columns} />
        </div>

    </div>
    );
};

export default StudentTopics;