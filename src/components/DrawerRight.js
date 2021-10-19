import React, {useState} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import {Box, Dialog} from "@material-ui/core";
import History from "./History";

import {Close, HistoryOutlined, Lock, PersonOutlined} from "@material-ui/icons";
import MyAccount from "./MyAccount";
import firebase from "../FirebaseWork";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    btn: {
        width: 150,
        marginLeft: "40%",
    }
});

export default function DrawerRight() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [hisOpen, setHisOpen] = useState(false);
    const [accOpen, setAcOpen] = useState(false);

    window.onload = function() {
        document.getElementById("menu_btn").addEventListener("click", function (){
            setOpen(true)
        })
    }
    const handleClose = () => {

        setOpen(false)

    }
    const handleAccount = (event) => {
        setOpen(!open);


    }


    const itemsList = [
        {
            text: "Profile",
            icon: <PersonOutlined />,
            onClick: () => setAcOpen(true)
        },
        {
            text: "History",
            icon: <HistoryOutlined />,
            onClick: () => setHisOpen(true)
        },
        {
            text: "Logout",
            icon: <Lock />,
            onClick: () => handleLogout()
        },
        {
            text: "Close",
            icon: <Close />,
            onClick: () => console.log("")
        }
    ];

    const handleLogout = () => {
        firebase.auth().signOut().then(() => console.log("logged out"))
    }

    const handleAcClose = () => {
        setAcOpen(false)
    }
    const handleHisClose = () => {
        setHisOpen(false)
    }

    return (
        <div>
            <React.Fragment key={'right'}>
                <Drawer variant={"temporary"} anchor={'right'} open={open} >
                    <Box
                        sx={{ width: 250 }}
                        role="presentation"
                        onClick={handleClose}

                    >
                        <List>
                            {itemsList.map((item, index)=>{
                                const {text, icon, onClick} = item;
                                return(
                                    <ListItem button key={text} onClick={onClick}>
                                        {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                        <ListItemText primary={text} />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>

                </Drawer>
            </React.Fragment>
            <Dialog
                fullScreen
                open={hisOpen}
                onClose={handleHisClose}
                scroll={"paper"}
            >
                <History/>
                <Button
                    className={classes.btn}
                    variant={"contained"}
                    onClick={handleHisClose}
                    size={"small"}
                >
                    <Close/>
                    Close
                </Button>
            </Dialog>
            <Dialog
                fullScreen
                open={accOpen}
                onClose={handleAcClose}
                scroll={"paper"}
            >
                <MyAccount/>
                <Button
                    className={classes.btn}
                    variant={"contained"}
                    onClick={handleAcClose}
                    size={"small"}
                >
                    <Close/>
                    Close
                </Button>
            </Dialog>
        </div>
    );
}
