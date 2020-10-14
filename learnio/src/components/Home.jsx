import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import logo from '../images/compLogo.png';
import linda from '../images/linda.jpg';
import Box from '@material-ui/core/Box';
import backgroundIMG from '../images/learniobg10-15.png'
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    image:{
        maxWidth: "100%",
        height: "auto",
    },
  }));

  const background={
    backgroundImage:"url("+backgroundIMG+")",
    backgroundSize: "cover",
    backgroundPosition: "fixed",
    backgroundAttachment: "fixed",
    backgroundRepeat: "repeat-y",
    minHeight: "200vh",
    width: "100%"

}

function Home(){
    const classes = useStyles();
    
    return(
    <div style={{ width: '100%', ...background }}>
      <Grid container  justify="space-evenly" alignItems="center">
        
        <Grid sm={12} md={6} spacing={12} style={{marginTop: '7em'}}>
        <Box flexGrow={1} flexShrink={1} bgcolor="transparent" mr={"3vw"}>
            <img src={logo} alt='slika' className={classes.image}/>
        </Box></Grid>
        <Grid sm={12} md={6} spacing={12}>
        <Box flexGrow={1} flexShrink={1}  bgcolor="transparent" ml={"5vw"} mr={"5vw"} >
            <Box  mb={"2vh"}> <span style={{fontSize: "3em", color:"#373F41"}}>Welcome to LearnIO </span></Box>
            <p style={{fontSize: "2em",color: "#737B7D"}}>LearnIO is a half-intelligent WebApp that will help you learn only things you need to learn.</p> 
        </Box></Grid>
      <Grid sm={12} md={6} spacing={12}>
      <Box flexGrow={1} flexShrink={1}  bgcolor="transparent" ml={"5vw"} mr={"5vw"} >
        <Box mb={2}> <span style={{fontSize: "2em", color:"#373F41"}}>Welcome to LearnIO </span></Box>
            <p style={{fontSize: "2em",color: "#737B7D"}}>LearnIO is a half-intelligent WebApp that will help you learn only things you need to learn.</p> 
        </Box></Grid>
        <Grid sm={12} md={6} spacing={12}>
        <Box flexGrow={1} flexShrink={1} display="flex" justifyContent="center" bgcolor="transparent" >
            <img src={linda} alt='slika' className={classes.image}/>
        </Box></Grid>
      
      </Grid>
    </div>
    );
};

export default Home;

