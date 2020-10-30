import React, {useState, useEffect} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import backgroundIMG from '../images/learniobg10-15.png';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Pagination from '@material-ui/lab/Pagination';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AddQuestPU from './AddQuestPU';
import EditQuestionPU from './EditQuestionPU';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';




const useStyles = makeStyles((theme)=>({
    background:{
        position: 'absolute',
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
          minHeight: "200vh",
        },
    },
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
  }
}));

function Background() {
    const classes = useStyles();
    return(
    <div className={classes.background}>
        <EditQuestion/>
    </div>
    )
}

function AddAccordion(props) {
  const classes = useStyles();
  const [text, setText] = useState("nesto");
  const [expandedQuestion,setExpandedQuestion]=useState(false);



  var rowLen = props.questions.length-1;
  var pageCount = (rowLen+(6-((rowLen)%6)))/6;
  var topQ = 0 + (props.page-1)*6;


  const handleChange = (panel) => (event, isExpanded) => {
    props.changeExpanded( isExpanded? panel.id:false);
    setText(panel.text);
    setExpandedQuestion(panel);
  };
  const changeText=(value)=>{
    setText(value);
  };
  const changePage = (event, value) => {
    props.changePage(value);
  };
  const handleDelete= ()=>{
    props.questDelete(expandedQuestion);
    setExpandedQuestion(false);
  }

  return(
    <div>
    {
    props.questions.slice(topQ,topQ+6).map((question, index) =>(
      <div key={question.id}>
        <Accordion style={{marginTop:'2px'}} expanded={props.expanded === question.id} onChange={handleChange(question)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
          {/* <div className={classes.photoCheck}></div> */}
          <Typography className={classes.accHeading}>{question.heading}</Typography>
          {question.id!==props.expanded && 
          <Typography className={classes.accSecondaryHeading}>{question.secondary}</Typography>}

        </AccordionSummary>
        <AccordionDetails>
          <Grid  container direction="row" justify="center" alignItems="center" spacing={0.5}>
            <Grid item md={9} xs={8} direction="row" justify="flex-start" alignItems="center">
              <Typography>{text}</Typography>
            </Grid>
            <Grid container md={3} xs={4} direction="row" justify="flex-end" alignItems="center">    
                <Popup trigger={<Button className={classes.iconButtons} ><Icon style={{color:"#4372ec",fontSize:'2em'}}>edit_outlined_icon </Icon></Button>} modal nested fixed>
                {
                  <EditQuestionPU questChange={props.questChange} questDelete={props.questDelete} prop={question} changeText={changeText}/>
                }
              </Popup>
              <Button className={classes.iconButtons} onClick={() =>handleDelete()} ><Icon  style={{color:"#EB4949",fontSize:'2em'}}>delete_forever_rounded_icon</Icon></Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      </div>
    ))}
    <div className={classes.pagin}>
      <Pagination style={{display: 'flex', justifyContent:'flex-end'}} count={pageCount} page={props.page} onChange={changePage} color="primary" />
    </div>
    </div>
    
  );
}

export function EditQuestion(props) {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <div className={classes.accRoot}>
            <div className={classes.tableHeader}>
              <Typography className={classes.Heading}>ID</Typography>
              <Typography style={{marginLeft:'-3%'}} className={classes.Heading}>Question</Typography>     
                <Popup trigger={ <Button className={classes.addButton}><Icon style={{color:"white"}}>add_circle</Icon></Button>} modal nested fixed>
                { 
                  <AddQuestPU/>  
                }
                </Popup>
            </div>
            {
              props.questions ? <div style={{position:'relative', marginTop:'5%'}}><AddAccordion page={props.page} changePage={props.changePage} questDelete={props.questDelete} expanded={props.expanded} changeExpanded={props.changeExpanded} questChange={props.questChange} questions={props.questions}/></div>
              : <div style={{position:'relative', marginTop:'5%'}}><Typography style={{display:'flex', justifyContent:'center', color:'gray'}}>No questions added</Typography></div>
            }
            </div>
        </div>
    )
}

export default Background;