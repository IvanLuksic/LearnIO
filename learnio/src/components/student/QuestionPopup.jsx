import React, { useState } from 'react';
import {Button, Dialog,DialogContent,DialogTitle, makeStyles, Typography}from'@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import PopupDialog from '../common/PopupDialog';
import WrongPU from './WrongPU';
import Grid from '@material-ui/core/Grid';




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

// function DisplayAnswers(props){
//     var counter=0;
//     const alphabet=["a","b","c","d","e","f","g","h","i","j","k","l","m"];
//     let answerRows= props.questions.map(quest=> <FormControlLabel key={quest} value={quest} control={<Radio />} label={alphabet[counter++] + ")  " +quest} />)
//     return answerRows;
// };


function QuestionPopup(props){
    const [value, setValue] = React.useState('A');
    const [openWrongPU,setWrongPU]=useState(false);
    const showABC = (props.questionToDisplay.question_type===1)?true:false;
    const imageDisplay =(props.questionToDisplay.question_image_path==null)?'none':'inline';
    const classes=useStyles();
    console.log(props.questionToDisplay,showABC,imageDisplay);

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

    const handleSave=()=>{ props.setOpenPopup(false); props.onSave();}

    //         let newFields1=[...props.field.filter(item=>(item.question_id!==props.questionToDisplay.question_id && item.question_id!==props.questionToDisplay.question_id+1 && item.question_id!==props.questionToDisplay.question_id+props.ao))];
    //         let item1=props.questionToDisplay;
    //         let item2=props.field[props.questionToDisplay.question_id];
    //         let item3=props.field[props.questionToDisplay.question_id+props.ao-1];
    //         if(value===item1.answerCorrect){
    //             item1.status=1;
    //             if(item2.status===3) item2.status=2;
    //             if(item3.status===3) item3.status=2;
    //             props.setOpenPopup(false);
    //         }
    //         // // else{
    //         // //     item1.status="wrong";
    //         // //     handleOpenWrongPU();
    //         // } 
    //         newFields1=[...newFields1,item1,item2,item3];
    //         props.changeQuestions(newFields1);
    //        // props.setOpenPopup(false);
    // }

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
                                                <FormControlLabel value={props.questionToDisplay.question_answer_a} control={<Radio />} label={"a)  " + props.questionToDisplay.question_answer_a} />
                                                <FormControlLabel value={props.questionToDisplay.question_answer_b} control={<Radio />} label={"b)  " + props.questionToDisplay.question_answer_b} />
                                                <FormControlLabel value={props.questionToDisplay.question_answer_c} control={<Radio />} label={"c)  " + props.questionToDisplay.question_answer_c} />
                                                <FormControlLabel value={props.questionToDisplay.question_answer_d} control={<Radio />} label={"d)  " + props.questionToDisplay.question_answer_d} />
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

            <div>
            <PopupDialog openPopup={openWrongPU} setOpenPopup={handleCloseWrongPU} clickAway={false} style={{minWidth:'40%',minHeight:'40%'}}>
              <WrongPU closePopup={handleCloseWrongPU}/>
            </PopupDialog>
            </div>
        </div>
        );

}
export default QuestionPopup;
