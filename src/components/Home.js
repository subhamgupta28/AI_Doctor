import React, {useState} from "react";
import firebase from "../FirebaseWork";
import { Button, Paper, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PrimaryAppBar from "./AppBar";
import Chips from "./Chip";
import SelectedSymptoms from "./SelectedSymptoms"
import "../App.css"
import ShowDialog from "./AggrementDialog";
import ShowDisease from "./ShowDisease";
import ParticlesBg from 'particles-bg'



const textStyle = makeStyles((theme) => ({
    root: {
        margin: 8,
        borderRadius:12,
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1.0),
        },
    },
    button: {
        marginLeft: 20,
        display: 'flex',

    },
    papermargin: {
        margin: 10,
    }
}));
function SendSymptoms() {
    const classes = textStyle();
    const [title, setTitle] = useState('');
    const uuid = firebase.auth().currentUser.uid;
    const send = () => {
        if (title.toString().length !== 0) {
            const key = Math.floor(Date.now()).toString();
            const ref = firebase.database().ref("AI_DOCTOR/"+uuid+"/SYMPTOMS");
            const symptoms = {
                title,
                key: key,
                critical: 1,
                selected: false
            }
            ref.child(key).set(symptoms).then(() => console.log("Symptoms added"));
        }
    }
    const handlechange = (e) => {
        if (e.target.value === null) {
            return;
        }
        setTitle(e.target.value);
    }
    return (
        <Paper className={classes.root} elevation={6}>
            <TextField
                onChange={handlechange}
                variant={"outlined"}
                color={"primary"}
                label={"Symptoms"}
                size={"small"}
            >
            </TextField>
            <Button

                className={classes.button}
                color={"primary"}
                variant={"contained"}
                onClick={send}
            >Send
            </Button>
        </Paper>
    );

}

export default function Home(){

    return(
        <Paper >
            <div className="App">
            <header className="App-header">
                <PrimaryAppBar/>
                <ShowDialog/>
                <ShowDisease/>
                <SelectedSymptoms/>
                {/*<SendSymptoms/>*/}
                <Chips/>
            </header>

            </div>
                {/*<ParticlesBg  type="cobweb" color="#0000FF" bg={true} />*/}
        </Paper>
    )
}