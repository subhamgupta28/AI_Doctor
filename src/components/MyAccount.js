import firebase from "../FirebaseWork"
import {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent, Typography} from "@material-ui/core";

const style = makeStyles((theme)=>({
    di:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginTop:100,
        marginBottom:20,
    },
    card:{
        backgroundColor:'#505050',
        borderRadius:10
    },
    c:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginBottom:30,
        color:'#218aff'
    }
}));
export default function MyAccount(){
    const classes = style();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [uid, setUid] = useState("");
    firebase.auth().onAuthStateChanged((user)=>{
        if (user){
            console.log(user)
             setEmail(user.email)
             setName(user.displayName);
             setUid(user.uid);
        }
    })
    return(
        <div className={classes.di}>
            <Card sx={{ minWidth: 275 }} elevation={20} className={classes.card}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color={"#ff0000"} gutterBottom>
                        <b className={classes.c}>Account Section</b>
                    </Typography>


                    <Typography sx={{ mb: 1.5 }} color="text.secondary">

                        {email}
                    </Typography>
                    <Typography variant="body2">
                        {name}
                        <br />
                        {uid}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}