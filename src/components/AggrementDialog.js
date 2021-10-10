import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

export default function ShowDialog() {
    const [open, setOpen] = React.useState(false);
    const b = localStorage.getItem("agreement_accepted");
    console.log(b)

    if(b!==null && !b)
        setOpen(!open)

    const handleClose = () => {
        localStorage.setItem("agreement_accepted", "true");
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Disclaimer
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        The predicted disease is NOT 100% true, this site uses common data about disease and
                        their symptoms. We don't encourage you to follow with 100% belief,
                        You may consider consulting to a physical doctor.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
