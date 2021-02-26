import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import CustomSnackbar from '../../common/Snackbar.jsx';
import { useSelector} from 'react-redux';
import { Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';

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
        // marginBottom: "1em",
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
    gridStyle: {
        // marginLeft:"5%",
        // marginRight:"5%",
        // marginBottom:"5%",
    },
    formControl: {
        marginTop:"0.5em",
        width: "95%",
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



const teachers1=[
    {teacher_name:"John", teacher_surname:"Doelenaky" ,teacher_id: 12},
    {teacher_name:"Joe", teacher_surname:"Doevich" ,teacher_id: 2},
    {teacher_name:"Alice", teacher_surname:"Bobovich" ,teacher_id: 5},
    {teacher_name:"Steve", teacher_surname:"Radich" ,teacher_id: 6},
]

export default function AddCourse(props) {
    const offline= useSelector(state=>state.offline);
    const classes = useStyles();
    const [loading,setLoading] = useState(()=>false);
    const [name,setName] = useState("");
    const [year, setYear] = useState(()=>[]);
    const [teachers, setTeachers] = useState(()=>[]);
    const [possibleTeachers, setPossibleTeachers] = useState(()=>[]);
    const [message, setMessage] = useState("Incorrect year");
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [errorText, setError] = useState(()=>"");
    const [firstTime, setFirstTime] = useState(()=>true);
    const role=useSelector(state=>state.login);

    const getTeachers=()=>{
        if(offline){setPossibleTeachers(teachers1)}
        else{
            const requestOptions = {
                method: 'POST',
                mode:'cors',
                headers: { 'Content-Type': 'application/json'},
                credentials: 'include'
            };

            let apiUri;
            if(role==="admin") apiUri='/api/class/insert'
            else if(role==="teacher") apiUri='/api/class/insert';

            fetch(apiUri, requestOptions)
            .then((data)=>{
                if(data.status===200){
                    setPossibleTeachers(data.teachers)
                }
                else{
                    setError('Error in fetch function '+ data.status);handleIndex(3);
            }})
            .catch((error)=>{setError('Error in fetch function '+ error);handleIndex(3);});
        };
        setLoading(true);
    }

    useEffect(()=>{
        if(firstTime){
            getTeachers();
            setFirstTime(false);
        }
    },[]);

    const handleYear = (value) => {
        setYear(value);
        if(value!=="Select year") setMessage("Correct year format");
        else setMessage("Incorrect year");
    }
    const handleName = (event) => {
        setName(event.target.value);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleIndex = (value) => {
        setIndex(value);
        setOpen(true);
    };

    // looking for this? ------------------------------------
    const handleSave = () => {
        if (message!=="Incorrect year" && name.length > 0) {
        if(!offline){

            let TIDs=teachers.map((t)=>t.teacher_id);
            let send={
                class_name: name,
                class_year: year,
                class_teachers: TIDs,

            }

            const requestOptions = {
                method: 'POST',
                mode:'cors',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({...send}),
                credentials: 'include'
            };

            let apiUri;
            if(role==="admin") apiUri='/api/class/insert'
            else if(role==="teacher") apiUri='/api/class/insert';

            fetch(apiUri, requestOptions)
            .then((data)=>{
                if(data.status===200){
                    props.handleIndex(1);
                    props.handleOpen();
                    props.closePopup();
                }
                else{
                    setError('Error in fetch function '+ data.status);handleIndex(3);
            }})
            .catch((error)=>{setError('Error in fetch function '+ error);handleIndex(3);});
        }
        else if(offline){
            props.handleIndex(1);
            props.handleOpen();
            props.closePopup();
        };

    }
    else if (name.length <= 0){handleIndex(1)}
    else handleIndex(2);
    };
    //---------------------------------------------------------

    return(
        loading?
            <Grid className={classes.gridStyle} container  direction="column" justify="space-between" alignItems="center" >
                <Typography className={classes.topicTitle}>Class</Typography>
                <TextField className={classes.textField} multiline rows={1} id="outlined-basic" variant="outlined" value={name} onChange={handleName} label="Class name"/>
                {/* <YearPicker years={props.years} year={year} message={message} handleYear={handleYear}/> */}
                <Grid item xs={12} className={classes.formControl}> 
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel>Year</InputLabel>
                        <Select label="Year" value={year} onChange={(e)=>handleYear(e.target.value)} MenuProps={MenuProps}>
                            {
                                props.years.map((year)=>{
                                return(
                                    <MenuItem value={year.value}>{year.value}</MenuItem>
                                )})
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.formControl}> 
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel>Teachers</InputLabel>
                        <Select label="Teachers" multiple value={teachers} onChange={(e)=>setTeachers(e.target.value)} renderValue={(selected)=>{let print=""; selected.map((t)=>{if(selected.indexOf(t)!=0){print=print+', '};print=print+t.teacher_name+" "+t.teacher_surname; }); return print}} MenuProps={MenuProps}>
                            {
                                possibleTeachers.map((t)=>{
                                return(
                                    <MenuItem value={t}>{t.teacher_name+" "+t.teacher_surname}</MenuItem>
                                )})
                            }
                        </Select>
                    </FormControl>
                </Grid>
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
                }{
                    open && index === 3 ? <CustomSnackbar handleClose={handleClose} open={open} text={errorText} status="error"/>
                    : null
                }
        </Grid>
        :<CircularProgress style={{margin:"auto"}} />
       
    );
}

// function YearPicker(props) {

//     const handleChange = (event) => {
//         props.handleYear(event.target.value);
//     }
    
//     return(
//         <TextField
//             style={{margin:"5%", width:"50%"}}
//             id="outlined-select-currency"
//             select
//             value={props.year}
//             onChange={handleChange}
//             variant="outlined"
//             helperText={props.message}>
//                 {props.years.map((option) => (
//                     <MenuItem key={option.value} value={option.value}>
//                         {option.value}
//                     </MenuItem>
//                 ))}
//         </TextField>
//     );
// };