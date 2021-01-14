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
import { useSelector} from 'react-redux';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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
    const roleOfUser=useSelector(state=>state.login);
    const [name, setName] = useState("");
    const [surname,setSurname]=useState("");
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [roleVisible, setRoleVisible]=useState(()=> {return((roleOfUser=="guest")?false:true)});
    const [role, setRole]=useState(()=>"student");
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
        temp.name=object.name ?"":"Name is required."
        if(temp.name=="Name is required."){
            temp.nameError=true
        }
        else temp.nameError=false

        temp.surname=object.surname ?"":"Surname is required."
        if(temp.surname=="Surname is required."){
            temp.surnameError=true
        }
        else temp.surnameError=false

        temp.username=object.username ?"":"Username is required."
        if(temp.username=="Username is required."){
            temp.usernameError=true
        }
        else temp.usernameError=false

        temp.password=object.password ?"":"Password is required."
        if(temp.password=="Password is required."){
            temp.passwordError=true
        }
        else temp.passwordError=false

    	temp.email=(/$^|.+@.+..+/).test(object.mail)?"":"Email is not vaild."
        temp.email1=object.mail ?"":"Email is required." 
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
        name:name,
        surname:surname,
        date_of_birth:birthDate,
        mail:email,
        user_type:3,
        username:username,
        password:password,
        
    };
    function sendSignup()
    {
        console.log(object);
            const requestOptions = {
              method: 'POST',
              mode:'cors',
              headers: { 'Content-Type': 'application/json'},
              credentials: 'include',
              body:JSON.stringify(object)
            };
            fetch('http://127.0.0.1:3000/api/student/register', requestOptions)
            .then((data)=>{
                if(data.status===200){
                   props.pageProps.history.push('/');
                }
                else{
                    console.log('Error in fetch function '+ data.status);
            }})
            .catch((error)=>{ console.log('Error in fetch function '+ error);});
            
    }
    //unosimo podatke i provjeravamo jeli sve okej
    const Submit=(e)=>{
        e.preventDefault();
        if(validation())
        {
            sendSignup();
            setOpenSnackbar(true);
            setErrors({});//nez zas je bug al je
            setName("");
            setSurname("");
            setUsername("");
            setEmail("");
            setRole("student");
            setPassword("");
            setPasswordCheck("");
            setShowPassword(false);
            setShowPasswordCheck(false);
            setBirthDate(new Date());
        }      
    };

    const closeSnackbar=()=>{
        setOpenSnackbar(false);
    };
    
    const checkUsername=(temp)=>{

        const requestOptions = {
            method: 'GET',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include'
          };

          fetch(`http://127.0.0.1:3000/api/checkusername/${temp}`, requestOptions)
          .then(response => response.json())
          .then(dataFetch => {  
                  if(dataFetch.available==1){
                    let ar=errors;
                    ar.usernameError=true;
                    ar.username=`This username is not available.`;
                    setErrors(ar);
                  }
                  else{
                    let ar=errors;
                    ar.usernameError=false;
                    ar.username=null;
                    setErrors(ar);
                  }
          })
          .catch((error)=>{
            console.log('Error in fetch function '+ error);
          });    
    };
        
    
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
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker style={{marginTop:0}} className={classes.fields}
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
                </MuiPickersUtilsProvider>
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
                    onChange={(e)=>{ checkUsername(e.target.value); setUsername(e.target.value);}}
                    // onBlur={()=>{const temp=username; setUsername("");}}
                    error={errors.usernameError}
                    value={username}
                    helperText={errors.username}                    
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            {(!errors.usernameError)&&(errors.usernameError!=undefined)&&<Icon fontSize="small" style={{color:"#27ae60"}}>check_mark</Icon>}
                            {(errors.usernameError)&&(errors.usernameError!=undefined)&&<Icon fontSize="small" style={{color:"#EB4949"}}>clear</Icon>}
                          </InputAdornment>
                        ),
                      }}
                >
                </TextField>
                {
                roleVisible&&<FormControl variant="filled" className={classes.fields}>
                    <InputLabel id="demo-simple-select-filled-label">Role</InputLabel>
                    <Select
                    labelId="demo-simple-select-filled-label"
                    disabled={!roleVisible}
                    id="demo-simple-select-filled"
                    value={role}
                    onChange={(e)=>setRole(e.target.value)}
                    fullWidth
                    >
                        <MenuItem value={"student"}>Student</MenuItem>
                        <MenuItem value={"teacher"}>Teacher</MenuItem>
                        <MenuItem value={"admin"}>Administrator</MenuItem>
                    </Select>
                </FormControl>
                }


                {/* {roleVisible &&
                <TextField  fullWidth  className={classes.fields} 
                    type="role" 
                    label="Role" 
                    variant="filled"
                    value={"Student"}
                    //onChange={()=>{setRole("student")}}
                    
                />} */}
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