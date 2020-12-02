import React, { Component } from 'react';
import LoginForm from '../components/common/LoginForm'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import backgroundimg from '../images/learniobglogin.png'

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

function Login(props) {
    return (
        <div style={{...background, ...vertAlign}}>
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={11} sm={6} md={4} lg={3}>
                    <Paper elevation={3} style = {{ ...vertAlign}}>
                        <LoginForm pageProps={props}/>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login;