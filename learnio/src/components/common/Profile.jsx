import React,{useState,useEffect} from 'react';
import { FilledInput, makeStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import backgroundIMG from '../../images/learniobg10-15.png'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import {loginRedirect} from '../../redux/actions/loginRedirect';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import backgroundimg from '../../images/learniobglogin.png'
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import EditIcon from '@material-ui/icons/Edit';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { FormHelperText } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {userLoggedIn} from '../../redux/actions/user';
import PopupDialog from '../common/PopupDialog';

const randomColor=()=>{
    let colors=["#27ae60","#4373ec","#8f8e8b","#EB4949"];
    let darkColors=["#13532e","#103aa2","#4e4d4b","#a11212"];
    let i=(Math.floor(Math.random()*10000))%4;
    return {c:colors[i],dc:darkColors[i]};
  };
  let col=randomColor();

const useStyles = makeStyles((theme) => ({
    background:{
        backgroundSize: "cover",
        maxHeight:"100vh",
        backgroundImage:"url("+backgroundIMG+")",
        backgroundPosition: "fixed",
        backgroundAttachment: "fixed",
        backgroundRepeat: "repeat-y",

    },
    fields: {
        display: 'flex-inline',
        width: "100%",
        marginBottom: "0.5em",

    }, 
    greenPencil:{
        color:"#27ae60"
    },
      greyPencil:{
        color:"#a2a2a2"
    },
    root: {
        margin: '0 auto',
        width: "80%",
    },
    loginButton:{
        margin: "auto",
        height:"3rem",
        width:"8rem",
        marginTop: "0",
        marginBottom: "3.5em",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileDiv:{  
        margin:"5rem auto 4rem auto",
        borderRadius:"50%",
        height:"9rem", 
        width:"9rem",  
        border: "1px solid lightgray",  
        backgroundClip: "content-box",  
        padding: "0.2rem",
        backgroundColor:col.c,
        '&:hover': {backgroundColor: col.dc}
    },
    profileButton: {
        height: "9rem", 
        textAlign: "center", 
        margin: "2.5rem 0 0 0", 
        cursor: "pointer",
        fontWeight:"bold",
        fontSize:"3.5rem",
        color:"white"
    },
    topicTitle:{
        fontFamily:'Lobster',
        fontSize:'2.5rem',
        marginBottom:"1rem",
        textShadow:" -5px 5px #30303033",
        color: "#3b3a3a"
    },
    saveBtn: {
        fontWeight:"bold",
        borderRadius: "7px",
        background:"#EB4949",
        color:"white",
        paddingLeft:"3em",
        paddingRight:"3em",
        marginTop:"2.5em",
        marginBottom:"2.5em",
        height:"2.7rem",
        backgroundColor: "#27ae60",
        '&:hover': {
        backgroundColor: "#13532e",
        },
    },
    pwButton: {
        width:"100%", 
        height:"2.5rem",
        color:"white",
        fontWeight:"bold", 
        marginTop:"0.4rem !important",
        backgroundColor: "#27ae60",
        '&:hover': {
        backgroundColor: "#13532e",
        },
        height:"3rem",
        marginTop:"0.5em",
        marginBottom:"2.5em",
    },
    Grid:{
        width:"100%",
        height:"100%",
    },
    pwFields:{
        display: 'flex-inline',
        width: "90%",
        marginBottom: "0.5em",
    },
}));


const background = {
    width: "100%",
    height: "100vh",
    backgroundImage: "url("+backgroundimg+")" ,

}

const vertAlign = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
}


function Profile(props) {
    const dispatch= useDispatch();
    const classes=useStyles();
    const offline= useSelector(state=>state.offline);
    const [loading, setLoading] = useState(()=>!offline);
    const [username, setUsername] = useState(()=>"");
    const [disableUsername, setDisableUsername] = useState(()=>true);
    const [usernameError,setUsernameError]=useState(()=>null);
    const [name, setName] = useState(()=>"");
    const [disableName, setDisableName] = useState(()=>true);
    const [nameError,setNameError]=useState(()=>null);
    const [surname, setSurname] = useState(()=>"");
    const [disableSurname, setDisableSurname] = useState(()=>true);
    const [surnameError,setSurnameError]=useState(()=>null);
    const [email, setEmail] = useState(()=>"");
    const [disableEmail, setDisableEmail] = useState(()=>true);
    const [emailError,setEmailError]=useState(()=>null);
    const [firstTime,setFirstTime]=useState(()=>true);
    const [oldPW,setOldPW]=useState(()=>"");
    const [oldPWError,setOldPWError]=useState(()=>null);
    const [newPW1,setNewPW1]=useState(()=>"");
    const [newPW2,setNewPW2]=useState(()=>"");
    const [newPWError,setNewPWError]=useState(()=>null);
    const [visible1,setVisible1]=useState(()=>false);
    const [visible2,setVisible2]=useState(()=>false);
    const [visible3,setVisible3]=useState(()=>false);
    const [popup,setPopup]=useState(()=>false);
    const acro=useSelector(state=>state.username);


    const checkUsername=(temp)=>{
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
    };

    const changePassword=()=>{

        if(offline){                  
            setOldPWError("Incorrect current password.");
            // setSTEP2(false);
            // setSTEP3(true);  
        };
        const requestOptions = {
            method: 'POST',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include',
            body:JSON.stringify({password:oldPW, newPassword:newPW1})
          };
    
        checkNewPW();
        if(newPWError==""||newPWError==null){
            fetch(`/api/check/password`, requestOptions)
            .then((response)=>{
                if(response.status===200)
                {
                    setPopup(false);
                    setOldPWError(null);
                    setNewPW1("");
                    setNewPW2("");
                    setOldPW("");
                    setNewPWError(null);
                }
                else if(response.status===401)
                {
                    Promise.resolve(response).then(response => {
                        setOldPWError("Incorrect current password.")
                })}
            })
            .catch((error)=>{
                console.log('Error in fetch function '+ error);
                setOldPWError("Incorrect password.")
            });                
        }


    };

    const checkNewPW=()=>{
        if(newPW1.length<5||newPW2.length<5) setNewPWError("Password shold be longer than 4 characters.")
        else if(newPW1!==newPW2) setNewPWError("Passwords don't match.")
        else setNewPWError("");
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

    const saveChanges=()=>{
        checkEmail(email);
        checkName(name);
        checkSurname(surname);
        checkUsername(username);
        let apiURI;

        if((nameError==""||nameError==null)&&(surnameError==""||surnameError==null)&&(usernameError==""||usernameError==null)&&(emailError==""||emailError==null)&&(newPWError==""||newPWError==null)){
            let itemToSave={
                username: username,
                name: name,
                surname: surname,
                email: email,
            };   
            const requestOptions = {
                method: 'POST',
                mode:'cors',
                headers: { 'Content-Type': 'application/json'},
                credentials: 'include',
                body:JSON.stringify(itemToSave)
              };

            if(offline){
                setNameError(null);
                setSurnameError(null);
                setEmailError(null);
                setUsernameError(null);
                dispatch(userLoggedIn(name[0]+surname[0]));
            }
        
            fetch(apiURI, requestOptions)
            .then(response => response.json())
            .then(dataFetch => {  
                setNameError(null);
                setSurnameError(null);
                setEmailError(null);
                setUsernameError(null);
                dispatch(userLoggedIn(name[0]+surname[0]));

            })
            .catch((error)=>{
                console.log('Error in fetch function '+ error);
            });    
        }
    };

    const getData=()=>{
        const requestOptions = {
            method: 'GET',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include',
          };
    

        if(!offline){fetch(`/api/account`, requestOptions)
        .then(response => response.json())
        .then(dataFetch => {  
                setUsername(dataFetch.username);
                setName(dataFetch.username);
                setSurname(dataFetch.username);
                setEmail(dataFetch.username);
        })
        .catch((error)=>{
            console.log('Error in fetch function '+ error);
        });}
        else{
            setUsername("Username19");
            setName("User");
            setSurname("Userovich");
            setEmail("user@gmail.com");
        }
    };

    useEffect(()=>{
        if(firstTime){
            getData();
            setFirstTime(false);
        }
    },[]);


    return (
        <div style={{...background, ...vertAlign}}>
        <Grid container direction="row" justify="center" alignItems="center" style={{marginTop:"3em"}}>
            <Grid item xs={11} sm={6} md={4} lg={3}>
                <Paper elevation={3} style = {{ ...vertAlign}}>
                    <Grid container direction="column" align="center" Justify="space-evenly" className={classes.background} >  
                        <React.Fragment >
                            <div className={classes.profileDiv}><p className={classes.profileButton}>{acro}</p></div>
                            <div  className={classes.root}>
                                <Grid container flexDirection="row" justify="space-evenly" alignItems="center" item xs={12}>

                                <Grid container item md={12}>
                                    <Grid item xs={10} >
                                        <TextField  fullWidth className={classes.fields} disabled={disableUsername} type="string" label="Username" variant="filled" defaultValue={username} value={username} 
                                            onBlur={(e)=>{ if(e.target.value.length>4){checkUsername(e.target.value);}}}
                                            error={(usernameError!=="")&&(usernameError!==null)}
                                            helperText={usernameError}
                                            onChange={(event)=>{setUsername(event.target.value)} }                   
                                            InputProps={{
                                                endAdornment: (
                                                <InputAdornment position="start">
                                                    {(usernameError=="")&&(usernameError!=undefined)&&<Icon fontSize="small" style={{color:"#27ae60"}}>check_mark</Icon>}
                                                    {(usernameError!==null)&&(usernameError!=="")&&(usernameError!=undefined)&&<Icon fontSize="small" style={{color:"#EB4949"}}>clear</Icon>}
                                                </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={2} >
                                        <IconButton onClick={()=>{setDisableUsername(!disableUsername);setDisableEmail(true);setDisableName(true);setDisableSurname(true);}} edge="end">
                                            {disableUsername ? <EditIcon className={classes.greyPencil} /> : <EditIcon className={classes.greenPencil}  />}
                                        </IconButton>
                                    </Grid>
                                </Grid>

                                <Grid container item xs={12}>
                                    <Grid item xs={10} >
                                        <TextField fullWidth helperText={nameError} error={nameError!==""&&nameError!==null} className={classes.fields} disabled={disableName} type="string" label="Name" variant="filled" defaultValue={name} value={name} onBlur={()=>checkName(name)} onChange={(event)=>{setName(event.target.value)}}/>
                                    </Grid>
                                    <Grid item xs={2} >
                                        <IconButton onClick={()=>{setDisableName(!disableName);setDisableEmail(true);setDisableSurname(true);setDisableUsername(true);}} edge="end">
                                            {disableName ? <EditIcon className={classes.greyPencil} /> : <EditIcon className={classes.greenPencil}  />}
                                        </IconButton>
                                    </Grid>
                                </Grid>

                                <Grid container item xs={12}>
                                    <Grid item xs={10} >
                                        <TextField fullWidth helperText={surnameError} error={surnameError!==""&&surnameError!==null}  className={classes.fields} disabled={disableSurname} type="string" label="Surname" variant="filled" defaultValue={surname} value={surname} onBlur={()=>checkSurname(surname)} onChange={(event)=>{setSurname(event.target.value)}}/>
                                    </Grid>
                                    <Grid item xs={2} >
                                        <IconButton onClick={()=>{setDisableSurname(!disableSurname);setDisableEmail(true);setDisableName(true);setDisableUsername(true);}} edge="end">
                                            {disableSurname ? <EditIcon className={classes.greyPencil} /> : <EditIcon className={classes.greenPencil}  />}
                                        </IconButton>
                                    </Grid>
                                </Grid>

                                <Grid container item xs={12}>
                                        <Grid item xs={10} >
                                            <TextField fullWidth helperText={emailError} error={emailError!==""&&emailError!==null}  className={classes.fields} disabled={disableEmail} type="e-mail" label="e-mail" variant="filled" defaultValue={email} value={email} onBlur={()=>checkEmail(email)} onChange={(event)=>{setEmail(event.target.value)}}/>
                                        </Grid>
                                        <Grid item xs={2} >
                                            <IconButton onClick={()=>{setDisableEmail(!disableEmail);setDisableName(true);setDisableSurname(true);setDisableUsername(true);}} edge="end">
                                                    {disableEmail ? <EditIcon className={classes.greyPencil} /> : <EditIcon className={classes.greenPencil} />}
                                            </IconButton>
                                        </Grid>
                                </Grid>

                                <Grid container item xs={12}>
                                    <Button variant="contained" onClick={()=>{setPopup(true);}} className={classes.pwButton}  type="submit" color="darkgray" >
                                        Change password
                                    </Button>
                                </Grid>

                                {popup&&
                                <PopupDialog openPopup={popup} setOpenPopup={()=>setPopup(false)} clickAway={false} style={{minWidth:'33%',minHeight:'30%'}}>
                                        <Grid container  direction="column" justify="space-between" alignItems="center">
                                            <Grid item xs={12}>     
                                                <Typography className={classes.topicTitle}>Password</Typography>
                                            </Grid>
                                            <Grid container item xs={12}  direction="column" justify="space-between" alignItems="center">                                          
                                                <FormControl  className={classes.pwFields} variant="filled" error={oldPWError!=""&&oldPWError!=null}>               
                                                    <InputLabel  variant="filled" htmlFor="filled-adornment-password" >Current password</InputLabel>
                                                    <FilledInput fullWidth error={oldPWError!=null&&oldPWError!=""}  defaultValue={oldPW} value={oldPW} onChange={(e)=>setOldPW(e.target.value)} 
                                                        id="filled-adornment-password"
                                                        type={visible1 ? 'text' : 'password'}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={()=>setVisible1(!visible1)}
                                                                onMouseDown={(e)=>e.preventDefault()}
                                                            >
                                                            {visible1 ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                            </InputAdornment>
                                                        }      
                                                    />
                                                    {<FormHelperText>{oldPWError}</FormHelperText>}
                                                </FormControl>
                                            </Grid>
                                            <Grid container item xs={12} direction="column" justify="space-between" alignItems="center">
                                                <FormControl  error={newPWError!==null&&newPWError!==""} className={classes.pwFields} variant="filled" >               
                                                    <InputLabel  variant="filled" htmlFor="filled-adornment-password" >New Password</InputLabel>
                                                    <FilledInput fullWidth error={newPWError!==null&&newPWError!==""}  defaultValue={newPW1} value={newPW1} onChange={(e)=>setNewPW1(e.target.value)}
                                                        id="filled-adornment-password"
                                                        type={visible2 ? 'text' : 'password'}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={()=>setVisible2(!visible2)}
                                                                onMouseDown={(e)=>e.preventDefault()}
                                                            >
                                                            {visible2 ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                            </InputAdornment>
                                                        }      
                                                    />
                                                </FormControl> 
                                            </Grid>
                                            <Grid container item xs={12} direction="column" justify="space-between" alignItems="center">
                                                <FormControl  error={newPWError!==null&&newPWError!==""} className={classes.pwFields} variant="filled" >               
                                                    <InputLabel  variant="filled" htmlFor="filled-adornment-password" >Repeat New Password</InputLabel>
                                                    <FilledInput fullWidth error={newPWError!==null&&newPWError!==""} defaultValue={newPW2} value={newPW2} onBlur={()=>checkNewPW()} onChange={(e)=>setNewPW2(e.target.value)}
                                                        id="filled-adornment-password"
                                                        type={visible3 ? 'text' : 'password'}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={()=>setVisible3(!visible3)}
                                                                onMouseDown={(e)=>e.preventDefault()}
                                                            >
                                                            {visible3 ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                            </InputAdornment>
                                                        }      
                                                    />
                                                    {<FormHelperText>{newPWError}</FormHelperText>}
                                                </FormControl>                                                   
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button variant="contained"  onClick={()=>{changePassword();}} className={classes.saveBtn} type="submit" color="primary" >
                                                Save Password
                                            </Button>
                                        </Grid>
                                </PopupDialog>
                                }

                                <Grid item xs={8} md={12}  >
                                    <Button variant="contained" className={classes.loginButton} onClick={()=>{saveChanges();}} style={{ borderRadius: "7px", fontWeight:"bold"}} type="submit" color="primary" >
                                        Save
                                    </Button>
                                </Grid>
                                </Grid>

                            </div>

                        </React.Fragment>        
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    </div>

    );
}

export default Profile;