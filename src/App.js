import React, {useState} from "react";
import './App.css';
import theme from "./theme";

import {
    Button,
    TextField,
    ThemeProvider,

} from "@material-ui/core";
import Chips from "./components/Chip";
import PrimarySearchAppBar from "./AppBar";
import {makeStyles} from "@material-ui/core/styles";
import firebase from "./FirebaseWork";


const textStyle = makeStyles((theme) => ({
    root: {
       justifyItems:"center",
        margin:20,
    },
    button:{
        marginLeft:20,
        alignContent: "center",
        justifyItems:"center",
    }
}));

function SendSymptoms(){
    const classes = textStyle();
    const [title, setTitle] = useState('');
    const send = (t) => {
        if (title!=null){
            const text = firebase.database().ref("AI_DOCTOR/SYMPTOMS");
            const symp ={
                title,
                critical:1,
                complete:false
            }
            if (symp.title!=="")
                text.child(Math.floor(Date.now())).set(symp);
        }

    }
    const handlechange = (e) => {
        if (e.target.value === null) {
            return;
        }
        setTitle(e.target.value);
    }

    return(
        <div className={classes.root}>
            <TextField

                onChange={handlechange}
                placeholder={"Symptoms"}
                variant={"outlined"}
                color={"primary"}
                title={"Symptoms"}
            >

            </TextField>
            <Button className={classes.button}
                color={"primary"}
                variant={"contained"}
                onClick={send}
            >Send
            </Button>


        </div>
    );

}
function App() {

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <header className="App-header">
                    <PrimarySearchAppBar/>

                    <SendSymptoms/>


                    <Chips/>

                </header>
            </div>
        </ThemeProvider>
    );
}

export default App;
