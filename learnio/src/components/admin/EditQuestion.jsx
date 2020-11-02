import React, {useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import backgroundIMG from '../../images/learniobg10-15.png';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AddQuestPU from './AddQuestPU';
import Icon from '@material-ui/core/Icon';
import AddAccordion from './AddAccordion.jsx';

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

export function EditQuestion(props) {
    const classes = useStyles();
    const [text, setText] = useState("nesto");
    const [expandedQuestion,setExpandedQuestion]=useState(false);
    const [open, setOpen] = useState(false);

    let nextID;
    let rowLen;
    {
      props.questions ? rowLen = props.questions.length-1
      : rowLen = 0;
    }{
      props.questions ? nextID = props.questions.length+1
      : nextID = 1;
    }
    let topQ = 0 + (props.page-1)*6;

    const [pageCount, setPageCount] = useState((rowLen+(6-((rowLen)%6)))/6);
    
  const handleChange = (panel) => (event, isExpanded) => {
    props.changeExpanded( isExpanded? panel.id:false);
    setText(panel.text);
    setExpandedQuestion(panel);
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
                <Popup
                  closeOnDocumentClick
                  open={open}
                  onOpen={handleOpen}
                  onClose={handleClose}
                  modal nested fixed>
                  {<AddQuestPU popUpClose={handleClose} forceUpdate={props.forceUpdate} nextID={nextID} changeText={changeText} questAdd={handleAdd}/>}
                </Popup>
            </div>
            {
              props.questions ? <div style={{position:'relative', marginTop:'5%'}}><AddAccordion resetExpanded={resetExpanded} popUpClose={handleClose} handlePages={handlePages} topQ={topQ} pageCount={pageCount} handleChange={handleChange} changeText={changeText} text={text} handleDelete={handleDelete} page={props.page} changePage={props.changePage} expanded={props.expanded} changeExpanded={props.changeExpanded} questChange={props.questChange} questions={props.questions}/></div>
              : <div style={{position:'relative', marginTop:'5%'}}><Typography style={{display:'flex', justifyContent:'center', color:'gray'}}>No questions added</Typography></div>
            }
            </div>
        </div>
    )
}

export default Background;