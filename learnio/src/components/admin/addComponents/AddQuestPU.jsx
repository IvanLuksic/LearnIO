import React, {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import CoursesAndTopics from "../../../sampleData/admin/coursesAndTopics.json";
import AddExisting from './AddExisting';
import PopupDialog from '../../common/PopupDialog';
import fakeQuestions from '../../../sampleData/admin/allQuestionsOfTopic.json';
import FormControl from '@material-ui/core/FormControl';
import QuestionCard from './QuestionCard';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
        width: 200,
      },
    },
};

const useStyles = makeStyles((theme) => ({
  grupaBotuna:{
    marginTop:"0.5em",
    [theme.breakpoints.down('sm')]: {
      marginBottom: "1em",
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: "4em",
    },
  },
  textFieldWidth: {
    width:"100%",
    [theme.breakpoints.down('sm')]: {
      width:"11em",
    }
  },
  popupStyle:{
    whiteSpace:"nowrap",
    display:"flex",
    flexDirection:"row",
    justify:"space-between",
    alignItems:"flex-start",
    backgroundColor:"white",
    padding:"0 2em 1em 2em !important",
    borderRadius:"7px" ,
    width:"100%",
    height:"15.5em",
    [theme.breakpoints.down('sm')]: {
      flexDirection:"column",
      padding: "0 0 0 0",
      width:"11em",
      justify:"center",
      alignItems:"center",
      height:"auto",
    }
  },
  popupMenu:{
    position:"absolute",
    width:"11em",
    marginRight:"3em",
    [theme.breakpoints.down('sm')]: {
      marginRight:"0",
      position:"static",
    },
  },
  
  divider:{
    marginLeft:"14em",
    [theme.breakpoints.down('sm')]: {
      display:"none",
      marginLeft:"0"
  }},
  editText:{
    width:"30vw",
    marginLeft:"3.5em",
    marginTop:"0.5em",
    display:"flex",
    flexDirection:"column",
    justify:"center",
    alignItems:"center",
    [theme.breakpoints.down('sm')]: {
      marginLeft:"0",
      width:"11em",
      marginTop:"0",
    }
  },
  buttonContainer:{
    marginTop:"2em",
    width:"100%",
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-end",
    alignItems:"center",
    [theme.breakpoints.down('md')]:{
      marginTop:"2.5em",
    }
  },
    
   buttonB:{
      position: "absolute",
      top:"5px",
      right:"5px",
      cursor:"pointer",
      color:"#4373ec",
      [theme.breakpoints.down('sm')]: {
        display:"none",}
    },
    imageUploaded:{
      width:"15em",
      height:"auto", 
      borderRadius:"7px",
      border:"solid 2px #4373ec", 
      [theme.breakpoints.down('sm')]: {
        display:"none",}
    },
    buttonA:{
      color:"#4373ec",
      cursor:"pointer",
      fontSize:"2em",
      marginTop:"1em",
      paddingLeft:"3em",
      paddingRight:"3em",
      [theme.breakpoints.up('sm')]: {
        display:"none",}
    },
    buttonsInGroup:{
      width:"11em",
      whiteSpace:"nowrap",
      backgroundColor:"#27AE60",
      color:"white",
      '&:hover': {
        backgroundColor: "#1f894b",
     },
    },
    uploadGridStyle: {
      width:"100%",
      display:"flex",
      flexDirection:"row",
      justify:"space-between",
      alignItems:"flex-start",
      marginTop:"1em",
      [theme.breakpoints.down('md')]: {
        marginTop:"0",
      },
      [theme.breakpoints.down('sm')]: {
        marginTop:"1em",
        flexDirection:"column",
        alignItems:"center",
        justify:"center",
        width:"11em",
      },
    },
    uploadGrid2: {
      display:"flex",
      flexDirection:"row",
      width:"70%",
      justifyContent:"flex-end",
      [theme.breakpoints.down('sm')]:{
        width:"100%",
      }
    },
    ieList: {
      width: '100%',
      position: 'relative',
      overflow: 'auto',
      maxHeight: 200,
      marginTop: 15
    },
    editGrid: {
      width:"30%",
      [theme.breakpoints.down('sm')]:{
        width:"100%",
        margin:"0",
      },
    },
    pictureLoaded:{
      display:"flex",
      float:"left",
      color:"blue",
      textAlign:"right",
      [theme.breakpoints.down('md')]:{
        whiteSpace:"nowrap",
        float:"right",
      },
      [theme.breakpoints.down('sm')]: {
        textAlign:"left",
        width:"15em",
        whiteSpace:"normal",
        margin:"1em 0 0 0",
      },
    },
    pictureNotLoaded:{
      color:"lightgrey",
      textAlign:"right",
      fontStyle:"italic",
      margin:"2em",
      justifyContent:"flex-end",
      [theme.breakpoints.down('md')]:{
        whiteSpace:"normal",
      },
      [theme.breakpoints.down('sm')]: {
        textAlign:"left",
        width:"15em",
        whiteSpace:"normal",
        margin:"1em 0 0 0",
      },
    },
    uploadButton:{
      whiteSpace:"nowrap",
      marginTop:"2em",
      [theme.breakpoints.down('md')]: {
        marginTop:"2.5em",
        width:"7em",
      },
      [theme.breakpoints.down('sm')]: {
        margin:"0",
        width:"11em",
      },
    },
    rootChips: {
      boxShadow:"none !important",
      display: 'flex',
      flexDirection:"row",
      justify:"flex-start",
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
      [theme.breakpoints.down('sm')]:{
        flexDirection:"column",
        alignItems:"center",
        justify:"center",
      }
    },
    textAnswers:{
      [theme.breakpoints.up('md')]: {
        paddingLeft:"2em",
      },
      [theme.breakpoints.down('sm')]: {
        paddingBottom:"1em",
      },
    },
    saveBtn: {
      width:"11em",
      borderRadius: "7px",
      background:"#EB4949",
      color:"white",
      paddingLeft:"3em",
      paddingRight:"3em",
      backgroundColor: "#EB4949",
      '&:hover': {
        backgroundColor: "#b81414",
    },
    [theme.breakpoints.down('sm')]: {
        marginBottom:"2em",
    }
    },
    show2grid: {
      display:"flex",
      flexDirection:"column",
      justify:"space-between",
      alignItems:"flex-start",
    },
    tagsStyle: {
      marginTop:"0.8em",
      display:"flex",
      justify:"center",
      alignItems:"center",
    },
    answersStyle: {
      marginTop:"0.8em",
      [theme.breakpoints.down('sm')]: {
        marginTop:"0.5em",
      }
    },
    textFieldShow2: {
      width:"100%",
      marginTop:"0.5em",
      [theme.breakpoints.down('sm')]: {
        marginTop:"0.2em",
      }
    },
    show2infoText: {
      marginLeft:"3%",
      color:"lightgrey",
      [theme.breakpoints.down('sm')]: {
        marginLeft:"0",
      }
    },
    selectCourseStyle: {
      marginBottom:"1em",
      width:"90%",
      [theme.breakpoints.down('sm')]:{
        width:"100%",
      }
    },
    selectStyle: {
      width:"60%",
      marginLeft:"3em",
      [theme.breakpoints.down('sm')]:{
        width:"100%",
        marginLeft:"0",
      }
    },
  }));

  
  const ChipsArray=(props)=> {
    const classes = useStyles();
    const abcd=['a','b','c','d']
    return (
      <Paper component="ul" className={classes.rootChips}>
        {
        props.wrongAnswers.map((data) => {
          return (
            <li key={data}>
              <Chip style={{margin:"0 0.1em"}} label={abcd[props.wrongAnswers.indexOf(data)]+")    "+data} onDelete={()=>{props.deleteWrongAnswer(data)}}/>
            </li>
          );
        })}
      </Paper>
    );
  };
  

