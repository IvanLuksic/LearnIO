import { Typography } from "@material-ui/core";
import React,{useState} from 'react';
import Grid from '@material-ui/core/Grid';
import backgroundIMG from '../../images/learniobg10-15.png';
import { makeStyles} from '@material-ui/core/styles';
import DisplayMatrix from './DisplayMatrix';
import QuestionPopup from "./QuestionPopup";
import Divider from '@material-ui/core/Divider';
import TestMainMenu from './TestMainMenu.jsx';
import data from './studTest.json'

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
  matrix:{
      marginRight:"2vh",
      [theme.breakpoints.up('md')]: {
           marginTop:"10vh",
           overflowY: "scroll",
           maxHeight: "90vh"
        },
  },
  questionsTable:{
      minHeight: "100vh",
      paddingTop:"17vh"
  }

}));

const fieldToRows=(field,ao,d)=>{
  
  var sorted= field.sort((a,b)=>(a.ao-b.ao));
  sorted= field.sort((a,b)=>(a.d-b.d));
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
    const [fields, setFields]=useState(data);
   const [aoSelected,setAoSelected]=useState(1);
   const [dSelected,setDSelected]=useState(1);
   const [questionSelected,setQuestionSelected]=useState(null);
   const [openPopup, setOpenPopup] = useState(false);
   const aoLVL = 3;
   const dLVL = 3;
   
   //function that is executed on matrix field select
   const changeAoDSelected= (e,ao,d,quest)=>{
       e.preventDefault();
       setDSelected(d);
       setAoSelected(ao);
       setQuestionSelected(quest);
       setOpenPopup(true);
   };
   const changeQuestions=(field)=>{
      setFields(field);
      console.log(fields);
    }

   const classes = useStyles();
    return(
        <div style={{display: "flex", flexDirection: "column",justifyContent:"space-evenly", alignItems:"center"}} className={classes.background}> 
        {/* {openPopup && <QuestionPopup openPopup={openPopup} setOpenPopup={setOpenPopup} question={questionSelected} changeQuestions={changeQuestions} field={fields}/>} */}
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid container item md={6} direction="row"  className={classes.matrix} justify="center" alignItems="center" >
                <Grid item xs={11} md={8} className={classes.topicTitle} direction="column" justify="center" alignItems="flex-start"  container>
                    <Grid item><Typography  xs={11} color="primary" variant="h2" component="h2" className={classes.lobster}>Topic</Typography></Grid>
                    <Grid item><p style={{fontSize:'2vh', color: 'black', display: 'block'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></Grid>
                </Grid>
                <Grid item md = {11} xs = {11} sm = {11} spacing={3} container direction="row" justify="center" alignItems="center" >
                    <DisplayMatrix changeSelected={changeAoDSelected} ar={fieldToRows(fields,aoLVL,dLVL)} aoSelected={aoSelected} dSelected={dSelected}/>
                </Grid>
            </Grid>
                <Divider  orientation="vertical" className={classes.divider} flexItem/>
                <Grid container item md={5} sm={12} xs={12} direction="row" alignContent="flex-start" alignItems="flex-start" justify="flex-end" className={classes.questionsTable}>
                  <TestMainMenu tests={(fields[(aoSelected+aoLVL*(dSelected-1)-1)].test.length!==0) ? fields[(aoSelected+aoLVL*(dSelected-1)-1)].test : null }/>
                </Grid>
        </Grid> 
        </div>
    )
   
}
export default Matrica;