import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {useState} from 'react';
import { useDispatch} from 'react-redux';
import {studentLogIn, adminLogIn, teacherLogIn} from '../../redux/actions/loginStatus';
import { useSelector} from 'react-redux';

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


function LoginForm(props){
    const offline= useSelector(state=>state.offline);
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    let classes=props.classes;
    const redirectUri=useSelector(state=>state.redirect);
    const dispatch = useDispatch();

    let object={
        pageprops:props.pageProps,
        usernames:username,
        passwords:password,
    };

    const pseudoPostLogin=(event,object)=>{
        event.preventDefault();
        if((object.usernames==='admin')&&(object.passwords==='')){dispatch(adminLogIn());object.pageprops.history.push('/');}
        else if((object.usernames==='student')&&(object.passwords==='')){dispatch(studentLogIn());object.pageprops.history.push('/');}
        else if((object.usernames==='teacher')&&(object.passwords==='')){{dispatch(teacherLogIn())};object.pageprops.history.push('/')}

    };

    const PostLogin=(event,object)=>{
        event.preventDefault();

        console.log(JSON.stringify(object));

        const requestOptions = {
            method: 'POST',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({username:object.usernames, password:object.passwords}),
            credentials: 'include'
        };
        fetch('/api/login', requestOptions)
        .then((response)=>{
            if(response.status===200)
            {
              Promise.resolve(response).then(response => response.json())
                .then(data => {
                        console.log(JSON.stringify(data)+data.role);
                        if(data.role==1){{dispatch(adminLogIn())};object.pageprops.history.push('/')}
                        else if(data.role==2){{dispatch(teacherLogIn())};object.pageprops.history.push('/')}
                        else if(data.role==3){{dispatch(studentLogIn())};object.pageprops.history.push(redirectUri)}
                })
            }else  object.pageprops.history.push('/login')
        })
        .catch((error)=>{
            console.log('Error in fetch function '+ error);
    });
    }

    return (
        <React.Fragment>
            <Typography color="primary" className={classes.loginHeadline}>Login </Typography>
            <form onSubmit={(e)=>{(!offline)&&PostLogin(e,object);offline&&pseudoPostLogin(e,object)}} className={classes.root} noValidate autoComplete="off" >
                <TextField onChange={(e)=>{setUsername(e.target.value)}} fullWidth className={classes.fields} type="email" label="Username" variant="filled" />
                <TextField onChange={(e)=>{setPassword(e.target.value)}} fullWidth  className={classes.fields} type="password" label="Password" variant="filled" />
                <Button variant="contained" className={classes.loginButton} style={{borderRadius: 25}} type="submit" color="primary" >
                    Prijavi se
                </Button>
            </form>
        </React.Fragment>
    );
};
export default withStyles(styles)(LoginForm);