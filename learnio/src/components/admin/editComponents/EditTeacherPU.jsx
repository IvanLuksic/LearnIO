import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import {  Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector} from 'react-redux';
import CustomSnackbar from '../../common/Snackbar';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    width: "80%",
  },
  fields: {
      display: 'flex-inline',
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
      marginBottom: "2em",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },
  greenPencil:{
    color:"#27ae60"
  },
  greyPencil:{
    color:"#a2a2a2"
  }
  }));


// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//       style: {
//         maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
//         width: 200,
//       },
//     },
// };


function EditTeacherPU(props) {
  //states of elements-------------------
  const offline= useSelector(state=>state.offline);
  const role=useSelector(state=>state.login);
  const [username, setUsername] = useState(()=>props.teacher.username);
  const [cusername, setCUsername] = useState(()=>props.teacher.username);
  const [disableUsername, setDisableUsername] = useState(()=>true);
  const [usernameError,setUsernameError]=useState(()=>null);
  const [name, setName] = useState(()=>props.teacher.name);
  const [disableName, setDisableName] = useState(()=>true);
  const [nameError,setNameError]=useState(()=>null);
  const [surname, setSurname] = useState(()=>props.teacher.surname);
  const [disableSurname, setDisableSurname] = useState(()=>true);
  const [surnameError,setSurnameError]=useState(()=>null);
  const [email, setEmail] = useState(()=>props.teacher.email);
  const [disableEmail, setDisableEmail] = useState(()=>true);
  const [emailError,setEmailError]=useState(()=>null);
  const [OTP,setOTP]=useState(()=>"");
  const [snackbarOpen, setSnackbarOpen]=useState(()=>false);
  const [snackbarText,setSnackbarText]=useState(()=>"");
  const [snackbarStatus,setSnackbarStatus]=useState(()=>"");



  const classes = useStyles();

  const saveChanges=()=>{
    checkEmail(email);
    checkName(name);
    checkSurname(surname);
    checkUsername(username);
    if((nameError===""||nameError===null)&&(surnameError===""||surnameError===null)&&(usernameError===""||usernameError===null)&&(emailError===""||emailError===null)){
      let itemToSave;
      itemToSave={
        id: props.teacher.id,
        created:props.teacher.created,
        username: username,
        name: name,
        surname: surname,
        email: email,
      };
      props.editTeacher(itemToSave);
      props.setOpenPopup(false);
    };
  };



const checkUsername=(temp)=>{

    if(cusername==temp)setUsernameError(null);
    else{
      if(offline){setTimeout(()=>{if(username=="Username"){setUsernameError("nevalja")}else{setUsernameError("")}},500)};

      const requestOptions = {
          method: 'POST',
          mode:'cors',
          headers: { 'Content-Type': 'application/json'},
          credentials: 'include',
          body:JSON.stringify({username:temp})
        };

        setTimeout(function(){ 
          fetch(`/api/check/username`, requestOptions)
          .then(response => response.json())
          .then(dataFetch => {  
                  if(dataFetch.available==false){
                    setUsernameError(`This username is not available.`);
                  }
                  else{
                    setUsernameError("");
                  }
          })
          .catch((error)=>{
            console.log('Error in fetch function '+ error);
          });    
        }, 500);

    }

};

const checkName=(temp)=>{
  if(temp!==""){setNameError("")}
  else{setNameError("Name is required.")}
};

const checkSurname=(temp)=>{
  if(temp!==""){setSurnameError("")}
  else{setSurnameError("Surname is required.")}
};

const checkEmail=(temp)=>{
  if(temp===""){setEmailError("Email is required.")}
  else if(!((/$^|.+@.+..+/).test(temp))) {setEmailError("Not a valid email.")}
  else{setEmailError("")};
};

const getOTP=()=>{
    if(offline){
      setSnackbarOpen(true);
      setSnackbarStatus("success");
      setSnackbarText(`One Time Password has been send to ${email}`);    }
    else{
        const requestOptions = {
            method: 'GET',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include'
        };

        let apiUri;
        if(role==="admin") apiUri=`/api/OTP/${props.teacher.username}`
        else if(role==="teacher") apiUri=`/api/OTP/${props.teacher.username}`;

        fetch(apiUri, requestOptions)
        .then(response => {
          let d=response;
          if(d.status===201){
            setSnackbarOpen(true);
            setSnackbarStatus("success");
            setSnackbarText(`One Time Password has been send to ${email}.`);
        }
          else if(d.status===500){
            setSnackbarOpen(true);
            setSnackbarStatus("error");
            setSnackbarText(`One Time Password has ALREADY been send to ${email}.`);              
        }
         else {
            setSnackbarOpen(true);
            setSnackbarStatus("error");
            setSnackbarText("Something went wrong."); 
         };
        })
        .catch((error)=>{
            console.log('Error in fetch function '+ error);
            setSnackbarOpen(true);
            setSnackbarStatus("error");
            setSnackbarText('Error in fetch function '+ error);  
        });
  }};



  return(
        <Grid container flexDirection="column" justify="center" alignItems="center">
          {
              snackbarOpen ? <CustomSnackbar handleClose={()=>{setSnackbarOpen(false);}} open={snackbarOpen} text={snackbarText} status={snackbarStatus}/>
              : null
          } 
          <Grid item xs={12}>
            <Typography color="primary" className={classes.loginHeadline}>Edit</Typography>
          </Grid>
          <div  className={classes.root}>

            {/* <form className={classes.root} noValidate autoComplete="off"> */}
            <Grid container flexDirection="row" justify="space-evenly" alignItems="center" item xs={12}>

              <Grid container item md={12}>
                <Grid item xs={10} >
                <TextField  fullWidth className={classes.fields} disabled={disableUsername} type="string" label="Username" variant="filled" defaultValue={username} value={username} 
                    onBlur={(e)=>{ if(e.target.value.length>4){checkUsername(e.target.value);}}}
                    // onBlur={()=>{const temp=username; setUsername("");}}
                    error={(usernameError!==""&&usernameError!==null)}
                    helperText={usernameError}
                    onChange={(event)=>{setUsername(event.target.value)} }                   
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            {(usernameError==="")&&<Icon fontSize="small" style={{color:"#27ae60"}}>check_mark</Icon>}
                            {(usernameError!=="")&&(usernameError!==null)&&<Icon fontSize="small" style={{color:"#EB4949"}}>clear</Icon>}
                          </InputAdornment>
                        ),
                      }}
                >
                </TextField>
                  	{/* <TextField fullWidth className={classes.fields} disabled={disableUsername} type="string" label="Username" variant="filled" defaultValue={username} value={username} onChange={(event)=>{setUsername(event.target.value)}}/> */}
                </Grid>
                <Grid item xs={2} >
                  <IconButton onClick={()=>{setDisableUsername(!disableUsername);setDisableEmail(true);setDisableName(true);setDisableSurname(true);}} edge="end">
                    {disableUsername ? <EditIcon className={classes.greyPencil} /> : <EditIcon className={classes.greenPencil}  />}
                  </IconButton>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={10} >
                  <TextField fullWidth  className={classes.fields} disabled={disableName} type="string" label="Name" variant="filled" defaultValue={name} value={name}  helperText={nameError} error={nameError!==""&&nameError!==null} onBlur={(e)=>checkName(e.target.value)}  onChange={(event)=>{setName(event.target.value)}}/>
                </Grid>
                <Grid item xs={2} >
                  <IconButton onClick={()=>{setDisableName(!disableName);setDisableEmail(true);setDisableSurname(true);setDisableUsername(true);}} edge="end">
                    {disableName ? <EditIcon className={classes.greyPencil} /> : <EditIcon className={classes.greenPencil}  />}
                  </IconButton>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={10} >
                  <TextField fullWidth  className={classes.fields} disabled={disableSurname} type="string" label="Surname" variant="filled" defaultValue={surname} value={surname}  helperText={surnameError} error={surnameError!==""&&surnameError!==null} onBlur={(e)=>checkSurname(e.target.value)} onChange={(event)=>{setSurname(event.target.value)}}/>
                </Grid>
                <Grid item xs={2} >
                  <IconButton onClick={()=>{setDisableSurname(!disableSurname);setDisableEmail(true);setDisableName(true);setDisableUsername(true);}} edge="end">
                    {disableSurname ? <EditIcon className={classes.greyPencil} /> : <EditIcon className={classes.greenPencil}  />}
                  </IconButton>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={10} >
                  <TextField fullWidth  className={classes.fields} disabled={disableEmail} type="e-mail" label="e-mail" variant="filled" defaultValue={email}  value={email} helperText={emailError} error={emailError!==""&&emailError!==null} onBlur={(e)=>checkEmail(e.target.value)}  onChange={(event)=>{setEmail(event.target.value)}}/>
                </Grid>
                <Grid item xs={2} >
                        <IconButton onClick={()=>{setDisableEmail(!disableEmail);setDisableName(true);setDisableSurname(true);setDisableUsername(true);}} edge="end">
                                  {disableEmail ? <EditIcon className={classes.greyPencil} /> : <EditIcon className={classes.greenPencil}  />}
                        </IconButton>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Button variant="contained" disabled={OTP!==""} className={classes.loginButton} onClick={()=>getOTP()} style={{width:"100%", fontWeight:"bold" , height:"2.5rem",color:"rgba(0, 0, 0, 0.54)", marginTop:"0.4rem !important"}} type="submit" color="darkgray" >
                  Send recovery password
                </Button>
              </Grid>


              <Grid item xs={8} md={12}  style={{marginTop: "3em"}} >
                <Button variant="contained" className={classes.loginButton} onClick={()=>{if(usernameError==""||usernameError==null){saveChanges();}}} style={{borderRadius: "25px"}} type="submit" color="primary" >
                    Save
                </Button>
              </Grid>
              </Grid>
            
            </div>

            {/* </form> */}

        </Grid>


  )
}

export default EditTeacherPU;