import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import { makeStyles} from '@material-ui/core/styles';
import TestMainMenu from '../student/TestMainMenu';


const useStyles = makeStyles((theme) => ({
    paper:{
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
function StudentNames(props){
    const classes=useStyles();
    const [color,setColor]=useState("#27AE60");
    return (
        <Grid item> 
            <Paper className={classes.paper} style={{backgroundColor:color }}>
                <Grid container direction="column" justify="center" alignItems="center" style={{height: "100%"}} >
                    <Grid item><h1>View</h1></Grid>
                    <Grid item><h1>Students</h1></Grid>
                    <Grid item><p>Results</p></Grid>
                </Grid> 
            </Paper>
                
        </Grid>
    )
}
export default StudentNames;  
