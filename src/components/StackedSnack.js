import {SnackbarProvider, useSnackbar} from "notistack";
import React from "react";
import {Button} from "@material-ui/core";

function MyApp(h) {
    const {enqueueSnackbar} = useSnackbar();

    const handleClick = () => {
        enqueueSnackbar('I love snacks.');
    };

    return (
        <React.Fragment>
            <Button onClick={handleClick}>Show snackbar</Button>

        </React.Fragment>
    );
}

export default function StackedSnack() {
    return (
        <SnackbarProvider maxSnack={3}>
            <MyApp />
        </SnackbarProvider>
    );
}