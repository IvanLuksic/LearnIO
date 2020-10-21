import React from 'react';
import { Component } from 'react';
import {Button, Dialog,DialogContent,DialogTitle, makeStyles, Typography}from'@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CloseIcon from '@material-ui/icons/Close';
import logo from '../images/logo.png';
import TextField from '@material-ui/core/TextField';

const useStyles=makeStyles(theme =>({
    dialogWrapper:{
        position:'absolute',
        textAlign: 'center',
    }
 
}))



function Popup(props){
    const [value, setValue] = React.useState('A');

    const handleChange = (event) => {
    setValue(event.target.value);
    };
    const {title,openPopupLabel,setOpenPopupLabel}=props;
    const classes=useStyles();
    
    return(
        <div> 
            <Dialog open={openPopupLabel} classes={{paper: classes.dialogWrapper}}>
                <DialogTitle>
                    <div style={{display:'flex'}}>
                        <Typography variant="h6" component="div" style={{flexGrow:1}}>AO2 D3</Typography>
                        <CloseIcon onClick={()=>setOpenPopupLabel(false)}></CloseIcon>
                    </div>      
                </DialogTitle>
                <DialogContent>
                    <div>
                    <FormControl component="fieldset"> 
                            <FormLabel component="legend">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</FormLabel>
                            <div style={{display:'flex', alignItems:"center"}} >
                                <TextField id="standard-basic" label="Unesi kratki odgovor" /> 
                                <img src={logo} style={{paddingLeft:"70px"}} alt="slika zadatka"></img>
                            </div>
                            
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={()=>setOpenPopupLabel(false)}>SAVE</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
       
        );

}
export default Popup;