import React, {useState,useEffect} from 'react';
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
import { useSelector} from 'react-redux';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    topicTitle:{
        fontFamily:'Lobster',
        fontSize:'2.5rem',
        marginBottom:"1rem",
        textShadow:" -5px 5px #30303033",
        color: "#3b3a3a"
      },
    textField:{
        marginTop: "1em",
        marginBottom: "0.5em",
        width:"100%",
        // [theme.breakpoints.up('md')]: {
        //     marginLeft:"1em",
        // }
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
        margin: theme.spacing(1),
        minWidth: "100%",
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
const classIDOs = [
    {class_id: 1, class_name: "1.A"},
    {class_id: 2, class_name: "1.A"},
    {class_id: 3, class_name: "1.A"},
    {class_id: 4, class_name: "1.A"},
    {class_id: 5, class_name: "1.A"},
];

export default function AddSubject(props) {
    const offline= useSelector(state=>state.offline);
    const classes = useStyles();
    const [name,setName] = useState("");
    const [className, setClass] = useState("select class");
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [classCheck, setClassCheck] = useState([]);
    const [classIDs, setClassIDs] = useState(()=>classIDOs);
    const [errorText, setError] = useState(()=>"");

    //dodaj stanje za classIDs
    const fetchClasses=()=>{
        const requestOptions = {
            method: 'GET',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include'
        };
        fetch('http://127.0.0.1:3000/api/all/classes', requestOptions)
        .then(response => response.json())
        .then(data => {  setClassIDs(data)})
        .catch((error)=>{handleIndex(3);setError('Error in fetch function '+ error);});
    };
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
            if(!offline){
                let cl=classCheck.map((cla)=>cla.class_id)
                let send={
                    subject_name: name,
                    class_id: cl,
                    // student_id: [
                    //     {id: 1},
                    // ],
                }
    
                const requestOptions = {
                    method: 'POST',
                    mode:'cors',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({...send}),
                    credentials: 'include'
                };
                fetch('http://127.0.0.1:3000/api/subject/insert', requestOptions)
                .then((data)=>{            
                    if(data.status===200){
                        props.handleIndex(2);
                        props.handleOpen();
                        props.closePopup();
                    }
                    else{
                        setError('Error in fetch function '+ data.status);handleIndex(3);
                }})
                .catch((error)=>{setError('Error in fetch function '+ error);handleIndex(3);});
            }
            else if(offline){
                props.handleIndex(2);
                props.handleOpen();
                props.closePopup();
            };
    
        }
        else if (name.length <= 0){handleIndex(1)}
        else handleIndex(2);
        };

    //---------------------------------------------------------------
    useEffect(()=>{
        (!offline)&&fetchClasses();
    },[]);

    return(
        <Grid className={classes.gridStyle} container item direction="column" justify="space-between" alignItems="center" xs={12} md={10} spacing={1}>
            <Typography className={classes.topicTitle}>Subject</Typography>
            <TextField className={classes.textField} multiline rows={1} id="outlined-basic" variant="outlined" value={name} onChange={handleName} label="Subject name"/>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Subjects</InputLabel>
                <Select  multiple label="Subjects" value={classCheck} onChange={handleClassCheck} renderValue={(selected) => {let array=selected.map((selTop)=>`${selTop.class_id} - ${selTop.class_name}`); return array.join(`, `);} } MenuProps={MenuProps}>
                    {classIDs.map((classID) => (
                        <MenuItem key={classID.class_id} value={classID}>
                            <Checkbox checked={classCheck.indexOf(classID) > -1} />
                            <ListItemText primary={`${classID.class_id} - ${classID.class_name}`} />
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
            }{
                open && index === 3 ? <CustomSnackbar handleClose={handleClose} open={open} text={errorText} status="error"/>
                : null
            }
        </Grid>
    );
}