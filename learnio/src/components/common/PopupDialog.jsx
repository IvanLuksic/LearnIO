import React from 'react';
import {Dialog,DialogContent,DialogTitle, makeStyles}from'@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';



const useStyles=makeStyles(theme =>({
    dialogWrapper:{
        position:'absolute',
        top:"20vh",
        textAlign: 'center',
        backgroundColor:"lightgrey",
        padding:"1em",
        borderRadius:"7px",
        maxWidth:"100%",
        [theme.breakpoints.down('sm')]:{
            width:"18em",
            top:"10vh"
        }
    },
    questionName:{
        flexGrow:1,
        fontWeight:"bold",
        padding:"1em 0 0 2em"
    },
    dialogPart1:{
        backgroundColor:"white",
        borderRadius:" 7px 7px 0 0",
        height:"auto",
        paddingBottom:"0",    
    },
    dialogPart2:{
        paddingTop:"0",
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
//uzima props -> style (css stil), clcikAway (boolean koji pali funkciju zatvaranja popupa klikom sa strane)
function PopupDialog(props){ 
    const classes=useStyles();
    return(
            <Dialog open={props.openPopup} classes={{paper: classes.dialogWrapper}} PaperProps={{style: props.style}} >
                <ClickAwayListener onClickAway={()=>{props.clickAway&&props.setOpenPopup(false);}}>
                    <div> 
                        <DialogTitle className={classes.dialogPart1}>
                            <div style={{display:'flex', flexDirection:"row", justifyContent:"flex-end"}}>
                                <CloseIcon style={{cursor:"pointer", }} onClick={()=>props.setOpenPopup(false)}></CloseIcon>
                            </div>
                        </DialogTitle>
                        <DialogContent className={classes.dialogPart2}>
                            {props.children}
                        </DialogContent>
                    </div>
                </ClickAwayListener>
            </Dialog>
        );
}
export default PopupDialog;
