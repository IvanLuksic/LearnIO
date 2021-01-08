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
        
    },  formControl: {
        margin: theme.spacing(1),
        minWidth: "85%",
      },
    selectClass: {
        margin: theme.spacing(3),
        [theme.breakpoints.down('md')]: {
          minWidth: "80%",
        },
        [theme.breakpoints.up('lg')]: {
          minWidth: "27%",
        },
        width:"90%",
      },
    link:{
        width:"85%",
        marginBottom:"5%",
    },
    linkField:{
        marginTop: theme.spacing(3),
    },
    copyButton:{
        margin: theme.spacing(3),
    }
}));

function InviteLink(props){
    const offline= useSelector(state=>state.offline);
    const classes=useStyles()
    const [AllClasses,setAllClasses]=useState(()=>fakeAllClasses);
    const [SelectedClass,setSelectedClass]=useState(0);
    const [url,setUrl]=React.useState("");
    const textFieldRef = useRef(null);
    const [openSnackbar,setOpenSnackbar]=useState(false);

    const fetchClasses=()=>{
        const requestOptions = {
            method: 'GET',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include'
        };
        fetch('http://127.0.0.1:3000/api/all/classes', requestOptions)
        .then(response => response.json())
        .then(data => {  setAllClasses(data)})
        .catch((error)=>console.log('Error in fetch function '+ error));
    };

    const handleClass=(event)=>{
        setSelectedClass(event.target.value);   
        getURL(event.target.value);
    }
    //funkcija za dobit url za svaki class posebno
    const getURL=(sub)=>{
        const requestOptions = {
            method: 'GET',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include',
        };
        fetch(`http://127.0.0.1:3000/api/invite/to/class/${sub.class_id}`, requestOptions)// class subject course
        .then(response => response.json())
        .then(data=>setUrl(`http://learnio.com/${data.link}`))
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
        (!offline)&&fetchClasses();
    },[])
    return(
        <Grid>
            <CustomSnackbar text="Copied" status="success" open={openSnackbar} handleClose={closeSnackbar}></CustomSnackbar>
            <Grid item>
                <Typography className={classes.topicTitle}>Invite</Typography>
            </Grid>
            <Grid item xs={12}>
            {/* <FormControl className={classes.selectClass} >
                <InputLabel id="demo-simple-select-label">Choose class</InputLabel>
                <Select value={SelectedClass} onChange={handleClass}>
                {
                    AllClasses.map((group)=>{ 
                    return <MenuItem value={group.id}>{group.name}</MenuItem>
                   
                })
                 }
            </Select>
            </FormControl> */}
            {/* <FormControl className={classes.selectClass}>
                    <InputLabel >Choose class</InputLabel>
                    <Select id="selektiranjeFilterPropertyja" value={SelectedClass} onChange={handleClass}>
                        {
                             AllClasses.map((group)=>{
                                return(
                                    <MenuItem value={group.id}>{group.name}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl> */}
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Class</InputLabel>
        <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="Class" value={SelectedClass} onChange={handleClass}>
            {
                    AllClasses.map((group)=>{
                    return(
                        <MenuItem value={group}>{group.class_name}</MenuItem>
                    )
                })
            }
        </Select>
      </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" >Invitation link:</Typography>
            </Grid>
            <Grid item xs={12} className={classes.linkField}>
                <TextField variant="outlined" value={url} className={classes.link} size="small" inputRef={textFieldRef}></TextField>
            </Grid>
            <Grid item xs={12} className={classes.copyButton}>
                <Button variant="contained" color="primary" size="large" onClick={copyToClipboard}>Copy</Button>
            </Grid>
        </Grid>                
    );
}
export default InviteLink;