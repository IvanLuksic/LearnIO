import React, {useState,useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import CustomSnackbar from '../../common/Snackbar.jsx';
import { useSelector} from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import { subHours } from 'date-fns';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    textField:{
        marginTop: "1em",
        marginBottom: "1em",
        width:"90%",
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
        marginTop:"2.5em",
        marginBottom:"2.5em",
        height:"2.7rem",
        backgroundColor: "#27ae60",
        '&:hover': {
        backgroundColor: "#13532e",
        },
    },
    formControl: {
        marginBottom:"1em",
        width: "90%",
        // [theme.breakpoints.up('md')]: {
        //     marginLeft:"1em",
        // }
      },
    topicTitle:{
        fontFamily:'Lobster',
        fontSize:'2.5rem',
        marginBottom:"1rem",
        textShadow:" -5px 5px #30303033",
        color: "#3b3a3a"
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
const subs= [
    {subject_id: 1, subject_name: "Racunarstvo", classes:[{class_name:"Preddiplomski", class_year:"2014."},{class_name:"Strucni", class_year:"2014."}]},
    {subject_id: 2, subject_name: "Elektrotehnika", classes:[{class_name:"Preddiplomski", class_year:"2014."},{class_name:"Strucni", class_year:"2014."}]},
    {subject_id: 3, subject_name: "Brodogradnja", classes:[{class_name:"Preddiplomski", class_year:"2014."},{class_name:"Strucni", class_year:"2014."}]},
];

export default function AddCourse(props) {
    const offline= useSelector(state=>state.offline);
    const classes = useStyles();
    const [name, setName] = useState("");
    const [subjectCheck, setSubjectCheck] = useState(()=>null)
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [subjects, setSubjects] = useState(()=>subs);
    const [errorText, setError] = useState(()=>"");

    const role=useSelector(state=>state.login);

    const fetchSubjects=()=>{
        const requestOptions = {
            method: 'GET',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include'
        };

        let apiUri;
        if(role==="admin") apiUri='/api/admin/subjects/all/with/classes'
        else if(role==="teacher") apiUri='/api/teacher/subjects/all/with/classes';

        fetch(apiUri, requestOptions)
        .then(response => response.json())
        .then(data => {  setSubjects(data);console.log(data);})
        .catch((error)=>{handleIndex(3);setError('Error in fetch function '+ error);});
    };
    const getClassNames = (subject) => {
        let array=subject.classes.map((cl)=>cl.class_name+" "+cl.class_year);
        return array.join(", ");
    };
    const handleName = (event) => {
        setName(event.target.value);
    };
    const handleSubjectCheck = (event) => {
        setSubjectCheck(event.target.value);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleIndex = (value) => {
        setIndex(value);
        setOpen(true);
    };
    useEffect(()=>{
        (!offline)&&fetchSubjects();
    },[]);
    // looking for this? -----------------------------------------------------
    const handleSave = () => {
        if (name.length > 0 && subjectCheck!==undefined) {
            if(!offline){
                let send={
                    subject_id: subjectCheck.subject_id,
                    course_name:name
                }
                const requestOptions = {
                    method: 'POST',
                    mode:'cors',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({...send}),
                    credentials: 'include'
                };

                let apiUri;
                if(role==="admin") apiUri='/api/course/insert'
                else if(role==="teacher") apiUri='/api/course/insert';
        

                fetch(apiUri, requestOptions)
                .then((data)=>{            
                    if(data.status===200){
                        props.handleIndex(3);
                        props.handleOpen();
                        props.closePopup();
                    }
                    else{
                        setError('Error in fetch function '+ data.status);handleIndex(3);
                }})
                .catch((error)=>{setError('Error in fetch function '+ error);handleIndex(3);});
            }
            else if(offline){
                props.handleIndex(3);
                props.handleOpen();
                props.closePopup();
            };
    
        }
        else if (name.length <= 0){handleIndex(1)}
        else handleIndex(2);
        };
    //-------------------------------------------------------------------------

    return(
        <Grid container direction="column" justify="space-between" alignItems="center">
            <Typography className={classes.topicTitle}>Unit</Typography>
            <TextField className={classes.textField} multiline rows={1} id="outlined-basic" variant="outlined" value={name} onChange={handleName} label="Unit name"/>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Subjects</InputLabel>
                <Select label="Subjects" value={subjectCheck} onChange={(event)=>handleSubjectCheck(event)} renderValue={(selected) => `${selected.subject_id} - ${selected.subject_name}`}  MenuProps={MenuProps}>
                    {subjects.map((subject) => (
                            <MenuItem key={subject.subject_id} value={subject}>
                                <Tooltip title={getClassNames(subject)} placement="right" arrow>
                                    <ListItemText primary={`${subject.subject_id} - ${subject.subject_name}`} />
                                </Tooltip>
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
                open && index === 2 ? <CustomSnackbar handleClose={handleClose} open={open} text="No subjects selected" status="error"/>
                : null
            }{
                open && index === 3 ? <CustomSnackbar handleClose={handleClose} open={open} text={errorText} status="error"/>
                : null
            }
        </Grid>
    );
}