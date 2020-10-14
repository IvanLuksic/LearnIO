import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

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
        marginTop: "1.5em",
        marginBottom: "1.5em",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
  };

class LoginForm extends Component {
    render() {
    const {classes} = this.props;
    
        return (
            <React.Fragment>
                <Typography color="primary" className={classes.loginHeadline}>Login </Typography>
                <form className={classes.root} validate autoComplete="off">
                    <TextField fullWidth className={classes.fields} type="email" label="E-mail" variant="filled" />
                    <TextField fullWidth  className={classes.fields} type="password" label="Password" variant="filled" />
                    <Button variant="contained" className={classes.loginButton} type="submit" color="primary">
                        Prijavi se
                    </Button>
                </form>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(LoginForm);
