import React, {useState} from "react";
import { Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import "./App.css";
import Home from "./components/Home"
import About from "./components/About"
import Navbar from './components/Navbar';
import Contact from './images/Contact';
import StudentTopics from "./components/StudentTopics";
import AddQuestPU from "./components/AddQuestPU";
import MatricaAdmin from"./components/MatricaAdmin";
import AddTopicPU from './components/AddTopicPU';



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
                <Route path="/add-question" component={AddQuestPU}/>
                <Route exact path="/topics"><StudentTopics/></Route>
                <Route path="/login"><Login/> </Route>
                <Route path="/topic/:id" component={MatricaAdmin}/>
                <Route path="/addtopic"><AddTopicPU openAddTopic={openAddTopic} setOpenAddTopic={setOpenAddTopic}/></Route>

          </div>
         

          </ThemeProvider>
        </div>

    );
}

export default App;
