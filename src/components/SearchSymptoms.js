import {Chip, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import firebase from "../FirebaseWork";
import DialogContentText from "@material-ui/core/DialogContentText";


const searchStyle = makeStyles((theme) => ({
    search: {
        margin: 8,
        marginBottom: 50,


        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1.0),
        },

    },
    auto: {
        width: 450,
        margin:20,
    },
    d:{

        marginBottom:20,
    }

}));

export default function SearchSymptoms() {
    const [open, setOpen] = useState(true);
    const classes = searchStyle();
    const [searchList, setSearchList] = useState([]);
    const uuid = firebase.auth().currentUser.uid;
    const db = firebase.firestore();
    useEffect(() => {
        const fetchData = async () => {
            const data = await db.collection("disease_search").get()
            const value = data.docs.map(doc => doc.data());
            try {
                //setDiseaseList(value[0]["common_disease"]);
                console.log(value[0]['search'], "Search")
                setSearchList(value[0]['search'])
            } catch (e) {
                console.log(e)
            }
        }
        fetchData().then(() => {
            console.log("data fetched");
        });
        setOpen(true)

    }, [db]);
    const search_click = () => {
        console.log("CLICKED")
    }
    const btn = document.getElementById("search_btn")
    if (btn)
        btn.addEventListener("click", search_click)

    const handleSelect = (value) => {

        const title = value.symptom;
        const critical = parseInt(value.severity);
        const reference = firebase.database().ref("AI_DOCTOR/" + uuid + "/SYMPTOMS_SELECTED");
        const symptoms = {
            title,
            "key": title,
            "critical": critical,
            "selected": true
        }
        reference
            .child(title)
            .set(symptoms)
            .then(() =>
                console.log("DONE")
            );
    }
    const setUpper = (text) => {
        text = text.charAt(0).toUpperCase() + text.slice(1);
        return text.replace(/_/g, " ")
    }
    return (
        <React.Fragment>
            <Dialog
                open={open}>
                <TextField
                    className={classes.auto}
                    variant={"outlined"}
                    color={"primary"}
                    label={"Search"}
                    size={"small"}
                />
                <DialogContent>
                   <div className={classes.d}>
                       <Chip
                           clickable
                           size={"small"}
                           color={"primary"}
                           label={'setUpper(di.symptom)'}
                       >

                       </Chip>
                   </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>

    );
}
