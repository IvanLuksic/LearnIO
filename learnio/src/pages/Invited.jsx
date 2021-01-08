import React,{useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import backgroundIMG from '../images/learniobg10-15.png'
import CircularProgress from '@material-ui/core/CircularProgress';


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
    }))

function Invited() {
    const classes=useStyles();
    const [joined,setJoined]=useState(()=>false);
    const [loading,setLoading]=useState(()=>true);
    const requestJoin=()=>{
        const requestOptions = {
            method: 'GET',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include'
        };
        fetch(`http://127.0.0.1:3000/topic/${1}/${1}/${1}`, requestOptions)// class subject course
        .then(response => response.json())
        .then(data=>{/*dodaj jeli dodan ili nije*/ })
        .catch((error)=>{
        setJoined(false);
        console.log('Error in fetch function '+ error);
        });
    }
    return (
        <Grid container direction="column" align="center" Justify="space-evenly" className={classes.background} >  
        {
            loading?<CircularProgress style={{margin:"auto"}} />
            :joined?<p style={{margin:"auto"}}>Dodani ste :)</p>:<p style={{margin:"auto"}}>Niste dodani :(</p>
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