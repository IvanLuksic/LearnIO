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
        return ((props.questions.length>0)?"INSERTED":"EMPTY");
    });
    const [color,setColor]= useState(()=>{
        if(status==="SELECTED") return "#27AE60";
        else return ((props.questions.length>0)?"#4373ec":"grey");
    });
    const icon = ((props.questions.length>0)?"check_circle_out_icon":"cancel_icon");
    useEffect(()=>{
        if((props.aoSelected===props.ao) && (props.dSelected===props.d))
        {
            setStatus("SELECTED");
            setColor("#27AE60")
        }
        else  
        {
            setStatus((props.questions.length>0)?"INSERTED":"EMPTY");
            setColor((props.questions.length>0)?"#4373ec":"grey");
        }
    });
    return (
        
            <Grid item> 
                <Paper onClick={(event)=>{props.changeSelected(event,props.ao,props.d);}} className={classes.paper} style={{backgroundColor: color}}>
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