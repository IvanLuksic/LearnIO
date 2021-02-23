import React, { useState } from 'react';
import {Button, DialogContent,DialogTitle, makeStyles, Typography}from'@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {useSelector} from 'react-redux';




const useStyles=makeStyles(theme =>({
    dialogWrapper:{
        // position:'absolute',
        textAlign: 'center',
        backgroundColor:"lightgrey",
        padding:"1em",
        borderRadius:"7px"
    },
    questionName:{
        flexGrow:1,
        fontWeight:"bold",
        padding:"1em 0 0 2em"
    },
    dialogPart1:{
        backgroundColor:"white",
        borderRadius:" 7px 7px 0 0"
    },
    dialogPart2:{
        backgroundColor:"white",
        borderRadius:"0 0 7px 7px"
    },
    radioGroup:{
        maxWidth:"100%",
        flexGrow:1, 
        justifyContent:"center",
        textAlign:"left"
    },
    saveButton:{
        display:"block",
        margin:"2em 0em",
        [theme.breakpoints.down('md')]: {
            padding:"0.5em 1em ",
        },
        [theme.breakpoints.up('md')]: {
            padding:"0.5em 3em ",
        },
        fontFamily:"Lobster"
    },
    imgWithText:{
        display:'flex',
        flexDirection:"column",
        alignItems:"center",
        flexWrap:"wrap",
        justifyContent:"space-evenly"
    },
    questionImg:{
        marginTop:"2em",
        height:"10em"
    },
    answerText:{
        margin:"1em 1em",
        width:"90%"
    }
 
}))

// function DisplayAnswers(props){
//     var counter=0;
//     const alphabet=["a","b","c","d","e","f","g","h","i","j","k","l","m"];
//     let answerRows= props.questions.map(quest=> <FormControlLabel key={quest} value={quest} control={<Radio />} label={alphabet[counter++] + ")  " +quest} />)
//     return answerRows;
// };


function QuestionPopup(props){
    const [value, setValue] = React.useState('A');
    const [showABC, setShowABC] =useState(()=>{return (props.questionToDisplay.question_type===1)?true:false});
    const [imageDisplay, setImageDisplay] =useState(()=>{return (props.questionToDisplay.question_image_path==null)?'none':'inline'});
    const classes=useStyles();
    const topicID=useSelector(state=>state.topic);
    console.log(topicID);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSave=()=>{ 
        // OFFLINE: props.setOpenPopupWrong(true)
        // OFFLINE:props.setOpenPopup(false);//topic_id course_id question_id solution
        const requestOptions = {
            method: 'POST',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({topic_id:topicID, course_id:1, question_id:props.questionToDisplay.question_id, solution: value}),
            credentials: 'include'
        };

        fetch('https://learn1o.herokuapp.com/question/check', requestOptions)
        .then(response => response.json())
                .then(data => {  
                  if(data.correct==false){props.setOpenPopupWrong(true)};
                  props.setFields(data.Questions);
        })
        .catch((error)=>{
            console.log('Error in fetch function '+ error);});
        props.setOpenPopup(false);
    }

    return(
        <div> 
            {/* <Dialog open={props.openPopup} classes={{paper: classes.dialogWrapper}}> */}
                {/* <ClickAwayListener onClickAway={()=>{props.setOpenPopup(false);}}> */}
                    <div> 
                        <DialogTitle className={classes.dialogPart1}>
                            <div style={{display:'flex'}}>
                                <Typography variant="h6" component="div" className={classes.questionName}>AO{props.questionToDisplay.column_A} D{props.questionToDisplay.row_D}</Typography>
                            </div>
                        </DialogTitle>
                        <DialogContent className={classes.dialogPart2}>
                            {  
                            showABC ?
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <Grid item xs={9}>
                                        <FormControl component="fieldset" >
                                            <FormLabel component="legend" style={{color:"grey"}}>{props.questionToDisplay.question_text}</FormLabel>
                                            <div style={{display:'flex',margin: "2em auto"}}>
                                            <RadioGroup aria-label="answer" component="div" name="answer1" value={value} onChange={handleChange} className={classes.radioGroup}>
                                                <FormControlLabel value={'a'} control={<Radio />} label={"a)  " + props.questionToDisplay.question_answer_a} />
                                                <FormControlLabel value={'b'} control={<Radio />} label={"b)  " + props.questionToDisplay.question_answer_b} />
                                                <FormControlLabel value={'c'} control={<Radio />} label={"c)  " + props.questionToDisplay.question_answer_c} />
                                                <FormControlLabel value={'d'} control={<Radio />} label={"d)  " + props.questionToDisplay.question_answer_d} />
                                            </RadioGroup>
                                            </div>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button variant="contained" color="primary" onClick={handleSave} className={classes.saveButton}>Save</Button>
                                    </Grid>
                                </Grid>
                                : 
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <Grid item xs={7}>                                    
                                        <FormControl component="fieldset"> 
                                            <FormLabel component="legend">{props.questionToDisplay.question_text}</FormLabel>
                                                <div className={classes.imgWithText} >
                                                <img src={props.questionToDisplay.image_path} className={classes.questionImg} style={{display:imageDisplay}} alt="slika zadatka"></img>
                                                <TextField id="standard-basic" className={classes.answerText} label="Unesi kratki odgovor" onChange={handleChange}/> 
                                                </div>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Button variant="contained" color="primary" onClick={handleSave} className={classes.saveButton}>Save</Button>
                                    </Grid>
                                </Grid>
                            }
                        </DialogContent>
                    </div>
                {/* </ClickAwayListener> */}
            {/* </Dialog> */}
        </div>
        );

}
export default QuestionPopup;
