import React, {useState} from "react";
import firebase from "../FirebaseWork";
import {Button, Paper, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PrimaryAppBar from "./AppBar";
import Chips from "./Chip";
import SelectedSymptoms from "./SelectedSymptoms"
import "../App.css"
import ShowDialog from "./AggrementDialog";
import ShowDisease from "./ShowDisease";
import ParticlesBg from "particles-bg";
import SearchSymptoms from "./SearchSymptoms";


const textStyle = makeStyles((theme) => ({
    root: {
        margin: 8,
        borderRadius: 12,
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
            const ref = firebase.database().ref("AI_DOCTOR/" + uuid + "/SYMPTOMS");
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

const paperStyle = makeStyles((theme) => ({
    paper: {
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
        backdropFilter: 'blur(1px)',
        borderRadius: 0,
        // boxShadow:
        //     "0px 0px 30px 1px rgba(70,70,70,0.8)",
    }

}));
export default function Home() {
    const classes = paperStyle();
    // const b = localStorage.getItem("agreement_accepted");
    // console.log(b)
    // if (b !== null) {
    //     if (b)
    //         localStorage.setItem("agreement_accepted", "false");
    // }

    return (
        <Paper className={classes.paper}>
            <div className="App">
                <header className="App-header">
                    <PrimaryAppBar/>
                    <ShowDialog/>
                    <ShowDisease/>
                    <SearchSymptoms/>
                    <SelectedSymptoms/>
                    <Chips/>
                </header>
            </div>
            {/*<ParticlesBg  type="cobweb" color="#FF2626" bg={true} />*/}
        </Paper>
    )
}