import React from 'react';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import logo from '../images/favicon-32x32.png';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import {Link} from 'react-router-dom';


const ColorButton = withStyles((theme) => ({
    root: {
        MarginRight: 0,
        marginLeft: "auto",
        color: "#FFFFFF",
        backgroundColor: "#27AE60",
         maxHeight: 35,
        '&:hover': {
            backgroundColor: "#23A259",
      },
    },
  }))(Button);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    image:{
        height: theme.spacing (3),
        width: theme.spacing(3),
    },
    title: {
        flexGrow: 1,
        MarginLeft: 100,
        marginRight: "auto",
    }
  }));

 
function Navbar(){
    const classes = useStyles();

    return(
    <div className={classes.root} >
    <AppBar elevation={3} position="fixed" style={{background: '#FFFFFF'}}>
    <Toolbar >
        <img src={logo} alt='slika' className={classes.image}/>
        <Box ml={1}>
           <Link to="/"> <span className="learnioNavbar"  >
               LearnIO
            </span></Link>
        </Box>
        <Hidden xsDown>
        <Box ml={8} mr={8}>
            <li > <Link to="/">Home</Link> </li>
        </Box>
        <Box mr={8}>
            <li > <Link to="/contact">Contact</Link> </li>
        </Box>
        <Box mr={8}>
            <li> <Link to="/about">About</Link> </li>
        </Box>
        <Box >
            <li> <Link to="/topics">Topics</Link> </li>
        </Box>
        </Hidden>
        <ColorButton  size="small" style={{borderRadius: 25}}>
         <Link to="/login" style={{fontSize:"15px",color: "white", fontFamily: "Lobster",marginLeft: "1.5em",marginRight: "1.5em"}}>Login</Link>
        </ColorButton>
    </Toolbar>
    </AppBar>
    </div>
    );
}

export default Navbar;

