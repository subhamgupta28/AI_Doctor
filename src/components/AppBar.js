import {makeStyles} from "@material-ui/core/styles";
import {
    AppBar, Box, Dialog,
    IconButton, InputAdornment,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import medbag from "../drawables/icon.svg";
import SearchIcon from "@material-ui/icons/Search";
import {AccountCircle, Close, HistoryOutlined, Lock, PersonOutlined} from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import useDelayedTask from "./useDelayedTask";
import firebase from "../FirebaseWork"
import {Autocomplete} from "@material-ui/lab";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import History from "./History";
import Button from "@material-ui/core/Button";
import MyAccount from "./MyAccount";


const appbarstyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        flexGrow: 1,

    },
    grow: {
        flexGrow: 2,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: 6,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },

    sectionMobile: {
        display: 'flex',
        marginLeft: 10,
        marginRight: 1,

    },
    auto: {
        width: 300,
        position: "relative",
    },
    btn: {

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    active:{
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
    }

}));

export default function PrimaryAppBar() {
    const classes = appbarstyle();
    const [open, setOpen] = useState(false);
    const [hisOpen, setHisOpen] = useState(false);
    const [accOpen, setAcOpen] = useState(false);
    const [op, setOp] = useState([]);
    const [searchMsg, setSearch] = useState('');
    const [res, setRes] = useState([{
        disease: "",
        precaution: [],
        description: ""
    }])

    const db = firebase.firestore();
    useEffect(() => {
        setOp([
            {label: 'The Shawshank Redemption', year: 1994},
            {label: 'The Godfather', year: 1972},
            {label: 'The Godfather: Part II', year: 1974},
            {label: 'The Dark Knight', year: 2008},
            {label: '12 Angry Men', year: 1957},
            {label: "Schindler's List", year: 1993},
            {label: 'Pulp Fiction', year: 1994},
            {
                label: 'The Lord of the Rings: The Return of the King',
                year: 2003,
            }
        ]);
    }, [])
    useDelayedTask(() => doSearch(searchMsg), 1000, [searchMsg])
    const search = (sr) => {
        setSearch(sr.target.value)
    }
    const doSearch = async (data) => {
        const re = await db.collection("disease_desc")
            .where('disease', "==", data).get();
        const value = re.docs.map(doc => doc.data());
        console.log(value)
        if (value.length !== 0) {
            setRes(value)
            console.log(value[0]['disease'], res);
        }
    }
    const handleOpen = () => {
        setOpen(true)
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
            icon: <PersonOutlined/>,
            onClick: () => setAcOpen(true)
        },
        {
            text: "History",
            icon: <HistoryOutlined/>,
            onClick: () => setHisOpen(true)
        },
        {
            text: "Logout",
            icon: <Lock/>,
            onClick: () => handleLogout()
        },
        {
            text: "Close",
            icon: <Close/>,
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
        <div className={classes.root}>
            <AppBar position="sticky" color={"transparent"} elevation={8}>
                <Toolbar variant={'dense'}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"

                        href={'/'}
                        aria-label="open drawer"
                    >
                        <img alt={"MedBag"} height='28px' src={medbag}/>
                    </IconButton>
                    <Typography className={classes.title} variant="h6">
                        <b>AI Doctor</b>
                    </Typography>
                    <div className={classes.grow}>

                    </div>
                    <div className={classes.search}>
                        <Autocomplete
                            freeSolo
                            id="combo-box-demo"
                            options={op}
                            onChange={(event, newValue) => {
                                console.log(newValue, "new")
                            }}
                            getOptionLabel={(option) => option.label}
                            sx={{width: 300}}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    variant={"outlined"}
                                    color={"primary"}
                                    // label={'Search'}
                                    size={"small"}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon/>
                                            </InputAdornment>
                                        ),
                                    }}
                                />}
                        />
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            id={"menu_btn"}
                            aria-label="show more"
                            color="inherit"
                            onClick={handleOpen}
                        >
                            <AccountCircle/>
                        </IconButton>

                    </div>

                </Toolbar>
            </AppBar>
            <React.Fragment key={'right'}>
                <Drawer variant={"temporary"} anchor={'right'} open={open} onClose={handleClose}>
                    <Box
                        sx={{width: 250}}
                        role="presentation"
                        onClick={handleClose}
                    >
                        <List>
                            {itemsList.map((item, index) => {
                                const {text, icon, onClick} = item;
                                return (

                                    <ListItem button key={text} onClick={onClick} activeClassName={classes.active}>
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
                <div
                    className={classes.btn}
                >
                    <Button

                        variant={"contained"}
                        onClick={handleHisClose}
                        size={"small"}
                    >
                        <Close/>
                        Close
                    </Button>
                </div>
            </Dialog>
            <Dialog
                fullScreen
                open={accOpen}
                onClose={handleAcClose}
                scroll={"paper"}
            >
                <MyAccount/>
                <div
                    className={classes.btn}
                >
                    <Button

                        variant={"contained"}
                        onClick={handleAcClose}
                        size={"small"}
                    >
                        <Close/>
                        Close
                    </Button>
                </div>
            </Dialog>

        </div>
    );
}
