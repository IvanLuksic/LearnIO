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
import {useSelector, useDispatch} from 'react-redux';
import {topicSelected} from '../../redux/actions/topicID';
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
        width:"35%",
      },
      [theme.breakpoints.up('xl')]: {
        width:"28%",
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
    skeleton:{
      width:"30%",
      //height:"100%",
      paddingTop:"25vh",
      paddingLeft:"35%",
      paddingRight:"35%",
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

function AdminTopics(props){
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(true);//potrebno ga postavit na false da bi radilo
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
        {field: "id", headerName:'ID',type:'string',headerAlign:'center', align:'center', valueGetter: (params) => `${params.getValue('id')}`,},
        {field: "topic", width: 200, type:'string',headerAlign:'center', align:'center', renderHeader: () => (<div ><strong>{"Topic"}</strong><Button onClick={()=>handleOpen()} className={classes.addButton} ><Icon style={{color:"white"}}>add_circle</Icon></Button></div>),},
        {field: 'open', headerName: `${'Edit'}`,headerAlign:'center', align:'center',sortable: false , renderCell: (params) => (<Link to={`/admin-topic/${params.getValue('id')}`} onClick={()=>{dispatch(topicSelected(params.getValue('id')))}}><Button><Icon style={{color:"#27AE60",fontSize:'2em'}}>edit_outlined_icon </Icon> </Button></Link>)},
        {field: 'delete', headerName: `${'Delete '}` ,headerAlign:'center', align:'center',sortable: false , renderCell: (params) => (<Button onClick={()=>{Confirm(params.data.id)}}><Icon style={{color:"#EB4949",fontSize:'2em'}}>delete_forever_rounded_icon</Icon></Button>)},
    ];



    return(
      <div>
      { loading?(
        <div>
          <ConfirmDialog setOpenPopup={setOpenPopup} openPopup={openPopup} text="Do you really want to delete this question?" functionToConfirm={DeleteTopic}/>
          {
          <div style={{display: "flex", flexDirection: "column",justifyContent:"none", alignItems:"center"}} className={classes.background}>
            <Typography color="primary" className={classes.topicTitle}>Topics</Typography>
            <div className={classes.tabela}>
                <DataGrid disableSelectionOnClick={true} onRowHover={(Row)=>{linkage=Row.data.id}} pageSize={5} components={{pagination: CustomPagination,}} rows={rows} columns={columns} />               
            </div>
            <PopupDialog openPopup={open} setOpenPopup={handleClose} clickAway={false} style={{minWidth:'60%',minHeight:'30%'}}>
              <AddTopicPU closePopup={handleClose} addTopic={addQuestion}/>
            </PopupDialog>
          </div>
          }
        </div> )
        :
          <div className={classes.skeleton}>
            <Skeleton variant="text" height={60} /> 
            <Skeleton variant="reck"  height={350} />
            <Skeleton variant="text" height={60} /> 
          </div>
      }
      </div>
    )
};
export default AdminTopics;

//onClick={() =>{handleDelete(params.data.id)}}
//{field: "results", headerName: 'Results',hide:true, renderCell: (params) => (<Link to={`/topic/${params.getValue('id')}`} onClick={()=>{dispatch(topicSelected(params.getValue('id')))}}><Button><Icon style={{color:"#27AE60",fontSize:'2em'}}>school_icon </Icon> </Button></Link>)},
