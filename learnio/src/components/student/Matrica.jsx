import { Typography } from "@material-ui/core";
import React,{useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import backgroundIMG from '../../images/learniobg10-15.png';
import { makeStyles} from '@material-ui/core/styles';
import DisplayMatrix from './matrixComponents/DisplayMatrix';
import fakeFetchResponse from '../../sampleData/student/questions.json';
import QuestionPopup from './QuestionPopup.jsx';
import PopupDialog from '../common/PopupDialog.jsx';
import { useSelector} from 'react-redux';
import WrongPU from './WrongPU';
import MatrixSkeleton from './matrixComponents/MatrixSkeleton';



const useStyles = makeStyles((theme) => ({
  background:{
      backgroundImage:"url("+backgroundIMG+")",
      backgroundSize: "cover",
      backgroundPosition: "fixed",
      backgroundAttachment: "fixed",
      backgroundRepeat: "repeat-y",
      height:"auto",
      maxWidth: "100%",
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

        paddingBottom:'9px', 
    },
    lobster: {
        fontFamily: "Lobster"
    },
    skeleton:{
      paddingTop:"15vh",
      paddingLeft:"25%",
      paddingRight:"25%",
      margin:"2px",
      justifyContent:"center"
    },
    wholeGrid:{
      [theme.breakpoints.down('sm')]: {
        padding:"100px 0 0 0",
      },
      [theme.breakpoints.up('md')]: {
        padding:"100px 0 0 0",
      },
    descriptionAO:{
      fontFamily: "Red Hat Display, sans-serif !important"
    }
      
    }

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
    const offline= useSelector(state=>state.offline);
    const [fields, setFields]=useState(()=>{return fakeFetchResponse.Questions});//bilo data.Questions
    const [aoSelected,setAoSelected]=useState(1);
    const [dSelected,setDSelected]=useState(1);
    const [questionSelected,setQuestionSelected]=useState(null);
    const [openPopupQuestion, setOpenPopupQuestion] = useState(()=>{return false});
    const [openPopupWrong, setOpenPopupWrong] = useState(()=>{return false});
    const [matricaAO,setMatricaAO] = useState(()=>fakeFetchResponse.Matrix.column_numbers);
    const [matricaD,setMatricaD] = useState(()=>fakeFetchResponse.Matrix.rows_D);
    const [assesment_objectives,setAssesment_objectives]=useState();
    const [topicName,setTopicName]=useState(()=>fakeFetchResponse.Matrix.topic_name);
    const [topicDescription,setTopicDescription]=useState(()=>fakeFetchResponse.Matrix.topic_description);
    const [topicID,setTopicID]=useState(useSelector(state=>state.studentTopic.id));
    const [loading,setLoading]=useState(offline);//OFFLINE:true
    
    //opis svakog ao
    const opis=[
      {ao:1,opis:"tezina 1"},
      {ao:2,opis:"tezina 2"},
      {ao:3,opis:"tezina 3"},
      {ao:4,opis:"tezina 4"},
      {ao:5,opis:"tezina 5"},
      {ao:6,opis:"tezina 6"},
      {ao:7,opis:"tezina 7"},
      {ao:8,opis:"tezina 8"},
      {ao:9,opis:"tezina 9"},
      {ao:10,opis:"tezina 10"},
    ]

    const GetQuestion=()=>{
            const requestOptions = {
            method: 'GET',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include'
        };
        fetch(`http://127.0.0.1:3000/question/${1}/${1}/${1}/${topicID}`, requestOptions)//class_id subject_id course_id topic_id
        .then(response => response.json())
                .then(data => {  
                  console.log(JSON.stringify(data));
                  setFields(data.Questions);
                  setMatricaAO(data.Matrix.column_numbers);
                  setMatricaD(data.Matrix.rows_D);
                  setTopicName(data.Matrix.topic_name);
                  setTopicDescription(data.Matrix.topic_description);
                  setAssesment_objectives(data.Matrix.asessments_array);
                  setLoading(true);//mice skeleton da prikaze podatke PO MENI BI TAKO TRIBALO BIT 
        })
        .catch((error)=>{
            console.log('Error in fetch function '+ error);
    });
  }
  useEffect(() => {
     (!offline)&&GetQuestion();
     window.scrollTo(0, 0)
   },[topicID]);

   
   //function that is executed on matrix field select
  const changeAoDSelected= (e,ao,d,quest,status)=>{
       e.preventDefault();
       setDSelected(d);
       setAoSelected(ao);
       setQuestionSelected(quest);
       if(status!=="LOCKED") setOpenPopupQuestion(true);
    };

  const classes = useStyles();
  return(
    <div style={{display: "flex", flexDirection: "column",justifyContent:"space-evenly", alignItems:"center"}} className={classes.background}> 
    {
      loading? 
      <div>
        <PopupDialog openPopup={openPopupQuestion} setOpenPopup={setOpenPopupQuestion} clickAway={true} style={{minWidth:'40%',minHeight:'10%'}}>
          <QuestionPopup ao={matricaAO} d={matricaD} questionToDisplay={questionSelected} setOpenPopup={setOpenPopupQuestion} setOpenPopupWrong={setOpenPopupWrong} field={fields} setFields={setFields}/>
        </PopupDialog>        
        <PopupDialog openPopup={openPopupWrong} setOpenPopup={setOpenPopupWrong} clickAway={true} style={{minWidth:'40%',minHeight:'10%'}}>
          <WrongPU closePopup={setOpenPopupWrong} setTopicID={setTopicID} pageProps={props}/>
        </PopupDialog>        
        <Grid container direction="column" justify="flex-start" alignItems="center" className={classes.wholeGrid}>
          <Grid container item md={10} direction="row"  justify="center" alignItems="center" >
              <Grid item xs={11} md={8} className={classes.topicTitle} direction="column" justify="center" alignItems="flex-start"  container>
                  <Grid item><Typography  xs={11} color="primary" variant="h2" component="h2" className={classes.lobster}>{topicName} </Typography></Grid>
                  <Grid item><p style={{fontSize:'2vh', color: 'black', display: 'block'}}>{topicDescription}</p></Grid>
              </Grid>
                <Grid direction="column" > 
                  {opis.slice(0,matricaAO).map((AO)=>(<p style={{fontFamily:"Red Hat Display", color: "#4372ec"}}>AO={AO.ao} {AO.opis} </p>))}
                </Grid>
              <Grid item md = {11} xs = {11} sm = {11} spacing={3} container direction="row" justify="center" alignItems="center" >
                  <DisplayMatrix changeSelected={changeAoDSelected} ar={fieldToRows(fields,matricaAO,matricaD)} aoSelected={aoSelected} dSelected={dSelected}/>
              </Grid>
          </Grid>
        </Grid>       
      </div>
    :
    <MatrixSkeleton/>
    }
    </div>
  )
};

export default Matrica;