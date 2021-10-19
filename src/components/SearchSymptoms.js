import {Chip, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@material-ui/core";
import {Autocomplete, Skeleton} from "@material-ui/lab";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import firebase from "../FirebaseWork";
import DialogContentText from "@material-ui/core/DialogContentText";
import DoneIcon from "@material-ui/icons/Done";


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
        width: 500,
        margin: 20,

    },
    d: {
        marginTop: 10,
        width: 500,
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.4),
        },
        marginBottom: 20,
    },

    f: {
        height: 200,
    },
    di:{
        borderRadius:16,
    },
    ro:{

    },

}));

export default function SearchSymptoms() {
    const [open, setOpen] = useState(false);
    const [resultList, setResult] = useState([{
        title: '',
        key: '',
        critical: '',
        selected: '',
    }])
    const classes = searchStyle();
    const [searchList, setSearchList] = useState([{
        symptom: '',
        severity: '',
    }]);
    const uuid = firebase.auth().currentUser.uid;
    const db = firebase.firestore();
    const reference = firebase.database().ref("AI_DOCTOR/" + uuid + "/SYMPTOMS_SELECTED");
    useEffect(() => {
        const fetchData = async () => {
            const data = await db.collection("disease_search").get()
            const value = data.docs.map(doc => doc.data());
            try {
                console.log(value[0]['search'], "Search")
                setSearchList(value[0]['search'])
            } catch (e) {
                console.log(e)
            }
        }
        fetchData().then(() => {
            reference.on("value", (snapshot) => {
                const li = snapshot.val();
                const list = [];
                for (let v in li) {
                    list.push({v, ...li[v]})
                }
                setResult(list)
            });
            console.log("data fetched");
        });
        //setOpen(true)

    }, [db]);
    const search_click = () => {
        console.log("CLICKED")
        setOpen(true)
    }
    const btn = document.getElementById("search_btn")
    if (btn)
        btn.addEventListener("click", search_click)
    const handleSelect = (value) => {
        const title = value.symptom;
        const critical = parseInt(value.severity);
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
    const handleClose = () => {
        setOpen(false)
    }
    const handleChange = (t) => {
        console.log(t, "t")
            t.forEach((i)=>{
                console.log(i)
                const title = i.symptom;
                const critical = i.severity;
                console.log(title, critical)
                const symptoms = {
                    title,
                    "key": title,
                    "critical": critical,
                    "selected": true
                }
                console.log(symptoms)
                reference
                    .child(title)
                    .set(symptoms)
                    .then(() => console.log(t[i]));
            })

    }
    const handleDelete = (sp) => {
        reference.child(sp.key).remove().then(r => {
            //console.log(r.error)
        })
    }
    return (
        <React.Fragment>
            <Dialog
                classes={{paper: classes.di, root:classes.ro}}
                onClose={handleClose}
                open={open}>
                <DialogTitle>
                    Search for symptoms...
                </DialogTitle>
                <Autocomplete
                    multiple
                    className={classes.auto}
                    freeSolo
                    options={searchList}
                    getOptionLabel={(op) => {
                        return setUpper(op.symptom)
                    }}
                    onChange={(n, t) =>
                        handleChange(t)
                    }
                    sx={{width: 3000}}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            variant={"outlined"}
                            color={"primary"}
                            label={"Search"}
                            size={"small"}
                        />}
                />
                <DialogContent
                >
                    <Typography>
                        Already selected symptoms
                    </Typography>
                    <div className={classes.d}>
                        {resultList ? resultList.map((di) =>
                            <Chip
                                clickable
                                size={"small"}
                                variant={"outlined"}
                                onClick={() => handleSelect(di)}
                                color={"secondary"}
                                //style={{backgroundColor: colors(parseInt(di.severity))}}
                                label={setUpper(di.title)}
                                deleteIcon={DoneIcon}
                                onDelete={() => handleDelete(di)}
                            />
                        ) : (
                            <Skeleton variant="rectangular" width={210} height={118} />
                        )}
                    </div>
                    <div className={classes.f}>

                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>

    );
}
