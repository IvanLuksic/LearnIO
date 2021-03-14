import React, { useState, useEffect } from'react';
import {Button, TextField, Typography}from'@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { useSelector} from 'react-redux';
import Slider from '@material-ui/core/Slider';
import fakeBackendTopics from '../../../sampleData/admin/allTopics.json';


const useStyles = makeStyles((theme)=>({
    dialogWrapper:{
        position:'absolute',
    },
    topicTitle:{
      fontFamily:'Lobster',
      fontSize:'4.5rem',
      marginBottom:"3rem",
      marginTop:"1rem",
      textShadow:" -5px 5px #30303033",
      color: "#3b3a3a"
    },
    grupaBotuna:{
      marginTop:"0.5em",
      [theme.breakpoints.down('sm')]: {
        marginBottom: "1em",
      },
      [theme.breakpoints.up('md')]: {
        marginBottom: "6em",
      },
    },
    title:{
        fontFamily:'roboto',
        fontsize:'3vh',
        flexGrow:'1',  
    },
    formControl: {
        margin: theme.spacing(2),
        width: "80%",
        position: "relative",
    },
    formControl2: {
        margin: theme.spacing(2),
        width: "100%",
        position: "relative",
    },
    root: {
        '& > *': {
          width: '25ch',
        },
    },
    popupStyle:{
      whiteSpace:"nowrap",
      display:"flex",
      flexDirection:"row",
      justify:"space-between",
      alignItems:"flex-start",
      backgroundColor:"white",
      padding:"0 2em 1em 2em !important",
      borderRadius:"7px" ,
      width:"100%",
      height:"15.5em",
      [theme.breakpoints.down('sm')]: {
        flexDirection:"column",
        padding: "0 0 0 0",
        width:"11em",
        justify:"center",
        alignItems:"center",
        height:"auto",
      }
    },
    popupMenu:{
      position:"absolute",
      float:"right",
      width:"11em",
      marginRight:"3em",
      [theme.breakpoints.down('sm')]: {
        marginRight:"0",
        position:"static",
      },
    },
    divider:{
      marginLeft:"14em",
        [theme.breakpoints.down('sm')]: {
          display:"none",
          marginLeft:"0",
    }},
    buttonsInGroup:{
      width:"11em",
      whiteSpace:"nowrap",
      backgroundColor:"#27AE60",
      color:"white",
      '&:hover': {
        backgroundColor: "#1f894b",
     },
     [theme.breakpoints.down("md")]:{
       backgroundColor:"red",
     },
     [theme.breakpoints.down("sm")]:{
       backgroundColor:"blue",
     },
     [theme.breakpoints.up("lg")]:{
       backgroundColor:"black",
     },
    },
    formControlGrid:{
      width:"100%",
      display:"flex",
      flexDirection:"column",
      justifyContent:"flex-start",
      alignItems:"flex-start",
      marginLeft:"3em",
      [theme.breakpoints.down("sm")]:{
        justifyContent:"center",
        alignItems:"flex-start",
        marginLeft:"0",
      }
    },
    rightSide:{
      display:"flex",
      flexDirection:"column",
      justify:"flex-start",
      alignItems:"flex-start",
      width:"35vw",
      [theme.breakpoints.down("sm")]:{
        height:"30vh",
        width:"11em",
        justify:"center",
        alignItems:"flex-start",
      },
    },
    topicName:{
      width:"70%",
    },
    dropText:{
      fontSize:"0.8rem",
    },
    dropMenus:{
      [theme.breakpoints.up('md')]: {
        paddingLeft:"2em !important",
      }
    },
    saveBtn: {
      width:"11em",
      borderRadius: "7px",
      background:"#EB4949",
      color:"white",
      paddingLeft:"3em",
      paddingRight:"3em",
      backgroundColor: "#EB4949",
      '&:hover': {
        backgroundColor: "#b81414",
    },
    [theme.breakpoints.down('sm')]: {
        marginBottom:"2em",
    }
    },
    textFields: {
      display:"flex",
      flexDirection:"column",
      width:"100%",
    },
    textField1:{
      marginBottom: "1em",
      width:"100%",
      [theme.breakpoints.up('md')]: {
        marginLeft:"1em",
      }
    },
    textField2:{
      marginTop: "0em",
      marginBottom: "1em",
      width:"100%",
      [theme.breakpoints.up('md')]: {
        marginLeft:"1em",
      }
    },
    topicWithSlider:{
      marginBottom:"0.5em",
      padding:"0 0 0 1rem",
      alignItems:"center"
    },
  editText:{
    width:"30vw",
    marginLeft:"3.5em",
    marginTop:"0.5em",
    display:"flex",
    flexDirection:"column",
    justify:"center",
    alignItems:"center",
    [theme.breakpoints.down("sm")]: {
      marginLeft:"0",
      width:"11em",
      marginTop:"0",
    }
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

const subjectCoursePairs=[
  {
    subject_id: 1,
    subject_name:"Matematika 1",
    course_id:140,
    course_name:"Elektrotehnika"
  },
  {
    subject_id: 3,
    subject_name:"Fizika 1",
    course_id:120,
    course_name:"Računarstvo"
  },
  {
    subject_id: 2,
    subject_name:"Elektronika 2",
    course_id:180,
    course_name:"Electrical engineering"
  },
  {
    subject_id: 4,
    subject_name:"Engleski 2",
    course_id:160,
    course_name:"Elektrotehnika"
  }
];

const TopicAndLevel=(props)=>{
  const classes=useStyles();

  return(
    <Grid container flexDirection="row" justify="center" item className={classes.topicWithSlider}>
        <Grid item xs={4}>
          <p><span style={{color:"grey"}}>#{props.topic.topic_id} </span> {props.topic.topic_name}</p>
        </Grid>
        <Grid  container flexDirection="row" justify="center" item xs={3} style={{padding:"0.25em",borderRadius:"25px",border:"1px solid lightgrey",backgroundColor:"#77777722",alignItems:"center", marginLeft:"1em"}}>
          <Grid item xs={8}>
            <Slider aria-labelledby="discrete-slider-small-steps" step={1} marks min={1} max={5} valueLabelDisplay="auto" value={props.AOL} onChange={(event,newValue)=>{if(props.topic.didChange===false){props.setDidChange(props.topic)};props.setAOL(newValue);}}/>
          </Grid>
          <Grid item xs={2} style={{marginLeft:"0.5em"}}>
              {props.AOL}
          </Grid>
        </Grid>
      </Grid>
  );
};

const AOInput=(props)=>{
  const classes=useStyles();
  return(
      <Grid item xs={5}>
        <TextField className={classes.textField1} value={props.addOrEdit?props.AOI:props.AOI.asessment_name} id="outlined-basic" variant="outlined" label={`AO${props.i}`} onChange={(e)=>{if(props.addOrEdit){props.setAOI(e.target.value)}else{props.setAOI({asessment_id:props.AOI.asessment_id, asessment_name:e.target.value})}}} />
      </Grid>
  );
};

function AddTopicPU(props){

    const offline= useSelector(state=>state.offline);
    const [addOrEdit,setAddOrEdit]=useState(()=>props.addOrEdit);
    const [valueAO, setValueAO] = useState(()=>{if(props.columns_AO!==undefined){return props.columns_AO} else{return null}});
    const [valueD, setValueD] = useState(()=>{if(props.rows_D!==undefined){return props.rows_D} else{return null}});
    const [valueText,setValueText]= useState(()=>{if(props.topic_name!==undefined){return props.topic_name} else{return ""}});
    const [show1, setShow1] = useState(true);
    const [show2, setShow2] = useState(false);
    const [valueDesc,setValueDesc]=useState(()=>{if(props.topic_description!==undefined){return props.topic_description} else{return ""}});
    const [associatedTopicVisible, setAssociatedTopicVisible] = useState((!props.addOrEdit));
    const [associatedTopicsPossible, setAssociatedTopicsPossible] = useState([{topic_id:-1,topic_name:""}]);
    const [subjectAndCourseList, setSubjectAndCourseList]=useState(()=>subjectCoursePairs);
    const [subjectAndCourse, setSubjectAndCourse]=useState(()=>{
      if(props.course_id!==undefined&&props.course_name!==undefined&&props.subject_id!==undefined&&props.subject_name!==undefined){
        return {course_id:props.course_id,course_name:props.course_name,subject_id:props.subject_id,subject_name:props.subject_name}
      }
      else return null;
    });
    const [AOI1,setAOI1]=useState(()=>{if(props.asessments_array!==undefined&&props.asessments_array[0]!==undefined){return props.asessments_array[0]}else{ return ""}});
    const [AOI2,setAOI2]=useState(()=>{if(props.asessments_array!==undefined&&props.asessments_array[1]!==undefined){return props.asessments_array[1]}else{ return ""}});
    const [AOI3,setAOI3]=useState(()=>{if(props.asessments_array!==undefined&&props.asessments_array[2]!==undefined){return props.asessments_array[2]}else{ return ""}});
    const [AOI4,setAOI4]=useState(()=>{if(props.asessments_array!==undefined&&props.asessments_array[3]!==undefined){return props.asessments_array[3]}else{ return ""}});
    const [AOI5,setAOI5]=useState(()=>{if(props.asessments_array!==undefined&&props.asessments_array[4]!==undefined){return props.asessments_array[4]}else{ return ""}});
    const [AOI6,setAOI6]=useState(()=>{if(props.asessments_array!==undefined&&props.asessments_array[5]!==undefined){return props.asessments_array[5]}else{ return ""}});
    const [AOI7,setAOI7]=useState(()=>{if(props.asessments_array!==undefined&&props.asessments_array[6]!==undefined){return props.asessments_array[6]}else{ return ""}});
    const [AOI8,setAOI8]=useState(()=>{if(props.asessments_array!==undefined&&props.asessments_array[7]!==undefined){return props.asessments_array[7]}else{ return ""}});
    const [AOI9,setAOI9]=useState(()=>{if(props.asessments_array!==undefined&&props.asessments_array[8]!==undefined){return props.asessments_array[8]}else{ return ""}});
    const [AOI10,setAOI10]=useState(()=>{if(props.asessments_array!==undefined&&props.asessments_array[9]!==undefined){return props.asessments_array[9]}else{ return ""}});
    const [AOL1,setAOL1]=useState(()=>{if(props.associated_topics!==undefined&&props.associated_topics[0]!==undefined){return props.associated_topics[0].required_level}else{ return 3}});
    const [AOL2,setAOL2]=useState(()=>{if(props.associated_topics!==undefined&&props.associated_topics[1]!==undefined){return props.associated_topics[1].required_level}else{ return 3}});
    const [AOL3,setAOL3]=useState(()=>{if(props.associated_topics!==undefined&&props.associated_topics[2]!==undefined){return props.associated_topics[2].required_level}else{ return 3}});
    const [AOL4,setAOL4]=useState(()=>{if(props.associated_topics!==undefined&&props.associated_topics[3]!==undefined){return props.associated_topics[3].required_level}else{ return 3}});
    const [AOL5,setAOL5]=useState(()=>{if(props.associated_topics!==undefined&&props.associated_topics[4]!==undefined){return props.associated_topics[4].required_level}else{ return 3}});
    const [AOL6,setAOL6]=useState(()=>{if(props.associated_topics!==undefined&&props.associated_topics[5]!==undefined){return props.associated_topics[5].required_level}else{ return 3}});
    const [AOL7,setAOL7]=useState(()=>{if(props.associated_topics!==undefined&&props.associated_topics[6]!==undefined){return props.associated_topics[6].required_level}else{ return 3}});
    const [AOL8,setAOL8]=useState(()=>{if(props.associated_topics!==undefined&&props.associated_topics[7]!==undefined){return props.associated_topics[7].required_level}else{ return 3}});
    const [AOL9,setAOL9]=useState(()=>{if(props.associated_topics!==undefined&&props.associated_topics[8]!==undefined){return props.associated_topics[8].required_level}else{ return 3}});
    const [AOL10,setAOL10]=useState(()=>{if(props.associated_topics!==undefined&&props.associated_topics[9]!==undefined){return props.associated_topics[9].required_level}else{ return 3}});

    const setDidChange=(top)=>{
      let temp=top;
      temp.didChange=true;
      let arr=associatedTopic.filter((t)=>t!==top);
      arr.push(temp);
      setAssociatedTopic(arr);
    }

    const [associatedTopic, setAssociatedTopic] = useState(()=>{if(props.associated_topics!==undefined){return props.associated_topics.map((t)=>{return {didChange:false, topic_id:t.topic_id,topic_name:t.topic_name,course_name:t.course_name,course_id:t.course_id,subject_id:t.subject_id,subject_name:t.subject_name,topic_description:t.topic_description}})} else{return []}});

    const role=useSelector(state=>state.login);

    const fetchTopics=(sub)=>{
      let dataFetched;
      const requestOptions = {
        method: 'GET',
        mode:'cors',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include'
    };

    let apiUri;
    if(role==="admin") apiUri=`/api/admin/topics/associated/${sub.subject_id}`
    else if(role==="teacher") apiUri=`/api/admin/topics/associated/${sub.subject_id}`;
    if(offline){setAssociatedTopicsPossible(fakeBackendTopics);};
    fetch(apiUri, requestOptions)
    .then((response)=>{
      if(response.status===200)
      {
        Promise.resolve(response).then(response => response.json())
        .then(data => {  
          setAssociatedTopicsPossible(data);
          props.setSnackbarStatus("success");
          props.setSnackbarText("Associated topics loaded successfully.")
          props.setSnackbarOpen(true);
        })
      }
      else{
        props.setSnackbarStatus("error");
        props.setSnackbarText("Associated topics did not load successfully.")
        props.setSnackbarOpen(true);
    }})
    .catch((error)=>{
      props.setSnackbarStatus("error");
      props.setSnackbarText('Error in fetch function '+ error);
      props.setSnackbarOpen(true);
      console.log('Error in fetch function '+ error);
    });
  };

    const handleChangeTag = (event) => {
      setAssociatedTopic(event.target.value);
    };
    const handleChangePair = (event) => {
      if(event.target.value!==subjectAndCourse){
        setAssociatedTopicVisible(false);
        setAssociatedTopic([]);
        setSubjectAndCourse(event.target.value);
        if(!offline){
          fetchTopics(event.target.value);
          setAssociatedTopicVisible(true);
        }
        else setAssociatedTopicsPossible(fakeBackendTopics);
        setAssociatedTopicVisible(true);
    };};
    const handleChangeText=(event)=>{
      setValueText(event.target.value); 
    };

    const handleChangeDesc=(event)=>{
      setValueDesc(event.target.value); 
    };

    const handleChangeAO = (event) => {
      setValueAO(event.target.value); 
    };

    const handleChangeD = (event) => {
      setValueD(event.target.value); 
    };

    const getSubjectCoursePairs=()=>{
      const requestOptions = {
        method: 'GET',
        mode:'cors',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include'
      };

      let apiUri;
      if(role==="admin") apiUri=`/api/admin/topics/subject/course/pairs`
      else if(role==="teacher") apiUri=`/api/teacher/topics/subject/course/pairs`;

      fetch(apiUri, requestOptions)
      .then((response)=>{
        if(response.status===200)
        {
          Promise.resolve(response).then(response => response.json())
          .then(data => {  
            setSubjectAndCourseList(data);
            props.setSnackbarStatus("success");
            props.setSnackbarText("Subjects-unit pairs loaded successfully.")
            props.setSnackbarOpen(true);
          })
        }
        else{
          props.setSnackbarStatus("error");
          props.setSnackbarText("Subjects-unit pairs did not load successfully.")
          props.setSnackbarOpen(true);
      }})
      .catch((error)=>{
        props.setSnackbarStatus("error");
        props.setSnackbarText('Error in fetch function '+ error);
        props.setSnackbarOpen(true);
        console.log('Error in fetch function '+ error);
      });
    };

    useEffect(()=>{getSubjectCoursePairs()},[]);
    //submit botun sprema vrijednosti i poziva closePopUp
    const handleSave= ()=>{
      if(subjectAndCourse!==null){
        let arrayAT=[];
        let arrayAO=[];
        if(associatedTopic!==[null]){
          if(associatedTopic[0]!==undefined)arrayAT.push({...associatedTopic[0],required_level:AOL1});
          if(associatedTopic[1]!==undefined)arrayAT.push({...associatedTopic[1],required_level:AOL2});
          if(associatedTopic[2]!==undefined)arrayAT.push({...associatedTopic[2],required_level:AOL3});
          if(associatedTopic[3]!==undefined)arrayAT.push({...associatedTopic[3],required_level:AOL4});
          if(associatedTopic[4]!==undefined)arrayAT.push({...associatedTopic[4],required_level:AOL5});
          if(associatedTopic[5]!==undefined)arrayAT.push({...associatedTopic[5],required_level:AOL6});
          if(associatedTopic[6]!==undefined)arrayAT.push({...associatedTopic[6],required_level:AOL7});
          if(associatedTopic[7]!==undefined)arrayAT.push({...associatedTopic[7],required_level:AOL8});
          if(associatedTopic[8]!==undefined)arrayAT.push({...associatedTopic[8],required_level:AOL9});
          if(associatedTopic[9]!==undefined)arrayAT.push({...associatedTopic[9],required_level:AOL10});

        };
        if(valueAO>0)arrayAO.push(AOI1);
        if(valueAO>1)arrayAO.push(AOI2);
        if(valueAO>2)arrayAO.push(AOI3);
        if(valueAO>3)arrayAO.push(AOI4);
        if(valueAO>4)arrayAO.push(AOI5);
        if(valueAO>5)arrayAO.push(AOI6);
        if(valueAO>6)arrayAO.push(AOI7);
        if(valueAO>7)arrayAO.push(AOI8);
        if(valueAO>8)arrayAO.push(AOI9);
        if(valueAO>9)arrayAO.push(AOI10);
        console.log(arrayAO);
        let send={
          topic_name: valueText,
          columns_AO:valueAO,
          rows_D: valueD,
          course_id:subjectAndCourse.course_id,
          associated_topics: arrayAT,
          topic_description:valueDesc,
          asessments_array:arrayAO
        };

        const requestOptions = {
          method: 'POST',
          mode:'cors',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(send),
          credentials: 'include'
        };

        offline&&(props.addTopic!==undefined)&&props.addTopic({
          topic_id:Math.floor(Math.random()*10000),
          topic_name:valueText,
          course_id:subjectAndCourse.course_id,
          course_name:subjectAndCourse.course_name,
          subject_id:subjectAndCourse.subject_id,
          subject_name:subjectAndCourse.subject_name,
          topic_description:valueDesc
        });
        offline&&(props.closePopup!==undefined)&&props.closePopup();

        let apiUri;
        if(role==="admin") apiUri=`/api/add/topic`
        else if(role==="teacher") apiUri=`/api/add/topic`;

        fetch(apiUri, requestOptions)
        .then((response)=>{
          if(response.status===200)
          {
            Promise.resolve(response).then(response => response.json())
              .then(data => {
                (props.addTopic!==undefined)&&props.addTopic({
                  topic_id:data.topic_id,
                  topic_name:valueText,
                  course_id:subjectAndCourse.course_id,
                  course_name:subjectAndCourse.course_name,
                  subject_id:subjectAndCourse.subject_id,
                  subject_name:subjectAndCourse.subject_name,
                  topic_description:valueDesc
                });
                props.closePopup();
                props.setSnackbarStatus("success");
                props.setSnackbarText("Topic added successfully.")
                props.setSnackbarOpen(true);
              })
            }
            else{
              props.setSnackbarStatus("error");
              props.setSnackbarText("Topic hasn't been added successfully.")
              props.setSnackbarOpen(true);
            }
        })
        .catch((error)=>{
          props.setSnackbarStatus("error");
          props.setSnackbarText('Error in fetch function '+ error);
          props.setSnackbarOpen(true);
          console.log('Error in fetch function '+ error);
        });
      }
    };
    const handleEdit=()=>{
      if(subjectAndCourse!==null){
        let arrayAT=[];
        let arrayAO=[];
        if(associatedTopic!==[null]){
          if(associatedTopic[0]!==undefined)arrayAT.push({...associatedTopic[0],required_level:AOL1});
          if(associatedTopic[1]!==undefined)arrayAT.push({...associatedTopic[1],required_level:AOL2});
          if(associatedTopic[2]!==undefined)arrayAT.push({...associatedTopic[2],required_level:AOL3});
          if(associatedTopic[3]!==undefined)arrayAT.push({...associatedTopic[3],required_level:AOL4});
          if(associatedTopic[4]!==undefined)arrayAT.push({...associatedTopic[4],required_level:AOL5});
          if(associatedTopic[5]!==undefined)arrayAT.push({...associatedTopic[5],required_level:AOL6});
          if(associatedTopic[6]!==undefined)arrayAT.push({...associatedTopic[6],required_level:AOL7});
          if(associatedTopic[7]!==undefined)arrayAT.push({...associatedTopic[7],required_level:AOL8});
          if(associatedTopic[8]!==undefined)arrayAT.push({...associatedTopic[8],required_level:AOL9});
          if(associatedTopic[9]!==undefined)arrayAT.push({...associatedTopic[9],required_level:AOL10});

        };
        if(valueAO>0)arrayAO.push(AOI1);
        if(valueAO>1)arrayAO.push(AOI2);
        if(valueAO>2)arrayAO.push(AOI3);
        if(valueAO>3)arrayAO.push(AOI4);
        if(valueAO>4)arrayAO.push(AOI5);
        if(valueAO>5)arrayAO.push(AOI6);
        if(valueAO>6)arrayAO.push(AOI7);
        if(valueAO>7)arrayAO.push(AOI8);
        if(valueAO>8)arrayAO.push(AOI9);
        if(valueAO>9)arrayAO.push(AOI10);
        console.log(arrayAO);
        let send={
          topic_id: props.topic_id,
          topic_name: valueText,
          columns_AO:valueAO,
          rows_D: valueD,
          course_id:subjectAndCourse.course_id,
          associated_topics: arrayAT,//didChange bit
          topic_description:valueDesc,
          asessments_array:arrayAO
        };
        console.log(send);

        const requestOptions = {
          method: 'PUT',
          mode:'cors',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(send),
          credentials: 'include'
        };

        if(offline){
          props.setTopicName(valueText);
          console.log("Hej");
          props.setTopicDescription(valueDesc);
        };
        offline&&(props.closePopup!==undefined)&&props.closePopup();

        let apiUri;
        if(role==="admin") apiUri=`/api/topic/edit`
        else if(role==="teacher") apiUri=`/api/topic/edit`;

        fetch(apiUri, requestOptions)
        .then((response)=>{
          if(response.status===204)//KOD
          {
                props.closePopup();
                props.setSnackbarStatus("success");
                props.setSnackbarText("Topic edited successfully.")
                props.setSnackbarOpen(true);
            }
            else{
              props.setSnackbarStatus("error");
              props.setSnackbarText("Topic hasn't been edited successfully.")
              props.setSnackbarOpen(true);
            }
        })
        .catch((error)=>{
          props.setSnackbarStatus("error");
          props.setSnackbarText('Error in fetch function '+ error);
          props.setSnackbarOpen(true);
          console.log('Error in fetch function '+ error);
        });
      }
    };

    const findTopic=(topic)=>{
      let count=-1;
      for(let i=0;i<associatedTopic.length;i++){
        if(topic.topic_id===associatedTopic[i].topic_id)count=i;
      }
      return count;
    };

    const classes=useStyles();
    return(
      <Grid container item className={classes.popupStyle}> 
      <Grid container item className={classes.popupMenu} direction="column" justify="space-between" alignItems="center"> 
              <Grid item className={classes.grupaBotuna}>
              <ButtonGroup orientation="vertical" variant="contained">
                  <Button variant="contained" onClick={() => {setShow1(true);setShow2(false)}} className={classes.buttonsInGroup}>{show1&&<Icon>keyboard_arrow_right</Icon>}  Topic      </Button>
                  <Button variant="contained" onClick={() => {setShow1(false);setShow2(true);if(!addOrEdit){fetchTopics({subject_id:props.subject_id})}}} className={classes.buttonsInGroup}>{show2&&<Icon>keyboard_arrow_right</Icon>}  Connections</Button>
                </ButtonGroup>
              </Grid>
              <Grid item>          
                <Button variant="contained" className={classes.saveBtn} type="submit" onClick={addOrEdit?handleSave:handleEdit} >
                    SAVE  
                <Icon style={{marginLeft:"0.5em", fontSize:"1.3em"}} >save_icon</Icon>
                </Button>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem className={classes.divider}/>
            {
                        show1 ? 
                        <Grid container item className={classes.editText}> 
                            <Grid container item className={classes.textFields}>
                                  <Grid item>
                                    <TextField className={classes.textField1} multiline rows={1} id="outlined-basic" variant="outlined" label="Topic name" value={valueText} onChange={handleChangeText}/>
                                  </Grid>
                                  <Grid>
                                    <TextField className={classes.textField2} multiline rows={3} id="outlined-basic" variant="outlined" label="Description" value={valueDesc} onChange={handleChangeDesc}/>
                                  </Grid>
                                </Grid>
                                <Grid className={classes.dropMenus} container item direction="row" justify="flex-start" alignItems="center">
                                  <Grid container item diredtion="row" justify="center" alignItems="center"  xs={12} md={6} >
                                    <p className={classes.dropText}>Select levels of AO :</p>                            
                                    <InputLabel id="demo-simple-select-label-AO"></InputLabel>
                                    <Select style={{width:"20%"}} labelId="demo-simple-select-label" id="demo-simple-select" value={valueAO} onChange={handleChangeAO}>
                                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((valuesAO) => (
                                      <MenuItem key={valuesAO} value={valuesAO}><ListItemText primary={valuesAO} /></MenuItem>))}                                   
                                    </Select>
                                  </Grid>
                                  <Grid container item diredtion="row" xs={12} md={6} justify="center" alignItems="center">
                                      <p className={classes.dropText}>Select levels of D : </p>
                                      <InputLabel id="demo-simple-select-label-d"></InputLabel>
                                      <Select style={{width:"20%"}} labelId="demo-simple-select-label" id="demo-simple-select" value={valueD} onChange={handleChangeD}>
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((valuesD) => (
                                        <MenuItem key={valuesD} value={valuesD}><ListItemText primary={valuesD} /></MenuItem>))}
                                      </Select>
                                    </Grid>
                                    <Grid container item direction="row" xs={12} md={6} justify="center" alignItems="center">
                                        <p className={classes.dropText}>Select levels of D : </p>
                                        <InputLabel id="demo-simple-select-label-d"></InputLabel>
                                        <Select style={{width:"20%"}} labelId="demo-simple-select-label" id="demo-simple-select" value={valueD} onChange={handleChangeD}>
                                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((valuesD) => (
                                          <MenuItem key={valuesD} value={valuesD}><ListItemText primary={valuesD} /></MenuItem>))}
                                        </Select>
                                    </Grid>
                                </Grid>
                                }
                                <Grid container item direction="row" xs={12} md={12} style={{justifyContent:"space-evenly"}}>
                                  {(valueAO>0)&&<AOInput addOrEdit={props.addOrEdit} setAOI={setAOI1} AOI={AOI1} i={1}/>}
                                  {(valueAO>1)&&<AOInput addOrEdit={props.addOrEdit} setAOI={setAOI2} AOI={AOI2} i={2}/>}
                                  {(valueAO>2)&&<AOInput addOrEdit={props.addOrEdit} setAOI={setAOI3} AOI={AOI3} i={3}/>}
                                  {(valueAO>3)&&<AOInput addOrEdit={props.addOrEdit} setAOI={setAOI4} AOI={AOI4} i={4}/>}
                                  {(valueAO>4)&&<AOInput addOrEdit={props.addOrEdit} setAOI={setAOI5} AOI={AOI5} i={5}/>}
                                  {(valueAO>5)&&<AOInput addOrEdit={props.addOrEdit} setAOI={setAOI6} AOI={AOI6} i={6}/>}
                                  {(valueAO>6)&&<AOInput addOrEdit={props.addOrEdit} setAOI={setAOI7} AOI={AOI7} i={7}/>}
                                  {(valueAO>7)&&<AOInput addOrEdit={props.addOrEdit} setAOI={setAOI8} AOI={AOI8} i={8}/>}
                                  {(valueAO>8)&&<AOInput addOrEdit={props.addOrEdit} setAOI={setAOI9} AOI={AOI9} i={9}/>}
                                  {(valueAO>9)&&<AOInput addOrEdit={props.addOrEdit} setAOI={setAOI10} AOI={AOI10} i={10}/>}
                                </Grid>
                            </Grid>
                            : null
                        }{
                        show2?
                              <Grid container item className={classes.rightSide}>
                                <Grid container item className={classes.formControlGrid}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel >Subject and course</InputLabel>
                                    <Select disabled={!addOrEdit} value={subjectAndCourse} onChange={handleChangePair}  renderValue={(selected) => `${selected.course_id} - ${selected.course_name}: ${selected.subject_name}`} MenuProps={MenuProps}>
                                      {subjectAndCourseList.map((pair) => (
                                        <MenuItem key={pair.course_id, pair.subject_id} value={pair}>
                                          <ListItemText primary={`${pair.course_id} - ${pair.course_name}: ${pair.subject_name}`} />
                                        </MenuItem>
                                      ))}
                                    </Select>
                                </FormControl>
                                </Grid>
                                {associatedTopicVisible&&<Grid container item className={classes.formControlGrid}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel >Associated topics</InputLabel>
                                    <Select  multiple value={associatedTopic} onChange={handleChangeTag}  renderValue={(selected) => {let array=selected.map((selTop)=>`${selTop.topic_id} - ${selTop.topic_name}`); return array.join(`, `);} } MenuProps={MenuProps}>
                                      {associatedTopicsPossible.map((topic) => (
                                        <MenuItem key={topic.topic_id} value={topic}>
                                          <Checkbox checked={findTopic(topic) > -1} />
                                          <ListItemText primary={`${topic.topic_id} - ${topic.topic_name}`} />
                                        </MenuItem>
                                      ))}
                                    </Select>
                                </FormControl>                                
                                </Grid>}

                                {
                                  associatedTopicVisible&&
                                  <Grid container item className={classes.topicName}> 
                                        {(associatedTopic[0]!==undefined)&&<TopicAndLevel topic={associatedTopic[0]} setAOL={setAOL1} AOL={AOL1}/>}
                                        {(associatedTopic[1]!==undefined)&&<TopicAndLevel topic={associatedTopic[1]} setAOL={setAOL2} AOL={AOL2}/>}
                                        {(associatedTopic[2]!==undefined)&&<TopicAndLevel topic={associatedTopic[2]} setAOL={setAOL3} AOL={AOL3}/>}
                                        {(associatedTopic[3]!==undefined)&&<TopicAndLevel topic={associatedTopic[3]} setAOL={setAOL4} AOL={AOL4}/>}
                                        {(associatedTopic[4]!==undefined)&&<TopicAndLevel topic={associatedTopic[4]} setAOL={setAOL5} AOL={AOL5}/>}
                                        {(associatedTopic[5]!==undefined)&&<TopicAndLevel topic={associatedTopic[5]} setAOL={setAOL6} AOL={AOL6}/>}
                                        {(associatedTopic[6]!==undefined)&&<TopicAndLevel topic={associatedTopic[6]} setAOL={setAOL7} AOL={AOL7}/>}
                                        {(associatedTopic[7]!==undefined)&&<TopicAndLevel topic={associatedTopic[7]} setAOL={setAOL8} AOL={AOL8}/>}
                                        {(associatedTopic[8]!==undefined)&&<TopicAndLevel topic={associatedTopic[8]} setAOL={setAOL9} AOL={AOL9}/>}
                                        {(associatedTopic[9]!==undefined)&&<TopicAndLevel topic={associatedTopic[9]} setAOL={setAOL10} AOL={AOL10}/>}
                                  </Grid>
                                }
                            </Grid>
                            :null
                        }
          </Grid>
    );
}
export default AddTopicPU;