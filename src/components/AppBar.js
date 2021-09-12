import {alpha, makeStyles} from "@material-ui/core/styles";
import {AppBar, IconButton, InputBase, Toolbar, Typography} from "@material-ui/core";
import medbag from "../drawables/icon.svg";
import SearchIcon from "@material-ui/icons/Search";
import {AccountCircle} from "@material-ui/icons";
import React, {useState} from "react";
import useDelayedTask from "./useDelayedTask";
import firebase from "../FirebaseWork"
import TemporaryDrawer from './DrawerRight'

const appbarstyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        flexGrow: 1,
    },
    grow:{
        flexGrow:1,
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
        backgroundColor: alpha("#377FC7", 0.10),
        '&:hover': {
            backgroundColor: alpha("#377FC7", 0.20),
        },
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
            width: '25ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },

    sectionMobile: {
        display: 'flex',
        marginLeft:10,
        marginRight:1,

    },
}));

export default function PrimaryAppBar() {
    const classes = appbarstyle();
    const [searchMsg, setSearch] = useState('');

    const handleAccount = (h) => {
        firebase.auth().signOut().then(() => console.log("logged out"))
    }
    useDelayedTask(() => alert(searchMsg), 1000, [searchMsg])
    const search = (sr) => {
        setSearch(sr.target.value)
    }
    return (
        <div className={classes.root}>
            <AppBar position="sticky" color={"default"} elevation={8}>
                <Toolbar  variant={'dense'} >
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
                    <div className={classes.grow}> </div>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            onInput={search}

                            placeholder="Search Disease"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                        />
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            color="inherit"
                            onClick={()=>handleAccount(1)}
                        >
                            <AccountCircle/>
                        </IconButton>

                    </div>

                </Toolbar>
            </AppBar>
            <TemporaryDrawer/>
        </div>
    );
}