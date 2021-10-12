import {makeStyles} from "@material-ui/core/styles";
import {
    AppBar, Button, Dialog,
    IconButton, InputAdornment,
    Menu,
    MenuItem,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import medbag from "../drawables/icon.svg";
import SearchIcon from "@material-ui/icons/Search";
import {AccountCircle, Close} from "@material-ui/icons";
import React, {useState} from "react";
import useDelayedTask from "./useDelayedTask";
import firebase from "../FirebaseWork"
import Divider from "@material-ui/core/Divider";
import History from './History'
import {Autocomplete} from "@material-ui/lab";
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
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',

    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '30ch',
            },
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
        width: 150,
        marginLeft: "40%",
    }
}));

export default function PrimaryAppBar() {
    const classes = appbarstyle();
    const [hisOpen, setHisOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [accOpen, setAcOpen] = useState(false);
    const [searchMsg, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [res, setRes] = useState([{
        disease: "",
        precaution: [],
        description: ""
    }])
    const handleClose = () => {
        setOpen(!open)
        setHisOpen(false)
        setAnchorEl(null);
    };
    const db = firebase.firestore();
    const handleAccount = (event) => {
        setOpen(!open);
        setAnchorEl(event.currentTarget)

    }
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
    const op = [
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
    ]
    const handleLogout = () => {
        firebase.auth().signOut().then(() => console.log("logged out"))
    }
    const handleHistory = () => {
        setHisOpen(true)
    }
    const handleAcClose = () => {
        setAcOpen(false)
    }
    const handleAcOpen = () => {
        setAcOpen(true)
    }
    return (
        <div className={classes.root}>
            <AppBar position="sticky" color={"default"} elevation={8}>
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
                            className={classes.auto}
                            onChange={(event, newValue) => {

                            }}

                            options={op}
                            getOptionLabel={(option) => option.label}
                            sx={{width: 3000}}
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
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}

                        >
                            <MenuItem
                                onClick={handleAcOpen}
                            >
                                My account
                            </MenuItem>
                            <Divider/>
                            <MenuItem
                                onClick={handleHistory}
                            >
                                History
                            </MenuItem>
                            <MenuItem
                                onClick={handleLogout}
                            >
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            color="inherit"
                            onClick={handleAccount}
                        >
                            <AccountCircle/>
                        </IconButton>

                    </div>

                </Toolbar>
            </AppBar>
            <Dialog
                fullScreen
                open={hisOpen}
                onClose={handleClose}
                scroll={"paper"}
            >
                <History/>
                <Button
                    className={classes.btn}
                    variant={"contained"}
                    onClick={handleClose}
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