import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import CustomSnackbar from '../../common/Snackbar.jsx';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FakeData from '../../../sampleData/temporaryData/studentsCOPY.json';

const useStyles = makeStyles((theme) => ({
    divider:{
      [theme.breakpoints.down('sm')]: {
        display:"none",
    }},
    gridStyle: {
        marginBottom:"5%",
        width:"100%",
        paddingLeft:"3em",
        paddingRight:"3em",
        borderRadius: "7px",
    },
    textField:{
        marginTop: "1em",
        marginBottom: "0.5em",
        width:"100%",
    },
    saveBtn: {
        borderRadius: "7px",
        background:"#EB4949",
        color:"white",
        paddingLeft:"3em",
        paddingRight:"3em",
        marginTop:"1em",
        backgroundColor: "#EB4949",
        '&:hover': {
        backgroundColor: "#b81414",
        },
    },
    table: {
      width:"40%",
      backgroundColor:"#F5F5F5",
    },
}));

export default function AddStudentToClass(props) {
    const classes = useStyles();

    const handleConfirm = () => {
        props.exit();
    }

    return(
        <Grid className={classes.gridStyle} container item direction="column" justify="space-between" alignItems="center">
            <Grid style={{marginTop:"1em", marginBottom:"1em"}} container item direction="row" justify="space-between" alignItems="center">
                <TableContainer className={classes.table} component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Full Name</TableCell>
                                <TableCell align="right">ID</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {FakeData.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">{row.name} {row.surname}</TableCell>
                                    <TableCell align="right">{row.id}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Divider orientation="vertical" flexItem className={classes.divider}/>
                <TableContainer className={classes.table} component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Full Name</TableCell>
                                <TableCell align="right">ID</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {FakeData.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">{row.name} {row.surname}</TableCell>
                                    <TableCell align="right">{row.id}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Button variant="contained" className={classes.saveBtn} type="submit" onClick={() => handleConfirm()}>
                Confirm  
            </Button>
        </Grid>
    );
}