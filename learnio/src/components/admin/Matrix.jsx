import { Button,Typography } from "@material-ui/core";
import React, { useState,useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import backgroundIMG from '../../images/learniobg10-15.png';
import { makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import EditQuestion from './editComponents/EditQuestion'; 
import DisplayMatrix from './matrixComponents/DisplayMatrix';
import fakeBackendQuestions from '../../sampleData/admin/allQuestionsOfTopic.json';
import MatrixSkeleton from './matrixComponents/MatrixSkeleton';
import {useDispatch, useSelector} from 'react-redux';
import {topicSelected} from '../../redux/actions/topicID';
import NotFound from '../common/NotFound';
import CustomSnackbar from '../common/Snackbar.jsx';
import Icon from '@material-ui/core/Icon';
import AddTopicPU from './addComponents/AddTopicPU'
import PopupDialog from '../common/PopupDialog';

const useStyles = makeStyles((theme) => ({
    background:{
        backgroundImage:"url("+backgroundIMG+")",
        backgroundSize: "cover",
        backgroundPosition: "fixed",
        backgroundAttachment: "fixed",
        backgroundRepeat: "repeat-y",
        maxWidth: " 100%",
        [theme.breakpoints.down('sm')]: {
          minHeight: "100vh",
        },
        [theme.breakpoints.up('md')]: {
          minHeight: "100vh",
        },
    },
    topicTitle:{
          fontSize:'6vh',
          marginBottom: '1em',
        //   [theme.breakpoints.down('sm')]: {
        //     paddingTop:"12vh",
        //   },
        //   [theme.breakpoints.up('md')]: {
        //     paddingTop:"6vh",
        //   },
          paddingBottom:'9px', 
    },
    lobster: {
          fontFamily: "Lobster",
          textShadow:" -5px 5px #30303033",
          display:"inline"

    },
    divider:{
        [theme.breakpoints.down('sm')]: {
            height: "0vh",
          },
        [theme.breakpoints.up('md')]: {
            marginTop:"12vh",
            height: "85vh",
          },
    },
    questionsTable:{
        minHeight: "100vh",
        paddingTop:"200px"
    },
    skeletonMatrica:{
        paddingTop:"20vh",
    },
    skeletonTable:{
        minHeight: "100vh",
        paddingTop:"20vh"
    },
    wholeLeftGrid:{
        [theme.breakpoints.down('sm')]: {
          padding:"100px 0 0 0",
        },
        [theme.breakpoints.up('md')]: {
          padding:"150px 0 0 0",
        },
        
    }
}));

function useForceUpdate() {
    let [value, setState] = useState(true);
    return () => setState(!value);
  }

function MatricaAdmin(props)
{     
    // topic_name: valueText,
    // columns_AO:valueAO,
    // rows_D: valueD,
    // course_id:subjectAndCourse.course_id,
    // course_name:subjectAndCourse.course_name,
    // subject_id:subjectAndCourse.subject_id,
    // subject_name:subjectAndCourse.subject_name,
    // associated_topics: arrayAT,
    // topic_description:valueDesc,
    // asessments_array:arrayAO
    // "course_id":123,
    // "course_name": "Electrical engineering",
    // "subject_id":245674,
    // "subject_name":"Matematika 1",
    const offline= useSelector(state=>state.offline);
    let dispatch=useDispatch();
    const [aoSelected,setAoSelected]=useState(1);
    const [dSelected,setDSelected]=useState(1);
    const [expanded, setExpanded] = useState(false);
    const [page, setPage] = useState(1);
    const [fetchedData, setFetchedData]=useState(()=>fakeBackendQuestions.fields);
    const [matricaAO,setMatricaAO] = useState(()=>fakeBackendQuestions.columns);
    const [matricaD,setMatricaD] = useState(()=>fakeBackendQuestions.rows);
    const [loading,setLoading]=useState(offline);//OFFLINE:potrebno ga postavit na false da bi radilo
    const [topicName,setTopicName]=useState(()=>fakeBackendQuestions.topic_name);
    const [topicID,setTopicID]=useState(useSelector(state=>state.topic));
    const [topicDescription,setTopicDescription]=useState(()=>fakeBackendQuestions.topic_description);
    const [course_id,setCourse_id]=useState(()=> 123);
    const [course_name,setCourse_name]=useState(()=> "Electrical engineering");
    const [subject_id,setSubject_id]=useState(()=> 245674);
    const [subject_name,setSubject_name]=useState(()=> "Matematika 1");
    const [associated_topics, setAssociated_topics]=useState(()=> {return[{
        topic_id:8,
        topic_name:"Ebbers-Moll",
        course_id:123,
        course_name: "Electrical engineering",
        subject_id:245674,
        subject_name:"Electronics",
        topic_description:"Jako dobra tema."},]
    });
    const [asessments_array,setAsessments_array]=useState(()=>[{asessment_id:123123,asessment_name:"super"},{asessment_id:324234,asessment_name:"supawdawdawdawder"},{asessment_id:234,asessment_name:"AWDawd"}]);
    const [noError,setNoError]=useState(()=> true);
    const [snackbarText,setSnackbarText]=useState(()=>"");
    const [snackbarStatus,setSnackbarStatus]=useState(()=>"");
    const [errorStatus,setErrorStatus]=useState(()=>"");
    const [snackbarOpen,setSnackbarOpen]=useState(()=>false);
    const [popup,setPopup]=useState(()=>false);

    const role=useSelector(state=>state.login);
    const forceUpdate = useForceUpdate();




    const fetchRequest=()=>{
            const requestOptions = {
            method: 'GET',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include'
        };
        
        let apiUri;
        if(role==="admin") apiUri=`/api/admin/topics/edit/${topicID}`
        else if(role==="teacher") apiUri=`/api/admin/topics/edit/${topicID}`;

        fetch(apiUri, requestOptions)//topic id
        .then((response)=>{
            if(response.status===200)
            {
              Promise.resolve(response).then(response => response.json())
              .then(data => {  
                setFetchedData(data.fields);
                setMatricaAO(data.columns);
                setMatricaD(data.rows);
                setTopicName(data.topic_name);
                setTopicDescription(data.topic_description)
                dispatch(topicSelected(topicID,topicName));
                setSnackbarStatus("success");
                setSnackbarText("Topic loaded successfully.")
                setSnackbarOpen(true);
                setLoading(true);
                })
            }      
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
            setSnackbarText('Error in fetch function '+ error)
            setSnackbarOpen(true);
            console.log('Error in fetch function '+ error);
          });
    };


   useEffect(() => {
     (!offline)&&fetchRequest();
   },[]);



    //function that is executed on matrix field select
    const changeAoDSelected= (e,ao,d)=>{
        e.preventDefault();
        setDSelected(d);
        setAoSelected(ao);
        setExpanded(false);
        setPage(1);
    };
    const changeExpanded=(value)=>{
        setExpanded(value);
    };
    const changePage=(value)=>{
        setPage(value);
    };

    //slices the fields array into rows of fields for the matrix render
    const fieldToRows=(field,ao,d)=>{
        // const sorted= field.sort((a,b)=>(a.ao-b.ao));
        // sorted= field.sort((a,b)=>(a.d-b.d)); ar=arrayOfRows arr=row o=obj
        let arrayOfRows=[{   
                    array: field.slice(0,(ao)),
                    id: 1,
                }];
        for(var i=2;i<=d;i++)
        {
            let obj={ array: field.slice((i-1)*ao,(i*ao)),
                    id: i,};
            arrayOfRows=[...arrayOfRows,obj];
        }
        return arrayOfRows;
    };
    //deletes value=question from selected field's array of questions
    const deleteQuestion=(value,aoNOW,dNOW)=>{
        let polje=fetchedData[(aoNOW+matricaAO*(dNOW-1)-1)];

        let previousPage=page;//Provjera jesmo li izbrisali sve s te stranice
        //console.log("stranica prethodna: "+previousPage +" izracunata zadnja: "+(((polje.Questions.length-1)+(6-((polje.Questions.length-1)%6)))/6)+" izracunata zadnja nakon brisanja: "+((polje.Questions.length-2)+(6-((polje.Questions.length-2)%6)))/6);
        if( (((polje.Questions.length-1)+(6-((polje.Questions.length-1)%6)))/6==previousPage) && (((polje.Questions.length-2)+(6-((polje.Questions.length-2)%6)))/6!=previousPage)){console.log("minjam stranicu");changePage(previousPage-1)};

        let poljaBezDeleted=[];
        fetchedData.map((question)=> {if((question.ao!==aoNOW)||(question.d!==dNOW)){poljaBezDeleted.push(question)};})
        polje.Questions= [...polje.Questions.filter((question)=>(question.id!==value.id))];//question_id
        poljaBezDeleted=[...poljaBezDeleted, polje];
        poljaBezDeleted=poljaBezDeleted.sort((a,b)=>(a.d-b.d));
        let array=[];
        for(let i=0;i<matricaD;i++){
            var subarray=poljaBezDeleted.slice(i*matricaAO,i*matricaAO+matricaAO);
            subarray=subarray.sort((a,b)=>(a.ao-b.ao));
            array=[...array,...subarray];
        }
        setFetchedData(array);

    };
    //adds a value=question to the selected field's array of questions
    const addQuestion=(value)=>{
        // console.log("pozvana add");

        var polja=fetchedData;
        var index=1;
        polja.map(polje=>{
            if(polje.ao===aoSelected && polje.d===dSelected){
                polje.Questions=[...polje.Questions,value];
                polje.Questions=polje.Questions.sort((a,b)=>(a.id-b.id));
                for(var i = 0; i < polje.Questions.length; i++){
                    if(polje.Questions[i]===value){
                        index = (i+(6-((i)%6)))/6;
                        // console.log(index+"INDEX"+i);
                        changePage(index);
                    }
                }
            }
        });
        setFetchedData(polja);
    };
    //combination of latter functions for editQuestion component
    const changeQuestion = (value)=>{
        deleteQuestion(value,aoSelected,dSelected);
        addQuestion(value);
    };
    //
    const getIndex = (value)=>{
        var polja=fetchedData;
        var index;
        polja.map(polje=>{
            if(polje.ao===aoSelected && polje.d===dSelected){
                for(var i = 0; i < polje.length; i++){
                    if(polje.Questions[i]===value){
                        index = (i+(6-((i)%6)))/6;
                        changePage(index);
                    }
                }
            }
        });
    };

    const requestDeleteQuestion=(Ques)=>{
        offline&&deleteQuestion(Ques,aoSelected,dSelected);
        // console.log("ZAHTJEV ZA Brisanjem: ");
        // console.log({id:Ques.id});
        const requestOptions = {
            method: 'DELETE',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include'
        };

        let apiUri;
        if(role==="admin") apiUri=`/api/question/delete/${Ques.id}`
        else if(role==="teacher") apiUri=`/api/question/delete/${Ques.id}`;

        fetch(apiUri, requestOptions)
        .then((response)=>{
          if(response.status===200)
          {
            Promise.resolve(response.status)
              .then(()=> {
                changeExpanded(false);
                deleteQuestion(Ques,aoSelected,dSelected);
                setSnackbarStatus("success");
                setSnackbarText("Question deleted successfully.");
                setSnackbarOpen(true);
              })
          }      
          else{
            setSnackbarStatus("error");
            setErrorStatus(response.status);
            setSnackbarText("Question did not delete successfully.");
            setSnackbarOpen(true);
        }})
        .catch((error)=>{
            setSnackbarStatus("error");
            setSnackbarText("Error in fetch function " + error);
            setSnackbarOpen(true);
          console.log('Error in fetch function '+ error);
        });

    };
    const requestChangeQuestion=(Ques)=>{
        offline&&changeExpanded(false);
        offline&&changeQuestion(Ques);
        // console.log("ZAHTJEV ZA IZMJENOM: ");
        // console.log({...Ques});
        const requestOptions = {
            method: 'PUT',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({...Ques}),
            credentials: 'include'
        };

        let apiUri;
        if(role==="admin") apiUri='/api/question/update'
        else if(role==="teacher") apiUri='/api/question/update';

        fetch(apiUri, requestOptions)
        .then((response)=>{
            if(response.status===200)
            {
              Promise.resolve(response.status)
                .then(()=> {
                    changeExpanded(false);
                    changeQuestion(Ques);
                    setSnackbarStatus("success");
                    setSnackbarText("Question edited successfully.");
                    setSnackbarOpen(true);
                })
            }      
            else{
                setSnackbarStatus("error");
                setErrorStatus(response.status);
                setSnackbarText("Question did not edit successfully.");
                setSnackbarOpen(true);
          }})
          .catch((error)=>{
            setSnackbarStatus("error");
            setSnackbarText("Error in fetch function "+error);
            setSnackbarOpen(true);
            console.log('Error in fetch function '+ error);
          });
    };
    const requestAddQuestion=(Ques,ID)=>{
        const formData = new FormData()
        formData.append('questionImage', Ques.questionImage);
        formData.append('text', Ques.text);
        formData.append('question_type', Ques.question_type);
        formData.append('answer_a', Ques.answer_a);
        formData.append('answer_b', Ques.answer_b);
        formData.append('answer_c', Ques.answer_c);
        formData.append('answer_d', Ques.answer_d);
        formData.append('solution', Ques.solution);
        formData.append('row_D', dSelected);
        formData.append('column_A', aoSelected);
        formData.append('topic_id', Number(topicID));




        offline&&addQuestion({id:Math.floor(Math.random()*10000),...Ques,row_D:dSelected,column_A:aoSelected});
        offline&&forceUpdate();
        // console.log("ZAHTJEV ZA DODAVANJE: ");
        // console.log({...Ques,row_D:dSelected,column_A:aoSelected,topic_id:topicID});
        const requestOptions = {
            method: 'POST',
            mode:'cors',
            // headers: { 'Content-Type': 'application/json'},

            body: formData,
            credentials: 'include'
        };

        let apiUri;
        if(role==="admin") apiUri='/api/question/add'
        else if(role==="teacher") apiUri='/api/question/add';

        fetch(apiUri, requestOptions)
        .then((response)=>{
            if(response.status===200)
            {
              Promise.resolve(response).then(response => response.json())
                .then((data)=> {
                    if(data.id!=undefined){
                        addQuestion({id:data.id,...Ques,row_D:dSelected,column_A:aoSelected});
                        forceUpdate();
                        setSnackbarStatus("success");
                        setSnackbarText("Question added successfully.");
                        setSnackbarOpen(true);
                    }                
                })
            }      
            else{
                setSnackbarStatus("error");
                setErrorStatus(response.status);
                setSnackbarText("Question did not add successfully.");
                setSnackbarOpen(true);
          }})
          .catch((error)=>{
            setSnackbarStatus("error");
            setSnackbarText("Error in fetch function.");
            setSnackbarOpen(true);
            console.log('Error in fetch function '+ error);
          });

    };


    const openEdit=()=>{
        const requestOptions = {
            method: 'GET',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include'
        };

        let apiUri;
        if(role==="admin") apiUri=`/api/topic/info/${topicID}`
        else if(role==="teacher") apiUri=`/api/topic/info/${topicID}`;

        fetch(apiUri, requestOptions)
        .then((response)=>{
            if(response.status===200)
            {
              Promise.resolve(response).then(response => response.json())
                .then((data)=> {
                        setCourse_id(data.course_id);
                        setCourse_name(data.course_name);
                        setSubject_id(data.subject_id);
                        setSubject_name(data.subject_name);
                        setAsessments_array(data.asessments_array);
                        setAssociated_topics(data.associated_topics);
                        setSnackbarStatus("success");
                        setSnackbarText("Edit started successfully.");
                        setSnackbarOpen(true);
                        
                        setPopup(true);
                })
            }      
            else{
                setSnackbarStatus("error");
                setErrorStatus(response.status);
                setSnackbarText("Edit did not start successfully.");
                setSnackbarOpen(true);
          }})
          .catch((error)=>{
            setSnackbarStatus("error");
            setSnackbarText("Error in fetch function.");
            setSnackbarOpen(true);
            console.log('Error in fetch function '+ error);
          });

          if(offline){setPopup(true);}

    }


    const classes = useStyles();

    return (
        (!noError)?<NotFound code={errorStatus}/>
        :<div style={{display: "flex", flexDirection: "column",justifyContent:"space-evenly", alignItems:"center"}} className={classes.background}> 
        {loading?
            <div>
            {popup&& <PopupDialog openPopup={popup} setOpenPopup={setPopup} clickAway={false} style={{minWidth:'60%',minHeight:'30%'}}>
            <AddTopicPU addOrEdit={false} columns_AO={matricaAO} rows_D={matricaD} topic_name={topicName} topic_id={topicID} topic_description={topicDescription} associated_topics={associated_topics} asessments_array={asessments_array} course_id={course_id} course_name={course_name} subject_id={subject_id} subject_name={subject_name} setTopicDescription={setTopicDescription} setTopicName={setTopicName}  setSnackbarOpen={setSnackbarOpen} setSnackbarText={setSnackbarText} setSnackbarStatus={setSnackbarStatus} closePopup={()=>{setPopup(false);}}/>
            </PopupDialog>}
            <Grid container direction="row" justify="center" alignItems="flex-start"  height="100%" >
                <Grid container item md={6} direction="row" justify="flex-start" alignItems="flex-start" className={classes.wholeLeftGrid}>
                    <Grid item xs={11} md={11} className={classes.topicTitle} direction="column" justify="flex-start" alignItems="flex-start"  container>
                        <Grid item xs={11} container style={{marginBottom:"3rem"}}>
                            <Grid item xs={10}><Typography  xs={11} color="primary" variant="h2" component="h2" className={classes.lobster}>{topicName}</Typography></Grid>
                            <Grid item xs={2} style={{ textAlign:"center", alignSelf:"center"}}><Button onClick={()=>openEdit()}><Icon  style={{fontSize:"3rem", textShadow:" -5px 5px #30303033",color:"rgb(235, 73, 73)"}}>edit_outlined_icon</Icon></Button></Grid>
                        </Grid>
                        <Grid item xs={11}><p style={{fontSize:'2vh', color: 'black', display: 'block'}}>{topicDescription}</p></Grid>
                    </Grid>
                    <Grid item md = {11} xs = {11} sm = {11} spacing={3} container direction="row" justify="flex-start" alignItems="flex-start" >
                        <DisplayMatrix changeSelected={changeAoDSelected} ar={fieldToRows(fetchedData,matricaAO,matricaD)} aoSelected={aoSelected} dSelected={dSelected}/>
                    </Grid>
                </Grid>
                <Divider  orientation="vertical" className={classes.divider} flexItem/>
                <Grid container item md={5} sm={12} xs={12} direction="row" alignContent="flex-start" alignItems="flex-start" justify="center" className={classes.questionsTable}>
                    <EditQuestion forceUpdate={forceUpdate} page={page} jumpToPage={getIndex} changePage={changePage} questChange={requestChangeQuestion} questAdd={requestAddQuestion} questDelete={requestDeleteQuestion} expanded={expanded} changeExpanded={changeExpanded} questions={(fetchedData[(aoSelected+matricaAO*(dSelected-1)-1)].Questions.length!==0) ? fetchedData[(aoSelected+matricaAO*(dSelected-1)-1)].Questions : null }/>
                </Grid>
                {
                    snackbarOpen ? <CustomSnackbar handleClose={()=>{setSnackbarOpen(false);}} open={snackbarOpen} text={snackbarText} status={snackbarStatus}/>
                    : null
                } 
            </Grid>
            </div>
            :
            <MatrixSkeleton/>
        }
        </div>
);
}


export default MatricaAdmin;