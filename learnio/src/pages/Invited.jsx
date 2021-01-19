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
    image:{
        borderRadius:"3px",
        boxShadow: "0px 5px 10px 7px rgba(0,0,0,0.27)"
    },
    text:{
        margin:"auto",
        display:"block",
        marginTop:"2rem",
        fontSize:"2rem",
        fontFamily:"Lobster",
        color:"#3b3a3a",
        textShadow:"-5px 5px #30303033"
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

    const randomImage=(code)=>{
        let cb=1;
        let oops=3;
        let ok=2;
        let yes=3;

        switch(code){
            case 1:
                return `../../cb${(Math.floor(Math.random()*10000)%cb)}.gif`;
                break;
            case 2:
                return `../../oops${(Math.floor(Math.random()*10000)%oops)}.gif`;
                break;
            case 3:
                return `../../ok${(Math.floor(Math.random()*10000)%ok)}.gif`;
                break;
            case 4:
                return `../../yes${(Math.floor(Math.random()*10000)%yes)}.gif`;
                break;
            default:
                return `../../ok1.gif`;
                break;    
        }
    };


    return (
        <Grid container direction="column" align="center" Justify="space-evenly" className={classes.background} >  
        {
            (role==="guest")?<Redirected pageProps={props}/>
            :(role==="teacher"||role==="admin")?<div style={{margin:"auto"}}><img src={randomImage(1)} className={classes.image} alt="Not loaded"/><p className={classes.text}>Please login as a student. 🤨</p></div>
            :loading?<CircularProgress style={{margin:"auto",display:"block"}} />
            :joinedAlready?<div style={{margin:"auto"}}><img src={randomImage(3)} className={classes.image} alt="Not loaded"/><p className={classes.text}>You have already been added to this class. 🙃</p></div>
            :joined?<div style={{margin:"auto"}}><img src={randomImage(4)} className={classes.image} alt="Not loaded"/><p className={classes.text}>{`Congrats, You have been added to ${class_name} ${class_year}! 😀`}</p></div>:<div style={{margin:"auto"}}><img src={randomImage(2)} className={classes.image} alt="Not loaded"/><p className={classes.text}>Something went wrong, we couldn't add you to this class.😦</p></div>
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