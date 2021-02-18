import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import {  Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector} from 'react-redux';

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


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
        width: 200,
      },
    },
};


function EditTeacherPU(props) {
  //states of elements-------------------
  const offline= useSelector(state=>state.offline);
  const role=useSelector(state=>state.login);
  const [username, setUsername] = useState(()=>props.teacher.username);
  const [disableUsername, setDisableUsername] = useState(()=>true);
  const [name, setName] = useState(()=>props.teacher.name);
  const [disableName, setDisableName] = useState(()=>true);
  const [surname, setSurname] = useState(()=>props.teacher.surname);
  const [disableSurname, setDisableSurname] = useState(()=>true);
  const [email, setEmail] = useState(()=>props.teacher.email);
  const [disableEmail, setDisableEmail] = useState(()=>true);
  const [usernameError,setUsernameError]=useState(()=>"");
  const [OTP,setOTP]=useState(()=>"");
  const [OTPVisible,setOTPVisible]=useState(()=>false);



  const classes = useStyles();

  const saveChanges=()=>{
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


const checkUsername=(temp)=>{
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

};

const getOTP=()=>{
    if(offline){
      setOTP("fm934nduigtr4e");
    }
    else{
        const requestOptions = {
            method: 'GET',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include'
        };

        let apiUri;
        if(role==="admin") apiUri=`/api/OTP/${props.teacher.id}`
        else if(role==="teacher") apiUri=`/api/OTP/${props.teacher.id}`;

        fetch(apiUri, requestOptions)
        .then(response => response.json())
        .then(data => { setOTP(data.otp)})
        .catch((error)=>console.log('Error in fetch function '+ error));
    }
    setOTPVisible(true);
};



  return(
        <Grid container flexDirection="column" justify="center" alignItems="center">
          <Grid item xs={12}>
            <Typography color="primary" className={classes.loginHeadline}>Edit</Typography>
          </Grid>
          <div  className={classes.root}>

            {/* <form className={classes.root} noValidate autoComplete="off"> */}
            <Grid container flexDirection="row" justify="space-evenly" alignItems="center" item xs={12}>

              <Grid container item md={12}>
                <Grid item xs={10} >
                <TextField  fullWidth className={classes.fields} disabled={disableUsername} type="string" label="Username" variant="filled" defaultValue={username} value={username} 
                    onBlur={(e)=>{ if(e.target.value.length>4){setUsername(e.target.value); checkUsername(e.target.value);}else{setUsername(e.target.value);}}}
                    // onBlur={()=>{const temp=username; setUsername("");}}
                    error={(usernameError!=="")}
                    helperText={usernameError}
                    onChange={(event)=>{setUsername(event.target.value)} }                   
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            {(!(usernameError!==""))&&(usernameError!=undefined)&&<Icon fontSize="small" style={{color:"#27ae60"}}>check_mark</Icon>}
                            {(usernameError!=="")&&(usernameError!=undefined)&&<Icon fontSize="small" style={{color:"#EB4949"}}>clear</Icon>}
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
                  <TextField fullWidth  className={classes.fields} disabled={disableName} type="string" label="Name" variant="filled" defaultValue={name} value={name} onChange={(event)=>{setName(event.target.value)}}/>
                </Grid>
                <Grid item xs={2} >
                  <IconButton onClick={()=>{setDisableName(!disableName);setDisableEmail(true);setDisableSurname(true);setDisableUsername(true);}} edge="end">
                    {disableName ? <EditIcon className={classes.greyPencil} /> : <EditIcon className={classes.greenPencil}  />}
                  </IconButton>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={10} >
                  <TextField fullWidth  className={classes.fields} disabled={disableSurname} type="string" label="Surname" variant="filled" defaultValue={surname} value={surname} onChange={(event)=>{setSurname(event.target.value)}}/>
                </Grid>
                <Grid item xs={2} >
                  <IconButton onClick={()=>{setDisableSurname(!disableSurname);setDisableEmail(true);setDisableName(true);setDisableUsername(true);}} edge="end">
                    {disableSurname ? <EditIcon className={classes.greyPencil} /> : <EditIcon className={classes.greenPencil}  />}
                  </IconButton>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={10} >
                  <TextField fullWidth  className={classes.fields} disabled={disableEmail} type="e-mail" label="e-mail" variant="filled" defaultValue={email} value={email} onChange={(event)=>{setEmail(event.target.value)}}/>
                </Grid>
                <Grid item xs={2} >
                        <IconButton onClick={()=>{setDisableEmail(!disableEmail);setDisableName(true);setDisableSurname(true);setDisableUsername(true);}} edge="end">
                                  {disableEmail ? <EditIcon className={classes.greyPencil} /> : <EditIcon className={classes.greenPencil}  />}
                        </IconButton>
                </Grid>
              </Grid>

              {!OTPVisible&&
              <Grid container item xs={12}>
                <Button variant="contained" className={classes.loginButton} onClick={()=>getOTP()} style={{width:"100%", height:"2.5rem",color:"rgba(0, 0, 0, 0.54)", marginTop:"0.4rem !important"}} type="submit" color="darkgray" >
                    Recovery password
                </Button>
              </Grid>}

              {OTPVisible&&
                <Grid container item xs={12}>
                  <TextField fullWidth  className={classes.fields} type="string" label="Recovery One Time Password" variant="filled" defaultValue={OTP} value={OTP} />
                </Grid>
              }

              <Grid item xs={8} md={12}  style={{marginTop: "3em"}} >
                <Button variant="contained" className={classes.loginButton} onClick={()=>{if(usernameError==""){saveChanges();}}} style={{borderRadius: "25px"}} type="submit" color="primary" >
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