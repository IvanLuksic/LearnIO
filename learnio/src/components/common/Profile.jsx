import React,{useState,useEffect} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import backgroundIMG from '../../images/learniobg10-15.png'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import {loginRedirect} from '../../redux/actions/loginRedirect';

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
    }
    }));
function Profile(props) {
    const classes=useStyles();
    const [joined,setJoined]=useState(()=>false);
    const [joinedAlready,setJoinedAlready]=useState(()=>false);
    const [loading,setLoading]=useState(()=>true);
    const [class_name,setClass_name]=useState(()=>"");
    const [class_year,setClass_year]=useState(()=>"");

    return (
        <Grid container direction="column" align="center" Justify="space-evenly" className={classes.background} >  
            <p style={{margin:"auto"}}>NEMA JOŠ</p>
        </Grid>
    );
}

export default Profile;