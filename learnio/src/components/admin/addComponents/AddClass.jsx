import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import CustomSnackbar from '../../common/Snackbar.jsx';

const useStyles = makeStyles((theme)=>({
    textField:{
        marginTop: "1em",
        marginBottom: "0.5em",
        width:"100%",
        [theme.breakpoints.up('md')]: {
            marginLeft:"1em",
        }
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
    gridStyle: {
        marginLeft:"5%",
        marginRight:"5%",
        marginBottom:"5%",
    },
}));

export default function AddCourse(props) {
    const classes = useStyles();
    const [name,setName] = useState("");
    const [year, setYear] = useState("select year");
    const [message, setMessage] = useState("Incorrect year");
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false);

    const handleYear = (value) => {
        setYear(value);
        if(value!=="select year") setMessage("Correct year format");
        else setMessage("Incorrect year");
    }
    const handleName = (event) => {
        setName(event.target.value);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSave = () => {
        if (message!=="Incorrect year" && name.length > 0) {

        let send={
            class_name: name,
            class_year: year,
            student_id: [
                {id: 1},
            ],
        }
        props.handleIndex(1);
        props.handleOpen();
        props.closePopup();
        }
        else if (name.length <= 0) {
            setIndex(1);
            setOpen(true);
        }
        else {
            setIndex(2);
            setOpen(true);
        }
    };

    return(
        <Grid className={classes.gridStyle} container item direction="column" justify="space-between" alignItems="center" xs={12} md={10} spacing={1}>
            <TextField className={classes.textField} multiline rows={1} id="outlined-basic" variant="outlined" value={name} onChange={handleName} label="Class name"/>

            <YearPicker years={props.years} year={year} message={message} handleYear={handleYear}/>

            <Button variant="contained" className={classes.saveBtn} type="submit" onClick={() => handleSave()}>
                SAVE  
                <Icon style={{marginLeft:"0.5em", fontSize:"1.3em"}} >save_icon</Icon>
            </Button>
            {
                open && index === 2 ? <CustomSnackbar handleClose={handleClose} open={open} text="Invalid year" status="error"/>
                : null
            }{
                open && index === 1 ? <CustomSnackbar handleClose={handleClose} open={open} text="Name not specified" status="error"/>
                : null
            }
        </Grid>
    );
}

function YearPicker(props) {

    const handleChange = (event) => {
        props.handleYear(event.target.value);
    }
    
    return(
        <TextField
            style={{margin:"5%", width:"50%"}}
            id="outlined-select-currency"
            select
            value={props.year}
            onChange={handleChange}
            variant="outlined"
            helperText={props.message}>
                {props.years.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.value}
                    </MenuItem>
                ))}
        </TextField>
    );
}