import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import logo from '../../images/favicon-32x32.png';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {logOut} from '../../redux/actions/loginStatus';
import AddCourseSubjectClass from '../admin/addComponents/AddCourseSubjectClass';

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
    buttonGreenSignUp: {
        MarginRight:0,
        borderRadius: 25,
        marginLeft: "auto",
        color: "#FFFFFF",
        backgroundColor: "#27ae60",
        maxHeight: 35,
        '&:hover': {
          backgroundColor: "rgb(41, 97, 65)",
       },
    },
    buttonBlueSignUp: {
      MarginRight:0,
      borderRadius: 25,
      marginLeft: "auto",
      color: "#FFFFFF",
      backgroundColor: "#4373ec",
      maxHeight: 35,
      '&:hover': {
        backgroundColor: "rgb(41, 97, 65)",
     },
  },
    buttonGreenLogin: {
      borderRadius: 25,
      color: "#FFFFFF",
      backgroundColor: "#27ae60",
      maxHeight: 35,
      '&:hover': {
          backgroundColor: "rgb(41, 97, 65)",
       },
  },

    buttonAdd: {
        MarginRight: 0,
        MarginLeft: "auto",
        borderRadius: 25,
        marginLeft: "auto",
        color: "#FFFFFF",
        maxHeight: 20,
    },
    buttonBoxAdd: {
      marginLeft: "auto",
      color: "#FFFFFF",
  },
    buttonBlue1: {
      //MarginRight: 0,
      marginLeft:"10px",
      borderRadius: 25,
      color: "#FFFFFF",
      maxHeight: 35,
      backgroundColor: "#4373ec",

  },
  }));


function Navbar(){
    const classes = useStyles();
    const loginStatus = useSelector(state=> state.login);
    const dispatch=useDispatch();
    var AdminFeatures=false;
    var StudentFeatures=false;
    var TeacherFeatures=false;

  
    switch(loginStatus){
      case 'admin':{
        AdminFeatures=true;
        StudentFeatures=false;
        TeacherFeatures=false;
        break;
      }
      case 'teacher':{//privremeno rjesenje za prvu iteraciju jer nema razlike teachera i admina
        AdminFeatures=true;
        StudentFeatures=false;
        TeacherFeatures=true;
        break;
      }
      case 'student':{
        AdminFeatures=false;
        StudentFeatures=true;
        TeacherFeatures=false;
        break;
      }
      case 'guest':{
        AdminFeatures=false;
        StudentFeatures=false;
        TeacherFeatures=false;
        break;
      }
      default:{
        AdminFeatures=false;
        StudentFeatures=false;
        TeacherFeatures=false;
      }
    }

    const headLogout=()=>{
      const requestOptions = {
        method: 'HEAD',
        mode:'cors',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include'
      };
<<<<<<< HEAD:client/src/components/common/Navbar.jsx
      fetch(`https://learn1o.herokuapp.com/logout`, requestOptions)
=======
      fetch(`/api/logout`, requestOptions)
>>>>>>> frontend:learnio/src/components/common/Navbar.jsx
      .catch((error)=>{console.log('Error in fetch function '+ error);});
    };

    return(
    <div className={classes.root} >
        <AppBar elevation={3} position="fixed" style={{background: '#FFFFFF'}}>
            <Toolbar >
                <img src={logo} alt='slika' className={classes.image}/>
                <Box ml={1}><Link to="/"> <span className="learnioNavbar">LearnIO</span></Link></Box>
                <Hidden xsDown>
                    <Box ml={8} mr={8}><li><Link to="/">Home</Link></li></Box>
                    {/* {StudentFeatures&&<Box mr={8}><li><Link to="/topics">Topics</Link></li></Box>} */}
                    {StudentFeatures&&<Box mr={8}><li><Link to="/student/subjects">Subjects</Link></li></Box>}
                    {AdminFeatures&&<Box mr={8}><li><Link to="/AdminTopics">Topics</Link></li></Box>}
                    {AdminFeatures&&<Box mr={8}><li><Link to="/results">Results</Link></li></Box>}
                    {AdminFeatures&&<Box mr={8}><li><Link to="/students">Students</Link></li></Box>}
                </Hidden>
                    {(!(AdminFeatures||StudentFeatures||TeacherFeatures))&&
                      <Box className={classes.buttonGreenSignUp}> 
                        <Button size="small" >
                          <Link to="/register" style={{fontSize:"15px",color: "white", fontFamily: "Lobster",marginLeft: "1em",marginRight: "1em"}}>SignUp</Link>
                        </Button>
                      </Box> 
                     }

                    {(!(AdminFeatures||StudentFeatures||TeacherFeatures))&&
                      <Box ml={1} className={classes.buttonGreenLogin}>
                        <Button size="small"  >
                          <Link to="/login" style={{fontSize:"15px",color: "white", fontFamily: "Lobster",marginLeft: "1.5em",marginRight: "1.5em"}}>Login</Link>
                        </Button>
                      </Box> }
                    {(AdminFeatures||StudentFeatures||TeacherFeatures)&&
                      <Box  className={(!(AdminFeatures||StudentFeatures||TeacherFeatures))?classes.buttonBlue1:classes.buttonBlueSignUp}>
                        <Button size="small"  >
                            <Link to="/" onClick={()=>{headLogout();dispatch(logOut());}} style={{fontSize:"15px",color: "white", fontFamily: "Lobster",marginLeft: "1.5em",marginRight: "1.5em"}}>Log Out</Link>
                        </Button>
                      </Box> }
            </Toolbar>
        </AppBar>
    </div>
    );
}

export default Navbar;

