import React from 'react';
import { Component } from 'react';
import {Button, Dialog,DialogContent,DialogTitle, makeStyles, Typography}from'@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CloseIcon from '@material-ui/icons/Close';
import logo from '../../images/logo.png';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


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
        margin:"2em 0em",
        padding:"0.5em 3em ",
        fontFamily:"Lobster"
    },
    imgWithText:{
        display:'flex',
        flexDirection:"column",
        alignItems:"center",
        flexWrap:"wrap",
        justifyItems:"space-evenly"
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

function DisplayAnswers(props){
    var counter=0;
    const alphabet=["a","b","c","d","e","f","g","h","i","j","k","l","m"];
    let answerRows= props.questions.map(quest=> <FormControlLabel key={quest} value={quest} control={<Radio />} label={alphabet[counter++] + ")  " +quest} />)
    return answerRows;
};


function QuestionPopup(props){
    const [value, setValue] = React.useState('A');
    const [showABC, setShow] = React.useState(props.question.ABC);
    const classes=useStyles();

    const handleChange = (event) => {
    setValue(event.target.value);
    };

    const handleSave=()=>{

            let newFields=[...props.field.filter(item=>item.id!==props.question.id)];
            let item=props.question;
            if(value===item.answerCorrect){
                item.status="done";
            }
            else item.status="wrong";
            newFields=[...newFields,item];
            props.changeQuestions(newFields);
            props.setOpenPopup(false);
    }

    return(
        <div> 
            <Dialog open={props.openPopup} classes={{paper: classes.dialogWrapper}}>
                <DialogTitle className={classes.dialogPart1}>
                    <div style={{display:'flex'}}>
                        <Typography variant="h6" component="div" className={classes.questionName}>AO{props.question.ao} D{props.question.d}</Typography>
                        <CloseIcon onClick={()=>props.setOpenPopup(false)}></CloseIcon>
                    </div>
                </DialogTitle>
                <DialogContent className={classes.dialogPart2}>
                    {  
                    showABC ?
                        <div>
                            <FormControl component="fieldset" >
                                <FormLabel component="legend" style={{color:"grey"}}>{props.question.text}</FormLabel>
                                <div style={{display:'flex',margin: "2em auto"}}>
                                <RadioGroup aria-label="answer" component="div" name="answer1" value={value} onChange={handleChange} className={classes.radioGroup}>
                                        <DisplayAnswers questions={props.question.answerABC}/>
                                </RadioGroup>
                                </div>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={handleSave} className={classes.saveButton}>Save</Button>
                        </div>
                        : 
                        <div>
                            <FormControl component="fieldset"> 
                                <FormLabel component="legend">{props.question.text}</FormLabel>
                                    <div className={classes.imgWithText} >
                                    <img src={props.question.url} className={classes.questionImg} style={{display:props.question.photo}} alt="slika zadatka"></img>
                                    <TextField id="standard-basic" className={classes.answerText} label="Unesi kratki odgovor" onChange={handleChange}/> 
                                    </div>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={handleSave} className={classes.saveButton}>Save</Button>
                        </div>
                    }
                </DialogContent>
            </Dialog>
        </div>
       
        );

}
export default QuestionPopup;
