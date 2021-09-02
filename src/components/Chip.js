import {makeStyles} from "@material-ui/core/styles";
import React, {useEffect, useState} from "react";
import {Avatar, Chip} from "@material-ui/core";
import health_heart from "../drawables/health_heart.svg";
import DoneIcon from "@material-ui/icons/Done";
import firebase from "../FirebaseWork"

const chipstyle = makeStyles((theme) => ({
    root: {
        marginBottom:10,
        maxWidth:'90%',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

export default function Chips() {
    const [sympList, setSympList] = useState();
    const classes = chipstyle();
    const symps = firebase.database().ref("AI_DOCTOR/SYMPTOMS");
    useEffect(()=>{

        symps.on("value",(snapshot)=>{
            const sympList = snapshot.val();
            const list =[];
            for (let value in sympList) {
                list.push({value, ...sympList[value]})
            }
            setSympList(list);
        });
    },[]);
    const selectSymps = (symp) => {

    }
    const colors = (n) => {
        if (n===1)
            return "primary"
        else
            return "secondary"
    }

    return (

        <div className={classes.root}>

            {sympList ? sympList.map((symp, index)=>
                <Chip
                    clickable
                    onClick={selectSymps}
                    color={colors(symp.critical)}
                    avatar={<Avatar> <img height={16} src={health_heart} alt={""}/></Avatar>}
                    label={symp.title}
                    deleteIcon={DoneIcon}
                    // onDelete={}
                />
            ):''}
        </div>
    );
}