import React, {useState} from 'react';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import sampleCourses from '../../../sampleData/admin/allCourses.json';
import sampleCourseTopic from '../../../sampleData/admin/allCourseTopic.json';
import sampleTopics from '../../../sampleData/admin/allTopics.json';
import sampleQuestions from '../../../sampleData/admin/allQuestionsOfTopic.json';

const useStyles = makeStyles((theme) => ({
  grupaBotuna:{
    [theme.breakpoints.down('sm')]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: "5em",
    },
  },
  popupStyle:{
    height:"auto",
    backgroundColor:"white",
    padding:"0 2em 1em 2em !important",
    borderRadius:"7px" ,
    [theme.breakpoints.up('xl')]: {
      width:"80%",
    },
    [theme.breakpoints.down('xl')]: {
      width:"100%",
    },
  },
  popupMenu:{
    [theme.breakpoints.down('sm')]: {
      marginBottom: "3em",
    },
    [theme.breakpoints.up('sm')]: {
      padding:"2em 0 3em 0",
  }
  },
  
  divider:{
    [theme.breakpoints.down('sm')]: {
      display:"none",
  }},
  editText:{
    [theme.breakpoints.down('sm')]: {
      marginLeft:"0em",
    },
    [theme.breakpoints.up('sm')]: {
      padding:"2em 0 3em 0",
    }
  },
  buttonContainer:{
    display:"inline-block",
    position:"relative",
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
      backgroundColor:"#27AE60",
      color:"white",
      '&:hover': {
        backgroundColor: "#1f894b",
     },
      [theme.breakpoints.down('sm')]: {
        paddingLeft:"5em",
        paddingRight:"5em",
        paddingTop:"0.5em",
        paddingBottom:"0.5em",
      },
      [theme.breakpoints.up('md')]: {
        paddingLeft:"7em",
        paddingRight:"7em",
      },
    },
    ieList: {
      width: '100%',
      position: 'relative',
      overflow: 'auto',
      maxHeight: 200,
      marginTop: 15
    },
    pictureNotLoaded:{
      color:"lightgrey",
      textAlign:"left",
      fontStyle:"italic",
      [theme.breakpoints.down('sm')]: {
        marginTop:"1em",
        textAlign:"center"
      },
    },
    uploadButton:{
      [theme.breakpoints.down('sm')]: {
        paddingLeft:"3em",
        paddingRight:"3em",
        margin:"auto",
      },
      [theme.breakpoints.up('md')]: {
        paddingLeft:"5em",
        paddingRight:"5em",
      },
    },
    rootChips: {
      boxShadow:"none !important",
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
    },
    textAnswers:{
      [theme.breakpoints.up('md')]: {
        paddingLeft:"2em",
      },
      [theme.breakpoints.down('sm')]: {
        paddingBottom:"1em",
      },
    },
    toggleMultiple:{
      [theme.breakpoints.up('md')]: {
        paddingLeft:"1em",
      },
    },    
    toggleButton:{marginRight:"0 !important"},
    toggleButtonLabel:{fontSize:"0.9em !important"},
    saveBtn: {
      borderRadius: "7px",
      background:"#EB4949",
      color:"white",
      paddingLeft:"3em",
      paddingRight:"3em",
      backgroundColor: "#EB4949",
      '&:hover': {
        backgroundColor: "#b81414",
    },
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
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [showIMG, setIMG] = useState(false);
  const [text, setText] = useState('');
  const [imageState, setimageState] = useState(null);
  const [answerInput,setAnswerInput]=useState([]);
  const [wrongAnswers, setWrongAnswers]=useState(()=>{ return []});
  const [correctAnswer, setCorrectAnswers]=useState(()=>{ return "Točno"});
  const [multipleAnswer, setMultipleAnswers]=useState(()=>{ return false});
  const [ieQuestionList, setIeQuestionList] = useState([]);
  const [ieFilteredQuestionList, setIeFilteredQuestionList] = useState([]);
  const [ieCourseList, setIeCourseList] = useState([]);
  const [ieTopicList, setIeTopicList] = useState([]);
  const [ieTopicSelectEnabled, setIeTopicSelectEnabled] = useState(false);
  const [ieTextFieldEnabled, setIeTextFieldEnabled] = useState(false);
  const [ieTextFieldContent, setIeTextFieldContent] = useState("");
  const [ieSelectedQuestion, setIeSelectedQuestion] = useState([]);
  const [ieIncludeImage, setIeIncludeImage] = useState(false);
  const [ieIncludeImageEnabled, setIeIncludeImageEnabled] = useState(true);

  const classes = useStyles();
//dropdown button---------------------

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
    let send={
      text:text,
      question_type:(multipleAnswer?1:2),
      image_path:imageState,
      answer_a:((wrongAnswers.length>0)?wrongAnswers[0]:null),
      answer_b:((wrongAnswers.length>1)?wrongAnswers[1]:null),
      answer_c:((wrongAnswers.length>2)?wrongAnswers[2]:null),
      answer_d:((wrongAnswers.length>3)?wrongAnswers[3]:null),
      solution:correctAnswer
    }

    props.questAdd(send);
    props.popUpClose(false);
  }

  // // Insert existing \\

  const ieFilterQuestionList = e => {
    if(e.target.value === "") {
      setIeFilteredQuestionList([]);
      return;
    }

    const updatedList = ieQuestionList.filter(item => {
      return (
        item["text"].toLowerCase().search(e.target.value.toLowerCase()) !== -1
      );
    });
    setIeFilteredQuestionList(updatedList);
  }

  const ieTextFieldChanged = e => {
    ieFilterQuestionList(e);
    setIeTextFieldContent(e.target.value);
  }

  // Test data functions

  const ieSetTestData = () => {
    ieSetTestCourses();
    ieSetTestTopics();
    ieSetTestQuestions();
  }

  const ieSetTestCourses = () => {
    let list = [];
    sampleCourses.forEach(item => {
      list.push(item["name"]);
    });
    setIeCourseList(list);
  }

  const ieSetTestTopics = () => {
    let list = [];
    sampleTopics.forEach(item => {
      list.push(item["topic_name"]);
    });
    setIeTopicList(list);
  }

  const ieSetTestQuestions = () => {
    let list = [];
    sampleQuestions["fields"].forEach(item => {
      item["Questions"].forEach(question => {
        list.push(question)
      });
    });
    setIeQuestionList(list);

    setIeFilteredQuestionList(ieQuestionList);
  }

  // onChange handlers

  const ieHandleCoursePick = () => {
    ieSetTestTopics();

    setIeTopicSelectEnabled(true);

    setIeTextFieldEnabled(false);
    setIeQuestionList([]);
    setIeFilteredQuestionList([]);
  }

  const ieHandleTopicPick = () => {
    ieSetTestQuestions();
    setIeFilteredQuestionList([]);
    setIeTextFieldEnabled(true);
    setIeTextFieldContent("");
  }

  const ieQuestionPick = (item) => {
    setIeTextFieldContent(item["text"]);
    if(item["image_path"] != null) {
      setIeIncludeImageEnabled(true);
      setIeIncludeImage(true);
    }
    else {
      setIeIncludeImage(false);
      setIeIncludeImageEnabled(false);
    }
    setIeSelectedQuestion(item);
  }

  // Insertion
  
  const ieHandleInsert = () => {
    let question = ieSelectedQuestion;
    let incorrectAnswers = [];

    setText(question["text"]);
    setCorrectAnswers(question["solution"]);

    if( question["answer_a"] != "")
      incorrectAnswers.push(question["answer_a"]);
    if( question["answer_b"] != "")
      incorrectAnswers.push(question["answer_b"]);
    if( question["answer_c"] != "")
      incorrectAnswers.push(question["answer_c"]);
    if( question["answer_d"] != "")
      incorrectAnswers.push(question["answer_d"]);

    setWrongAnswers(incorrectAnswers);
    if(ieIncludeImage)
      setimageState(question["image_path"]);


    setIeTextFieldContent("");
    setIeFilteredQuestionList([]);
    setShow1(true); setShow2(false); setShow3(false);
  }

  // \\ Insert existing //
//------------------------
  const upload = (file) => {
    fetch('http://localhost:3000', { // Your POST endpoint
      method: 'POST',
      body: file // This is your file object
    }).then(
      response => response.json() // if the response is a JSON object
    ).then(
      success => console.log(success) // Handle the success response object
    ).catch(
      error => console.log(error) // Handle the error response object
    );
  };
  return(
    <Grid className={classes.popupStyle} container direction="row" justify="space-between" alignItems="flex-start" style={{padding:"1em",height:"auto"}} wrap="wrap"> 
    <Grid container item className={classes.popupMenu} direction="column" justify="space-between" alignItems="center"  xs={12} md={4} > 
      <Grid item className={classes.grupaBotuna}>
        <ButtonGroup orientation="vertical" variant="contained">
          <Button variant="contained" onClick={() => [setShow1(true),setShow2(false),setShow3(false)]} className={classes.buttonsInGroup}>{show1&&<Icon>keyboard_arrow_right</Icon>}Question</Button>
          <Button variant="contained" onClick={() => [setShow1(false),setShow2(true),setShow3(false)]} className={classes.buttonsInGroup}>{show2&&<Icon>keyboard_arrow_right</Icon>}Answers</Button>
          {/* <Button variant="contained" onClick={() => [setShow1(false),setShow2(false),setShow3(true),ieSetTestCourses()]} className={classes.buttonsInGroup}>{show3&&<Icon>keyboard_arrow_right</Icon>}Insert existing</Button> */}
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
          <Grid container item className={classes.editText} xs={12} md={8} direction="column" justify="center" alignItems="center" spacing={5}> 
              <Grid container item xs={12}  justify="center" alignItems="center">
                <TextField style={{width:"100%"}} id="outlined-multiline-static" label="Question Text" multiline rows={5} variant="outlined" value={text} onChange={handleText}/>
              </Grid>
              <Grid container item direction="row" justify="center" alignItems="center" >
                <Grid container item xs justify="center" alignItems="center">
                  <input accept="image/*" style={{display:"none"}} id="contained-button-file" multiple type="file" onInput={(event)=>{ if(event.target.files && event.target.files[0]) {let img = event.target.files[0]; console.log(event.target.files[0]); upload(img); setimageState(URL.createObjectURL(img)); setIMG(true) ;}}}/>
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span" className={classes.uploadButton}>
                      Upload photo
                    </Button>
                  </label>
                </Grid>
                <Grid container item xs justify="center" alignItems="center">
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
          <Grid container item className={classes.editText} xs={12} md={8} direction="column" justify="center" alignItems="center" spacing={5}> 
            <Grid container item xs={12}  justify="center" alignItems="center" direction="row">
                <Grid container item xs={12} md={8}  justify="center" alignItems="center">
                  <TextField style={{width:"100%"}} id="outlined-multiline-static" label="Correct Answer" multiline rows={multipleAnswer?1:5} variant="outlined" value={correctAnswer} onChange={handleCorrect}/>
                </Grid>
              <Grid  className={classes.toggleMultiple} container item xs={12} md={4} justify="center" alignItems="center" direction="row">
                <FormControlLabel className={classes.toggleButton} control={ <Checkbox checked={multipleAnswer} onChange={toggleMultiple} name="checkedB" color="primary" />} />
                <p className={classes.toggleButtonLabel} > Mutiple choices</p>
              </Grid>
            </Grid>
            { multipleAnswer && wrongAnswers &&
              <Grid container item xs={12}  justify="center" alignItems="center" direction="row">
                <ChipsArray wrongAnswers={wrongAnswers} deleteWrongAnswer={deleteWrongAnswer}/> 
              </Grid>
            }
            {multipleAnswer&&
            <Grid container item xs={12} justify="center" alignItems="center" direction="row">
              <form onSubmit={(e)=>{e.preventDefault();}}>
                <TextField style={{width:"100%"}} placeholder="Odgovor" value={answerInput} onChange={updateAnswerInput} onKeyDown={addWrongAnswer}/>
              </form>
            </Grid>
            }
          </Grid>
          : null
        }
        {/* {
          show3 ? // third case - insert existing
            <Grid container item className={classes.editText} xs={12} md={8} direction="column" spacing={5}>
              <Grid container item xs={12}>
                <InputLabel style={{width:"25%", marginTop:"10px"}} id="ieCourse">Select course:</InputLabel>
                <Select style={{width:"75%"}} labelId="ieCourse" id="ieCourseSelect" onChange={ieHandleCoursePick}>
                  {ieCourseList.map((item, index) => (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid container item xs={12}>
                <InputLabel style={{width:"25%", marginTop:"10px"}} id="ieTopic">Select topic:</InputLabel>
                <Select style={{width:"75%"}} labelId="label" id="ieTopicSelect" onChange={ieHandleTopicPick} disabled={!ieTopicSelectEnabled}>
                  {ieTopicList.map((item, index) => (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid style={{marginLeft: "20px"}} container item xs={12}>
                  <TextField onChange={ieTextFieldChanged} style={{width:"70%"}} value={ieTextFieldContent} placeholder="Search question keywords" id="ieTextField" disabled={!ieTextFieldEnabled}/>
                  <Button onClick={ieHandleInsert} variant="contained" color="primary" component="span" style={{width: "25%", marginLeft: "5%"}}>
                    Insert
                  </Button>
                  <Grid style={{flexDirection: 'row', justifyContent: 'flex-end'}} container item xs={12}>
                    <InputLabel style={{marginTop: "14px"}}>Include image </InputLabel>
                    <Checkbox disabled={!ieIncludeImageEnabled} color="primary" checked={ieIncludeImage} onChange={() => {setIeIncludeImage(!ieIncludeImage)}}/>
                  </Grid>
                  <List className={classes.ieList}> 
                    {ieFilteredQuestionList.slice(0,25).map((item, index) => (
                      <ListItem fadeIn button key={index} onClick={() => ieQuestionPick(item)}>
                        <ListItemText>{item["text"]}</ListItemText>
                      </ListItem>
                    ))}
                </List>
              </Grid>
            </Grid>
            : null
          } */}
  </Grid>
  );
}

export default AddQuestPU;