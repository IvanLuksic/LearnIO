import { Typography } from "@material-ui/core";
import React,{useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import backgroundIMG from '../../images/learniobg10-15.png';
import { makeStyles} from '@material-ui/core/styles';
import DisplayMatrix from './DisplayMatrix';
import data from './questions.json';
import newData from './refreshedQuestions.json';
import QuestionPopup from './QuestionPopup.jsx';
import PopupDialog from '../common/PopupDialog.jsx';
import {useSelector} from 'react-redux';


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
    const [fields, setFields]=useState(data.Questions);
    const [aoSelected,setAoSelected]=useState(1);
    const [dSelected,setDSelected]=useState(1);
    const [questionSelected,setQuestionSelected]=useState(data.Questions[0]);
    const [openPopup, setOpenPopup] = useState(false);
    const [matricaAO,setMatricaAO] = useState(()=>{return 3});
    const [matricaD,setMatricaD] = useState(()=>{return 3});
    const [assesment_objectives,setassesment_objectives]=useState();
    const id=props.id;
    const topicID=useSelector(store=>store.studentTopic);

    const GetQuestion=()=>{

        const requestOptions = {
            method: 'GET',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({topic_id:topicID, course_id:1})
        };

        fetch('http://localhost:3000/question', requestOptions)
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
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //     if (loading) {
  //         doSomething();
  //     }
  // }, [loading]);
  
  // setLoading(true);
  // // useEffect(() => {
  // //   GetQuestion();
  // // });

   
   //function that is executed on matrix field select
   const changeAoDSelected= (e,ao,d,quest,status)=>{
       e.preventDefault();
       setDSelected(d);
       setAoSelected(ao);
       setQuestionSelected(quest);
       console.log(questionSelected);
       if(status!=="LOCKED") setOpenPopup(true);
      };
   const changeQuestions=(field)=>{
      setFields(field);
    };

   const refreshFields=()=>{
     setFields(newData);
   }



   const classes = useStyles();
    return(
        <div style={{display: "flex", flexDirection: "column",justifyContent:"space-evenly", alignItems:"center"}} className={classes.background}> 
        {
          <PopupDialog openPopup={openPopup} setOpenPopup={setOpenPopup} clickAway={true} style={{minWidth:'40%',minHeight:'10%'}}>
            <QuestionPopup ao={matricaAO} d={matricaD} questionToDisplay={questionSelected} setOpenPopup={setOpenPopup} changeQuestions={changeQuestions} field={fields} onSave={refreshFields}/>
          </PopupDialog>        
        }
        <Grid container direction="column" justify="flex-start" alignItems="center">
            <Grid container item md={6} direction="row"  justify="center" alignItems="center" >
                <Grid item xs={11} md={8} className={classes.topicTitle} direction="column" justify="center" alignItems="flex-start"  container>
                    <Grid item><Typography  xs={11} color="primary" variant="h2" component="h2" className={classes.lobster}>Topic</Typography></Grid>
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