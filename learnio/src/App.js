import React, {useState} from "react";
import { Route } from "react-router-dom";
import Login from "./pages/login";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import "./App.css";
import Home from "./components/common/Home"
import About from "./components/common/About"
import Navbar from './components/common/Navbar';
import Contact from './images/Contact';
import StudentTopics from "./components/student/StudentTopics";
import MatricaAdmin from"./components/admin/MatricaAdmin";
import AddTopicPU from './components/admin/AddTopicPU';
import AdminTopics from './components/admin/AdminTopics';
import Matrica from './components/student/Matrica';




const theme = createMuiTheme({
    palette: {
      primary: {main: "#4372ec"},
      secondary: {main: "#EB4949"}
    },
  });

function App() {
  const[openAddTopic,setOpenAddTopic]=useState(true);


    return (
        <div className="App" style={{height: '100vh'}} >
          <ThemeProvider theme={theme}>
          <Navbar/>
              <div className="App-intro">
                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/contact" component={Contact}/>
                    <Route exact path="/topics"component={StudentTopics}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/topic/:id" component={Matrica}/>
                    <Route path="/admin-topic/:id" component={MatricaAdmin}/>
                    <Route path="/addtopic"><AddTopicPU openAddTopic={openAddTopic} setOpenAddTopic={setOpenAddTopic}/></Route>
                    <Route path="/AdminTopic" component={AdminTopics}/>
              </div>
          </ThemeProvider>
        </div>

    );
}

export default App;
