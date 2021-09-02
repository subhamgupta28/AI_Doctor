import {alpha, makeStyles} from "@material-ui/core/styles";
import {AppBar, Avatar, IconButton, InputBase, Toolbar, Typography} from "@material-ui/core";
import microscope from "./drawables/microscope.svg";
import SearchIcon from "@material-ui/icons/Search";
import {AccountCircle} from "@material-ui/icons";
import React from "react";

const appbarstyle = makeStyles((theme) => ({
    root: {

        width: '100%',
        boxShadow:10,
        borderRadius: 2,
        flexGrow: 1
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

        borderRadius: 20,
        backgroundColor: alpha(theme.palette.common.black, 0.25),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.black, 0.30),
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
        // vertical padding + font size from searchIcon
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
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
}));

export default function PrimarySearchAppBar() {
    const classes = appbarstyle();

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Toolbar variant={'dense'}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <Avatar ><img height='28px' src={microscope}/></Avatar>
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
                            placeholder="Search Symptoms…"

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

                            aria-haspopup="true"

                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>

        </div>
    );
}