import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import {  Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import EditIcon from '@material-ui/icons/Edit';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
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


function EditStudentPU(props) {
  //states of elements-------------------
  const offline= useSelector(state=>state.offline);
  const role=useSelector(state=>state.login);
  const [cusername, setCUsername] = useState(()=>props.student.username);
  const [username, setUsername] = useState(()=>props.student.username);
  const [disableUsername, setDisableUsername] = useState(()=>true);
  const [usernameError,setUsernameError]=useState(()=>null);
  const [name, setName] = useState(()=>props.student.name);
  const [disableName, setDisableName] = useState(()=>true);
  const [nameError,setNameError]=useState(()=>null);
  const [surname, setSurname] = useState(()=>props.student.surname);
  const [disableSurname, setDisableSurname] = useState(()=>true);
  const [surnameError,setSurnameError]=useState(()=>null);
  const [email, setEmail] = useState(()=>props.student.email);
  const [disableEmail, setDisableEmail] = useState(()=>true);
  const [emailError,setEmailError]=useState(()=>null);
  const [studentClasses, setStudentClasses] = useState(()=>props.student.classes.map((cl)=>cl.class_id));
  const [disableStudentClasses, setDisableStudentClasses] = useState(()=>true);
  const [OTP,setOTP]=useState(()=>"");
  const [birthDate,setBirthDate]=useState(new Date());
  const [disableBirthDate, setDisableBirthDate] = useState(()=>true);
  const [snackbarOpen, setSnackbarOpen]=useState(()=>false);
  const [snackbarText,setSnackbarText]=useState(()=>"");
  const [snackbarStatus,setSnackbarStatus]=useState(()=>"");


  const classes = useStyles();
//dropdown button---------------------


//   const handleSave= ()=>{
//     let send={
//       id:quest.id,
//       text:text,
//       question_type:(multipleAnswer?1:2),
//       image_path:imageState,
//       row_D:quest.row_D,
//       column_A:quest.column_A,
//       answer_a:((wrongAnswers.length>0)?wrongAnswers[0]:null),
//       answer_b:((wrongAnswers.length>1)?wrongAnswers[1]:null),
//       answer_c:((wrongAnswers.length>2)?wrongAnswers[2]:null),
//       answer_d:((wrongAnswers.length>3)?wrongAnswers[3]:null),
//       solution:correctAnswer
//     }
//     props.questChange(send);
//     props.popUpClose(false);
//   }
// //------------------------

  const saveChanges=()=>{
    checkEmail(email);
    checkName(name);
    checkSurname(surname);
    checkUsername(username);
    if((nameError==""||nameError==null)&&(surnameError==""||surnameError==null)&&(usernameError==""||usernameError==null)&&(emailError==""||emailError==null)){
      let itemToSave;
      let st=studentClasses.map((cl)=>{for(let i of props.allClasses){if(i.class_id==cl){return i.class_id}}});
      itemToSave={
        id: props.student.id,
        created:props.student.created,
        username: username,
        name: name,
        surname: surname,
        email: email,
        classes: st
      };
      props.editStudent(itemToSave);
      props.setOpenPopup(false);  
    }
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
                  // setUsername(temp);
          })
          .catch((error)=>{
            console.log('Error in fetch function '+ error);
          });    
        }, 500);
      }

};

  const handleChangeClasses=(event)=>{
    setStudentClasses(event.target.value);
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
    if(temp==""){setEmailError("Email is required.")}
    else if(!((/$^|.+@.+..+/).test(temp))) {setEmailError("Not a valid email.")}
    else{setEmailError("")};
};

  const getOTP=()=>{
    if(offline){
      setSnackbarOpen(true);
      setSnackbarStatus("success");
      setSnackbarText(`One Time Password has been send to ${email}`);    
    }
    else{
        const requestOptions = {
            method: 'GET',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include'
        };

        let apiUri;
        if(role==="admin") apiUri=`/api/OTP/${props.student.username}`
        else if(role==="teacher") apiUri=`/api/OTP/${props.student.username}`;

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
  }
  };

  //SNACKBAR

  // const checkIfIn=(oneClass)=>{
  //   let bool=false;
  //   props.student.classes.map((sCl)=>{
  //     if(sCl.id===oneClass.id) {
  //       bool=true;
  //     }
  //   });
  //   return bool;
  // };



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
                    error={(usernameError!==""&&usernameError!=null)}
                    helperText={usernameError}
                    onChange={(event)=>{setUsername(event.target.value)} }                   
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            {((usernameError==""))&&<Icon fontSize="small" style={{color:"#27ae60"}}>check_mark</Icon>}
                            {(usernameError!=="")&&(usernameError!=null)&&<Icon fontSize="small" style={{color:"#EB4949"}}>clear</Icon>}
                          </InputAdornment>
                        ),
                      }}
                />
                </Grid>
                <Grid item xs={2} >
                  <IconButton onClick={()=>{setDisableUsername(!disableUsername);setDisableBirthDate(true);setDisableEmail(true);setDisableName(true);setDisableSurname(true);setDisableStudentClasses(true)}} edge="end">
                    {disableUsername ? <EditIcon className={classes.greyPencil} /> : <EditIcon className={classes.greenPencil}  />}
                  </IconButton>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={10} >
                  <TextField fullWidth  className={classes.fields} disabled={disableName} type="string" label="Name" variant="filled" defaultValue={name} value={name} helperText={nameError} error={nameError!==""&&nameError!==null} onBlur={(e)=>checkName(e.target.value)} onChange={(event)=>{setName(event.target.value)}}/>
                </Grid>
                <Grid item xs={2} >
                  <IconButton onClick={()=>{setDisableName(!disableName);setDisableBirthDate(true);setDisableEmail(true);setDisableSurname(true);setDisableUsername(true);setDisableStudentClasses(true)}} edge="end">
                    {disableName ? <EditIcon className={classes.greyPencil} /> : <EditIcon className={classes.greenPencil}  />}
                  </IconButton>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={10} >
                  <TextField fullWidth  className={classes.fields} disabled={disableSurname} type="string" label="Surname" variant="filled" defaultValue={surname} value={surname} helperText={surnameError} error={surnameError!==""&&surnameError!==null} onBlur={(e)=>checkSurname(e.target.value)} onChange={(event)=>{setSurname(event.target.value)}}/>
                </Grid>
                <Grid item xs={2} >
                  <IconButton onClick={()=>{setDisableSurname(!disableSurname);setDisableBirthDate(true);setDisableEmail(true);setDisableName(true);setDisableUsername(true);setDisableStudentClasses(true)}} edge="end">
                    {disableSurname ? <EditIcon className={classes.greyPencil} /> : <EditIcon className={classes.greenPencil}  />}
                  </IconButton>
                </Grid>
              </Grid>
{/* 

              <Grid container item xs={12}>
                <Grid item xs={10} >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker style={{marginTop:0}} className={classes.fields}
                          fullWidth
                          inputVariant="filled"
                          margin="normal"
                          id="date-picker-dialog"
                          label="Birth Date"
                          format="dd/MM/yyyy"
                          value={birthDate}
                          disabled={disableBirthDate}
                          onChange={(date)=>{console.log(date);setBirthDate(date);}}
                          KeyboardButtonProps={{
                              'aria-label': 'change date',
                          }}
                      />
                  </MuiPickersUtilsProvider>                
                </Grid>
                <Grid item xs={2} >
                        <IconButton onClick={()=>{setDisableBirthDate(!disableBirthDate);setDisableName(true);setDisableEmail(true);setDisableSurname(true);setDisableUsername(true);setDisableStudentClasses(true)}} edge="end">
                                  {disableBirthDate ? <EditIcon className={classes.greyPencil} /> : <EditIcon className={classes.greenPencil}  />}
                        </IconButton>
                </Grid>
              </Grid> */}

              <Grid container item xs={12}>
                <Grid item xs={10} >
                  <TextField fullWidth  className={classes.fields} disabled={disableEmail} type="e-mail" label="e-mail" variant="filled" defaultValue={email} value={email} helperText={emailError} error={emailError!==""&&emailError!==null} onBlur={(e)=>checkEmail(e.target.value)} onChange={(event)=>{setEmail(event.target.value)}}/>
                </Grid>
                <Grid item xs={2} >
                        <IconButton onClick={()=>{setDisableEmail(!disableEmail);setDisableBirthDate(true);setDisableName(true);setDisableSurname(true);setDisableUsername(true);setDisableStudentClasses(true)}} edge="end">
                                  {disableEmail ? <EditIcon className={classes.greyPencil} /> : <EditIcon className={classes.greenPencil}  />}
                        </IconButton>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
              <Grid item xs={10} >
                <FormControl variant="filled" className={classes.fields}>
                    <InputLabel >Classes</InputLabel>
                    <Select  multiple value={studentClasses} onChange={handleChangeClasses}  disabled={disableStudentClasses} renderValue={(selected) => {let array=selected.map((selClass)=>{for(let cl of props.allClasses){if(cl.class_id==selClass)return `${cl.class_name}`}}); return array.join(`, `);} } MenuProps={MenuProps}>
                      {props.allClasses.map((oneClass) => {
                        return(
                          <MenuItem key={oneClass.class_id} value={oneClass.class_id}>
                          {/* <Checkbox checked={checkIfIn(oneClass)}/> */}
                          <ListItemText primary={`${oneClass.class_name} #${oneClass.class_id}`}  />
                        </MenuItem>
                        )})}
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={2} >
                  <IconButton onClick={()=>{setDisableStudentClasses(!disableStudentClasses);setDisableBirthDate(true);setDisableEmail(true);setDisableName(true);setDisableSurname(true);setDisableUsername(true)}} edge="end">
                            {setDisableStudentClasses ? <EditIcon className={classes.greyPencil} /> : <EditIcon className={classes.greenPencil}  />}
                  </IconButton>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Button variant="contained" className={classes.loginButton} onClick={()=>getOTP()} style={{width:"100%", fontWeight:"bold" , height:"2.5rem",color:"rgba(0, 0, 0, 0.54)", marginTop:"0.4rem !important"}} type="submit" color="darkgray" >
                    Send recovery password
                </Button>
              </Grid>

              <Grid item xs={8} md={12}  style={{marginTop: "3em"}} >
                <Button variant="contained" className={classes.loginButton} onClick={()=>{if(usernameError==""||usernameError==null){saveChanges();}}} style={{borderRadius: "25px", fontWeight:"bold"}} type="submit" color="primary" >
                    Save
                </Button>
              </Grid>
              </Grid>
            
            </div>

            {/* </form> */}

        </Grid>


  )
}

export default EditStudentPU;