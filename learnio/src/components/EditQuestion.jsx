import React, {useState} from 'react';
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
        backgroundColor: 'white',
        maxWidth: '50%',
        marginTop: '20vh',
        marginLeft: '25%',
        height: '180vh',
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: 'black',
    },
    tableHeader: {
        position: 'relative',
        width: '100%',
        height: '10vh',
        backgroundColor: '#27AE60',
        borderStyle: 'hidden',
        borderRadius: '10px',
        display: 'flex',
    },
    accRoot: {
        position: 'relative',
        marginTop: '5%',
        marginLeft: '5%',
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
      marginTop: '2%',
      position: 'relative',
  },
    pagin: {
      borderStyle: 'outset',
      borderColor: '#CCCCCC',
      borderWidth: '1px',
      borderRadius: '10px',
      padding:'5px',
      marginTop:'5%',
      display: 'flex',
      justifyContent: 'flex-end',
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
  const [page, setPage] = React.useState(1);
  const changePage = (event, value) => {
    setPage(value);
  };

  var rowLen = props.questions.length-1;
  var pageCount = (rowLen+(5-((rowLen)%5)))/5
  var topQ = 0 + (page-1)*5;

  const handleChange = (panel) => (event, isExpanded) => {
  setExpanded(isExpanded ? panel : false);
};
  return(
    <div>
    {
    props.questions.slice(topQ,topQ+5).map((question, index) =>(
      <div>
        <Accordion style={{marginTop:'2px'}} expanded={expanded === question.id} onChange={handleChange(question.id)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          {/* <div className={classes.photoCheck}></div> */}
          <Typography className={classes.accHeading}>{question.heading}</Typography>
          <Typography className={classes.accSecondaryHeading}>{question.secondary}</Typography>
          
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{question.text}</Typography>
          <Popup trigger={<Button style={{maxHeight:'3vh'}} variant="contained">
            Edit
          </Button>} modal nested fixed>
                {
                <AddQuestPU prop={question}/>
                }
            </Popup>
          
        </AccordionDetails>
      </Accordion>
      </div>
    ))}
    <div className={classes.pagin}>
      <Pagination count={pageCount} page={page} onChange={changePage} color="primary" />
    </div>
    </div>
    
  );
}

export function EditQuestion() {
    const classes = useStyles();

    const questions = [
      {id: 1, heading:"1 head", secondary:"first something", photo:false, url:'', text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
      {id: 2, heading:"2 head", secondary:"second something", photo:false, url:'', text:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
      {id: 3, heading:"3 head", secondary:"third something", photo:true, url:'', text:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},
      {id: 4, heading:"4 head", secondary:"first something", photo:true, url:'', text:"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
      {id: 5, heading:"5 head", secondary:"second something", photo:false, url:'', text:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."},
      {id: 6, heading:"6 head", secondary:"third something", photo:false, url:'', text:"Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."},
      {id: 7, heading:"7 head", secondary:"first something", photo:true, url:'', text:"Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."},
      {id: 8, heading:"8 head", secondary:"second something", photo:false, url:'', text:"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"},
      {id: 9, heading:"9 head", secondary:"third something", photo:true, url:'', text:"Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"},
      {id: 10, heading:"10 head", secondary:"first something", photo:false, url:'', text:"Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."},
      {id: 11, heading:"11 head", secondary:"second something", photo:true, url:'', text:"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"},
      {id: 12, heading:"12 head", secondary:"third something", photo:false, url:'', text:"Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"},
      {id: 13, heading:"13 head", secondary:"first something", photo:false, url:'', text:"Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."},
      {id: 14, heading:"14 head", secondary:"second something", photo:true, url:'', text:"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"},
      {id: 15, heading:"15 head", secondary:"third something", photo:true, url:'', text:"Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"},
    ];

    return(
        <div className={classes.root}>
            <div className={classes.accRoot}>
            <div className={classes.tableHeader}>
            <Typography className={classes.Heading}>ID</Typography>
            <Typography style={{marginLeft:'-3%'}} className={classes.Heading}>Question</Typography>
            </div>
            <div style={{position:'relative', marginTop:'5%'}}><AddAccordion questions={questions}/></div>

        

            
            </div>
        </div>
    )
}

export default Background;