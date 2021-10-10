import {

    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Collapse, Dialog, DialogContent, DialogTitle,
    Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import firebase from "../FirebaseWork";
import DialogContentText from "@material-ui/core/DialogContentText";
import {Alert} from "@material-ui/lab";

const cardstyle = makeStyles(() => ({
    root: {

        justifyContent: "center",
        position: "relative",
        margin: 20,
        alignItems: "center",

    },

    actionArea: {
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
        backdropFilter: 'blur(7px)',
        textAlign: "center",
        borderRadius: 16,
        transition: '0.2s',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
    di:{
        borderRadius:16,
        backgroundColor: '#180605'
    },
    ro:{

    }
}));
function getTimeDiff(et, st) {

    let ms =  parseInt(st) - parseInt(et);
    let seconds = parseInt((ms/1000)%60)
        , minutes = parseInt((ms/(1000*60))%60)
        , hours = parseInt((ms/(1000*60*60))%24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    if (hours!=='00')
        return hours+" hours "+minutes+" minutes"
    else
        return minutes+" minutes";


}

export default function ShowDisease() {
    const classes = cardstyle();
    const ctime = Date.now();
    const [data, setData] = useState([{
        disease: '',
        description: '',
        uuid: '',
        time_stamp: '',
        precautions: [],
    }]);

    const uuid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref("AI_DOCTOR/" + uuid + "/RESULT");
    useEffect(() => {
        const getData = () => {
            ref.on("value", (snapshot) => {
                const result = snapshot.val();
                const list = [];
                setData([])
                for (let value in result) {
                    list.push({value, ...result[value]})
                }
                setData(list)

            });
        }
        getData()
    }, []);


    return (
        <div className={classes.root} hidden={false}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Diseases </TableCell>
                            <TableCell align="left">Precautions</TableCell>
                            <TableCell align="left">Time</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.disease}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.disease}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.precautions}
                                </TableCell>
                                <TableCell align="right">{getTimeDiff(row.time_stamp, ctime)+" ago"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}