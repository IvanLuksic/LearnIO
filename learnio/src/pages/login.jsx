import React, { Component } from 'react';
import LoginForm from '../components/LoginForm'
import Paper from '@material-ui/core/Paper';
import backgroundimg from '../images/learniobglogin.png'

const background = {
    width: "100%",
    height: "100%",
    backgroundImage: "url("+backgroundimg+")" ,

}

const vertAlign = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
}
const center = {

        minWidth: "25%",
        maxWidth: "100%",
        margin: "0 auto",


}

class Login extends Component {
    render() {
        return (
            <div style={{...background, ...vertAlign}}>
                <Paper elevation={3} style = {{...center, ...vertAlign}}>
                    <LoginForm/>
                </Paper>
            </div>
        );
    }
}

export default Login;