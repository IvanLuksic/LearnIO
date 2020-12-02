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
        fontSize: '3vh',
        paddingTop:  '10px',
        padding: theme.spacing(1),
        color:"white",
        borderRadius: "10px",
        cursor: "pointer"
        },
    matrix:{
        marginRight:"2vh",
        [theme.breakpoints.up('md')]: {
             marginTop:"10vh",
             overflowY: "scroll",
             maxHeight: "90vh"
          },
        },
}));


//renders the field of the matrix element, takes changeSelected function, question = array of questions, AO and D of selected field as props

function DisplayField(props){
    const classes=useStyles();
    const [status,setStatus] = useState(()=>{
        // if(props.test.result==="solve") return ("SOLVE");
        // else if(props.test.result==="failed") return ("WRONG");
        // else if(props.test.result==="passed") return ("DONE");
        return ("LOCKED");
        
    });
    const [color,setColor]= useState(()=>{
        // if(props.test.result==="solve") return ("#27AE60");
        // else if(props.test.result==="failed") return ("#EB4949");
        // else if(props.test.result==="passed") return ("#4372ec");
        return ("grey");
    });
    const [icon,setIcon]= useState(()=>{      
        // if(props.test.result==="solve") return ("lock_open_icon");
        // else if(props.test.result==="failed") return ("cancel_icon");
        // else if(props.test.result==="passed") return ("check_circle_out_icon");
        return ("lock_icon");
    });
    useEffect(()=>{

        if(props.test.length > 0) {
            if(props.test[0].result==="solve" && props.test[0].status==="valid") setStatus("SOLVE");
            else if(props.test[0].result==="failed" && props.test[0].status==="valid") setStatus("WRONG");
            else if(props.test[0].result==="passed" && props.test[0].status==="valid") setStatus("DONE");
            else setStatus("LOCKED");
            if(props.test[0].result==="solve" && props.test[0].status==="valid") setColor("#27AE60");
            else if(props.test[0].result==="failed" && props.test[0].status==="valid") setColor("#EB4949");
            else if(props.test[0].result==="passed" && props.test[0].status==="valid") setColor("#4372ec");
            else setColor("grey");
            if(props.test[0].result==="solve" && props.test[0].status==="valid") setIcon("lock_open_icon");
            else if(props.test[0].result==="failed" && props.test[0].status==="valid") setIcon("cancel_icon");
            else if(props.test[0].result==="passed" && props.test[0].status==="valid") setIcon("check_circle_out_icon");
            else setIcon("lock_icon");
        }
    });
 
    return (

            <Grid item> 
                <Paper onClick={(event)=>{props.changeSelected(event,props.ao,props.d,props.question);}} className={classes.paper} style={{backgroundColor: color}}>
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