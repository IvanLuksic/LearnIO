import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props}/>;
}

// status can be:
// error - red
// success - green
// warning - orange
// info - blue

export default function CustomSnackbar(props) {
    return(
        <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        open={props.open}
        autoHideDuration={5000}
        onClose={props.handleClose}>
            <Alert onClose={props.handleClose} severity={props.status}>
                {props.text}
            </Alert>
        </Snackbar>
    )
}