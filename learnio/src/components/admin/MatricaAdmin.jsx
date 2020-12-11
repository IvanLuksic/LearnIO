import { Typography } from "@material-ui/core";
import React, { useState,useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import backgroundIMG from '../../images/learniobg10-15.png';
import { makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import EditQuestion from './EditQuestion'; 
import DisplayMatrix from './DisplayMatrix';
import fakeBackendQuestions from './backendQuestions.json';
import Skeleton from '@material-ui/lab/Skeleton';
import NotFound from '../common/NotFound';
import {useDispatch, useSelector} from 'react-redux';
import {topicSelected} from '../../redux/actions/topicID';


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
          [theme.breakpoints.down('sm')]: {
            paddingTop:"10vh",
          },
          [theme.breakpoints.up('md')]: {
            paddingTop:"4vh",
          },
          paddingBottom:'9px', 
      },
      lobster: {
          fontFamily: "Lobster"
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
        paddingTop:"14vh"
    },
    skeletonMatrica:{
        paddingTop:"20vh",
    },
    skeletonTable:{
        minHeight: "100vh",
        paddingTop:"20vh"
    }
}));

function useForceUpdate() {
    let [value, setState] = useState(true);
    return () => setState(!value);
  }

function MatricaAdmin(props)
{
    const [noError,setNoError]=useState(()=> true);
    const changeToError=()=>{if(noError===true) setNoError(false);}
    const changeToNoError=()=>{if(noError===false) setNoError(true);}
    let dispatch=useDispatch();
    if(Number(props.match.params.id)){changeToNoError();dispatch(topicSelected(props.match.params.id,"Topic"))};
    if(!Number(props.match.params.id)){changeToError()};
    const [aoSelected,setAoSelected]=useState(1);
    const [dSelected,setDSelected]=useState(1);
    const [questionSelected,setQuestionSelected]=useState(null);
    const [expanded, setExpanded] = useState(false);
    const [page, setPage] = useState(1);
    const [fetchedData, setFetchedData]=useState(()=>fakeBackendQuestions.fields);
    const [matricaAO,setMatricaAO] = useState(()=>{return 3});
    const [matricaD,setMatricaD] = useState(()=>{return 3});
    const [loading,setLoading]=useState(true);//potrebno ga postavit na false da bi radilo
    const [topicName,setTopicName]=useState(()=>fakeBackendQuestions.name);
    const [topicID,setTopicID]=useState(useSelector(state=>state.studentTopic.id));
    const forceUpdate = useForceUpdate();




    const fetchRequest=()=>{
            const requestOptions = {
            method: 'GET',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include'
        };
        fetch(`http://127.0.0.1:3000/admin/topics/edit/${topicID}`, requestOptions)//topic id
        .then(response => response.json())
        .then(data => {  
                  console.log(JSON.stringify(data));
                  setFetchedData(data.fields);
                  setMatricaAO(data.columns);
                  setMatricaD(data.rows);
                  setTopicName(data.name);
                  dispatch(topicSelected(topicID,topicName));
                  setLoading(true);//mice skeleton da prikaze podatke PO MENI BI TAKO TRIBALO BIT 
        })
        .catch((error)=>{
            console.log('Error in fetch function '+ error);
    });
  }


   useEffect(() => {
     fetchRequest();
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
    const deleteQuestion=(value)=>{
        console.log("pozvana delete");

        var polje=fetchedData[(aoSelected+matricaAO*(dSelected-1)-1)];
        setFetchedData(
            [ ...fetchedData.filter(question=> ((question.ao!==aoSelected)&&(question.d!==dSelected)))]
        );
        polje.Questions= [...polje.Questions.filter(question=>(question.id!==value.id))];//question_id
        setFetchedData([...fetchedData, polje]);
    };
    //adds a value=question to the selected field's array of questions
    const addQuestion=(value)=>{
        console.log("pozvana add");

        var polja=fetchedData;
        polja.map(polje=>{
            if(polje.ao===aoSelected && polje.d===dSelected){
                polje.Questions=[...polje.Questions,value];
                polje.Questions=polje.Questions.sort((a,b)=>(a.id-b.id));
            }
        });
        setFetchedData(polja);
    };
    //combination of latter functions for editQuestion component
    const changeQuestion = (value)=>{
        deleteQuestion(value);
        addQuestion(value);
    };
    const requestDeleteQuestion=(Ques)=>{
        console.log("ZAHTJEV ZA Brisanjem: ");
        console.log({id:Ques.id});
        const requestOptions = {
            method: 'DELETE',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include'
        };
        fetch(`http://127.0.0.1:3000/question/delete/${Ques.id}`, requestOptions)
        .then(() =>{deleteQuestion(Ques);})
        .catch((error)=>{console.log('Error in fetch function '+ error);});
    };
    const requestChangeQuestion=(Ques)=>{
        console.log("ZAHTJEV ZA IZMJENOM: ");
        console.log({...Ques});
        const requestOptions = {
            method: 'PUT',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({...Ques}),
            credentials: 'include'
        };
        fetch('http://127.0.0.1:3000/question/update', requestOptions)
        .then(() =>{changeExpanded(false);changeQuestion(Ques);
        })
        .catch((error)=>{console.log('Error in fetch function '+ error);});
    };
    const requestAddQuestion=(Ques,ID)=>{
        console.log("ZAHTJEV ZA DODAVANJE: ");
        console.log({...Ques,row_D:dSelected,column_A:aoSelected,topic_id:topicID});
        const requestOptions = {
            method: 'POST',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({...Ques,row_D:dSelected,column_A:aoSelected,topic_id:Number(topicID)}),
            credentials: 'include'
        };
        fetch('http://127.0.0.1:3000/question/add', requestOptions)
        .then(response => response.json())
        .then(data => {addQuestion({id:data.id,...Ques,row_D:dSelected,column_A:aoSelected});changePage(ID);forceUpdate();})
        .catch((error)=>{console.log('Error in fetch function '+ error);});

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
                        console.log(index);
                        changePage(index);
                    }
                }
            }
        });
    };

    const classes = useStyles();

    return (
        <div>
        {noError?
        <div>
        {loading?
            <div style={{display: "flex", flexDirection: "column",justifyContent:"space-evenly", alignItems:"center"}} className={classes.background}> 
                <Grid container direction="row" justify="center" alignItems="center"  height="100%" >
                    <Grid container item md={6} direction="row" justify="center" alignItems="center" >
                        <Grid item xs={11} md={8} className={classes.topicTitle} direction="column" justify="center" alignItems="flex-start"  container>
                            <Grid item><Typography  xs={11} color="primary" variant="h2" component="h2" className={classes.lobster}>Topic {topicID}</Typography></Grid>
                            <Grid item><p style={{fontSize:'2vh', color: 'black', display: 'block'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></Grid>
                        </Grid>
                        <Grid item md = {11} xs = {11} sm = {11} spacing={3} container direction="row" justify="center" alignItems="center" >
                            <DisplayMatrix changeSelected={changeAoDSelected} ar={fieldToRows(fetchedData,matricaAO,matricaD)} aoSelected={aoSelected} dSelected={dSelected}/>
                        </Grid>
                    </Grid>
                    <Divider  orientation="vertical" className={classes.divider} flexItem/>
                    <Grid container item md={5} sm={12} xs={12} direction="row" alignContent="flex-start" alignItems="flex-start" justify="center" className={classes.questionsTable}>
                        <EditQuestion forceUpdate={forceUpdate} page={page} jumpToPage={getIndex} changePage={changePage} questChange={requestChangeQuestion} questAdd={requestAddQuestion} questDelete={requestDeleteQuestion} expanded={expanded} changeExpanded={changeExpanded} questions={(fetchedData[(aoSelected+matricaAO*(dSelected-1)-1)].Questions.length!==0) ? fetchedData[(aoSelected+matricaAO*(dSelected-1)-1)].Questions : null }/>
                    </Grid>
                </Grid>
            </div>
            :
            <div style={{display: "flex", flexDirection: "column",justifyContent:"space-evenly", alignItems:"center"}} className={classes.background}> 
                <Grid container direction="row" justify="center" alignItems="center"  height="100%" >
                    <Grid container item md={6} direction="row" justify="center" alignItems="center" className={classes.skeletonMatrica}>
                        <Grid item xs={11} md={8}  direction="row" justify="center" alignItems="flex-start"  container>
                            <Grid item style={{margin:"5px"}}><Skeleton variant="reck"  animation="wave" height={200}  width={200}/></Grid> 
                            <Grid item style={{margin:"5px"}}><Skeleton variant="reck"  animation="wave" height={200}  width={200} /></Grid> 
                            <Grid item style={{margin:"5px"}}><Skeleton variant="reck"  animation="wave" height={200}  width={200} /></Grid> 
                        </Grid>
                        <Grid item xs={11} md={8}  direction="row" justify="center" alignItems="flex-start"  container>
                            <Grid item style={{margin:"5px"}}><Skeleton variant="reck"  animation="wave" height={200}  width={200}/></Grid> 
                            <Grid item style={{margin:"5px"}}><Skeleton variant="reck"  animation="wave" height={200}  width={200} /></Grid> 
                            <Grid item style={{margin:"5px"}}><Skeleton variant="reck"  animation="wave" height={200}  width={200} /></Grid> 
                        </Grid>
                        <Grid item xs={11} md={8}  direction="row" justify="center" alignItems="flex-start"  container>
                            <Grid item style={{margin:"5px"}}><Skeleton variant="reck"  animation="wave" height={200}  width={200}/></Grid> 
                            <Grid item style={{margin:"5px"}}><Skeleton variant="reck"  animation="wave" height={200}  width={200} /></Grid> 
                            <Grid item style={{margin:"5px"}}><Skeleton variant="reck"  animation="wave" height={200}  width={200} /></Grid> 
                        </Grid>
                    </Grid>
                    <Divider  orientation="vertical" className={classes.divider} flexItem/>
                    <Grid container item md={5} sm={12} xs={12} direction="row" alignContent="flex-start" alignItems="flex-start" justify="center" className={classes.skeletonTable}>
                        <Grid item style={{margin:"5px"}}><Skeleton variant="text"  animation="wave"  height={60} width={600}/></Grid> 
                        <Grid item style={{margin:"5px"}}><Skeleton variant="reck"  animation="wave" height={400}  width={600} /></Grid>
                        <Grid item style={{margin:"5px"}}><Skeleton variant="text"  animation="wave"  height={60} width={600}/></Grid>
                    </Grid>
                </Grid>
            </div>
        }
        </div>
        :
        <div>
            <NotFound/>
        </div>
    }
  </div>
    );
}


export default MatricaAdmin;