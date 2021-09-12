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

const cardstyle = makeStyles(() => ({
    root: {
        marginTop: 40,
        bottom: '50px',
        top:'-20px',
        width: '98%',
        position: "relative",
        marginBottom:20,

    },

    actionArea: {
        minWidth: 100,
        boxShadow:
            "0px 0px 30px 1px rgba(70,70,70,0.8)",
        textAlign: "center",
        borderRadius: 16,
        transition: '0.2s',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
    di:{
        borderRadius:16,
    },
    ro:{

    }
}));

export default function ShowDisease() {
    const classes = cardstyle();
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState({
        disease: '',
        description: '',
        uuid: '',
        time_stamp: '',
    });
    const [data, setData] = useState([{
        disease: '',
        description: '',
        uuid: '',
        time_stamp: '',
    }]);
    const [hide, setHide] = useState(true)
    const uuid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref("AI_DOCTOR/" + uuid + "/RESULT");
    useEffect(() => {
        ref.on("value", (snapshot) => {
            const result = snapshot.val();
            console.log(result)
            const list = [];
            for (let value in result) {
                list.push({value, ...result[value]})
            }
            setData(list)
            if (list.length === 0)
                setHide(true)
            else
                setHide(false)
            console.log(list)
        });
    }, []);
    const handlecard = (sp) => {

        setMsg(sp)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className={classes.root}>
            <Grid
                hidden={hide}
                container
                spacing={1}
                direction="row"
                justify="center"
                alignItems="center"
            >
                {data ? data.map((sp) =>
                    <Grid item xs={3} key={sp.disease}>
                        <Card className={classes.actionArea} elevation={8}>
                            <CardActionArea
                                onClick={() => handlecard(sp)}
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
                <DialogTitle>{"Predicted Disease is " + msg['disease']}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {msg['description']}
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </div>
    );
}