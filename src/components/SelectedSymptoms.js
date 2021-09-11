import {makeStyles} from "@material-ui/core/styles";
import React, {useEffect, useState} from "react";
import firebase from "../FirebaseWork";
import {Avatar, Chip, Snackbar, Fade, Paper, ButtonGroup, Button} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done"


const chipstyle = makeStyles((theme) => ({
    root: {
        marginBottom: 12,
        borderRadius: 16,
        position:"relative",
        maxWidth: '80%',
        alignItems: "center",
        justifyContent: 'center',
    },
    item: {
        margin:6,
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.4),
        },
    },
    button:{

       margin:8,

    }
}));


export default function Chips() {
    const [hide, setHide] = useState(true)
    const [sympList, setSympList] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("")
    const classes = chipstyle();
    const uuid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref("AI_DOCTOR/"+uuid+"/SYMPTOMS_SELECTED");
    useEffect(() => {
        ref.on("value", (snapshot) => {
            const sympList = snapshot.val();
            const list = [];
            for (let value in sympList) {
                list.push({value, ...sympList[value]})
            }
            setSympList(list);
            if (sympList === null)
                setHide(true)
            else
            setHide(false)
        });
    }, []);

    const colors = (n) => {
        if (n===1)
            return "#00ce7e"
        if (n===2)
            return "#009463"
        if (n===3)
            return "#377FC7"
        if (n===4)
            return "#006385"
        if (n===5)
            return "#d9c301"
        if (n===6)
            return "#FF9B2B"
        if (n===7)
            return "#FF2442"


    }
    const handlePredict = () => {
        const time = Math.floor(Date.now()).toString();
        const ref = firebase.database().ref("AI_DOCTOR/REQUEST_QUEUE");
        const data = {
            uuid: uuid,
            time_stamp: time,
            predicted: false,
        }
        ref.child(time).set(data).then(() => {
            setMsg("Symptoms are being processed, please wait for results")
            setOpen(!open)
        });
    }
    const setUpper = (text) => {
        text = text.toUpperCase();
        return text.replace(/_/g, " ")
    }
    const handleClear = () => {
      ref.remove().then(()=>{
          setMsg('All Symptoms Removed');
          setOpen(!open);
      })
    }

    const handleDelete = (sp) => {
        ref.child(sp.key).remove().then(r => {
            setMsg( setUpper(sp.title) + " Removed");
            setOpen(!open);

        })
    }
    return (
        <Paper className={classes.root} elevation={6} hidden={hide}>

            <div className={classes.item}>
                {sympList ? sympList.map((symp, index) =>
                    <Chip
                        clickable
                        size={"small"}
                        style={{backgroundColor: colors(symp.critical)}}
                        color={"primary"}
                        avatar={<Avatar>{symp.title[0]}</Avatar>}
                        label={setUpper(symp.title)}
                        deleteIcon={DoneIcon}
                        onDelete={() => handleDelete(symp)}

                    />
                ) : ''}
            </div>
            <ButtonGroup  color="primary" className={classes.button}>
                <Button onClick={handleClear}>Clear</Button>
                <Button onClick={handlePredict}>Predict</Button>
            </ButtonGroup>
            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                TransitionComponent={Fade}
                message={msg}
                autoHideDuration={2000}

            />

        </Paper>
    );
}