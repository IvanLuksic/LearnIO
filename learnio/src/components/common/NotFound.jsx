import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import caveman from '../../images/404Caveman.gif';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    background:{
        backgroundColor:"#ffffff",
        backgroundSize: "cover",
        minHeight:"100vh",
        maxHeight:"100vh",

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

function NotFound() {
    const classes=useStyles();
    return (
        // <div style={{display: "flex", flexDirection: "column"}} > 
            <Grid container direction="column" align="center" Justify="space-evenly" className={classes.background} >  
                <Grid item xs={12} style={{ margin:"12em 0 0 0",}}>
                    <strong className={classes.text}>404</strong>
                </Grid>
                <Grid item  xs={12} >
                    <img src={caveman} className={classes.Caveman}></img>
                </Grid>
            </Grid>
        // </div>
    );
}

export default NotFound;