import React,{useRef,useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {  Button, TextField, Typography } from '@material-ui/core';
import fakeAllClasses from '../../../sampleData/admin/class.json';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CustomSnackbar from '../../common/Snackbar'
import { useSelector} from 'react-redux';
import ListItemText from '@material-ui/core/ListItemText';
import { OutlinedInput } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    topicTitle:{
        fontFamily:'Lobster',
        fontSize:'2.5rem',
        marginBottom:"1rem",
        textShadow:" -5px 5px #30303033",
        color: "#3b3a3a"
      },
    title:{
        flexGrow:1,
        fontWeight:"bold",
        textAlign: 'center', 
        
    },  
    formControl: {
        margin: theme.spacing(1),
        minWidth: "85%",
      },
    link:{
        width:"85%",
        // marginBottom:"5%"
    },
    linkField1:{
        marginBottom: theme.spacing(1),
    },
    linkField2:{
        marginBottom: theme.spacing(2),
    },
    copybtn:{
        width:"85%",
        margin: "1rem auto 3rem auto",
    },
    btn:{
        width:"85%",
        margin: "1rem auto 1rem auto",
        backgroundColor: "#27ae60",
        '&:hover': {
        backgroundColor: "#13532e",
        },

    }
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

function InviteLink(props){
    const offline= useSelector(state=>state.offline);
    const classes=useStyles()
    const [AllClasses,setAllClasses]=useState(()=>fakeAllClasses);
    const [SelectedClass,setSelectedClass]=useState(null);
    const [url,setUrl]=React.useState("");
    const [counterOfMaximumJoins,setCounterOfMaximumJoins]=useState(0);
    const textFieldRef = useRef(null);
    const [openSnackbar,setOpenSnackbar]=useState(false);
    const role=useSelector(state=>state.login);

    const fetchClasses=()=>{
        const requestOptions = {
            method: 'GET',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include'
        };

        let apiUri;
        if(role==="admin") apiUri='/api/admin/all/classes'
        else if(role==="teacher") apiUri='/api/teacher/all/classes';

        fetch(apiUri, requestOptions)
        .then(response => response.json())
        .then(data => {  setAllClasses(data)})
        .catch((error)=>console.log('Error in fetch function '+ error));
    };

    const handleClass=(event)=>{
        setSelectedClass(event.target.value);   
    };

    //funkcija za dobit url za svaki class posebno
    const getURL=(sub)=>{
        const requestOptions = {
            method: 'GET',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include',
        };

        let apiUri;
        if(role==="admin") apiUri=`/api/invite/to/class/${sub.class_id}/${counterOfMaximumJoins}`
        else if(role==="teacher") apiUri=`/api/invite/to/class/${sub.class_id}/${counterOfMaximumJoins}`;

        fetch(apiUri, requestOptions)// class subject course
        .then(response => response.json())
        .then(data=>setUrl(`http://localhost:3001/invite/${data.link}`))
        .catch((error)=>{console.log('Error in fetch function '+ error)});
    };
    function copyToClipboard(e) {
        textFieldRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setOpenSnackbar(true);
    }
    const closeSnackbar=()=>{
        setOpenSnackbar(false);
    };

    useEffect(()=>{
        if(!offline){fetchClasses()};
    },[])
    return(
        <Grid>
            <CustomSnackbar text="Copied" status="success" open={openSnackbar} handleClose={closeSnackbar}></CustomSnackbar>
            <Grid item>
                <Typography className={classes.topicTitle}>Invite</Typography>
            </Grid>
            <Grid item xs={12}  className={classes.linkField1}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel>Classes</InputLabel>
                    <Select label="Classes" value={SelectedClass} onChange={handleClass} MenuProps={MenuProps}>
                        {
                            AllClasses.map((group)=>{
                            return(
                                <MenuItem value={group}>{group.class_name}</MenuItem>
                            )})
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}  className={classes.linkField2}>
                <OutlinedInput variant="outlined" type="number" value={counterOfMaximumJoins} style={{width:"85%", textAlignLast:"center"}} onChange={(e)=>{if(e.target.value>-1&&e.target.value<101){setCounterOfMaximumJoins(e.target.value)}}}/>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" size="large" className={classes.btn} onClick={()=>getURL(SelectedClass)}>Generate link</Button>
            </Grid>
            <Grid item xs={12}  className={classes.linkField2}>
                <TextField variant="outlined" value={url} placeholder={"Invitation URL"} className={classes.link} size="small" inputRef={textFieldRef}></TextField>
            </Grid>
            <Grid item xs={12} >
                <Button variant="contained" color="primary" size="large" className={classes.copybtn} onClick={copyToClipboard}>Copy</Button>
            </Grid>
        </Grid>                
    );
}
export default InviteLink;