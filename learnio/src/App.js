import React, {useState} from "react";
import { Route } from "react-router-dom";
import Login from "./pages/login";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import "./App.css";
import Home from "./components/common/Home"
import Navbar from './components/common/Navbar';
import StudentTopics from "./components/student/StudentTopics";
import MatricaAdmin from"./components/admin/MatricaAdmin";
import AddTopicPU from './components/admin/AddTopicPU';
import AdminTopics from './components/admin/AdminTopics';
import Matrica from './components/student/Matrica';
import {useSelector} from 'react-redux';
import Results from "./components/admin/Results";


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

    return (
        <div className="App" style={{height: '100vh'}} >
          <ThemeProvider theme={theme}>
              <Navbar/>
              {/* <Button onClick={()=>{dispatch(studentLogIn());console.log(loginStatus);}}>Student </Button>
              <Button  onClick={()=>{dispatch(adminLogIn());console.log(loginStatus);}}>Admin </Button> */}
              <div className="App-intro">
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                    {StudentFeatures&&<Route exact path="/topics"component={StudentTopics}/>}
                    {StudentFeatures&&<Route exact path="/topic/:id" component={Matrica}/>}
                    {AdminFeatures&&<Route exact path="/admin-topic/:id" component={MatricaAdmin}/>}
                    {AdminFeatures&&<Route path="/addtopic"><AddTopicPU openAddTopic={openAddTopic} setOpenAddTopic={setOpenAddTopic}/></Route>}
                    {AdminFeatures&&<Route exact path="/AdminTopics" component={AdminTopics}/>}
                    {AdminFeatures&&<Route exact path="/results" component={Results}/>}
              </div>
          </ThemeProvider>
        </div>

    );
}

export default App;
