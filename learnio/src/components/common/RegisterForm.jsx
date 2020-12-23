import { FilledInput, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import { FormHelperText } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker,} from '@material-ui/pickers';
import CustomSnackbar from './Snackbar'

import {Link} from 'react-router-dom';


const useStyles=makeStyles((theme)=>({
        root: {
          margin: '0 auto',
          width: "80%",
        },
        fields: {
            display: 'block',
            width: "100%",
            marginBottom: "0.5em",
    
        }, 
        loginHeadline:{
            fontFamily: "Lobster",
            fontSize: "3em",
            margin: "0 auto",
            marginTop: "0.5em",
            marginBottom: "0.5em"
        },
        loginButton:{
            margin: "auto",
            marginTop: "2em",
            marginBottom: "2em",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
}));


function RegisterForm(props){

    const classes=useStyles();

    const [name, setName] = useState("");
    const [surname,setSurname]=useState("");
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [passwordCheck,setPasswordCheck]=useState("");
    const [showPassword,setShowPassword]=useState(false);
    const [showPasswordCheck,setShowPasswordCheck]=useState(false);
    const [birthDate,setBirthDate]=useState(new Date());
    const [errors,setErrors]=useState({});
    const [openSnackbar,setOpenSnackbar]=useState(false);

    const handleChangeEmail=(event)=>{
        setEmail(event.target.value);

    }
    //provjerava jesu li sva polja unesena i da li se lozinke podudaraju
    const validation=()=>{
        let temp={}
        temp.name=object.names ?"":"Name is required."
        if(temp.name=="Name is required."){
            temp.nameError=true
        }
        else temp.nameError=false

        temp.surname=object.surnames ?"":"Surname is required."
        if(temp.surname=="Surname is required."){
            temp.surnameError=true
        }
        else temp.surnameError=false

        temp.username=object.usernames ?"":"Username is required."
        if(temp.username=="Username is required."){
            temp.usernameError=true
        }
        else temp.usernameError=false

        temp.password=object.passwords ?"":"Password is required."
        if(temp.password=="Password is required."){
            temp.passwordError=true
        }
        else temp.passwordError=false

    	temp.email=(/$^|.+@.+..+/).test(object.emails)?"":"Email is not vaild."
        temp.email1=object.emails ?"":"Email is required." 
        if(temp.email=="Email is not vaild."){
            temp.emailError=true
        }
        else if (temp.email1=="Email is required.") {
            temp.emailError=true
            temp.email=temp.email1
        }
        else 
            temp.emailError=false

            
       temp.passwordCheck=passwordCheck ?"":"Password Check is required."
        if(temp.passwordCheck=="Password Check is required."){
             temp.passwordCheckError=true
        }
        else temp.passwordCheckError=false
        
        if(password!=passwordCheck)
        {
            temp.passwordCheck="Wrong Password"
            temp.passwordCheckError=true
        }

        setErrors({
            ...temp
        })
        return Object.values(temp).every(x=>x=="")
    }
    //prikazuje sifru kad se pritisne na oko
    const handleClickShowPassword = () => {
        if(showPassword==false)
        {
            setShowPassword(true);
        }
        else
        {
            setShowPassword(false);
        }  
    };
    const handleClickShowPasswordCheck = () => {
        if(showPasswordCheck==false)
        {
            setShowPasswordCheck(true);
        }
        else
        {
            setShowPasswordCheck(false);
        }  
    };
    //za datum rodenja ako triba
    const handleDateChange = (date) => {
        setBirthDate(date);
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    //objekt(tj osoba) koja se registrira
    let object={
        names:name,
        surnames:surname,
        //birth:birthDate,
        emails:email,
        usernames:username,
        passwords:password,
        showPassword:false,
        
    };
    //unosimo podatke i provjeravamo jeli sve okej
    const Submit=(e)=>{
        e.preventDefault();
        if(validation())
        {
            setOpenSnackbar(true);
            console.log(object);
        }      
    }
    const closeSnackbar=()=>{
        setOpenSnackbar(false);
    }
    
        
    
    return(
        <React.Fragment>
            <CustomSnackbar text="You successfully registered" status="success" open={openSnackbar} handleClose={closeSnackbar}></CustomSnackbar>
            <Typography color="primary" className={classes.loginHeadline}>Registration </Typography>
            <form onSubmit={Submit} className={classes.root} noValidate autoComplete="off" >
                <TextField  fullWidth className={classes.fields} 
                    type="text" 
                    label="Name" 
                    variant="filled" 
                    onChange={(e)=>{setName(e.target.value)}}
                    error
                    {  ...( {error:errors.nameError,helperText:errors.name})}
                />
                <TextField  fullWidth  className={classes.fields} 
                    type="surname" 
                    label="Surname" 
                    variant="filled" 
                    onChange={(e)=>{setSurname(e.target.value)}}
                    error
                    {  ...( {error:errors.surnameError,helperText:errors.surname})}
                />
                <TextField  fullWidth className={classes.fields}  
                    type="email" 
                    label="Email" 
                    variant="filled" 
                    onChange={handleChangeEmail} 
                    value={email}
                    error
                    {  ...( {error:errors.emailError,helperText:errors.email})}
                />
                <TextField  fullWidth className={classes.fields}  
                    type="username" 
                    label="Username" 
                    variant="filled" 
                    onChange={(e)=>{setUsername(e.target.value)}}
                    error
                    {  ...( {error:errors.usernameError,helperText:errors.username})}
                />
                <FormControl  className={classes.fields} variant="filled" error {...({error:errors.passwordError})}>               
                    <InputLabel  variant="filled" htmlFor="filled-adornment-password" >Password</InputLabel>
                    <FilledInput fullWidth
                        id="filled-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            </InputAdornment>
                        }      
                    />
                    {<FormHelperText>{errors.password}</FormHelperText>}
                    
                </FormControl>
                <FormControl  className={classes.fields} variant="filled" error {...({error:errors.passwordCheckError})}>
                    <InputLabel  variant="filled" htmlFor="filled-adornment-password" >Password Check</InputLabel>
                    <FilledInput fullWidth
                        id="filled-adornment-password2"
                        type={showPasswordCheck ? 'text' : 'password'}
                        value={passwordCheck}
                        onChange={(e)=>{setPasswordCheck(e.target.value)}}
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPasswordCheck}
                                onMouseDown={handleMouseDownPassword}
                            >
                            {showPasswordCheck ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            </InputAdornment>
                        }      
                    />
                    {<FormHelperText>{errors.passwordCheck}</FormHelperText>}         
                </FormControl>
                <Button variant="contained" className={classes.loginButton} style={{borderRadius: 25}} type="submit" color="primary" >
                    Sign Up              
                </Button>
                
            </form>
        </React.Fragment>
    )
}
export default RegisterForm;

/*<MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker className={classes.fields}
                        fullWidth
                        inputVariant="filled"
                        margin="normal"
                        id="date-picker-dialog"
                        label="Birth Date"
                        format="dd/MM/yyyy"
                        value={birthDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>*/