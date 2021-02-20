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
    const offline= useSelector(state=>state.offline);
    const roleOfUser=useSelector(state=>state.login);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(null);
    const [surname,setSurname]=useState("");
    const [surnameError,setSurnameError]=useState(null);
    const [username,setUsername]=useState("");
    const [usernameError,setUsernameError]=useState(null);
    const [email,setEmail]=useState("");
    const [emailError,setEmailError]=useState("");
    const [roleVisible, setRoleVisible]=useState(()=> {return((roleOfUser=="guest")?false:true)});
    const [role, setRole]=useState(()=>3);
    const [password,setPassword]=useState("");
    const [passwordCheck,setPasswordCheck]=useState("");
    const [showPassword,setShowPassword]=useState(false);
    const [showPasswordCheck,setShowPasswordCheck]=useState(false);
    const [passwordError,setPasswordError]=useState(null);
    const [birthDate,setBirthDate]=useState(new Date());
    const [errors,setErrors]=useState({});
    const [openSnackbar,setOpenSnackbar]=useState(false);


    const handleChangeEmail=(event)=>{
        setEmail(event.target.value);
    }

    //prikazuje sifru kad se pritisne na oko
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleClickShowPasswordCheck = () => {
        setShowPasswordCheck(!showPasswordCheck);
    };
    //za datum rodenja ako triba
    const handleDateChange = (date) => {
        setBirthDate(date);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    function sendSignup()
    {
            //objekt(tj osoba) koja se registrira

        let object={
            name:name,
            surname:surname,
            date_of_birth:birthDate,
            mail:email,
            user_type:role,
            username:username,
            password:password,
            
        };
        const requestOptions = {
            method: 'POST',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include',
            body:JSON.stringify(object)
        };
        fetch('/api/student/register', requestOptions)
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

        checkEmail(email);
        checkName(name);
        checkSurname(surname);
        checkUsername(username);
        checkPassword();

        if((nameError==""||nameError==null)&&(surnameError==""||surnameError==null)&&(usernameError==""||usernameError==null)&&(emailError==""||emailError==null)&&(passwordError==""||passwordError==null))
        {
            sendSignup();
            setOpenSnackbar(true);
            setErrors({});//nez zas je bug al je
            setName("");
            setSurname("");
            setUsername("");
            setEmail("");
            setRole(3);
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

        if(offline){if(temp=="Username"){setUsernameError("Nevalja.")}else{setUsernameError("")}};

        const requestOptions = {
            method: 'POST',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include',
            body:JSON.stringify({username:temp})
          };

          
          fetch(`/api/check/username`, requestOptions)
          .then(response => response.json())
          .then(dataFetch => {  
                  console.log(dataFetch);
                  if(dataFetch.available==false){
                    setUsernameError(`This username is not available.`);
                  }
                  else{
                    setUsernameError(``);
                  }
          })
          .catch((error)=>{
            console.log('Error in fetch function '+ error);
          });    
    };
        
    const checkName=(temp)=>{
        if(temp=="") setNameError("Name is required.")
        else setNameError("");
    };
    const checkSurname=(temp)=>{
        if(temp=="") setSurnameError("Surname is required.")
        else setSurnameError("");
    };
    const checkEmail=(temp)=>{
        if(temp==""){setEmailError("Email is required.")}
        else if(!((/$^|.+@.+..+/).test(temp))) {setEmailError("Not a valid email.")}
        else{setEmailError("")};
    };
    const checkPassword=()=>{
        if(password.length<5||passwordCheck.length<5) setPasswordError("Password shold be longer than 4 characters.")
        else if(password!==passwordCheck) setPasswordError("Passwords don't match.")
        else setPasswordError("");
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
                    onBlur={(e)=>checkName(e.target.value)}
                    error={nameError!=""&&nameError!=null}
                    helperText={nameError}
                />
                <TextField  fullWidth  className={classes.fields} 
                    type="surname" 
                    label="Surname" 
                    variant="filled" 
                    onChange={(e)=>{setSurname(e.target.value)}}
                    onBlur={(e)=>checkSurname(e.target.value)}
                    error={surnameError!=""&&surnameError!=null}
                    helperText={surnameError}
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
                    onBlur={(e)=>checkEmail(e.target.value)}
                    error={emailError!=""&&emailError!=null}
                    helperText={emailError}
                />
                <TextField  fullWidth className={classes.fields}  
                    type="username" 
                    label="Username" 
                    variant="filled" 
                    onChange={(e)=>{ if(e.target.value.length>4){setUsername(e.target.value); checkUsername(e.target.value);}else{setUsername(e.target.value);}}}
                    // onBlur={()=>{const temp=username; setUsername("");}}
                    error={usernameError!=""&&usernameError!=null}
                    value={username}
                    helperText={usernameError}                    
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            {(!(usernameError!=""))&&<Icon fontSize="small" style={{color:"#27ae60"}}>check_mark</Icon>}
                            {(usernameError!=""&&usernameError!=null)&&<Icon fontSize="small" style={{color:"#EB4949"}}>clear</Icon>}
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
                        <MenuItem value={3}>Student</MenuItem>
                        <MenuItem value={2}>Teacher</MenuItem>
                        <MenuItem value={1}>Administrator</MenuItem>
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
                <FormControl  className={classes.fields} variant="filled" error={passwordError!==null&&passwordError!==""}>               
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
                </FormControl>
                <FormControl  className={classes.fields} variant="filled" error={passwordError!==null&&passwordError!==""}>
                    <InputLabel  variant="filled" htmlFor="filled-adornment-password" >Password Check</InputLabel>
                    <FilledInput fullWidth
                        id="filled-adornment-password2"
                        type={showPasswordCheck ? 'text' : 'password'}
                        value={passwordCheck}
                        onChange={(e)=>{setPasswordCheck(e.target.value)}}
                        onBlur={()=>checkPassword()}
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
                    {<FormHelperText>{passwordError}</FormHelperText>}         
                </FormControl>
                <Button variant="contained" className={classes.loginButton} style={{borderRadius: 25, fontWeight:"bold"}} type="submit" color="primary" >
                    Sign Up              
                </Button>
            </form>
        </React.Fragment>
    )
}
export default RegisterForm;