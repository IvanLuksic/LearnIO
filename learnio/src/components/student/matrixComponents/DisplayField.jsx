import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    icons:{
          padding:'15px',
          fontSize:'1.25em',
          },
    paper:{ //ode stani
        width: "6em",
        height: "6em",
        textAlign: 'center',
        variant: "outlined",
        backgroundColor: '#BDBDBD',
        fontFamily:'Roboto',
        fontSize: '2.8vh',
        paddingTop:  '10px',
        padding: theme.spacing(0.2),
        color:"white",
        borderRadius: "10px",
        cursor: "pointer"
        },
}));

//renders the field of the matrix element, takes changeSelected function, questionToDisplay = array of questions, AO and D of selected field as props

function DisplayField(props){
    const classes=useStyles();
    const [status,setStatus] = useState(()=>{return ("LOCKED");});
    const [color,setColor]= useState(()=>{ return ("grey");});
    const [icon,setIcon]= useState(()=>{ return ("lock_icon");});
    useEffect(()=>{
        // if(props.questionToDisplay.length > 0) {
            if(props.questionToDisplay.status===2) setStatus("UNLOCKED");
            else if(props.questionToDisplay.status===1) setStatus("WRONG");
            else if(props.questionToDisplay.status===4) setStatus("DONE");
            else setStatus("LOCKED");
            if(props.questionToDisplay.status===2) setColor("#4372ec");
            else if(props.questionToDisplay.status===1) setColor("#EB4949");
            else if(props.questionToDisplay.status===4) setColor("#27AE60");
            else setColor("grey");
            if(props.questionToDisplay.status===2) setIcon("lock_open_icon");
            else if(props.questionToDisplay.status===1) setIcon("cancel_icon");
            else if(props.questionToDisplay.status===4) setIcon("check_circle_out_icon");
            else setIcon("lock_icon");
        // }
    });
 
    return (

            <Grid item> 
                <Paper onClick={(event)=>{if(status!=='LOCKED'){props.changeSelected(event,props.ao,props.d,props.questionToDisplay, status)}}} className={classes.paper} style={{backgroundColor: color}}>
                    <Grid container direction="column" justify="center" alignItems="center" style={{height: "100%"}}>
                        <Grid item><h1>AO={props.ao} D={props.d}</h1></Grid>
                        <Grid item><Icon className={classes.icons}>{icon}</Icon></Grid>
                        <Grid item><p>{status}</p></Grid>
                    </Grid>
                </Paper> 
            </Grid>
        )
}

// if(status!=="LOCKED"){
export default DisplayField;