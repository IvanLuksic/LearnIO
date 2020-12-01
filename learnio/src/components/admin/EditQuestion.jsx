import React, {useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import 'reactjs-popup/dist/index.css';
import AddQuestPU from './AddQuestPU';
import Icon from '@material-ui/core/Icon';
import AddAccordion from './AddAccordion.jsx';
import {Dialog} from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    root: {
        backgroundColor: 'transparent',
        width: '90%',
        border: 'none',
        display: 'flex',
        justifyContent:'center',
        alignItems: 'flex-end',
        position: 'relative',
    },
    tableHeader: {
        position: 'relative',
        width: '100%',
        height: '6vh',
        backgroundColor: '#27AE60',
        borderStyle: 'hidden',
        borderRadius: '10px',
        display: 'flex',
        alignItems:'center',
        justify: "space-evenly"
    },
    accRoot: {
        position: 'relative',
        marginTop: '10vh',
        // marginLeft: '5%',
        width: '90%',
    },
    Heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
      fontWeight: 'bold',
      color: 'white',
      marginLeft: '3%',
      position: 'relative',
  },
  addButton:{
    position:'relative',
    marginLeft:"auto",
    marginRight:"1em", 
    borderRadius:'25px',
    maxWidth:"2.5em",
    minWidth:"2.5em",
    backgroundColor:"transparent"
  },
  popupStyle:{
    minWidth:'60%',
    minHeight: '40%'
  },
}));

function EditQuestion(props) {
    const classes = useStyles();
    const [text, setText] = useState("nesto");
    const [expandedQuestion,setExpandedQuestion]=useState(false);
    const [openEdit, setOpenEdit]=useState(false);
    const [open, setOpen] = useState(false);

    let nextID;
    let rowLen;
    props.questions ? rowLen = props.questions.length-1
    : rowLen = 0;
    props.questions ? nextID = props.questions.length+1
    : nextID = 1;
    let topQ = 0 + (props.page-1)*6;

    const [pageCount, setPageCount] = useState((rowLen+(6-((rowLen)%6)))/6);
    
  const changeOpenEdit=(value)=>{
      setOpenEdit(value);
  };
  const handleChange = (panel) => (event, isExpanded) => {
    props.changeExpanded( isExpanded? panel.id:false);
    setText(panel.text);
    setExpandedQuestion(panel);
    changeOpenEdit(isExpanded? panel.id:false);
  };
  const changeText=(value)=>{
    setText(value);
  };
  const handleDelete= ()=>{
    props.questDelete(expandedQuestion);
    setExpandedQuestion(false);
  };
  const handleAdd= (value) => {
    props.questAdd(value);
    props.changePage(pageCount);
  };
  const resetExpanded=()=>{
    setExpandedQuestion(false);
    props.changeExpanded(false);
  };
  const handlePages= ()=>{
    props.questions ? rowLen = props.questions.length-1
      : rowLen = 0
    setPageCount((rowLen+(6-((rowLen)%6)))/6)
  };
  const handleOpen = () => {
    setOpen(true);
    resetExpanded();
  };
  const handleClose = () => {
    setOpen(false);
  };
  

    return(
        <div className={classes.root}>
            <div className={classes.accRoot}>
            <div className={classes.tableHeader}>
              <Typography className={classes.Heading}>ID</Typography>
              <Typography style={{marginLeft:'-3%'}} className={classes.Heading}>Question</Typography>  
              <Button onClick={()=>handleOpen()} className={classes.addButton}><Icon style={{color:"white"}}>add_circle</Icon></Button>
                <Dialog open={open} onClose={handleClose} classes={{paper: classes.popupStyle}}>
                  <AddQuestPU popUpClose={handleClose} changePage={props.jumpToPage} forceUpdate={props.forceUpdate} nextID={nextID} changeText={changeText} questAdd={handleAdd}/>
                </Dialog>
            </div>
            {
              props.questions ? <div style={{position:'relative', marginTop:'5%'}}><AddAccordion resetExpanded={resetExpanded} popUpClose={handleClose} handlePages={handlePages} topQ={topQ} pageCount={pageCount} handleChange={handleChange} changeText={changeText} text={text} handleDelete={handleDelete} page={props.page} changePage={props.changePage} expanded={props.expanded} changeExpanded={props.changeExpanded} questChange={props.questChange} questions={props.questions} openEdit={openEdit}/></div>
              : <div style={{position:'relative', marginTop:'5%'}}><Typography style={{display:'flex', justifyContent:'center', color:'gray'}}>No questions added</Typography></div>
            }
            </div>
        </div>
    )
}

export default EditQuestion;