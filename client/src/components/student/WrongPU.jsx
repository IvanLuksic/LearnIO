import React, { useState,useEffect } from 'react';
import { makeStyles,withStyles} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { DataGrid} from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import fakeBackendAssociatedTopics from '../../sampleData/student/associatedTopics.json';
import NotFound from '../common/NotFound';
import CustomSnackbar from '../common/Snackbar.jsx';
import {useSelector} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

const ColorButton = withStyles((theme) => ({
    root: {
        border: 0,
        MarginRight: 0,
        marginLeft: "auto",
        color: "#FFFFFF",
        fontFamily: "Lobster !important",
        borderRadius:"25px",
        backgroundColor: "#EB4949",
        maxHeight: 30,
        '&:hover': {
            backgroundColor: "#D54646",
      },
    },
  }))(Button);
  
const useStyles=makeStyles(theme =>({

    title:{
        fontWeight:"bold",
        fontStyle:"italic",
        padding:"1em 0 1em 0em",
        fontSize:"2em"
    },
    subtitle:{
        padding:"0em 0 1em 0em",
    },
    tabela:{
        //paddingLeft:'8em',
        marginTop:"4em",
        borderColor: "transparent !important",
        height:"20em",
        [theme.breakpoints.down('sm')]: {
          width:"90%",
          paddingLeft: "5%",
          paddingRight:'5%',
        },
        [theme.breakpoints.up('md')]: {
          width:"75%",
          paddingLeft:'4em',
          paddingRight:'4em',
        },
        [theme.breakpoints.up('xl')]: {
          width:"60%",
          paddingLeft:'20%',
          paddingRight:'20%',
        },
      },
      button:{
        margin:"0.5em 0 1.5em 0em",
      },
      pickButton:{
        [theme.breakpoints.down('sm')]: {
            margin:"0.5em 0.4em 2em 0.4em",
            width:"5em"
        },
        [theme.breakpoints.up('md')]: {
            margin:"2em 0.5em",     
            width:"7em"     
        },
        fontSize:"1.2em",
        padding:"0.5em 3em ",
        fontFamily:"Lobster",
        borderRadius:"25px",
    },
}))
function WrongPU(props){//uzima samo closePopup 
    const [data,setData]=useState(()=>fakeBackendAssociatedTopics);//fakeBackendAssociatedTopics
    const classes=useStyles();
    const [noError,setNoError]=useState(()=> true);
    const [snackbarText,setSnackbarText]=useState(()=>"");
    const [snackbarStatus,setSnackbarStatus]=useState(()=>"");
    const [errorStatus,setErrorStatus]=useState(()=>"");
    const [snackbarOpen,setSnackbarOpen]=useState(()=>false);
    const [loading,setLoading]=useState(()=>true);

    const class_id=useSelector(state=>state.class);
    const subject_id=useSelector(state=>state.subject);
    //const top_id=useSelector(state=>state.topic);



    const closePopup=(value)=>{
        if(Number.isInteger(value)){
            let chosenTopic;
            for(let top of data){
                if(top.topic_id===value)chosenTopic=top;
            }
            props.setTopicID(value);
            props.pageProps.history.push(`/student/topic/${class_id}/${subject_id}/${chosenTopic.course_id}/${value}`);
        };
        props.closePopup(false);
    };

    const fetchAssociatedTopics=()=>{

        const requestOptions = {
            method: 'GET',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include'
        };

        fetch(`/api/student/topics/fetch/associated/${subject_id}/${5}`, requestOptions)//topic id
        .then((response)=>{
            if(response.status===200)
            {
              Promise.resolve(response).then(response => response.json())
              .then(data => { 
                  setData(data.Associated);
                  setSnackbarStatus("success");
                  setSnackbarText("Topic loaded successfully.")
                  setSnackbarOpen(true);
                  setLoading(false);
            })}      
            else{
                setNoError(false);
                setSnackbarStatus("error");
                setErrorStatus(response.status);
                setSnackbarText("Topic did not load successfully.")
                setSnackbarOpen(true);
          }})
          .catch((error)=>{
            setNoError(false);
            setSnackbarStatus("error");
            setErrorStatus("Oops");
            setSnackbarText("Topic did not load successfully.")
            setSnackbarOpen(true);
            console.log('Error in fetch function '+ error);
          });



    };
        // .then(data => { setData(data.Associated);})
    //     .catch((error)=>{
    //         console.log('Error in fetch function '+ error);
    //     });
    // }

    useEffect(()=>{
        fetchAssociatedTopics();
    },[])


    const columns = [
        { field: 'id', type:'string',headerAlign:'center', align:'center', renderHeader: () => (<strong>ID</strong>)},
        { field: 'name', type:'string', width: 200,headerAlign:'center', align:'center', type:'string', renderHeader: () => (<strong>TOPIC</strong>)},//imaš required level
        { field: 'open', headerName: `${' '}`,headerAlign:'center', align:'center', renderCell: (params) => <ColorButton size="small" onClick={()=>closePopup(params.getValue('id'))}> Open </ColorButton>}
    ]
    let rows=[];
    for(let i=0;i<data.length;i++){
        rows=[...rows,{
            id: data[i].topic_id,
            name: data[i].topic_name,
            required_lvl: data[i].required_level,
        }]
    }

    let dataExists=(data!=null)?true:false;//nece radit data grid ako nema topica
    return(
        <div>
            {
                (!noError)?<NotFound code={errorStatus}/>
                :loading?<CircularProgress style={{margin:"auto"}}/>
                :<div>
                    <Grid className={classes.title}>
                        <h1>WRONG ANSWER</h1>
                    </Grid>
                    <Grid className={classes.subtitle} >
                        <p>You have answered that question wrong.</p>
                        <p>Go study associated topics.</p>
                        <p>That will help you to understand that question better.</p>
                    </Grid>
                    {dataExists&&
                    <div className={classes.tabela}>
                        <DataGrid disableSelectionOnClick={true} rows={rows} hideFooter={"true"} columns={columns} />
                    </div>
                    }
                    <Grid className={classes.button}>
                        <Button variant="contained" onClick={()=>closePopup(null)} className={classes.pickButton} style={{backgroundColor:"#EB4949", color:"white"}}>Close</Button>
                    </Grid>
                    {
                        snackbarOpen ? <CustomSnackbar handleClose={()=>{setSnackbarOpen(false);}} open={snackbarOpen} text={snackbarText} status={snackbarStatus}/>
                        : null
                    }     
                </div>
            }
        </div>

    )
}
export default WrongPU;
