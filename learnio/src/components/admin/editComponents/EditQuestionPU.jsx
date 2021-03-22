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

const useStyles = makeStyles((theme) => ({
  grupaBotuna:{
    marginTop:"0.5em",
    [theme.breakpoints.down('sm')]: {
      marginBottom: "1em",
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: "6.4em",
    },
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
    width:"90%",
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
      position:"static"
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
      width:"30vw",
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
    toggleMultiple:{
      [theme.breakpoints.up('md')]: {
        paddingLeft:"1em",
      },
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
  textFieldWidth: {
    width:"100%",
    [theme.breakpoints.down('sm')]: {
      width:"11em",
    }
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
    
    editGrid: {
      width:"30%",
      [theme.breakpoints.down('sm')]:{
        width:"100%",
        margin:"0",
      },
    },
    answersStyle: {
      marginTop:"0.8em",
      [theme.breakpoints.down('sm')]: {
        marginTop:"0.5em",
      }
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
    
    tagsStyle: {
      marginTop:"0.8em",
      display:"flex",
      justify:"center",
      alignItems:"center",
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



function EditQuestionPU(props) {
  //states of elements-------------------
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [showIMG, setIMG] = useState(()=>props.prop.hasImage);//
  const [text, setText] = useState(props.prop.text);
  const [file, setFile] = useState(null);
  const quest = {...props.prop};
  const [answerInput,setAnswerInput]=useState("");
  const [imageState, setimageState] = useState(()=>`/api/question/image/${props.prop.question_id}`);
  const [wrongAnswers, setWrongAnswers]=useState(()=>{ return ((props.prop.answer_a!==null||props.prop.answer_b!==null||props.prop.answer_c!==null||props.prop.answer_d!==null)?[props.prop.answer_a,props.prop.answer_b,props.prop.answer_c,props.prop.answer_d]:[])});
  const [correctAnswer, setCorrectAnswers]=useState(()=>{ return props.prop.solution});
  const [multipleAnswer, setMultipleAnswers]=useState(()=>{return ((props.prop.question_type===1)?true:false)});




  const classes = useStyles();
//dropdown button---------------------

  const toggleMultiple = (event) => {  
    setMultipleAnswers(!multipleAnswer);
  };
  const handleCorrect = (event) => {  
    setCorrectAnswers(event.target.value);
  };
  const handleText = (event) => {
    setText(event.target.value);
  };
  const updateAnswerInput=(event)=>{
    setAnswerInput(event.target.value);
  };
  const checkUnique=(validate)=>{
    let val=true;
    for(let i=0;i<wrongAnswers.length;i++){if(validate===wrongAnswers[i])val=false;}
    return val;
  }
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
      id:quest.id,
      text:text,
      question_type:(multipleAnswer?1:2),
      questionImage:file,
      row_D:quest.row_D,
      column_A:quest.column_A,
      answer_a:((wrongAnswers.length>0)?wrongAnswers[0]:null),
      answer_b:((wrongAnswers.length>1)?wrongAnswers[1]:null),
      answer_c:((wrongAnswers.length>2)?wrongAnswers[2]:null),
      answer_d:((wrongAnswers.length>3)?wrongAnswers[3]:null),
      solution:correctAnswer
    }
    props.questChange(send);
    props.popUpClose(false);
  }
//------------------------

  return(
    <Grid className={classes.popupStyle}> 
        <Grid container item className={classes.popupMenu} direction="column" justify="space-between" alignItems="center"> 
              <Grid item className={classes.grupaBotuna}>
              <ButtonGroup orientation="vertical" variant="contained">
                  <Button variant="contained" onClick={() => [setShow1(true),setShow2(false)]} className={classes.buttonsInGroup}>{show1&&<Icon>keyboard_arrow_right</Icon>}Question</Button>
                  <Button variant="contained" onClick={() => [setShow1(false),setShow2(true)]} className={classes.buttonsInGroup}>{show2&&<Icon>keyboard_arrow_right</Icon>}Answers</Button>
                </ButtonGroup>
              </Grid>
              <Grid item>          
                <Button variant="contained" className={classes.saveBtn} type="submit"  onClick={handleSave}>
                    SAVE  
                <Icon style={{marginLeft:"0.5em", fontSize:"1.3em"}} >save_icon</Icon>
                </Button>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem className={classes.divider}/>
              {
              show1 ? //first case - question
                  <Grid container item className={classes.editText}> 
                  <Grid container item justify="center" alignItems="center" className={classes.textFieldWidth}>
                        <TextField style={{width:"100%"}} id="outlined-multiline-static" label="Question Text" multiline rows={5} variant="outlined" value={text} onChange={handleText}/>
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
              }
              {
              show2 ? // second case - answer
              <Grid container item className={classes.editText}> 
                  <Grid container item className={classes.show2grid}>
                    <Grid container item justify="flex-start" alignItems="center" direction="row">
                      <FormControlLabel control={ <Checkbox checked={multipleAnswer} onChange={toggleMultiple} name="checkedB" color="primary" />} />
                      <p> Mutiple choices</p>
                    </Grid>
                      <Grid container item>
                        <TextField className={classes.textFieldShow2} id="outlined-multiline-static" label="Correct Answer" multiline rows={multipleAnswer?1:5} variant="outlined" value={correctAnswer} onChange={handleCorrect}/>
                      </Grid>
                    {/* <Grid className={classes.textAnswers} container item xs={12} md={8} justify="center" alignItems="center" direction="row">
                      <TextField style={{width:"100%"}} id="outlined-multiline-static" label="Correct Answer" multiline rows={multipleAnswer?1:6} variant="outlined" value={correctAnswer} onChange={handleCorrect}/>
                    </Grid> */}
                      
                  </Grid>
                  {multipleAnswer&&
                      <Grid container item className={classes.answersStyle} justify="flex-start" alignItems="center" direction="row">
                        <form onSubmit={(e)=>{e.preventDefault();}}>
                        <TextField style={{width:"100%"}} placeholder="Answer" value={answerInput} onChange={updateAnswerInput} onKeyDown={addWrongAnswer}/>
                    </form>
                    <p className={classes.show2infoText}>Maximum 4 answers</p>
                  </Grid>
                  }
                  { multipleAnswer &&
                    <Grid container item className={classes.tagsStyle}>
                      <ChipsArray style={{margin:"2em"}} wrongAnswers={wrongAnswers} deleteWrongAnswer={deleteWrongAnswer}/> 
                    </Grid>
                  }
                </Grid>
                : null
              }


  </Grid>

  );
}

export default EditQuestionPU;