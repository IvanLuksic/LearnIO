import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home"
import About from "./components/About"
import Navbar from './components/Navbar';
import Contact from './components/Contact';

function App() {
    return (
        <div className="App" style={{height: '100vh'}} >
          <Navbar/>
          <div className="App-intro">
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/contact"component={Contact}/>
          </div>
        </div>
    );
}

export default App;
