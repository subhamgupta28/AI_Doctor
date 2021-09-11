import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {Backdrop, Button} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    button:{
        margin:10,
    }
}));
export default function SimpleBackdrop() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <div>

            <Button className={classes.button} variant="contained" color="primary" onClick={handleToggle}>
                Show backdrop
            </Button>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <Alert variant="outlined" severity="error">
                    This is a warning alert — check it out!
                </Alert>
                {/*<CircularProgress color="secondary" />*/}
            </Backdrop>
        </div>
    );
}