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
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AddQuestPU from './AddQuestPU';

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
        maxWidth: '90%',
        border: 'none',
        display: 'flex',
        justifyContent:'center',
        // borderStyle: 'solid',
        // borderWidth: '2px',
        // borderColor: 'grey',
        // borderRadius:'25px',
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
  const [expanded, setExpanded] = useState(false);
  const [page, setPage] = useState(1);
  const changePage = (event, value) => {
    setPage(value);
  };

  useEffect(() => {

        if(pageCount < 2){
           changePage(1, 1);
        }
  })

  var rowLen = props.questions.length-1;
  var pageCount = (rowLen+(8-((rowLen)%8)))/8;
  var topQ = 0 + (page-1)*8;


  const handleChange = (panel) => (event, isExpanded) => {
  setExpanded(isExpanded ? panel : false);
};
  return(
    <div>
    {
    props.questions.slice(topQ,topQ+8).map((question, index) =>(
      <div key={question.id}>
        <Accordion style={{marginTop:'2px'}} expanded={expanded === question.id} onChange={handleChange(question.id)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          {/* <div className={classes.photoCheck}></div> */}
          <Typography className={classes.accHeading}>{question.heading}</Typography>
          {question.id!==expanded && 
          <Typography className={classes.accSecondaryHeading}>{question.secondary}</Typography>}
          
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{question.text}</Typography>
            <Popup trigger={<Button style={{marginLeft:'3vh',marginRight:'1vh',maxHeight:'3vh',backgroundColor:'#EB4949',color:'white', borderRadius: "25px", fontFamily: "Lobster"}} variant="contained">Edit</Button>} modal nested fixed>
              {
              <AddQuestPU prop={question}/>
              }
            </Popup>
        </AccordionDetails>
      </Accordion>
      </div>
    ))}
    <div className={classes.pagin}>

      
      <Pagination style={{display: 'flex', justifyContent:'flex-end'}} count={pageCount} page={page} onChange={changePage} color="primary" />
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
             <Popup trigger={
              <Button style={{position:'relative', float:'right', borderRadius:'25px', fontFamily:"Lobster"}} variant="contained" color="secondary">
                Add Question
              </Button>
              } modal nested fixed>
              { <AddQuestPU/>  }
              </Popup>
            </div>
            <div style={{position:'relative', marginTop:'5%'}}><AddAccordion questions={props.questions}/></div>
            </div>
        </div>
    )
}

export default Background;