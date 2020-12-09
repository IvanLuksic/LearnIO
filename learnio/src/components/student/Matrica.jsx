import { Typography } from "@material-ui/core";
import React,{useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import backgroundIMG from '../../images/learniobg10-15.png';
import { makeStyles} from '@material-ui/core/styles';
import DisplayMatrix from './DisplayMatrix';
import fakeFetchResponse from './questions.json';
import QuestionPopup from './QuestionPopup.jsx';
import PopupDialog from '../common/PopupDialog.jsx';
import {useDispatch, useSelector} from 'react-redux';
import {topicSelected} from '../../redux/actions/topicID';
import WrongPU from './WrongPU';


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

}));

const fieldToRows=(field,ao,d)=>{
  
  var sorted= field.sort((a,b)=>(a.column_A-b.column_A));
  sorted= field.sort((a,b)=>(a.row_D-b.row_D));
  let arrayOfRows=[{   
              array: sorted.slice(0,(ao)),
              id: 1,
          }];
  for(var i=2;i<=d;i++)
  {
      let obj={ array: sorted.slice((i-1)*ao,(i*ao)),
              id: i,};
      arrayOfRows=[...arrayOfRows,obj];
  }
  return arrayOfRows;
};

function Matrica(props)
{
    let dispatch=useDispatch();
    if(Number(props.match.params.id)){dispatch(topicSelected(props.match.params.id,"Topic"))};
    if(!Number(props.match.params.id)){props.history.push('/')};
    const [fields, setFields]=useState(()=>{return fakeFetchResponse.Questions});//bilo data.Questions
    const [aoSelected,setAoSelected]=useState(1);
    const [dSelected,setDSelected]=useState(1);
    const [questionSelected,setQuestionSelected]=useState(null);
    const [openPopupQuestion, setOpenPopupQuestion] = useState(()=>{return false});
    const [openPopupWrong, setOpenPopupWrong] = useState(()=>{return false});
    const [matricaAO,setMatricaAO] = useState(()=>{return 3});
    const [matricaD,setMatricaD] = useState(()=>{return 3});
    const [assesment_objectives,setassesment_objectives]=useState();
    const topicName=useSelector(state=>state.studentTopic.name);
    const [topicID,setTopicID]=useState(useSelector(state=>state.studentTopic.id));

    console.log(props);


    const GetQuestion=()=>{

        const requestOptions = {
            method: 'POST',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({topic_id:topicID, course_id:1}),
            credentials: 'include'
        };
        fetch('http://127.0.0.1:3000/question', requestOptions)
        .then(response => response.json())
                .then(data => {  
                  console.log(JSON.stringify(data));
                  setFields(data.Questions);
                  setMatricaAO(data.Matrix.column_numbers);
                  setMatricaD(data.Matrix.rows_D);
                  setassesment_objectives(data.Matrix.asessments_array);
        })
        .catch((error)=>{
            console.log('Error in fetch function '+ error);
    });
  }


   useEffect(() => {
     console.log("saljem" + topicID);
   });

   
   //function that is executed on matrix field select
   const changeAoDSelected= (e,ao,d,quest,status)=>{
       e.preventDefault();
       setDSelected(d);
       setAoSelected(ao);
       setQuestionSelected(quest);
       console.log(questionSelected);
       if(status!=="LOCKED") setOpenPopupQuestion(true);
       console.log(openPopupQuestion)
      };






   const classes = useStyles();
    return(
        <div style={{display: "flex", flexDirection: "column",justifyContent:"space-evenly", alignItems:"center"}} className={classes.background}> 
        {
          <PopupDialog openPopup={openPopupQuestion} setOpenPopup={setOpenPopupQuestion} clickAway={true} style={{minWidth:'40%',minHeight:'10%'}}>
            <QuestionPopup ao={matricaAO} d={matricaD} questionToDisplay={questionSelected} setOpenPopup={setOpenPopupQuestion} setOpenPopupWrong={setOpenPopupWrong} field={fields} setFields={setFields}/>
          </PopupDialog>        
        }
        {
          <PopupDialog openPopup={openPopupWrong} setOpenPopup={setOpenPopupWrong} clickAway={true} style={{minWidth:'40%',minHeight:'10%'}}>
            <WrongPU closePopup={setOpenPopupWrong} setTopicID={setTopicID}/>
          </PopupDialog>        
        }
        <Grid container direction="column" justify="flex-start" alignItems="center">
            <Grid container item md={6} direction="row"  justify="center" alignItems="center" >
                <Grid item xs={11} md={8} className={classes.topicTitle} direction="column" justify="center" alignItems="flex-start"  container>
                    <Grid item><Typography  xs={11} color="primary" variant="h2" component="h2" className={classes.lobster}>{topicName} {topicID}</Typography></Grid>
                    <Grid item><p style={{fontSize:'2vh', color: 'black', display: 'block'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></Grid>
                </Grid>
                <Grid item md = {11} xs = {11} sm = {11} spacing={3} container direction="row" justify="center" alignItems="center" >
                    <DisplayMatrix changeSelected={changeAoDSelected} ar={fieldToRows(fields,matricaAO,matricaD)} aoSelected={aoSelected} dSelected={dSelected}/>
                </Grid>
            </Grid>
        </Grid> 
        </div>
    )
}
export default Matrica;