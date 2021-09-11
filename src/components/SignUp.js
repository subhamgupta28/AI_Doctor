import React, {useCallback, useState} from "react";
import { withRouter } from "react-router";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import medbag from "../drawables/icon.svg";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
    paper: {
        marginTop: theme.spacing(8),

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
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
}));

export default function SignUp({history}) {
    const classes = useStyles();
    const [hide, setHide] = useState(false);
    const handleSignUp = useCallback(async event => {
        setHide(true)
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            console.log(email.value+" "+password.value);
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value)
                .then(()=>{

                });
            history.push("/");

        } catch (error) {
            alert(error);
            setHide(false)
        }
    }, [history]);
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
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
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
            <Backdrop className={classes.backdrop} open={hide} >
                <CircularProgress color="secondary" />
            </Backdrop>
        </Container>

    );
}