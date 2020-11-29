import React, {useState, useEffect} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import backgroundIMG from '../../images/learniobg10-15.png';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Pagination from '@material-ui/lab/Pagination';
import Button from '@material-ui/core/Button';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import EditQuestionPU from './EditQuestionPU';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import ConfirmDialog from "../common/ConfirmDialog"
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
    accHeading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    accSecondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
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
  pagin: {
    backgroundColor:'white',
    borderStyle: 'solid',
    boxShadow: "0px 2px 0.5px 1px rgba(0,0,0,0.18)",
    borderColor: 'transparent',
    borderWidth: '1px',
    borderRadius: '10px',
    padding:'5px',
    marginTop:'5%',
  },
  photoCheck: {
    position: 'relative',
    width: '10px',
    height: '10px',
    backgroundColor: 'blue',
    display: 'flex',
    justifyContent: 'center',
  },
  iconButtons:{
    minWidth:'0',
    maxWidth:'3em',
    maxHeight:'3em',
    alignItems:"flex-start"
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
  }
}));

function AddAccordion(props) {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopup2, setOpenPopup2] = useState(false);
    const handleClose = () => {
      setOpenPopup2(false);
    };
    const changePage = (event, value) => {
      props.resetExpanded();
      props.changePage(value);
    };
    useEffect(()=>{
      props.handlePages();
    });

  
    return(
      <div>
      <ConfirmDialog setOpenPopup={setOpenPopup} openPopup={openPopup} text="Do you really want to delete this question?" functionToConfirm={props.handleDelete}/>
      {
      props.questions.slice(props.topQ,props.topQ+6).map((question, index) =>(
        <div key={question.id}>
          <Accordion style={{marginTop:'2px'}} expanded={props.expanded === question.id} onChange={props.handleChange(question)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
            <Typography className={classes.accHeading}>{question.heading}</Typography>
            {question.id!==props.expanded && 
            <Typography className={classes.accSecondaryHeading}>{question.secondary}</Typography>}
  
          </AccordionSummary>
          <AccordionDetails>
            <Grid  container direction="row" justify="center" alignItems="center" spacing={0.5}>
              <Grid item md={9} xs={8} direction="row" justify="flex-start" alignItems="center">
                <Typography>{props.text}</Typography>
              </Grid>
              <Grid container md={3} xs={4} direction="row" justify="flex-end" alignItems="center"> 
                <Button onClick={()=>setOpenPopup2(true)} className={classes.iconButtons}><Icon style={{color:"#4372ec",fontSize:'2em'}}>edit_outlined_icon </Icon></Button>
                  <Dialog open={question.id === props.openEdit && openPopup2} onClose={handleClose} classes={{paper: classes.popupStyle}}>
                    <EditQuestionPU popUpClose={setOpenPopup2} style={{borderRadius:'25px'}} questChange={props.questChange} prop={question} changeText={props.changeText}/>
                  </Dialog>
                <Button className={classes.iconButtons} onClick={() =>{setOpenPopup(true)}} ><Icon  style={{color:"#EB4949",fontSize:'2em'}}>delete_forever_rounded_icon</Icon></Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        </div>
      ))}
      <div className={classes.pagin}>
        <p className={classes.accHeading} style={{float: 'left', margin: '10px'}}>Total questions: {props.questions.length}</p>
        <Pagination style={{display: 'flex', justifyContent:'flex-end'}} count={props.pageCount} page={props.page} onChange={changePage} color="primary" />
      </div>
      </div>
      
    );
  }

  export default AddAccordion;