import {alpha, makeStyles} from "@material-ui/core/styles";
import {
    AppBar, Avatar, Backdrop, Dialog, DialogContent, DialogTitle,
    IconButton, InputAdornment,
    InputBase,
    ListItemIcon,
    Menu,
    MenuItem,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import medbag from "../drawables/icon.svg";
import SearchIcon from "@material-ui/icons/Search";
import {AccountCircle} from "@material-ui/icons";
import React, {useState} from "react";
import useDelayedTask from "./useDelayedTask";
import firebase from "../FirebaseWork"
import Divider from "@material-ui/core/Divider";
import History from './History'
import {Alert, Autocomplete} from "@material-ui/lab";
import DialogContentText from "@material-ui/core/DialogContentText";


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
        // backgroundColor: alpha("#b9b9b9", 0.10),
        // '&:hover': {
        //     backgroundColor: alpha("#b9b9b9", 0.20),
        // },
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
    auto:{
        width:300,
    }
}));

export default function PrimaryAppBar() {
    const classes = appbarstyle();
    const [hisOpen, setHisOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
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
    const handleLogout = () => {
        firebase.auth().signOut().then(() => console.log("logged out"))
    }
    const handleHistory = () => {
       setHisOpen(true)
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
                        {/*<div className={classes.searchIcon}>*/}
                        {/*    <SearchIcon/>*/}
                        {/*</div>*/}
                        {/*<InputBase*/}
                        {/*    onInput={search}*/}
                        {/*    placeholder="Search Disease"*/}
                        {/*    classes={{*/}
                        {/*        root: classes.inputRoot,*/}
                        {/*        input: classes.inputInput,*/}
                        {/*    }}*/}
                        {/*    inputProps={{'aria-label': 'search'}}*/}
                        {/*>*/}

                        {/*</InputBase>*/}
                        <Autocomplete
                            disablePortal
                            freeSolo
                            className={classes.auto}
                            onChange={(event, newValue) => {

                            }}

                            // options={searchList}
                            // getOptionLabel={(option) => setUpper(option.symptom)}
                            sx={{ width: 3000 }}
                            renderInput={(params) =>  <TextField
                                {...params}
                                variant={"outlined"}
                                color={"primary"}
                                // label={'Search'}
                                size={"small"}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
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
                            <MenuItem>
                                My account
                            </MenuItem>
                            <Divider />
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
                open={hisOpen}
                onClose={handleClose}
                keepMounted
                maxWidth={'xl'}
                scroll={"paper"}
            >
                <History/>

            </Dialog>
        </div>
    );
}