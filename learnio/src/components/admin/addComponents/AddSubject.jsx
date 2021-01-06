import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import CustomSnackbar from '../../common/Snackbar.jsx';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

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
    formControl: {
        margin: theme.spacing(2),
        width: "70%",
        position: "relative",
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
        width: 200,
      },
    },
};
const classIDs = [
    {id: 1, name: "1.A"},
    {id: 2, name: "2.B"},
    {id: 3, name: "3.C"},
    {id: 4, name: "4.D"},
    {id: 5, name: "5.E"},
    {id: 6, name: "6.F"},
];

export default function AddSubject(props) {
    const classes = useStyles();
    const [name,setName] = useState("");
    const [className, setClass] = useState("select class");
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [classCheck, setClassCheck] = useState([]);
    //dodaj stanje za classIDs

    const handleName = (event) => {
        setName(event.target.value);
    };
    const handleIndex = (value) => {
        setIndex(value);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClassCheck = (event) => {
        setClassCheck(event.target.value);
    };

    // looking for this? --------------------------------------------
    const handleSave = () => {
        if(name.length > 0 && classCheck.length > 0) {
            props.handleIndex(2);
            props.handleOpen();
            props.closePopup();
        }
        else if(name.length <= 0) handleIndex(1);
        else handleIndex(2);
    };

    //---------------------------------------------------------------

    return(
        <Grid className={classes.gridStyle} container item direction="column" justify="space-between" alignItems="center" xs={12} md={10} spacing={1}>
            <TextField className={classes.textField} multiline rows={1} id="outlined-basic" variant="outlined" value={name} onChange={handleName} label="Subject name"/>
            <FormControl className={classes.formControl}>
                <InputLabel>Subjects</InputLabel>
                <Select  multiple value={classCheck} onChange={handleClassCheck} renderValue={(selected) => {let array=selected.map((selTop)=>`${selTop.id} - ${selTop.name}`); return array.join(`, `);} } MenuProps={MenuProps}>
                    {classIDs.map((classID) => (
                        <MenuItem key={classID.id} value={classID}>
                            <Checkbox checked={classCheck.indexOf(classID) > -1} />
                            <ListItemText primary={`${classID.id} - ${classID.name}`} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="contained" className={classes.saveBtn} type="submit" onClick={() => handleSave()}>
                SAVE  
                <Icon style={{marginLeft:"0.5em", fontSize:"1.3em"}}>save_icon</Icon>
            </Button>
            {
                open && index === 1 ? <CustomSnackbar handleClose={handleClose} open={open} text="Name not specified" status="error"/>
                : null
            }{
                open && index === 2 ? <CustomSnackbar handleClose={handleClose} open={open} text="No classes selected" status="error"/>
                : null
            }
        </Grid>
    );
}