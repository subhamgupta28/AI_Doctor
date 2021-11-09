import {

    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Collapse, Dialog, DialogContent, DialogTitle,
    Grid,
    Typography
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import firebase from "../FirebaseWork";
import DialogContentText from "@material-ui/core/DialogContentText";
import {Alert} from "@material-ui/lab";

const cardstyle = makeStyles(() => ({
    root: {

        marginTop:20,
        width: '95%',
        position: "relative",
        marginBottom:20,


    },

    actionArea: {
        minWidth: 100,
        //maxWidth: 150,
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
        // backgroundColor: '#180605',
    },
    ro:{

    },
    alerts:{
       margin: 12,
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
    //console.log(hours + ":" + minutes + ":" + seconds + "." + ms)

    return parseInt(minutes) <= 10 && parseInt(hours)<=0;


}
export default function ShowDisease() {
    const classes = cardstyle();
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState({
        disease: '',
        description: '',
        uuid: '',
        time_stamp: '',
        precautions: [],
    });
    const [data, setData] = useState([{
        disease: '',
        description: '',
        uuid: '',
        time_stamp: '',
        precautions: [],
    }]);
    const [hide, setHide] = useState(true)
    const uuid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref("AI_DOCTOR/" + uuid + "/RESULT");
    const ctime = Date.now();
    useEffect(() => {
        const getData = () => {
            ref.on("value", (snapshot) => {
                setHide(true)
                const result = snapshot.val();
                const list = [];
                setData([])
                for (let value in result) {
                    if (getTimeDiff(parseInt(value), ctime)) {
                        list.push({value, ...result[value]})
                    }
                    //list.push({value, ...result[value]})
                }
                setData(list)
                if (list.length === 0)
                    setHide(true)
                else
                    setHide(false)
            });
        }
        getData()
        setInterval(getData, 1000*60);
    }, []);
    const handleCard = (sp) => {

        setMsg(sp)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
    };
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
        <div className={classes.root} hidden={hide}>
            <Typography hidden={hide} variant="subtitle1" gutterBottom>
                Results from last 10 min
            </Typography>
            <Grid
                hidden={hide}
                container
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
            >

                {data ? data.map((sp) =>
                    <Grid item xs={3} key={sp.disease}>
                        <Card className={classes.actionArea} elevation={8}>
                            <CardActionArea
                                onClick={() => handleCard(sp)}
                            >
                                <CardHeader
                                    subheader={sp.disease}

                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                ) : '0'}
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                keepMounted
                classes={{paper: classes.di, root:classes.ro}}
                scroll={"paper"}
            >
                <DialogTitle >
                    <Alert variant={"filled"} severity="error"> {"Predicted Disease is " + msg['disease']}</Alert>
                    <div className={classes.alerts}> </div>
                    <Alert variant={"filled"} severity="success"> {"Precautions " + toUpper(msg['precautions'])}</Alert>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="subtitle1">
                            {msg['description']}
                        </Typography>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}