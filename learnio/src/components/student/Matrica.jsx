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
import {topicSelected} from '../../redux/actions/topicID';
import {unitSelected} from '../../redux/actions/unitID';
import {subjectSelected} from '../../redux/actions/subjectID';
import {classSelected} from '../../redux/actions/classID';
import NotFound from '../common/NotFound';
import CustomSnackbar from '../common/Snackbar.jsx';
import {useDispatch} from 'react-redux';
import { differenceInCalendarQuarters } from "date-fns/esm/fp";
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
        fontFamily: "Lobster",
        marginBottom:"1rem",
        textShadow:" -5px 5px #30303033",
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
    },
    descriptionAO:{
      fontFamily: "Red Hat Display, sans-serif !important"
    },
    asessmentSlider:{
      width:"20rem",
      height:"20rem",
      position: "fixed",
      textAlign: 'center',
      backgroundColor:"lightgrey",
      padding:"0 0.5em 0.5em 0.5em ",
      borderRadius:"0 0 7px 7px",
      maxWidth:"100% !important",
      color:"black",
      fontFamily:"Roboto",
      right: "5%",
      ['@media (orientation: landscape)']:{
        top:"46px",
      },
      [theme.breakpoints.down('xs')]: {
        top:"56px",
      },
      [theme.breakpoints.up('sm')]: {
        top:"64px",
      },
    },

    inside:{
      padding:0,
      backgroundColor:"white",
      borderRadius:"0 0 7px 7px",
      height:"inherit"
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
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

const getStats=(Questions,AO,D)=>{
  var stat=[];
  for(let i=1;i<=AO;i++){
    let count=0;
    for(let j=0;j<Questions.length;j++){
      if(Questions[j].column_A===i&&Questions[j].status==4){count++;};
    }
    stat.push(count+"/"+D);
  }
  return stat;
};

function Matrica(props)
{       
    const dispatch=useDispatch();//rows su podaci
    dispatch(topicSelected(parseInt(props.match.params.topic_id)));
    dispatch(unitSelected(parseInt(props.match.params.unit_id)));
    dispatch(subjectSelected(parseInt(props.match.params.subject_id)));
    dispatch(classSelected(parseInt(props.match.params.class_id)));


    const offline= useSelector(state=>state.offline);
    const [fields, setFields]=useState(()=>{return fakeFetchResponse.Questions});//bilo data.Questions
    const [aoSelected,setAoSelected]=useState(1);
    const [dSelected,setDSelected]=useState(1);
    const [questionSelected,setQuestionSelected]=useState(null);
    const [openPopupQuestion, setOpenPopupQuestion] = useState(()=>{return false});
    const [openPopupWrong, setOpenPopupWrong] = useState(()=>{return false});
    const [matricaAO,setMatricaAO] = useState(()=>fakeFetchResponse.Matrix.column_numbers);
    const [matricaD,setMatricaD] = useState(()=>fakeFetchResponse.Matrix.rows_D);
    const [assesment_objectives,setAssesment_objectives]=useState(fakeFetchResponse.Matrix.assessments_array);
    const [topicName,setTopicName]=useState(()=>fakeFetchResponse.Matrix.topic_name);
    const [topicDescription,setTopicDescription]=useState(()=>fakeFetchResponse.Matrix.topic_description);
    const [topicID,setTopicID]=useState(useSelector(state=>state.topic));
    const [stats,setStats]=useState(()=>getStats(fakeFetchResponse.Questions,fakeFetchResponse.Matrix.column_numbers,fakeFetchResponse.Matrix.rows_D))
    const [loading,setLoading]=useState(offline);//OFFLINE:true
    const [noError,setNoError]=useState(()=> true);
    const [snackbarText,setSnackbarText]=useState(()=>"");
    const [snackbarStatus,setSnackbarStatus]=useState(()=>"");
    const [errorStatus,setErrorStatus]=useState(()=>"");
    const [snackbarOpen,setSnackbarOpen]=useState(()=>false);
    const [aoOpen,setAoOpen]=useState(()=>false);


    
    const sub=useSelector(state=>state.subject);
    const uni=useSelector(state=>state.unit);
    const cla=useSelector(state=>state.class);


    //opis svakog ao
    // const opis=[
    //   {ao:1,opis:"tezina 1"},
    //   {ao:2,opis:"tezina 2"},
    //   {ao:3,opis:"tezina 3"},
    //   {ao:4,opis:"tezina 4"},
    //   {ao:5,opis:"tezina 5"},
    //   {ao:6,opis:"tezina 6"},
    //   {ao:7,opis:"tezina 7"},
    //   {ao:8,opis:"tezina 8"},
    //   {ao:9,opis:"tezina 9"},
    //   {ao:10,opis:"tezina 10"},
    // ]

    const GetQuestion=()=>{
        const requestOptions = {
          method: 'GET',
          mode:'cors',
          headers: { 'Content-Type': 'application/json'},
          credentials: 'include'
        };
        fetch(`/api/question/${cla}/${sub}/${uni}/${topicID}`, requestOptions)//class_id subject_id course_id topic_id
        .then((response)=>{
          if(response.status===200)
          {
            Promise.resolve(response).then(response => response.json())
              .then(data => {
                setFields(data.Questions);
                setMatricaAO(data.Matrix.column_numbers);
                setMatricaD(data.Matrix.rows_D);
                setTopicName(data.Matrix.topic_name);
                setTopicDescription(data.Matrix.topic_description);
                setAssesment_objectives(data.Matrix.asessments_array);
                setSnackbarStatus("success");
                setSnackbarText("Topic loaded successfully.");
                setSnackbarOpen(true);
                setLoading(true);//mice skeleton da prikaze podatke PO MENI BI TAKO TRIBALO BIT 
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
          setSnackbarText("Topic did not load successfully.")
          setSnackbarOpen(true);
          console.log('Error in fetch function '+ error);
        });
  };

  useEffect(() => {
     (!offline)&&GetQuestion();
     window.scrollTo(0, 0);
   },[topicID]);

   
   //function that is executed on matrix field select
  const changeAoDSelected= (e,ao,d,quest,status)=>{
       e.preventDefault();
       setDSelected(d);
       setAoSelected(ao);
       setQuestionSelected(quest);
       if(status!=="LOCKED") setOpenPopupQuestion(true);
       console.log(status);
    };

  const classes = useStyles();
  return(
    (!noError)?<NotFound code={errorStatus}/>
    :<div style={{display: "flex", flexDirection: "column",justifyContent:"space-evenly", alignItems:"center"}} className={classes.background}> 
    {
      loading? 
      <div>
        <div className={"AOslider "+[aoOpen?"opened ":"closed "]+classes.asessmentSlider}>
          <div className={classes.inside} style={{height:"inherit"}} >
            <Grid direction="row" container style={{height:"inherit",alignContent:"space-around"}}> 
                {assesment_objectives.map((AO)=>(
                <Grid direction="row" container item xs={12} >
                  <Grid item xs={7}><p style={{textAlign:"right"}}>{AO.asessment_name}:</p></Grid>
                  <Grid item xs={5}><p style={{textAlign:"center",fontWeight:"bold"}}>{stats[assesment_objectives.indexOf(AO)]} </p></Grid>
                </Grid>
                ))}
                  {/* {assesment_objectives.map((AO)=>(<p style={{fontFamily:"Red Hat Display", color: "#4372ec"}}>{AO.asessment_name}: {stats[assesment_objectives.indexOf(AO)]} </p>))} */}
            </Grid>
            <div style={{position:"absolute", bottom:"-12%", right:"5rem",width:"10rem",height:"3rem",zIndex:"-9999",textAlign: 'center',backgroundColor:"lightgrey",padding:"0 0.5em 0.5em 0.5em ",borderRadius:"0 0 7px 7px",maxWidth:"100% !important",}}>
              <Grid container justify="center" alignItems="center" direction="row" className={classes.inside}>
                <Grid item xs={1} style={{color:"black",marginTop:"0.4rem"}}>
                  <IconButton className={!aoOpen?classes.expand:classes.expandOpen} aria-expanded={aoOpen} aria-label="show more">
                    <ExpandMoreIcon/>
                  </IconButton>
                </Grid>              
                <Grid item xs={9} style={{color:"black",marginTop:"0.4rem"}}>
                  <Typography onClick={()=>setAoOpen(!aoOpen)} style={{color:"black",cursor:"pointer",fontWeight:"bold"}}>Results</Typography>
                </Grid>           
              </Grid>
            </div>
          </div>
        </div>
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
                {/* <Grid direction="column" > 
                  {opis.slice(0,matricaAO).map((AO)=>(<p style={{fontFamily:"Red Hat Display", color: "#4372ec"}}>Assessment objective={AO.ao} {AO.opis} </p>))}
                </Grid> OVO SU AO-ovi SAMO UMISTO OPISA KORISTIT ASSESSMENT OBJE */}
              <Grid item md = {11} xs = {11} sm = {11} spacing={3} container direction="row" justify="center" alignItems="center" >
                  <DisplayMatrix changeSelected={changeAoDSelected} ar={fieldToRows(fields,matricaAO,matricaD)} aoSelected={aoSelected} dSelected={dSelected}/>
              </Grid>
          </Grid>
        </Grid>
        {
          snackbarOpen ? <CustomSnackbar handleClose={()=>{setSnackbarOpen(false);}} open={snackbarOpen} text={snackbarText} status={snackbarStatus}/>
          : null
        }    
      </div>
    :
    <MatrixSkeleton/>
    }

    </div>
  )
};

export default Matrica;


// .then((response)=>{
//   if(response.status===200)
//   {
//     Promise.resolve(response).then(response => response.json())
//       .then(data => {
        
//       })
//   }      
//   else{

// }})
// .catch((error)=>{

//   console.log('Error in fetch function '+ error);
// });