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
      marginTop: "2em",
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
  const role=useSelector(state=>state.login);
  const [username, setUsername] = useState(()=>props.student.username);
  const [disableUsername, setDisableUsername] = useState(()=>true);
  const [name, setName] = useState(()=>props.student.name);
  const [disableName, setDisableName] = useState(()=>true);
  const [surname, setSurname] = useState(()=>props.student.surname);
  const [disableSurname, setDisableSurname] = useState(()=>true);
  const [email, setEmail] = useState(()=>props.student.email);
  const [disableEmail, setDisableEmail] = useState(()=>true);
  const [studentClasses, setStudentClasses] = useState(()=>props.student.classes.map((cl)=>cl.id));
  const [disableStudentClasses, setDisableStudentClasses] = useState(()=>true);
  const [password, setPassword] = useState(()=>(role=="admin")?props.student.password:"");
  const [disablePassword, setDisablePassword] = useState(()=>true);
  const [showPassword, setShowPassword] = useState(()=>false);


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
    let itemToSave;
    let st=studentClasses.map((cl)=>{for(let i of props.allClasses){if(i.id==cl){return {name:i.name,id:i.id}}}});
    itemToSave={
      id: props.student.id,
      created:props.student.created,
      username: username,
      name: name,
      surname: surname,
      email: email,
      password: password,
      classes: st
    };
    props.editStudent(itemToSave);
    props.setOpenPopup(false);

  };

  const handleChangeClasses=(event)=>{
    setStudentClasses(event.target.value);
  };

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
          <Grid item xs={12}>
            <Typography color="primary" className={classes.loginHeadline}>Edit</Typography>
          </Grid>
          <div  className={classes.root}>

            {/* <form className={classes.root} noValidate autoComplete="off"> */}
            <Grid container flexDirection="row" justify="space-evenly" alignItems="center" item xs={12}>

              <Grid container item md={12}>
                <Grid item xs={10} >
                  	<TextField fullWidth className={classes.fields} disabled={disableUsername} type="string" label="Username" variant="filled" defaultValue={username} value={username} onChange={(event)=>{setUsername(event.target.value)}}/>
                </Grid>
                <Grid item xs={2} >
                  <IconButton onClick={()=>{setDisableUsername(!disableUsername);setDisableEmail(true);setDisableName(true);setDisableSurname(true);setShowPassword(false);setDisablePassword(true);setDisableStudentClasses(true)}} edge="end">
                    {disableUsername ? <EditIcon className={classes.greyPencil} /> : <EditIcon className={classes.greenPencil}  />}
                  </IconButton>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={10} >
                  <TextField fullWidth  className={classes.fields} disabled={disableName} type="string" label="Name" variant="filled" defaultValue={name} value={name} onChange={(event)=>{setName(event.target.value)}}/>
                </Grid>
                <Grid item xs={2} >
                  <IconButton onClick={()=>{setDisableName(!disableName);setDisableEmail(true);setDisableSurname(true);setDisablePassword(true);setShowPassword(false);setDisableUsername(true);setDisableStudentClasses(true)}} edge="end">
                    {disableName ? <EditIcon className={classes.greyPencil} /> : <EditIcon className={classes.greenPencil}  />}
                  </IconButton>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={10} >
                  <TextField fullWidth  className={classes.fields} disabled={disableSurname} type="string" label="Surname" variant="filled" defaultValue={surname} value={surname} onChange={(event)=>{setSurname(event.target.value)}}/>
                </Grid>
                <Grid item xs={2} >
                  <IconButton onClick={()=>{setDisableSurname(!disableSurname);setDisableEmail(true);setDisableName(true);setDisablePassword(true);setShowPassword(false);setDisableUsername(true);setDisableStudentClasses(true)}} edge="end">
                    {disableSurname ? <EditIcon className={classes.greyPencil} /> : <EditIcon className={classes.greenPencil}  />}
                  </IconButton>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={10} >
                  <TextField fullWidth  className={classes.fields} disabled={disableEmail} type="e-mail" label="e-mail" variant="filled" defaultValue={email} value={email} onChange={(event)=>{setEmail(event.target.value)}}/>
                </Grid>
                <Grid item xs={2} >
                        <IconButton onClick={()=>{setDisableEmail(!disableEmail);setDisableName(true);setDisableSurname(true);setDisablePassword(true);setShowPassword(false);setDisableUsername(true);setDisableStudentClasses(true)}} edge="end">
                                  {disableEmail ? <EditIcon className={classes.greyPencil} /> : <EditIcon className={classes.greenPencil}  />}
                        </IconButton>
                </Grid>
              </Grid>

              {(role=="admin")&&<Grid container item xs={12}>
                {/* <TextField fullWidth  className={classes.fields} type="password" label="Password" variant="filled" defaultValue="JdakFoly0"/> */}
                <Grid item xs={10} >
                  <FormControl className={classes.fields} variant="filled">
                    <InputLabel >Password</InputLabel>
                    <FilledInput type={showPassword ? 'text' : 'password'} value={password} defaultValue={password} disabled={disablePassword} onChange={(event)=>{setPassword(event.target.value)}} endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={()=>{if(!disablePassword){setShowPassword(!showPassword)}} } edge="end">
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2} >
                  <IconButton onClick={()=>{setDisablePassword(!disablePassword);setShowPassword(false);setDisableEmail(true);setDisableName(true);setDisableSurname(true);setDisableUsername(true);setDisableStudentClasses(true)}} edge="end">
                            {disablePassword ? <EditIcon className={classes.greyPencil} /> : <EditIcon className={classes.greenPencil}  />}
                  </IconButton>
                </Grid>
              </Grid>
              }
              <Grid container item xs={12}>
              <Grid item xs={10} >
                <FormControl variant="filled" className={classes.fields}>
                    <InputLabel >Classes</InputLabel>
                    <Select  multiple value={studentClasses} onChange={handleChangeClasses}  disabled={disableStudentClasses} renderValue={(selected) => {let array=selected.map((selClass)=>{for(let cl of props.allClasses){if(cl.id==selClass)return `${cl.name}`}}); return array.join(`, `);} } MenuProps={MenuProps}>
                      {props.allClasses.map((oneClass) => {
                        return(
                          <MenuItem key={oneClass.id} value={oneClass.id}>
                          {/* <Checkbox checked={checkIfIn(oneClass)}/> */}
                          <ListItemText primary={`${oneClass.name} #${oneClass.id}`}  />
                        </MenuItem>
                        )})}
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={2} >
                  <IconButton onClick={()=>{setDisableStudentClasses(!disableStudentClasses);setDisablePassword(true);setShowPassword(false);setDisableEmail(true);setDisableName(true);setDisableSurname(true);setDisableUsername(true)}} edge="end">
                            {setDisableStudentClasses ? <EditIcon className={classes.greyPencil} /> : <EditIcon className={classes.greenPencil}  />}
                  </IconButton>
                </Grid>
              </Grid>

              <Grid item xs={8} md={12}>
                <Button variant="contained" className={classes.loginButton} onClick={saveChanges} style={{borderRadius: "25px"}} type="submit" color="primary" >
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