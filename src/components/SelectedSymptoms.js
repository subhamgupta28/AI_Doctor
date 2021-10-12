import {makeStyles} from "@material-ui/core/styles";
import React, {useEffect, useState} from "react";
import firebase from "../FirebaseWork";
import {Avatar, Chip, Snackbar, Fade, Paper, ButtonGroup, Button} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done"


const chipstyle = makeStyles((theme) => ({
    root: {
        marginBottom: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
        // backdropFilter: 'blur(1px)',
        boxShadow:
            "0px 0px 30px 1px rgba(70,70,70,0.8)",
        borderRadius: 16,
        position:"relative",
        maxWidth: '80%',
        alignItems: "center",
        justifyContent: 'center',
    },
    item: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.4),
        },
    },
    button:{

       margin:16,

    }
}));


export default function Chips() {
    const [hide, setHide] = useState(true)
    const [sList, setSList] = useState([]);
    const [sendList, setSendList] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("")
    const classes = chipstyle();
    const uuid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref("AI_DOCTOR/"+uuid+"/SYMPTOMS_SELECTED");
    useEffect(() => {
        ref.on("value", (snapshot) => {
            const outList = snapshot.val();
            const list = [];
            const sl = [];
            for (let value in outList) {
                list.push({value, ...outList[value]})
                sl.push(value)
            }
            console.log(sl)
            setSList(list);
            setSendList(sl)
            if (outList === null)
                setHide(true)
            else
                setHide(false)
        });
    }, []);
    useEffect(()=>{
        const ref = firebase.database().ref("AI_DOCTOR/SERVERS");
        ref.on('value', (snapshot)=>{
            const b = snapshot.val()['SEV_ID_001']['online'];
            if (b){
                //setMsg("Server is online now")
                //setOpen(!open)
            }
        });
    },[]);

    const colors = (n) => {
        switch (n) {
            case 1: return "#00ce7e";
            case 2: return "#009463";
            case 3: return "#377FC7";
            case 4: return "#006385";
            case 5: return "#d9c301";
            case 6: return "#FF9B2B";
            case 7: return "#FF2442";
            default: return;
        }
    }
    const handlePredict = () => {
        const time = Math.floor(Date.now()).toString();
        const ref = firebase.database().ref("AI_DOCTOR/REQUEST_QUEUE");
        const data = {
            uuid: uuid,
            time_stamp: time,
            predicted: false,
            symptoms: sendList,
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
                {sList ? sList.map((symp, index) =>
                    <Chip
                        clickable
                        size={"small"}
                        style={{backgroundColor: colors(symp.critical)}}
                        color={"primary"}
                        avatar={<Avatar>{(symp.title[0]).toUpperCase()}</Avatar>}
                        label={setUpper(symp.title)}
                        deleteIcon={DoneIcon}
                        onDelete={() => handleDelete(symp)}

                    />
                ) : ''}
            </div>
            <ButtonGroup variant={"text"} color="primary"  size={"small"} className={classes.button}>
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