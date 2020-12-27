import React,{useRef,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {  Button, TextField, Typography } from '@material-ui/core';
import fakeAllClasses from '../../../sampleData/admin/allClasses.json';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CustomSnackbar from '../../common/Snackbar'

const useStyles = makeStyles((theme) => ({
    title:{
        flexGrow:1,
        fontWeight:"bold",
        textAlign: 'center', 
        
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
    linkGroup:{
        margin: theme.spacing(3),
    }
}));

function InviteLink(props){

    const classes=useStyles()
    const [AllClasses,setAllClasses]=useState(()=>fakeAllClasses);
    const [SelectedClass,setSelectedClass]=useState(0);
    const [url,setUrl]=React.useState("");
    const textFieldRef = useRef(null);
    const [openSnackbar,setOpenSnackbar]=useState(false);


    const handleClass=(event)=>{
        setSelectedClass(event.target.value);   
        getURL(event.target.value);
    }
    //funkcija za dobit url za svaki class posebno
    const getURL=(id)=>{
        if(id=="1")
        {
            setUrl("https://www.sofascore.com/hr/");
        }
        else if(id=="2")
        {
            setUrl("http://localhost:3000/students");
        }
        else setUrl("http://localhost:3000/AdminTopics")
    }
    function copyToClipboard(e) {
        textFieldRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setOpenSnackbar(true);
    }
    const closeSnackbar=()=>{
        setOpenSnackbar(false);
    }
    return(
        <Grid>
            <CustomSnackbar text="Copied" status="success" open={openSnackbar} handleClose={closeSnackbar}></CustomSnackbar>
            <Grid item>
                <Typography variant="h6" className={classes.title} color="primary">Invite students in your class</Typography>
            </Grid>
            <Grid item>
            <FormControl className={classes.selectClass} >
                <InputLabel id="demo-simple-select-label">Choose class</InputLabel>
                <Select value={SelectedClass} onChange={handleClass}>
                {
                    AllClasses.map((group)=>{ 
                    return <MenuItem value={group.id}>{group.name}</MenuItem>
                   
                })
                 }
            </Select>
            </FormControl>
            </Grid>
            <Grid item>
                <Typography variant="body1" >Invitation link:</Typography>
            </Grid>
            <Grid item className={classes.linkGroup}>
                <TextField variant="outlined" value={url} className={classes.link} size="small" inputRef={textFieldRef}></TextField>
                <Button variant="contained" color="primary" size="large" onClick={copyToClipboard}>Copy</Button>
            </Grid>
        </Grid>
    );
}
export default InviteLink;