function AddQuestPU(props) {
  //states of elements-------------------
  const offline=useSelector(state=>state.offline);
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [showIMG, setIMG] = useState(false);
  const [text, setText] = useState('');
  const [imageState, setimageState] = useState(null);
  const [answerInput,setAnswerInput]=useState([]);
  const [wrongAnswers, setWrongAnswers]=useState(()=>{ return []});
  const [correctAnswer, setCorrectAnswers]=useState(()=>{ return ""});
  const [multipleAnswer, setMultipleAnswers]=useState(()=>{ return false});
  const [file,setFile]=useState(()=>null);
  const [ieCourseList, setIeCourseList] = useState(CoursesAndTopics);
  const [ieTopicList, setIeTopicList] = useState([]);
  const [ieQuestionList, setIeQuestionList] = useState([]);
  const [ieTopicSelectEnabled, setIeTopicSelectEnabled] = useState(false);
  const [ieQuestionPopupOpen, setIeQuestionPopupOpen] = useState(()=>false);
  const [ieSelectedQuestion, setIeSelectedQuestion] = useState(()=>null);
  const [snackbarOpen, setSnackbarOpen]=useState(()=>false);
  const [snackbarText,setSnackbarText]=useState(()=>"");
  const [snackbarStatus,setSnackbarStatus]=useState(()=>"");

  const classes = useStyles();
//dropdown button---------------------

  useEffect(()=>{
    const requestOptions = {
      method: 'GET',
      mode:'cors',
      headers: { 'Content-Type': 'application/json'},
      credentials: 'include'
    };

    fetch(`/api/courses/with/topics/${props.subject_id}`, requestOptions)
    .then(response => {
      if(response.status===200)        {
        Promise.resolve(response).then(response => response.json())
        .then(data => {
          setIeCourseList(data);
        })
     }      
     else {
        setSnackbarOpen(true);
        setSnackbarStatus("error");
        setSnackbarText("Something went wrong."); 
     };
    })
    .catch((error)=>{
        console.log('Error in fetch function '+ error);
        setSnackbarOpen(true);
        setSnackbarStatus("error");
        setSnackbarText('Error in fetch function '+ error);  
    });
  },[])
  const handleText = (event) => {
    setText(event.target.value);
  };
  const toggleMultiple = (event) => {  
    setMultipleAnswers(!multipleAnswer);
  };
  const handleCorrect = (event) => {  
    setCorrectAnswers(event.target.value);
  };
  const updateAnswerInput=(event)=>{
    setAnswerInput(event.target.value);
  };
  const checkUnique=(validate)=>{
    let val=true;
    for(let i=0;i<wrongAnswers.length;i++){if(validate===wrongAnswers[i])val=false;}
    return val;
  };
  const addWrongAnswer= (event)=>{
    if(event.keyCode===13 && answerInput!=="" && wrongAnswers.length!==4 && checkUnique(answerInput)===true){
      setWrongAnswers([...wrongAnswers,answerInput]);
      setAnswerInput("");
    }
  };
  const deleteWrongAnswer= (answer)=>{
    setWrongAnswers([...wrongAnswers.filter(item=>(item!==answer))]);
  };
  const handleSave= ()=>{
    var send={};
    if(ieSelectedQuestion===null){
      send={
        questionImage:file,
        // hasImage:(file!==null)?true:false,
        text:text,
        question_type:(multipleAnswer?1:2),
        // image_path:imageState,
        answer_a:((wrongAnswers.length>0)?wrongAnswers[0]:null),
        answer_b:((wrongAnswers.length>1)?wrongAnswers[1]:null),
        answer_c:((wrongAnswers.length>2)?wrongAnswers[2]:null),
        answer_d:((wrongAnswers.length>3)?wrongAnswers[3]:null),
        solution:correctAnswer
      };
      props.questAdd(send,false);
    }
    else{
      send={
        question_id:ieSelectedQuestion.question_id,
        questionImage:ieSelectedQuestion.questionImage,
        text:ieSelectedQuestion.text,
        question_type:ieSelectedQuestion.question_type,
        // image_path:imageState,
        answer_a:ieSelectedQuestion.answer_a,
        answer_b:ieSelectedQuestion.answer_b,
        answer_c:ieSelectedQuestion.answer_c,
        answer_d:ieSelectedQuestion.answer_d,
        solution:ieSelectedQuestion.solution
      };
      props.questAdd(send,true);
    };
    props.popUpClose(false);
  }

  // Insert existing \\

  const ieHandleCoursePick = (course) => {
    console.log(course);
    setIeTopicList(course.topics);
    setIeTopicSelectEnabled(true);
  };
  const ieHandleTopicPick = (topic) => {

    if(offline){console.log(topic);ieFormatQuestions(fakeQuestions);setIeQuestionPopupOpen(true);};

    const requestOptions = {
      method: 'GET',
      mode:'cors',
      headers: { 'Content-Type': 'application/json'},
      credentials: 'include'
    };

    fetch(`/api/admin/topics/edit/${topic.topic_id}`, requestOptions)
    .then(response => {
      if(response.status===200)        {
        Promise.resolve(response).then(response => response.json())
        .then(data => {
          ieFormatQuestions(data);
          setIeQuestionPopupOpen(true);
        })
     }      
     else {
        setSnackbarOpen(true);
        setSnackbarStatus("error");
        setSnackbarText("Something went wrong."); 
     };
    })
    .catch((error)=>{
        console.log('Error in fetch function '+ error);
        setSnackbarOpen(true);
        setSnackbarStatus("error");
        setSnackbarText('Error in fetch function '+ error);  
    });
  };
  const ieHandleClose=()=>{
    setIeQuestionPopupOpen(false);
  };
  const ieFormatQuestions=(data)=>{
    let formatedQuestions=[];
    data.fields.map(field=>{formatedQuestions=[...formatedQuestions,...field.Questions]});
    setIeQuestionList(formatedQuestions);
    console.log(formatedQuestions);
  }
  const setExistingQuestion=(q)=>{
    setIeSelectedQuestion(q);

  }

  // const ieQuestionPick = (item) => {
  //   setIeTextFieldContent(item["text"]);
  //   if(item["image_path"] != null) {
  //     setIeIncludeImageEnabled(true);
  //     setIeIncludeImage(true);
  //   }
  //   else {
  //     setIeIncludeImage(false);
  //     setIeIncludeImageEnabled(false);
  //   }
  //   setIeSelectedQuestion(item);
  // }

  return(
    <Grid container item className={classes.popupStyle}> 
    <Grid container item className={classes.popupMenu} direction="column" justify="space-between" alignItems="center"> 
      <Grid item className={classes.grupaBotuna}>
        <ButtonGroup orientation="vertical" variant="contained">
          <Button variant="contained" disabled={ieSelectedQuestion!==null} onClick={() => [setShow1(true),setShow2(false),setShow3(false)]} className={classes.buttonsInGroup}>{show1&&<Icon>keyboard_arrow_right</Icon>}Question</Button>
          <Button variant="contained" disabled={ieSelectedQuestion!==null} onClick={() => [setShow1(false),setShow2(true),setShow3(false)]} className={classes.buttonsInGroup}>{show2&&<Icon>keyboard_arrow_right</Icon>}Answers</Button>
          <Button variant="contained"  onClick={() => [setShow1(false),setShow2(false),setShow3(true)]} className={classes.buttonsInGroup}>{show3&&<Icon>keyboard_arrow_right</Icon>}Insert existing</Button>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <Button variant="contained" type="submit" className={classes.saveBtn} onClick={handleSave}>
            SAVE  
        <Icon style={{marginLeft:"0.5em", fontSize:"1.3em"}}>save_icon</Icon>
        </Button>
      </Grid>
    </Grid>
    <Divider orientation="vertical" flexItem className={classes.divider}/>
      {
      show1 ? //first case - question
          <Grid container item className={classes.editText}> 
            <Grid container item justify="center" alignItems="center" className={classes.textFieldWidth}>
              <TextField style={{width:"100%"}} id="outlined-multiline-static" label="Question Text"  multiline rows={5} variant="outlined" value={text} onChange={handleText}/>
            </Grid>
              <Grid container item className={classes.uploadGridStyle}>
                <Grid container item className={classes.editGrid}>
                  <input accept="image/*" style={{display:"none"}} id="contained-button-file" multiple type="file" onInput={(event)=>{ if(event.target.files && event.target.files[0]) {let img = event.target.files[0]; console.log(event.target.files[0]); setFile(img); setimageState(URL.createObjectURL(img)); setIMG(true) ;}}}/>
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span" className={classes.uploadButton}>
                      Upload photo
                    </Button>
                  </label>
                </Grid>
                <Grid container item className={classes.uploadGrid2}>
                  {
                  showIMG ?
                      <div className={classes.buttonContainer}>
                        <img  className={classes.imageUploaded} src={imageState} alt="hello world"/>
                        <Icon className={classes.buttonB} onClick={()=>{setIMG(false); setimageState(null)}}>cancel_icon</Icon>
                        <Icon className={classes.buttonA} onClick={()=>{setIMG(false); setimageState(null)}}>cloud_done_icon</Icon>
                      </div>   
                    : <p className={classes.pictureNotLoaded}> Image has not been uploaded yet.</p>
                  }      
                </Grid> 
              </Grid>
           </Grid> 
      : null
      }{
        show2 ? // second case - answer
        <Grid container item className={classes.editText}> 
            <Grid container item className={classes.show2grid}>
            <Grid container item justify="flex-start" alignItems="center" direction="row">
                  <FormControlLabel control={ <Checkbox checked={multipleAnswer} onChange={toggleMultiple} name="checkedB" color="primary" />} />
                  <p> Mutiple choices</p>
                </Grid>
            </Grid>
                <Grid container item>
                  <TextField className={classes.textFieldShow2} id="outlined-multiline-static" label="Correct Answer" placeholder="Correct Answer" multiline rows={multipleAnswer?1:5} variant="outlined" value={correctAnswer} onChange={handleCorrect}/>
                </Grid>
            {multipleAnswer&&
            <Grid container item className={classes.answersStyle} justify="flex-start" alignItems="center" direction="row">
              <form onSubmit={(e)=>{e.preventDefault();}}>
                <TextField style={{width:"100%"}} id="outlined-multiline-static" label="Answer" variant="outlined" placeholder="Answer" value={answerInput} onChange={updateAnswerInput} onKeyDown={addWrongAnswer}/>

                {/* <TextField style={{width:"100%"}} placeholder="Answer" value={answerInput} onChange={updateAnswerInput} onKeyDown={addWrongAnswer}/> */}
              </form>
              <p className={classes.show2infoText}>Maximum 4 answers</p>
            </Grid>
            }
            { multipleAnswer && wrongAnswers &&
                <Grid container item className={classes.tagsStyle}>
                <ChipsArray style={{margin:"2em"}} wrongAnswers={wrongAnswers} deleteWrongAnswer={deleteWrongAnswer}/> 
              </Grid>
            }
          </Grid>
          : null
        }
        {
          show3 ? // third case - insert existing
            <Grid container item className={classes.editText}>
              <Grid container item className={classes.show3root}>
              <Grid container item className={classes.show3MainGrid}>
                    <FormControl variant="outlined" className={classes.selectCourseStyle}>
                        <InputLabel>Unit</InputLabel>
                        <Select label="Unit"  onChange={(e)=>ieHandleCoursePick(e.target.value)} variant="outlined" MenuProps={MenuProps}>
                        {ieCourseList.map((item) => (
                          <MenuItem value={item} key={item.course_id}>
                            {item.course_name}
                          </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
              </Grid>
              <Grid container item className={classes.show3MainGrid}>
                    <FormControl variant="outlined" className={classes.selectCourseStyle}>
                        <InputLabel>Topics</InputLabel>
                        <Select label="Topics" disabled={!ieTopicSelectEnabled} variant="outlined" MenuProps={MenuProps}>
                        {ieTopicList.map((item) => (
                          <MenuItem value={item} onClick={(e)=>ieHandleTopicPick(item)}   key={item.topic_id}>
                            {item.topic_name}
                          </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Grid>
                </Grid>
              {(ieSelectedQuestion!==null)&&<Grid container item xs={12} className={classes.formControl}>
                    <QuestionCard question={ieSelectedQuestion} deleteSelected={()=>setIeSelectedQuestion(null)}/>
              </Grid>}
              <PopupDialog openPopup={ieQuestionPopupOpen} setOpenPopup={ieHandleClose} clickAway={false} style={{minWidth:'60%',minHeight:'30%'}}>
                  <AddExisting questions={ieQuestionList} setQuestion={setExistingQuestion} closePopup={()=>setIeQuestionPopupOpen(false)}/>
              </PopupDialog>

            </Grid>
            : null
          }
  </Grid>
  );
}

export default AddQuestPU;