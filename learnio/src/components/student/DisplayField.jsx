import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import { makeStyles} from '@material-ui/core/styles';


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
        console.log(props.question);
        if(props.question.status==="solve") return ("SOLVE");
        else if(props.question.status==="wrong") return ("WRONG");
        else if(props.question.status==="done") return ("DONE");
        else return ("LOCKED");
        
    });
    const [color,setColor]= useState(()=>{
        if(props.question.status==="solve") return ("#27AE60");
        else if(props.question.status==="wrong") return ("#EB4949");
        else if(props.question.status==="done") return ("#4372ec");
        else return ("grey");
    });
    const [icon,setIcon]= useState(()=>{      
        if(props.question.status==="solve") return ("lock_open_icon");
        else if(props.question.status==="wrong") return ("cancel_icon");
        else if(props.question.status==="done") return ("check_circle_out_icon");
        else return ("lock_icon");
    });
    useEffect(()=>{

            if(props.question.status==="solve") setStatus("SOLVE");
            else if(props.question.status==="wrong") setStatus("WRONG");
            else if(props.question.status==="done") setStatus("DONE");
            else setStatus("LOCKED");
            if(props.question.status==="solve") setColor("#27AE60");
            else if(props.question.status==="wrong") setColor("#EB4949");
            else if(props.question.status==="done") setColor("#4372ec");
            else setColor("grey");
            if(props.question.status==="solve") setIcon("lock_open_icon");
            else if(props.question.status==="wrong") setIcon("cancel_icon");
            else if(props.question.status==="done") setIcon("check_circle_out_icon");
            else setIcon("lock_icon");
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


export default DisplayField;