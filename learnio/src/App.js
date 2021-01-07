import React, {useState} from "react";
import { Route ,Switch} from "react-router-dom";
import Login from "./pages/login";
import StudentMatrix from "./pages/StudentMatrix";
import StudentSubject from "./pages/StudentSubject";
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


const theme = createMuiTheme({
    palette: {
      primary: {main: "#4372ec"},
      secondary: {main: "#EB4949"}
    },
  });

function App() {
  const[openAddTopic,setOpenAddTopic]=useState(true);
  const loginStatus = useSelector(state=> state.login);
  let AdminFeatures=false;
  let StudentFeatures=false;

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
                    {StudentFeatures&&<Route path="/topics/:class_id/:subject_id"component={StudentSubject}/>}
                    {/* {StudentFeatures&&<Route path="/topics"component={StudentTopics}/>} */}
                    {StudentFeatures&&<Route exact path="/topic/:id" component={StudentMatrix}/>}
                    {StudentFeatures&&<Route exact path="/subjects" component={StudentSubjects}/>}
                    {AdminFeatures&&<Route exact path="/admin-topic/:id" component={AdminMatrix}/>}
                    {AdminFeatures&&<Route exact path="/addtopic"><AddTopicPU openAddTopic={openAddTopic} setOpenAddTopic={setOpenAddTopic}/></Route>}
                    {AdminFeatures&&<Route exact path="/AdminTopics" component={AdminTopics}/>}
                    {AdminFeatures&&<Route exact path="/results" component={Results}/>}
                    {AdminFeatures&&<Route exact path="/students" component={Students}/>}
                    <Route component={NotFound}/>
                </Switch>
              </div>
              {AdminFeatures&&<AddCourseSubjectClass/>}

          </ThemeProvider>
        </div>

    );
}

export default App;
