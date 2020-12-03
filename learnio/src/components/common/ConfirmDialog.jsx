import React from 'react';
import {Button, Dialog,DialogContent,DialogTitle, makeStyles, Typography}from'@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

//takes a functionToConfirm and message text as text + openPopup and setOpenPopup

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
    questionText:{
        flexGrow:1,
        padding:"1em 0 0 1em",
        [theme.breakpoints.down('sm')]: {
            marginBottom:"2em"
        },
    },
    dialogPart1:{
        backgroundColor:"white",
        borderRadius:" 7px 7px 0 0"
    },
    dialogPart2:{
        backgroundColor:"white",
        borderRadius:"0 0 7px 7px"
    },
    pickButton:{
        [theme.breakpoints.down('sm')]: {
            margin:"0.5em 0.4em 2em 0.4em",
            width:"5em"
        },
        [theme.breakpoints.up('md')]: {
            margin:"2em 0.5em",     
            width:"7em"     
        },
        padding:"0.5em 3em ",
        fontFamily:"Lobster",
        borderRadius:"15px",
    },
    YesAndNo:{
        display:'flex',
        flexDirection:"row",
        alignItems:"center",
        flexWrap:"wrap",
        justifyContent:"center"
    },

}))

function ConfirmDialog(props){

    const classes=useStyles();
    
    const handleYes=()=>{
        props.functionToConfirm();
        props.setOpenPopup(false);
    };
    const handleNo=()=>{
        props.setOpenPopup(false);
    }

    return(
        <div> 
            <Dialog open={props.openPopup} classes={{paper: classes.dialogWrapper}}>
                <ClickAwayListener onClickAway={()=>{props.setOpenPopup(false);}}>
                    <div> 
                        <DialogTitle className={classes.dialogPart1}>
                            <div style={{display:'flex'}}>
                                <Typography variant="h6" component="div" className={classes.questionName}>Are you sure?</Typography>
                                <CloseIcon style={{cursor:"pointer"}} onClick={()=>props.setOpenPopup(false)}></CloseIcon>
                            </div>
                        </DialogTitle>
                        <DialogContent className={classes.dialogPart2}>
                                <div>
                                    <Typography variant="body1" component="div" className={classes.questionText}>{props.text}</Typography>
                                    <div className={classes.YesAndNo}>
                                    <Button variant="contained" onClick={handleNo} className={classes.pickButton}>No</Button>
                                    <Button variant="contained" onClick={handleYes} className={classes.pickButton} style={{backgroundColor:"#EB4949", color:"white"}}>Yes</Button>
                                    </div>
                                </div>
                                
                        </DialogContent>
                    </div>
                </ClickAwayListener>
            </Dialog>
        </div>
        );

}
export default ConfirmDialog;
