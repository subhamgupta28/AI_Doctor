import {makeStyles} from "@material-ui/core/styles";
import React, {useEffect, useState} from "react";
import {Button, Chip, Paper, Typography} from "@material-ui/core";
import firebase from "../FirebaseWork"
import {Skeleton} from "@material-ui/lab";
import {Search} from "@material-ui/icons";
import {useTransition, animated} from 'react-spring'

const chipStyle = makeStyles((theme) => ({
    root: {
        marginBottom: 12,
        borderRadius: 16,
        maxWidth: '95%',
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
        backdropFilter: 'blur(7px)',
        // boxShadow:
        //     "0px 0px 30px 1px rgba(70,70,70,0.8)",
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
    button: {

        marginBottom: 10,


    },
    text: {
        marginTop: 10,
        position: "relative",
        left: '-33%'

    },
    search: {
        margin: 8,
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        position: "relative",
        left: 20,
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1.0),
        },

    },
    auto: {
        width: 250
    },
    f: {
        justifyContent: "center",
        alignItems: "center",
    }


}));

export default function Chips() {
    const [hide, setHide] = useState(false)
    const [diseaseList, setDiseaseList] = useState([{
        symptom: '',
        severity: '',
    }]);
    const [docs, setDocs] = useState([{}]);

    const classes = chipStyle();
    const dt = ['common_disease', 'above_common', 'concerning', 'slight_danger', 'average_danger', 'danger', 'critical']
    const uuid = firebase.auth().currentUser.uid;
    const db = firebase.firestore();
    useEffect(() => {
        const fetchData = async () => {
            const data = await db.collection("disease_severity").get()
            const value = data.docs.map(doc => doc.data());
            setDocs(value);
            try {
                setDiseaseList(value[0]["common_disease"]);
            } catch (e) {
                console.log(e)
            }
            setHide(true)
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
            .then(() => console.log("Symptoms added"));

    }
    const changeDType = (i) => {
        console.log(i)
        setDiseaseList(docs[0][dt[parseInt([Math.random() * 7] + "")]])

    }

    const colors = (n) => {
        switch (n) {
            case 1:
                return "#00ce7e";
            case 2:
                return "#009463";
            case 3:
                return "#377FC7";
            case 4:
                return "#006385";
            case 5:
                return "#d9c301";
            case 6:
                return "#FF9B2B";
            case 7:
                return "#FF2442";
            default:
                return;
        }
    }
    const transition = useTransition(hide, {
        from: {x: 0, y: 800, opacity: 0},
        enter: {x: 0, y: 0, opacity: 1},
        leave: {x: 0, y: 800, opacity: 0},
    });

    return (
        <Paper className={classes.root} elevation={8}>
            {transition((style, item) =>
                item ? <animated.div className={classes.f} style={style}>

                        <div className={classes.search}>
                            <Typography variant="h6" gutterBottom>
                                Choose Symptoms or
                            </Typography>
                            <Button
                                className={classes.button}
                                variant={"text"}
                                size={"small"}
                                color={"primary"}
                                id={'search_btn'}
                                // onClick={()=>changeDType(0)}
                            >
                                <Search/>
                                search
                            </Button>

                        </div>
                        <div className={classes.item}>
                            {diseaseList ? diseaseList.map((di) =>
                                <Chip

                                    clickable
                                    size={"small"}
                                    onClick={() => selectSymps(di)}
                                    color={"primary"}
                                    style={{backgroundColor: colors(parseInt(di.severity))}}
                                    // avatar={<Avatar >{di.symptom[0]}</Avatar>}
                                    label={setUpper(di.symptom)}
                                />
                            ) : (
                                <Skeleton variant="rectangular" animation="wave"/>
                            )}
                        </div>
                        <Button
                            className={classes.button}
                            variant={"text"}
                            size={"small"}
                            color={"primary"}
                            onClick={() => changeDType(0)}
                        >
                            change symptoms
                        </Button>


                    </animated.div>

                    : "")}
        </Paper>
    );
}
