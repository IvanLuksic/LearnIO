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
  return (
    <Paper component="ul" className={classes.rootChips}>
      {
      props.wrongAnswers.map((data) => {
        return (
          <li key={data}>
            <Chip style={{margin:"0 0.1em"}} label={data} onDelete={()=>{props.deleteWrongAnswer(data)}}/>
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
  const [showIMG, setIMG] = useState(false);
  const [text, setText] = useState('');
  const [imageState, setimageState] = useState(null);
  const [answerInput,setAnswerInput]=useState([]);
  const [wrongAnswers, setWrongAnswers]=useState(()=>{ return []});
  const [correctAnswer, setCorrectAnswers]=useState(()=>{ return "Točno"});
  const [multipleAnswer, setMultipleAnswers]=useState(()=>{ return false});


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
  const updateAnsweInput=(event)=>{
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
//------------------------

  return(
    <Grid className={classes.popupStyle} container direction="row" justify="space-between" alignItems="flex-start" style={{padding:"1em",height:"auto"}} wrap="wrap"> 
    <Grid container item className={classes.popupMenu} direction="column" justify="space-between" alignItems="center"  xs={12} md={4} > 
      <Grid item className={classes.grupaBotuna}>
        <ButtonGroup orientation="vertical" variant="contained">
          <Button variant="contained" onClick={() => [setShow1(true),setShow2(false)]} className={classes.buttonsInGroup}>{show1&&<Icon>keyboard_arrow_right</Icon>}Question</Button>
          <Button variant="contained" onClick={() => [setShow1(false),setShow2(true)]} className={classes.buttonsInGroup}>{show2&&<Icon>keyboard_arrow_right</Icon>}Answers</Button>
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
                  <input accept="image/*" style={{display:"none"}} id="contained-button-file" multiple type="file" onInput={(event)=>{ if(event.target.files && event.target.files[0]) {let img = event.target.files[0]; setimageState(URL.createObjectURL(img)); setIMG(true) ;}}}/>
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
                <TextField style={{width:"100%"}} placeholder="Odgovor" value={answerInput} onChange={updateAnsweInput} onKeyDown={addWrongAnswer}/>
              </form>
            </Grid>
            }
          </Grid>
          : null
        }
  </Grid>
  );
}

export default AddQuestPU;