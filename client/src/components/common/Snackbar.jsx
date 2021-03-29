import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props}/>;
}

const useStyles = makeStyles((theme)=>({
    snackbar: {
        [theme.breakpoints.down('xs')]: {
            bottom: 90,
        },
    },
}));

// status can be:
// error - red
// success - green
// warning - orange
// info - blue

export default function CustomSnackbar(props) {
    const classes = useStyles();
    return(
        <Snackbar
        className={classes.snackbar}
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