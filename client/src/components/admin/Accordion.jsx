import React, {useState, useEffect} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Pagination from '@material-ui/lab/Pagination';
import Button from '@material-ui/core/Button';
import 'reactjs-popup/dist/index.css';
import EditQuestionPU from './editComponents/EditQuestionPU';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import ConfirmDialog from "../common/ConfirmDialog";
import AlertDialog from "../common/AlertDialog";
import PopupDialog from '../common/PopupDialog';


const useStyles = makeStyles((theme)=>({
    accHeading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    accSecondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
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
  iconButtons:{
    minWidth:'0',
    maxWidth:'3em',
    maxHeight:'3em',
    alignItems:"flex-start"
  },
}));

function AddAccordion(props) {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopup2, setOpenPopup2] = useState(false);
    const [openPopup3, setOpenPopup3] = useState(false);
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
      <AlertDialog setOpenPopup={setOpenPopup3} openPopup={openPopup3} text="Unfortunatley this question can't be deleted as it is the last one standing on its matrix field." />

      {
      props.questions.slice(props.topQ,props.topQ+6).map((question, index) =>{
        let questionHeading=`Q${question.id}`;
        let questionSecondary='';
        let n=(question.text.length>30)?30:question.text.length;
        for(let i=0;i<n;i++){questionSecondary=questionSecondary + question.text[i]};
        if(n===30){questionSecondary=questionSecondary+'...'};
        return (
        <div key={question.id}>
          <Accordion style={{marginTop:'2px'}} expanded={props.expanded === question.id} onChange={props.handleChange(question)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
            <Typography className={classes.accHeading}>{questionHeading}</Typography>
            {question.id!==props.expanded && 
            <Typography className={classes.accSecondaryHeading}>{questionSecondary}</Typography>}
          </AccordionSummary>
          <AccordionDetails>
            <Grid  container direction="row" justify="center" alignItems="center" spacing={1}>
              <Grid container item md={9} xs={8} direction="row" justify="flex-start" alignItems="center">
                <Typography>{props.text}</Typography>
              </Grid>
              <Grid container item md={3} xs={4} direction="row" justify="flex-end" alignItems="center"> 
                <Button onClick={()=>setOpenPopup2(true)} className={classes.iconButtons}><Icon style={{color:"#4372ec",fontSize:'2em'}}>edit_outlined_icon </Icon></Button>
                  <PopupDialog openPopup={question.id === props.openEdit && openPopup2} setOpenPopup={handleClose} clickAway={true}>
                    <EditQuestionPU popUpClose={setOpenPopup2} style={{borderRadius:'25px'}} questChange={props.questChange} prop={question} changeText={props.changeText}/>
                  </PopupDialog>
                <Button className={classes.iconButtons} onClick={() =>{if(props.numberOfQuestions>1){setOpenPopup(true)}else{setOpenPopup3(true)}}} ><Icon  style={{color:"#EB4949",fontSize:'2em'}}>delete_forever_rounded_icon</Icon></Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        </div>
      )})}
      <div className={classes.pagin}>
        <p className={classes.accHeading} style={{float: 'left', margin: '10px'}}>Total questions: {props.questions.length}</p>
        <Pagination style={{display: 'flex', justifyContent:'flex-end'}} count={props.pageCount} page={props.page} onChange={changePage} color="primary" />
      </div>
      </div>
      
    );
  }

  export default AddAccordion;