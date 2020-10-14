import React from "react";
import Login from "./pages/login.jsx";
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import "./App.css";


const theme = createMuiTheme({
    palette: {
      primary: {main: "#4372ec"},
      secondary: {main: "#EB4949"}
    },
  });

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme} >
                <Login />
            </ThemeProvider>
        </div>
    );
}

export default App;
