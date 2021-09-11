import {makeStyles} from "@material-ui/core/styles";
import React, {useEffect, useState} from "react";
import {Avatar, Button, Chip, Paper} from "@material-ui/core";
import firebase from "../FirebaseWork"


const chipStyle = makeStyles((theme) => ({
    root: {
        marginBottom: 18,
        borderRadius: 16,
        maxWidth: '95%',
        position:"relative",
        alignItems: "center",
        justifyContent: 'center',
    },
    item: {
        margin: 6,
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.4),
        },
    },
    button:{

        margin:5,


    },


}));

export default function Chips() {
    //const [sympList, setSympList] = useState([]);
    const [hide, setHide] = useState(true)
    const [docs, setDocs] = useState([{}]);
    const [diseaseList, setDiseaseList] = useState([{
        symptom:'',
        severity:'',
    }]);
    const classes = chipStyle();
    const dt = ['common_disease', 'above_common', 'concerning', 'slight_danger', 'average_danger', 'danger', 'critical']

    const uuid = firebase.auth().currentUser.uid;
    // console.log(uuid)

    useEffect(()=>{
        const fetchData = async () => {
            const db = firebase.firestore();

            const data = await db.collection("disease_severity").get()
            const value = data.docs.map(doc => doc.data());
            setDocs(value);

            setDiseaseList(value[0]["common_disease"]);
            setHide(false)
        }

        fetchData().then(() => {
            console.log("data fetched");
        });

    }, []);
    const setUpper = (text) => {
        text = text.toUpperCase();
        return text.replace(/_/g, " ")
    }
    const selectSymps = (sp) => {
        const title = sp.symptom;
        // const key = Math.floor(Date.now()).toString();
        const critical = parseInt(sp.severity);
        const reference = firebase.database().ref("AI_DOCTOR/"+uuid+"/SYMPTOMS_SELECTED");
        const symptoms = {
            title,
            "key": title,
            "critical": critical,
            "selected": true
        }
        reference
            .child(title)
            .set(symptoms)
            .then(() => console.log("Symptoms added"));

    }
    const changeDType = (i) => {
        console.log(i)
        setDiseaseList(docs[0][dt[parseInt([Math.random()*7]+"")]])

    }

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

    return (
        <Paper className={classes.root} elevation={8} hidden={hide}>
            <div className={classes.item}>
                {diseaseList ? diseaseList.map((di)=>
                <Chip

                    clickable
                    // size={"small"}
                    onClick={()=>selectSymps(di)}
                    color={"primary"}
                    style={{backgroundColor: colors(parseInt(di.severity))}}
                    avatar={<Avatar >{di.symptom[0]}</Avatar>}
                    label={setUpper(di.symptom)}
                />
                ):''}
            </div>
            <Button
                className={classes.button}
                variant={"outlined"}
                size={"small"}
                color={"primary"}
                onClick={()=>changeDType(0)}
            >
                change symptoms
            </Button>

        </Paper>
    );
}
