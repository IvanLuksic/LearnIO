import React from 'react';
import { Component } from 'react';
import {Button, Dialog,DialogContent,DialogTitle, makeStyles, Typography}from'@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CloseIcon from '@material-ui/icons/Close';
import logo from '../images/logo.png';

const useStyles=makeStyles(theme =>({
    dialogWrapper:{
        position:'absolute',
        textAlign: 'center',
    }
 
}))



function PitanjeABC(props){
    const [value, setValue] = React.useState('A');

    const handleChange = (event) => {
    setValue(event.target.value);
    };
    const {title,openPopup,setOpenPopup}=props;
    const classes=useStyles();
    
    return(
        <div> 
            <Dialog open={openPopup} classes={{paper: classes.dialogWrapper}}>
                <DialogTitle>
                    <div style={{display:'flex'}}>
                        <Typography variant="h6" component="div" style={{flexGrow:1}}>AO2 D3</Typography>
                        <CloseIcon onClick={()=>setOpenPopup(false)}></CloseIcon>
                    </div>
                    
                </DialogTitle>
                <DialogContent>
                    <div>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</FormLabel>
                            <div style={{display:'flex'}}>
                            <RadioGroup aria-label="answer" component="div" name="answer1" value={value} onChange={handleChange}style={{maxWidth:"30%", paddingLeft: "15px", flexGrow:1}}>
                            <FormControlLabel value="A" control={<Radio />} label="Odgovor A" />
                            <FormControlLabel value="B" control={<Radio />} label="Odgovor B" />
                            <FormControlLabel value="C" control={<Radio />} label="Odgovor C" />
                            <FormControlLabel value="D" control={<Radio />} label="Odgovor D" />
                            </RadioGroup>
                            <img src={logo} style={{paddingLeft:"70px"}} alt="slika zadatka"></img>
                            </div>
                        </FormControl>
                        <Button variant="contained" color="primary" onClick={()=>setOpenPopup(false)}>SAVE</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
       
        );

}
export default PitanjeABC;
