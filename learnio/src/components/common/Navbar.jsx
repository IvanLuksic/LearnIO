import React, {useState} from 'react';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import logo from '../../images/favicon-32x32.png';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {logOut} from '../../redux/actions/loginStatus';

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
    },
    buttonGreen: {
        MarginRight: 0,
        borderRadius: 25,
        marginLeft: "auto",
        color: "#FFFFFF",
        backgroundColor: "#27ae60",
        maxHeight: 35,
        '&:hover': {
            backgroundColor: "rgb(41, 97, 65)",
         },
    },
    buttonBlue: {
        MarginRight: 0,
        borderRadius: 25,
        marginLeft: "auto",
        color: "#FFFFFF",
        backgroundColor: "#4373ec",
        maxHeight: 35,
        '&:hover': {
        backgroundColor: "#0e318b",
      },
    },
  }));


function Navbar(){
    const classes = useStyles();
    const loginStatus = useSelector(state=> state.login);
    const dispatch=useDispatch();
    var AdminFeatures=false;
    var StudentFeatures=false;
  
    switch(loginStatus){
      case 'admin':{
        AdminFeatures=true;
        StudentFeatures=true;
        break;
      }
      case 'teacher':{//privremeno rjesenje za prvu iteraciju jer nema razlike teachera i admina
        AdminFeatures=true;
        StudentFeatures=true;
        break;
      }
      case 'student':{
        AdminFeatures=false;
        StudentFeatures=true;
        break;
      }
      case 'guest':{
        AdminFeatures=false;
        StudentFeatures=false;
        break;
      }
      default:{
        AdminFeatures=false;
        StudentFeatures=false;
      }
    }

    return(
    <div className={classes.root} >
        <AppBar elevation={3} position="fixed" style={{background: '#FFFFFF'}}>
            <Toolbar >
                <img src={logo} alt='slika' className={classes.image}/>
                <Box ml={1}><Link to="/"> <span className="learnioNavbar">LearnIO</span></Link></Box>
                <Hidden xsDown>
                    <Box ml={8} mr={8}><li><Link to="/">Home</Link></li></Box>
                    {StudentFeatures&&<Box mr={8}><li><Link to="/topics">Topics</Link></li></Box>}
                    {AdminFeatures&&<Box mr={8}><li><Link to="/AdminTopic">AdminTopics</Link></li></Box>}
                </Hidden>
                    {(!(AdminFeatures||StudentFeatures))&&                    
                        <Button size="small" className={classes.buttonGreen} >
                            <Link to="/login" style={{fontSize:"15px",color: "white", fontFamily: "Lobster",marginLeft: "1.5em",marginRight: "1.5em"}}>Login</Link>
                        </Button>}
                    {(AdminFeatures||StudentFeatures)&&
                        <Button size="small" className={classes.buttonBlue} onClick={()=>{dispatch(logOut())}}>
                            <Link to="/login" style={{fontSize:"15px",color: "white", fontFamily: "Lobster",marginLeft: "1.5em",marginRight: "1.5em"}}>Log Out</Link>
                        </Button>
                    }
            </Toolbar>
        </AppBar>
    </div>
    );
}

export default Navbar;

