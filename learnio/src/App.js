import React, {useState} from "react";
import { Route ,Switch} from "react-router-dom";
import Login from "./pages/login";
import StudentMatrix from "./components/student/Matrica";
import StudentUnit from "./components/student/StudentTopics";
import AdminMatrix from "./pages/AdminMatrix";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import "./App.css";
import Home from "./components/common/Home"
import Navbar from './components/common/Navbar';
import AddTopicPU from './components/admin/addComponents/AddTopicPU';
import AdminTopics from './components/admin/AdminTopics';
import {useSelector} from 'react-redux';
import Results from "./components/admin/Results";
import Students from "./components/admin/Students";
import NotFound from './components/common/NotFound';
import Register from './pages/Register';
import StudentSubjects from './components/student/StudentSubjects';
import AddCourseSubjectClass from './components/admin/addComponents/AddCourseSubjectClass';
import StudentCourses from './components/student/StudentCourses';
import Invited from './pages/Invited';
import { useDispatch} from 'react-redux';
import {studentLogIn, adminLogIn, teacherLogIn} from './redux/actions/loginStatus';

const theme = createMuiTheme({
    palette: {
      primary: {main: "#4372ec"},
      secondary: {main: "#EB4949"}
    },
  });

function App() {
  const offline= useSelector(state=>state.offline);
  // const [openAddTopic,setOpenAddTopic]=useState(true);
  const loginStatus = useSelector(state=> state.login);
  let AdminFeatures=false;
  let StudentFeatures=false;
  const dispatch = useDispatch();

  if(!offline)
  {
    const requestOptions = {
      method: 'GET',
      mode:'cors',
      headers: { 'Content-Type': 'application/json'},
      credentials: 'include'
    };

    fetch(`http://127.0.0.1:3000/api/checklogin`, requestOptions)//class_id subject_id course_id topic_id
    .then((response)=>{
      if(response.status===200)
      {
        Promise.resolve(response).then(response => response.json())
          .then(data => {
              if(data.role==1){{dispatch(adminLogIn())}}
              else if(data.role==2){{dispatch(teacherLogIn())}}
              else if(data.role==3){{dispatch(studentLogIn())}}
          })
      }      
    })
    .catch((error)=> {console.log('Error in fetch function '+ error);});
  };


  switch(loginStatus){
    case 'admin':{
      AdminFeatures=true;
      StudentFeatures=false;
      break;      
    }
    case 'teacher':{//privremeno rjesenje za prvu iteraciju jer nema razlike teachera i admina
      AdminFeatures=true;
      StudentFeatures=false;
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

    return (
        <div className="App" style={{height: '100vh'}} >
          <ThemeProvider theme={theme}>
              <Navbar/>
              {/* <Button onClick={()=>{dispatch(studentLogIn());console.log(loginStatus);}}>Student </Button>
              <Button  onClick={()=>{dispatch(adminLogIn());console.log(loginStatus);}}>Admin </Button> */}
              <div className="App-intro">
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    {StudentFeatures&&<Route exact path="/student/topics/:unit_id"component={StudentUnit}/>}
                    {StudentFeatures&&<Route exact path="/student/units/:class_id/:subject_id" component={StudentCourses}/>}
                    {/* {StudentFeatures&&<Route path="/topics"component={StudentTopics}/>} */}
                    {StudentFeatures&&<Route exact path="/student/topic/:topic_id" component={StudentMatrix}/>}
                    {StudentFeatures&&<Route exact path="/student/subjects" component={StudentSubjects}/>}
                    {StudentFeatures&&<Route exact path="/invite/:code" component={Invited}/>}
                    {AdminFeatures&&<Route exact path="/admin-topic/:id" component={AdminMatrix}/>}
                    {/* {AdminFeatures&&<Route exact path="/addtopic"><AddTopicPU openAddTopic={openAddTopic} setOpenAddTopic={setOpenAddTopic}/></Route>} */}
                    {AdminFeatures&&<Route exact path="/AdminTopics" component={AdminTopics}/>}
                    {AdminFeatures&&<Route exact path="/results" component={Results}/>}
                    {AdminFeatures&&<Route exact path="/students" component={Students}/>}
                    <Route component={NotFound} code={"404"}/>
                </Switch>
              </div>
              {AdminFeatures&&<AddCourseSubjectClass/>}

          </ThemeProvider>
        </div>

    );
}

export default App;
