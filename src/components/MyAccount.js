import firebase from "../FirebaseWork"
import {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent, Icon, Typography} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";

const style = makeStyles((theme) => ({
    di: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 150,
        marginBottom: 20,
    },
    card: {
        borderRadius: 10
    },
    c: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
        color: '#218aff'
    },
    ic: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 20,
    }
}));
export default function MyAccount() {
    const classes = style();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [uid, setUid] = useState("");
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user)
            setEmail(user.email)
            setName(user.displayName);
            setUid(user.uid);
        }
    })
    return (
        <div className={classes.di}>
            <Card sx={{minWidth: 275}} elevation={25} className={classes.card}>
                <CardContent>
                    <div className={classes.ic}>

                        <AccountCircle/>

                    </div>

                    <Typography sx={{fontSize: 14}} color={"#ff0000"} gutterBottom>
                        <b className={classes.c}>Account Section</b>
                    </Typography>


                    <Typography sx={{mb: 1.5}} color="text.secondary">

                        {email}
                    </Typography>
                    <Typography variant="body2">
                        {name}
                        <br/>
                        {uid}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}