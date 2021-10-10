import React, {useCallback, useState} from "react";
import {withRouter} from "react-router";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import medbag from "../drawables/icon.svg";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from '../FirebaseWork'
import {Backdrop, CircularProgress} from "@material-ui/core";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                AI Doctor
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    app: {
        width: "100%",
        height: "100vh",
        flexDirection: 'column',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
    },
    paper: {
        paddingTop: theme.spacing(2),
        padding: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        backgroundColor: 'rgba(180, 180, 255, 0.01)',
        backdropFilter: 'blur(7px)',
        boxShadow:
            "0px 0px 30px 1px rgba(70,70,70,0.8)",
        borderRadius: 20,
    },
    avatar: {
        //margin: theme.spacing(1),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    item: {
        borderRadius: 10,
        margin: 10,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    container: {
        paddingTop: 50,
        paddingBottom: 50,
        padding: theme.spacing(6),
    },
}));

export default function SignUp({history}) {
    const classes = useStyles();
    const [hide, setHide] = useState(false);
    const handleSignUp = useCallback(async event => {
        setHide(true)
        event.preventDefault();
        const {email, password} = event.target.elements;
        try {
            console.log(email.value + " " + password.value);
            await firebase
                .auth()

                .createUserWithEmailAndPassword(email.value, password.value)
                .then(() => {
                });
            history.push("/");

        } catch (error) {
            alert(error);
            setHide(false)
        }
    }, [history]);
    return (
        <div className={classes.app}>
            <CssBaseline/>
            <Container maxWidth='sm' className={classes.container}>


                <div className={classes.paper}>
                    <img className={classes.avatar} height={'60px'} src={medbag}/>
                    <Typography component="h1" variant="h5">
                        Create account to continue
                    </Typography>
                    <form className={classes.form} onSubmit={handleSignUp}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth

                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign up

                        </Button>

                        <Grid container>

                            <Grid item>
                                <Link href="/login" variant="body2">
                                    {"Already have an account? LogIn"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                    <Box mt={4}>
                        <Copyright/>
                    </Box>
                </div>


            </Container>

            <Backdrop className={classes.backdrop} open={hide}>
                <CircularProgress color="secondary"/>
            </Backdrop>
        </div>

    );
}