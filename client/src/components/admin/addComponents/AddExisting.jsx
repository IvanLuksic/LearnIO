import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import 'reactjs-popup/dist/index.css';
import Icon from '@material-ui/core/Icon';
import React, {useState, useEffect} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Pagination from '@material-ui/lab/Pagination';
import 'reactjs-popup/dist/index.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles((theme)=>({
root: {
    backgroundColor: 'transparent',
    marginBottom:"2rem",
    border: 'none',
    display: 'flex',
    justifyContent:'center',
    alignItems: 'flex-end',
    position: 'relative',
},
topicTitle:{
    fontFamily:'Lobster',
    fontSize:'2.5rem',
    marginBottom:"1rem",
    textShadow:" -5px 5px #30303033",
    color: "#3b3a3a"
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
    textAlign:"left"
},
accRoot: {
    width:"90%",
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
accHeading: {
    textAlign:"start",
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
text:{
    width:"90%",
    marginRight:"auto",
    textAlign:"left",
},
searcHBox:{
    width:"70%",
    marginBottom:"2rem"
},
}));



function AddAccordion(props) {
    const classes = useStyles();

    const changePage = (event, value) => {
      props.resetExpanded();
      props.changePage(value);
    };
    useEffect(()=>{
      props.handlePages();
    });

  
    return(
      <div>

      {
      props.questions.slice(props.topQ,props.topQ+5).map((question, index) =>{
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
                    <Grid container item md={10} xs={9} direction="row" justify="flex-start" alignItems="center">
                        <Typography className={classes.text}>{props.text}</Typography>
                    </Grid>
                    <Grid container item md={2} xs={3} direction="row" justify="center" alignItems="center"> 
                        <Button className={classes.iconButtons} onClick={()=>{console.log("CLICK");props.questionSelected(); }} ><Icon style={{color:"#EB4949",fontSize:'2em'}}>queue_rounded_icon</Icon></Button>
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
};

  function EditQuestion(props) {
    const classes = useStyles();
    const [text, setText] = useState("nesto");
    const [page, setPage] = useState(()=>1);
    const [questions, setQuestions] = useState(()=>props.questions);
    const [allQuestions, setAllQuestions] = useState(()=>props.questions);
    const [expanded, setExpanded] = useState(()=>false);
    const [expandedQuestion,setExpandedQuestion]=useState(false);
    const [search,setSearch]=useState(()=>"");



    let topQ = 0 + (page-1)*5;
    let nextID;
    let rowLen;
    questions ? rowLen = questions.length-1
    : rowLen = 0;
    questions ? nextID = questions.length+1
    : nextID = 1;

    const [pageCount, setPageCount] = useState((rowLen+(5-((rowLen)%5)))/5);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded( isExpanded? panel.id:false);
        setText(panel.text);
        setExpandedQuestion(panel);
    };

    const resetExpanded=()=>{
        setExpandedQuestion(false);
        setExpanded(false);
    };
    const handlePages= ()=>{
        questions ? rowLen = questions.length-1
        : rowLen = 0
        setPageCount((rowLen+(5-((rowLen)%5)))/5)
    };
    const searchQuestion=(word)=>{

        setSearch(word);
        let filtered=[];
        filtered=allQuestions.filter(q=>{
            return(
                q.text.toLowerCase().includes(word.toLowerCase())
            );
        });
        setQuestions(filtered);
        setPage(1);
    };

    const questionSelected=()=>{
        console.log(expandedQuestion);
        props.setQuestion(expandedQuestion);
        props.closePopup();
    }

    return(

        <div>
            <div>
                <Typography className={classes.topicTitle}>Questions</Typography>
                <TextField className={classes.searcHBox} InputProps={{endAdornment:<InputAdornment position="end"><Icon>search_rounded_icon</Icon></InputAdornment>}} fullWidth  type="string" label="Name" variant="outlined" value={search} onChange={(e)=>searchQuestion(e.target.value)}/>
            </div>
            <div className={classes.root}>
                <div className={classes.accRoot}>
                <div className={classes.tableHeader}>
                    <Typography className={classes.Heading}>ID</Typography>
                    <Typography style={{marginLeft:'-3%'}} className={classes.Heading}>Question</Typography>  
                </div>
                {
                    props.questions ? <div style={{position:'relative', marginTop:'5%'}}><AddAccordion  numberOfQuestions={questions.length} 
                                                                                                        resetExpanded={resetExpanded} 
                                                                                                        handlePages={handlePages} 
                                                                                                        topQ={topQ} 
                                                                                                        pageCount={pageCount} 
                                                                                                        handleChange={handleChange} 
                                                                                                        text={text} 
                                                                                                        page={page} 
                                                                                                        changePage={(val)=>setPage(val)} 
                                                                                                        expanded={expanded} 
                                                                                                        questions={questions} 
                                                                                                        questionSelected={questionSelected}
                                        /></div>
                    : <div style={{position:'relative', marginTop:'5%'}}><Typography style={{display:'flex', justifyContent:'center', color:'gray'}}>No questions added.</Typography></div>
                }
                </div>
            </div>
        </div>
    )
}

export default EditQuestion;