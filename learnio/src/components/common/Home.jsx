import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import logo from '../../images/compLogo.png';
import linda from '../../images/linda.jpg';
import Box from '@material-ui/core/Box';
import backgroundIMG from '../../images/learniobg10-15.png'


const useStyles = makeStyles((theme) => ({
    image:{
        maxWidth: "100%",
        height: "auto",
    },

    mobFlex1:{
      spacing:8,
      justifyContent: "space-evenly",
      flexDirection: "row",
      alignItems:"center",
      bgcolor:"transparent",
    
      [theme.breakpoints.down('sm')]: {
        paddingLeft:"2vw",
        paddingRight:"2vw",
        paddingTop:"18vh",
        paddingBottom:"0vh"
      },
      [theme.breakpoints.up('sm')]: {
        paddingLeft:"5vw",
        paddingRight:"3vw",
        paddingTop:"35vh",
        paddingBottom:"30vh"
      },
    },

    mobFlex2:{
      spacing:8,
      justifyContent: "space-evenly",
      flexDirection: "row",
      alignItems:"center",
      bgcolor:"transparent",
    
      [theme.breakpoints.down('sm')]: {
        paddingLeft:"5vw",
        paddingRight:"5vw",
        paddingTop:"10vh",
        paddingBottom:"0vh"
      },
      [theme.breakpoints.up('sm')]: {
        paddingLeft:"5vw",
        paddingRight:"3vw",
        paddingTop:"35vh",
        paddingBottom:"30vh"
      },
    },

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
        minHeight: "200vh",
      },
    },

    block:{
      width: "50%",
      backgroundColor: "transparent",
      marginLeft:"5vw",
      marginRight:"5vw"
    },

    txtP:{
      color: "#737B7D",//textalign justify
      lineHeight: "1.2em",
      [theme.breakpoints.down('sm')]: {
        fontSize: "3.5vw",
      },
      [theme.breakpoints.up('md')]: {
        fontSize: "2vw",
      },
    },

    txtS:{
      color: "#373F41",
      fontFamily: "Lobster",
      [theme.breakpoints.down('sm')]: {
        fontSize: "4.5vw",
      },
      [theme.breakpoints.up('md')]: {
        fontSize: "3.2vw",
      },
    }
  }));


function Home(){
    const classes = useStyles();
    
    return(
    <div className={classes.background}>
      <Box display="flex" className={classes.mobFlex1} >
        <Box flexGrow={1} flexShrink={1} className={classes.block} >
            <img src={logo} alt='slika' className={classes.image}/>
        </Box>
        <Box flexGrow={1} flexShrink={1} className={classes.block} >
            <Box mb={"1.5vh"}> <span className={classes.txtS}>Welcome to LearnIO </span></Box>
            <p className={classes.txtP} >LearnIO is a half-intelligent WebApp that will help you learn only things you need to learn. LearnIO is a half-intelligent WebApp that will help you learn only things you need to learn.</p> 
        </Box>
      </Box>
      <Box display="flex" className={classes.mobFlex2}>
      <Box flexGrow={1} flexShrink={1} className={classes.block} >
        <Box mb={"1.5vh"}> <span className={classes.txtS}>Welcome to LearnIO </span></Box>
            <p className={classes.txtP}>LearnIO is a half-intelligent WebApp that will help you learn only things you need to learn. LearnIO is a half-intelligent WebApp that will help you learn only things you need to learn.</p> 
        </Box>
        <Box  width="50%" flexGrow={1} flexShrink={1} display="flex" justifyContent="center" bgcolor="transparent" >
            <img src={linda} alt='slika' className={classes.image} width="50%"/>
        </Box>
      </Box>
    </div>
    );
};

export default Home;

