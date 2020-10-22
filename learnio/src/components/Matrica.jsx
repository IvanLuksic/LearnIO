import { Typography } from "@material-ui/core";
import React from 'react';
import { Component } from "react";
import Grid from '@material-ui/core/Grid';
import backgroundIMG from '../images/learniobg10-15.png';
import { makeStyles,withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({

    background:{
      backgroundImage:"url("+backgroundIMG+")",
      backgroundSize: "cover",
      backgroundPosition: "fixed",
      backgroundAttachment: "fixed",
      backgroundRepeat: "repeat-y",
      width: "100%",
      [theme.breakpoints.down('sm')]: {
        minHeight: "100vh",
      },
      [theme.breakpoints.up('md')]: {
        minHeight: "100vh",
      },
    },
    topicTitle:{
        fontFamily:'Lobster',
        fontSize:'6vh',
        padding:'50px',
        margin:'60px',
        [theme.breakpoints.down('sm')]: {
          paddingTop:"10vh",
        },
        [theme.breakpoints.up('md')]: {
          paddingTop:"1vh",
        },
        marginBottom: '10px', 
        width:'50%',  
        paddingBottom:'9px', 
    },
    results:{
        fontFamily:'Lobster',
        fontSize:'2vh',
        color:'black',
        padding:'50px',
        margin:'60px',
        width:'50%',  
        textAlign:'center' ,
        paddingBottom:'9px',
    },
    paper:{
        width: 150,
        height: 150,
        textAlign: 'center',
        variant: "outlined",
        backgroundColor: '#BDBDBD',
        fontFamily:'Lobster',
        fontSize: '3vh',
        paddingTop:  '10px',
        padding: theme.spacing(1),
        mariginTop: '34px',
        marginBottom: '34px',
        color:"white",
    },
    icons:{
        paddingTop:'25px',
        fontSize:'45px',
    },
    grid:{
        padding: '20px',
    }
}));

function DisplayRow(props){
    const classes = useStyles();
    let returnRow = props.questions.map( (question, index) =>   <Paper className={classes.paper} style={{backgroundColor:question.color}} key={index}>
                                                                    <h1>AO={question.a} D={question.d}</h1>
                                                                    <Icon className={classes.icons}>{question.type}</Icon>
                                                                    <p>{question.text}</p>
                                                                </Paper>)
      return <Grid className={classes.grid}>{returnRow}</Grid>
    }

function Matrica(props)
{
    console.log(props.match.params.id);
    const classes = useStyles();
    return(
        <div className={classes.background} >
            <Typography color="primary" style={{display: "flex"}}>
                <span className={classes.topicTitle}>
                    Tema matrice
                    <p style={{fontSize:'2vh', color: 'black'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </span>
                
            </Typography>
            <div style={{display: "flex"}}>
                <Grid container direction="row" justify="center" alignItems="center" >
                    <DisplayRow  questions={[{a: 1, d: 1, color: "#EB5757",text: "Wrong", type:"cancel_icon"},{a: 2, d: 1, color: " ", text: "Locked", type:"lock_icon"}, {a: 3, d: 1, color: "#27AE60",text: "Solve",type:"lock_open_icon"} ]}/>
                    <DisplayRow  questions={[{a: 1, d: 2, color: "#EB5757", text: "Wrong",type:"cancel_icon"},{a: 2, d: 2, color: "#0E4DA4", text: "Done", type:"check_circle_out_icon"}, {a: 3, d: 2, color: "#27AE60",text: "Solve", type:"lock_open_icon"} ]}/>
                    <DisplayRow  questions={[{a: 1, d: 3, color: "#EB5757", text: "Wrong", type:"cancel_icon"},{a: 2, d: 3, color: "#0E4DA4", text: "Done",type:"check_circle_out_icon"}, {a: 3, d: 3, color:" ",text: "Locked", type:"lock_icon" } ]}/>
                </Grid>
            </div>
        </div>
    )
   
}
export default Matrica;