import {Card, CardActions, CardContent, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {AccountCircle} from "@material-ui/icons";

const style = makeStyles((theme) => ({
    di: {
        display:"flex",
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

export default function Disclaimers() {
    const classes = style();
    return (
        <div className={classes.di}>
            <Card sx={{minWidth: 275}} elevation={25} className={classes.card}>
                <CardContent>
                    <div className={classes.ic}>

                       Disclaimer

                    </div>

                    <Typography sx={{fontSize: 14}} color={"#ff0000"} gutterBottom>
                        <b className={classes.c}>
                            The predicted disease is NOT 100% true,
                            <br/>
                            this site uses common data about disease and
                            <br/>
                            their symptoms. We don't encourage you to follow with 100% belief,
                            <br/>
                            You may consider consulting to a physical doctor.
                        </b>
                    </Typography>



                </CardContent>
            </Card>
        </div>
    );
}
