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


const randomColor=()=>{
  let colors=["#27ae60","#4373ec","#8f8e8b","#EB4949"];
  let darkColors=["#13532e","#103aa2","#4e4d4b","#a11212"];
  let i=(Math.floor(Math.random()*10000))%4;
  return {c:colors[i],dc:darkColors[i]};
};
let col=randomColor();

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
    profileDiv:{  
      marginRight: "0.33rem", 
      marginLeft: "auto",
      borderRadius:"50%",
      height:"34px", 
      width:"34px",  
      border: "1px solid lightgray",  
      backgroundClip: "content-box",  
      padding: "1px",
      backgroundColor:col.c,
      '&:hover': {backgroundColor: col.dc}
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
      color: "#FFFFFF",
      backgroundColor: "#4373ec",
      maxHeight: 35,
      '&:hover': {
        backgroundColor: "#103aa2",
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
  profileButton: {
    height: "34px", 
    textAlign: "center", 
    margin: "7px 0 0 0", 
    cursor: "pointer",
    fontWeight:"bold",
  },
  link:{
    color:"#737b7d",
    '&:hover':{
      color:"#4d5254"
    }
  },}
  ));


function Navbar(){
    const classes = useStyles();
    const loginStatus = useSelector(state=> state.login);
    const dispatch=useDispatch();
    var AdminFeatures=false;
    var StudentFeatures=false;
    var TeacherFeatures=false;
    var GuestFeatures=false;

  
    switch(loginStatus){
      case 'admin':{
        AdminFeatures=true;
        StudentFeatures=false;
        TeacherFeatures=false;
        GuestFeatures=false;
        break;
      }
      case 'teacher':{//privremeno rjesenje za prvu iteraciju jer nema razlike teachera i admina
        AdminFeatures=false;
        StudentFeatures=false;
        TeacherFeatures=true;
        GuestFeatures=false;
        break;
      }
      case 'student':{
        AdminFeatures=false;
        StudentFeatures=true;
        TeacherFeatures=false;
        GuestFeatures=false;
        break;
      }
      case 'guest':{
        AdminFeatures=false;
        StudentFeatures=false;
        TeacherFeatures=false;
        GuestFeatures=true;
        break;
      }
      default:{
        AdminFeatures=false;
        StudentFeatures=false;
        TeacherFeatures=false;
        GuestFeatures=true;
      }
    }

    const headLogout=()=>{
      const requestOptions = {
        method: 'HEAD',
        mode:'cors',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include'
      };
      fetch(`/api/logout`, requestOptions)
      .catch((error)=>{console.log('Error in fetch function '+ error);});
    };

    const goToProfile=()=>{
      window.location.assign("/profile");
    };

    let acro=useSelector(state=>state.username);
    acro=acro[0]+acro[1];

    return(
    <div className={classes.root} >
        <AppBar elevation={3} position="fixed" style={{background: '#FFFFFF'}}>
            <Toolbar >
                <img src={logo} alt='slika' className={classes.image}/>
                <Box ml={1}><Link to="/"> <span className="learnioNavbar">LearnIO</span></Link></Box>
                <Hidden xsDown>
                  <Box ml={8} mr={8}><li><Link to="/" className={classes.link}>Home</Link></li></Box>
                  {/* {StudentFeatures&&<Box mr={8}><li><Link to="/topics">Topics</Link></li></Box>} */}
                  {StudentFeatures&&<Box mr={8}><li><Link to="/student/subjects" className={classes.link}>Subjects</Link></li></Box>}
                  {(AdminFeatures||TeacherFeatures)&&<Box mr={8}><li><Link to="/AdminTopics" className={classes.link}>Topics</Link></li></Box>}
                  {(AdminFeatures||TeacherFeatures)&&<Box mr={8}><li><Link to="/results" className={classes.link}>Results</Link></li></Box>}
                  {(AdminFeatures||TeacherFeatures)&&<Box mr={8}><li><Link to="/students" className={classes.link}>Students</Link></li></Box>}
                  {AdminFeatures&&<Box mr={8}><li><Link to="/teachers" className={classes.link}>Teachers</Link></li></Box>}
                </Hidden>
                    {GuestFeatures&&
                      <Box className={classes.buttonGreenSignUp}> 
                        <Button size="small" >
                          <Link to="/register" style={{fontSize:"15px",color: "white", fontFamily: "Lobster",marginLeft: "1em",marginRight: "1em"}}>SignUp</Link>
                        </Button>
                      </Box> 
                    }
                    {GuestFeatures&&
                      <Box ml={1} className={classes.buttonGreenLogin}>
                        <Button size="small"  >
                          <Link to="/login" style={{fontSize:"15px",color: "white", fontFamily: "Lobster",marginLeft: "1.5em",marginRight: "1.5em"}}>Login</Link>
                        </Button>
                      </Box> }
                    {(!GuestFeatures)&&
                      <div onClick={()=>goToProfile()} className={classes.profileDiv}><p className={classes.profileButton}>{acro}</p></div>
                    }
                    {(AdminFeatures||StudentFeatures||TeacherFeatures)&&
                      <Box className={(!(AdminFeatures||StudentFeatures||TeacherFeatures))?classes.buttonBlue1:classes.buttonBlueSignUp}>
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

