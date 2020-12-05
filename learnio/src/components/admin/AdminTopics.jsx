import React,{useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import backgroundIMG from '../../images/learniobg10-15.png';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import AddTopicPU from './AddTopicPU';
import Icon from '@material-ui/core/Icon';
import topici from './topics.json';
import PopupDialog from '../common/PopupDialog';
import ConfirmDialog from '../common/ConfirmDialog';

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
        width:"45%",
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
    popupStyle:{
      minWidth:'60%',
      minHeight: '40%'
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

    const[rows,setRows]=useState(topici);
    const[open,setOpen]=useState(false); 
    const[openPopup,setOpenPopup]=useState(false);
    const[item,setItem]=useState(0);
    const classes=useStyles();
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    
    var linkage='contacts' ;
    
    // brisanje topica iz liste
    const handleDelete=(id)=>{
      setRows(
          [ ...rows.filter(polje=> ((polje.id!==id)))]
      ); 
    };
    // dodavanje novog topica u listu i id tom topicu
    // problem s id kad se izbrise jedan i ide dodat novi ne radi!!!
   const addQuestion=(value)=>{
      console.log(value);
      var polje=rows;
      let nextID;
      nextID=polje.length+1;
      value.id=nextID;
      polje=[...polje,value];
      polje=polje.sort((a,b)=>(a.id-b.id));
      
      setRows(polje);
    };

    //dodatne dvi funkcije 
    //postavljamo vrijednost id drugoj varijabli
    //drugom funkcijom pozivamo samo handleDelete(bez nje san uvik upada u loop)
    const Confirm=(data)=>{
      setOpenPopup(true); 
      setItem(data);
    };
    const DeleteTopic=()=>{
      handleDelete(item);
    }

    const columns=[
        {field: "names", width: 200, type:'string', renderHeader: () => (<strong>{"Names"}</strong>)},
        {field: "topic", width: 200, type:'string', renderHeader: () => (<strong>{"Topic"}</strong>)},
        {field: "id", headerName:'ID',
        valueGetter: (params) => `${params.getValue('id')}`},
        { field: 'results', hide: true},
        { field: 'resultsP', headerName:'RESULTS',
        valueGetter: (params) => `${params.getValue('results')}%`,
        sortComparator: (v1, v2, row1, row2) => row1.data.results - row2.data.results,},
        {field: 'open', headerName: `${' '}`, renderCell: (params) => (<Link to={'/admin-topic/'+ linkage}><Button><Icon style={{color:"#27AE60",fontSize:'2em'}}>edit_outlined_icon </Icon> </Button></Link>)},
        {field: 'delete', headerName: `${' '}` ,renderCell: (params) => (<Button onClick={()=>{Confirm(params.data.id)}}><Icon style={{color:"#EB4949",fontSize:'2em'}}>delete_forever_rounded_icon</Icon></Button>)},
    ];


    return(
      <div>
      <ConfirmDialog setOpenPopup={setOpenPopup} openPopup={openPopup} text="Do you really want to delete this question?" functionToConfirm={DeleteTopic}/>
      {
        <div style={{display: "flex", flexDirection: "column",justifyContent:"space-evenly", alignItems:"center"}} className={classes.background}>
            <Typography color="primary"><span className={classes.topicTitle}>Topics</span></Typography>
            <div className={classes.tabela}>
                <DataGrid onRowHover={(Row)=>{linkage=Row.data.id}} pageSize={5} components={{pagination: CustomPagination,}} rows={rows}  columns={columns} />               
            </div>
            <Button variant="contained" color="primary" className={classes.addButton} onClick={()=>handleOpen()}>Add topic</Button>
            <PopupDialog openPopup={open} setOpenPopup={handleClose} clickAway={false} style={{minWidth:'60%',minHeight:'40%'}}>
              <AddTopicPU closePopup={handleClose} addTopic={addQuestion}/>
            </PopupDialog>
        </div>
      }
      </div>
    )
};
export default AdminTopics;

//onClick={() =>{handleDelete(params.data.id)}}
