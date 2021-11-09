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
        marginRight:40,
        marginLeft:40,
        marginBottom:20,
        marginTop:60,
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

    },
    b:{
        color:'#218aff',
        fontSize:18,
        fontFamily:"monospace",
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

    const toUpper = (t) => {
        let x = ""
        try {
            for (let i = 0; i < t.length; i++) {
                t[i] = t[i].charAt(0).toUpperCase()+t[i].slice(1);
            }
            x = t.join(", ");
        }
        catch(e){
            x = 'N/A'
        }
        return x;

    }
    return (
        <div className={classes.root}>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <TableCell><b className={classes.b}>Diseases</b> </TableCell>
                            <TableCell align="left"><b  className={classes.b}>Precautions</b></TableCell>
                            <TableCell align="left"><b  className={classes.b}>Time</b></TableCell>
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
                                    {toUpper(row.precautions)}
                                </TableCell>
                                <TableCell >{getTimeDiff(row.time_stamp, ctime)+" ago"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}