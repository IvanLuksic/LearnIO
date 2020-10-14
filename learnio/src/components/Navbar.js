import React from 'react';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import logo from './favicon-32x32.png';
import Box from '@material-ui/core/Box';
import {Link} from 'react-router-dom';


const ColorButton = withStyles((theme) => ({
    root: {
        MarginRight: 0,
        marginLeft: "auto",
        color: "#FFFFFF",
        backgroundColor: "#27AE60",
         maxHeight: 27,
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
    <AppBar position="static"  style={{background: '#FFFFFF'}}>
    <Toolbar variant="dense" alignItems="right" >
        <img src={logo} alt='slika' className={classes.image}/>
        <Box ml={1} fontColor="black !important">
            <span className="learnioNavbar" >
                LearnIO
            </span>
        </Box>
        <Box ml={8} mr={8}>
            <li > <Link to="/">Home</Link> </li>
        </Box>
        <Box mr={8}>
            <li > <Link to="/contact">Contact</Link> </li>
        </Box>
        <Box >
            <li> <Link to="/about">About</Link> </li>
        </Box>
        <ColorButton  size="small" style={{borderRadius: 25}} buttonStyle={{borderRadius: 25} }>
            Log  in
        </ColorButton>
    </Toolbar>
    </AppBar>
    </div>
    );
}

export default Navbar;

