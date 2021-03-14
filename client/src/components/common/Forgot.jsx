import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {useState} from 'react';
import { useSelector} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import backgroundimg from '../../images/learniobglogin.png'
import { makeStyles} from '@material-ui/core/styles';
import CustomSnackbar from '../common/Snackbar.jsx';

const background = {
    width: "100%",
    height: "100vh",
    backgroundImage: "url("+backgroundimg+")" ,

}

const vertAlign = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
}

const useStyles = makeStyles((theme) => ({
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
        marginBottom: "0.5em",
        
    },
    loginButton:{
        margin: "auto",
        marginTop: "1.5em",
        marginBottom: "3em",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height:"3rem"

    },
    link:{
        margin:"1rem auto 0.5rem auto",
        textAlign: "center",
    }

}));


function Forgot(){
    const [username, setUsername]=useState("");
    const [snackbarOpen, setSnackbarOpen]=useState(()=>false);
    const [snackbarText,setSnackbarText]=useState(()=>"");
    const [snackbarStatus,setSnackbarStatus]=useState(()=>"");
    let classes=useStyles();
    const role=useSelector(state=>state.login);

    const getOTP=(e)=>{

            e.preventDefault();

            const requestOptions = {
                method: 'GET',
                mode:'cors',
                headers: { 'Content-Type': 'application/json'},
                credentials: 'include'
            };
    
            fetch(`/api/OTP/${username}`, requestOptions)
            .then(response => {
              let d=response;
              if(d.status===201){
                setSnackbarOpen(true);
                setSnackbarStatus("success");
                setSnackbarText("One Time Password has been send to your email.");
            }
              else if(d.status===500){
                setSnackbarOpen(true);
                setSnackbarStatus("error");
                setSnackbarText("One Time Password has ALREADY been send to your email.");              
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
    

    return (
        <div style={{...background, ...vertAlign}}>
            <Grid container direction="row" justify="center" alignItems="center">
                {
                    snackbarOpen ? <CustomSnackbar handleClose={()=>{setSnackbarOpen(false);}} open={snackbarOpen} text={snackbarText} status={snackbarStatus}/>
                    : null
                } 
                <Grid item xs={11} sm={6} md={4} lg={3}>
                    <Paper elevation={3} style = {{ ...vertAlign}}>
                        <React.Fragment>
                            <Typography color="primary" className={classes.loginHeadline}>Recovery</Typography>
                            <form onSubmit={(e)=>{if(username!=""){getOTP(e)}}} className={classes.root} noValidate autoComplete="off" >
                                <TextField onChange={(e)=>{setUsername(e.target.value)}} fullWidth  className={classes.fields} type="text" label="Username" variant="filled" />
                                <Button variant="contained" className={classes.loginButton} style={{borderRadius: 5}} type="submit" color="primary" >
                                    Send one time password
                                </Button>
                            </form>
                        </React.Fragment>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};



export default Forgot;