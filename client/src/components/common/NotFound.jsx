import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import caveman from '../../images/404Caveman.gif';
import Grid from '@material-ui/core/Grid';
import backgroundIMG from '../../images/learniobg10-15.png'


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

function NotFound(props) {
    const classes=useStyles();
    return (
        // <div style={{display: "flex", flexDirection: "column"}} > 
            <Grid container direction="column" align="center" Justify="space-evenly" className={classes.background} >  
                <Grid item xs={12} style={{ margin:"12em 0 0 0",}}>
                    <strong className={classes.text}>{props.code!=undefined?props.code:"404"}</strong>
                </Grid>
                <Grid item  xs={12} >
                    <img src={caveman} alt={"Oops, even the 404 image got 404-ed..."}className={classes.Caveman}></img>
                </Grid>
            </Grid>
        // </div>
    );
}

export default NotFound;

//Oops, Homo neanderthalensis on the loose ...
