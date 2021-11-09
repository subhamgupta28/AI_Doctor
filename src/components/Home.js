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
import DrawerRight from "./DrawerRight";

const paperStyle = makeStyles((theme) => ({
    paper: {
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
        backdropFilter: 'blur(1px)',
        borderRadius: 0,
    }

}));
export default function Home() {
    const classes = paperStyle();

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
            {/*color="#FF2626"*/}
            <ParticlesBg  type="cobweb" color="#FF2626" bg={true} />
        </Paper>
    )
}