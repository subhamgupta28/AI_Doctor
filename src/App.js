import React from "react";
import './App.css';
import theme from "./theme";
import {
    Paper,
    ThemeProvider,

} from "@material-ui/core";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import {AuthProvider} from "./components/AuthProvider";
import {BrowserRouter as Router, Route} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home"
import ParticlesBg from "particles-bg";
import History from "./components/History";


function App() {
    setTimeout(function (){
        window.addEventListener('load', function () {
            alert("It's loaded!")
        })
    }, 3000)
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Router>
                    <Paper>
                        <PrivateRoute exact path="/" component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/signup" component={SignUp}/>
                    </Paper>
                </Router>
            </AuthProvider>
            {/*<ParticlesBg  type="cobweb" color="#0000FF" bg={true} />*/}
        </ThemeProvider>
    );
}

export default App;
