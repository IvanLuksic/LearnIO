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

<<<<<<< HEAD:client/src/components/common/NotFound.jsx
function NotFound() {
=======
function NotFound(props) {
>>>>>>> frontend:learnio/src/components/common/NotFound.jsx
    const classes=useStyles();
    return (
        // <div style={{display: "flex", flexDirection: "column"}} > 
            <Grid container direction="column" align="center" Justify="space-evenly" className={classes.background} >  
                <Grid item xs={12} style={{ margin:"12em 0 0 0",}}>
<<<<<<< HEAD:client/src/components/common/NotFound.jsx
                    <strong className={classes.text}>404</strong>
=======
                    <strong className={classes.text}>{props.code!=undefined?props.code:"404"}</strong>
>>>>>>> frontend:learnio/src/components/common/NotFound.jsx
                </Grid>
                <Grid item  xs={12} >
                    <img src={caveman} alt={"Oops, even the 404 image got 404-ed..."}className={classes.Caveman}></img>
                </Grid>
            </Grid>
        // </div>
    );
}

<<<<<<< HEAD:client/src/components/common/NotFound.jsx
export default NotFound;
=======
export default NotFound;

//Oops, Homo neanderthalensis on the loose ...
>>>>>>> frontend:learnio/src/components/common/NotFound.jsx
