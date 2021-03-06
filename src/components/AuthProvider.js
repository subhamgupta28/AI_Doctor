import React,{useEffect, useState} from "react";
import firebase from "../FirebaseWork";
import { makeStyles } from '@material-ui/core/styles';
import {Backdrop, CircularProgress} from "@material-ui/core";



export const AuthContext = React.createContext();
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);
    const classes = useStyles();
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
        });
    }, []);

    if(pending){

        return (
            <Backdrop className={classes.backdrop} open={true} >
                <CircularProgress color="secondary" />
                {/*The predicted disease is NOT 100% true, this site uses common data about disease and*/}
                {/*their symptoms. We don't encourage you to follow with 100% belief,*/}
                {/*You may consider consulting to a physical doctor.*/}
            </Backdrop>
        )
    }



    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};