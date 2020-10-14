import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import logo from '../images/compLogo.png';
import linda from '../images/linda.jpg';
import Box from '@material-ui/core/Box';
import backgroundIMG from '../images/learniobg10-15.png'

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
      <Box display="flex" justifyContent="space-evenly" flexDirection="row" alignItems="center" pl={"5vw"} pr={"3vw"} pt={"25vh"} pb={"40vh"} bgcolor="transparent">
        <Box width="50%" flexGrow={1} flexShrink={1} bgcolor="transparent" mr={"3vw"} >
            <img src={logo} alt='slika' className={classes.image}/>
        </Box>
        <Box width="50%" flexGrow={1} flexShrink={1}  bgcolor="transparent" ml={"5vw"} mr={"5vw"} >
            <Box  mb={"2vh"}> <span style={{fontSize: "3vw", color:"#373F41"}}>Welcome to LearnIO </span></Box>
            <p style={{fontSize: "2.2vw",color: "#737B7D"}}>LearnIO is a half-intelligent WebApp that will help you learn only things you need to learn.</p> 
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-evenly" flexDirection="row" alignItems="center" pl={"7.5vw"} pr={"3vw"} pt={"12.5vh"} pb={"40vh"} bgcolor="transparent">
      <Box width="50%" flexGrow={1} flexShrink={1}  bgcolor="transparent" ml={"5vw"} mr={"5vw"} >
        <Box mb={2}> <span style={{fontSize: "3vw", color:"#373F41"}}>Welcome to LearnIO </span></Box>
            <p style={{fontSize: "2.2vw",color: "#737B7D"}}>LearnIO is a half-intelligent WebApp that will help you learn only things you need to learn.</p> 
        </Box>
        <Box  width="50%" flexGrow={1} flexShrink={1} display="flex" justifyContent="center" bgcolor="transparent" >
            <img src={linda} alt='slika' className={classes.image} width="50%"/>
        </Box>
      </Box>
    </div>
    );
};

export default Home;

