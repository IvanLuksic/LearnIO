import React, { useState } from 'react';
import {Button, Dialog,DialogContent,DialogTitle, makeStyles, Typography}from'@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import PopupDialog from '../common/PopupDialog';
import WrongPU from './WrongPU';



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

function DisplayAnswers(props){
    var counter=0;
    const alphabet=["a","b","c","d","e","f","g","h","i","j","k","l","m"];
    let answerRows= props.questions.map(quest=> <FormControlLabel key={quest} value={quest} control={<Radio />} label={alphabet[counter++] + ")  " +quest} />)
    return answerRows;
};


function QuestionPopup(props){
    const [value, setValue] = React.useState('A');
    const [openWrongPU,setWrongPU]=useState(false);
    const showABC = props.question.ABC;
    const classes=useStyles();

    const handleCloseWrongPU=()=>{
        setWrongPU(false);
        props.setOpenPopup(false);
    }
    const handleOpenWrongPU=()=>{
        setWrongPU(true);
    }

    const handleChange = (event) => {
    setValue(event.target.value);
    };

    const handleSave=()=>{

            let newFields1=[...props.field.filter(item=>(item.id!==props.question.id && item.id!==props.question.id+1 && item.id!==props.question.id+props.ao))];
            let item1=props.question;
            let item2=props.field[props.question.id];
            let item3=props.field[props.question.id+props.ao-1];
            if(value===item1.answerCorrect){
                item1.status="done";
                if(item2.status==="locked") item2.status="solve";
                if(item3.status==="locked") item3.status="solve";
                props.setOpenPopup(false);
            }
            else{
                item1.status="wrong";
                handleOpenWrongPU();
            } 
            newFields1=[...newFields1,item1,item2,item3];
            props.changeQuestions(newFields1);
           // props.setOpenPopup(false);
    }

    return(
        <div> 
            {/* <Dialog open={props.openPopup} classes={{paper: classes.dialogWrapper}}> */}
                {/* <ClickAwayListener onClickAway={()=>{props.setOpenPopup(false);}}> */}
                    <div> 
                        <DialogTitle className={classes.dialogPart1}>
                            <div style={{display:'flex'}}>
                                <Typography variant="h6" component="div" className={classes.questionName}>AO{props.question.ao} D{props.question.d}</Typography>
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
                    </div>
                {/* </ClickAwayListener> */}
            {/* </Dialog> */}

            <div>
            <PopupDialog openPopup={openWrongPU} setOpenPopup={handleCloseWrongPU} clickAway={false} style={{minWidth:'40%',minHeight:'40%'}}>
              <WrongPU closePopup={handleCloseWrongPU}/>
            </PopupDialog>
            </div>
        </div>
        );

}
export default QuestionPopup;
