import React,{useState,useEffect} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import backgroundIMG from '../images/learniobg10-15.png'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import {loginRedirect} from '../redux/actions/loginRedirect';

const useStyles = makeStyles((theme) => ({
    background:{
        backgroundSize: "cover",
        minHeight:"100vh",
        maxHeight:"100vh",
        backgroundImage:"url("+backgroundIMG+")",
        backgroundPosition: "fixed",
        backgroundAttachment: "fixed",
        backgroundRepeat: "repeat-y",

    },
    Grid:{
        width:"100%",
        height:"100%",
    },
    Caveman:{
        [theme.breakpoints.down('md')]: {
            width:"80%",
        },
          [theme.breakpoints.up('md')]: {
            width:"40%",
        },
        height:"auto"
    },
    text:{
        margin:"15em 0 2em 0",
        [theme.breakpoints.down('md')]: {
            fontSize:"6em",
        },
          [theme.breakpoints.up('md')]: {
            fontSize:"8em",
        },
        fontStyle: "italic",
        fontWeight:"bolder"
    }
    }));
const Redirected=(props)=>{props.pageProps.history.push(`/login`); return(<CircularProgress style={{margin:"auto"}} />);};

function Invited(props) {
    const classes=useStyles();
    const [joined,setJoined]=useState(()=>false);
    const [joinedAlready,setJoinedAlready]=useState(()=>false);
    const [loading,setLoading]=useState(()=>true);
    const [class_name,setClass_name]=useState(()=>"");
    const [class_year,setClass_year]=useState(()=>"");


    const dispatch=useDispatch();
    dispatch(loginRedirect("/invite/"+props.match.params.code));
    const role=useSelector(state=>state.login);

    const requestJoin=()=>{
        const requestOptions = {
            method: 'GET',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include'
        };
        fetch(`/api/invite/${props.match.params.code}`, requestOptions)// class subject course
        .then(response => {       
            if(response.status==(201))
            {
              Promise.resolve(response).then(response => response.json())
              .then(data=>{setJoined(true);setClass_name(data.class_name);setClass_year(data.class_year);})
            }
            else if(response.status==(200))
            {
              Promise.resolve(response).then(response => response.json())
              .then(data=>{setJoinedAlready(true);})
        }}
        ).catch((error)=>{
            console.log('Error in fetch function '+ error)});
        setLoading(false);
        dispatch(loginRedirect('/'));
    };

    useEffect(()=>{
        if(role=="student")requestJoin();
    },[])


    return (
        <Grid container direction="column" align="center" Justify="space-evenly" className={classes.background} >  
        {
            (role==="guest")?<Redirected pageProps={props}/>
            :(role==="teacher"||role==="admin")?<p style={{margin:"auto"}}>Molimo prijavite se kao učenik :)</p>
            :loading?<CircularProgress style={{margin:"auto"}} />
            :joinedAlready?<p style={{margin:"auto"}}>Već ste bili dodani! :|</p>
            :joined?<p style={{margin:"auto"}}>{`Dodani ste u ${class_name} ${class_year}:)`}</p>:<p style={{margin:"auto"}}>Niste dodani :(</p>
        }
        </Grid>
        
        // <div style={{display: "flex", flexDirection: "column"}} > 
        // {
            

        // }
        //     <Grid container direction="column" align="center" Justify="space-evenly" className={classes.background} >  

        //     </Grid>
        // </div>
    );
}

export default Invited;