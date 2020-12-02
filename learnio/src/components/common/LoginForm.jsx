import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {useState} from 'react';
const styles = {
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
    }
  };
  const PostLogin=(event,object)=>{
      
      console.log(JSON.stringify(object));
      event.preventDefault();
    const requestOptions = {
        method: 'POST',
        mode:'cors',
        headers: { 'Content-Type': 'application/json'
        },
        body: JSON.stringify({username:object.usernames, password:object.passwords})
    };
    fetch('http://localhost:3000/login', requestOptions)
        .then((response) => {
            if(response.status===200)
            {
                object.pageprops.history.push('/')
            }
            else {
                console.log('krivoo');
                console.log(response);
            }
        })
        .catch((error)=>{
            console.log('Error in fetch function '+error);
        });
}
function LoginForm(props){
    const [username, setUsername]=useState("");
  const [password, setPassword]=useState("");
  let object={
      pageprops:props.pageProps,
      usernames:username,
      passwords:password
  };
    let classes=props.classes;
        return (
            <React.Fragment>
                <Typography color="primary" className={classes.loginHeadline}>Login </Typography>
                <form onSubmit={(e)=>{PostLogin(e,object)}} className={classes.root} noValidate autoComplete="off" >
                    <TextField onChange={(e)=>{setUsername(e.target.value)}} fullWidth className={classes.fields} type="email" label="E-mail" variant="filled" />
                    <TextField onChange={(e)=>{setPassword(e.target.value)}} fullWidth  className={classes.fields} type="password" label="Password" variant="filled" />
                    <Button variant="contained" className={classes.loginButton} style={{borderRadius: 25}} type="submit" color="primary" >
                        Prijavi se
                    </Button>
                </form>
            </React.Fragment>
        );
};

export default withStyles(styles)(LoginForm);