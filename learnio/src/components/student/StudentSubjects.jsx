import { Typography } from "@material-ui/core";
import React,{useState, useEffect, useRef,createRef} from 'react';
import Grid from '@material-ui/core/Grid';
import backgroundIMG from '../../images/learniobg10-15.png';
import { makeStyles} from '@material-ui/core/styles';
import { useSelector} from 'react-redux';
import WrongPU from './WrongPU';
import MatrixSkeleton from './matrixComponents/MatrixSkeleton';
import fakeSubjects from '../../sampleData/student/subjects.json'
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';


const useStyles = makeStyles((theme) => ({
  background:{
      backgroundImage:"url("+backgroundIMG+")",
      backgroundSize: "cover",
      backgroundPosition: "fixed",
      backgroundAttachment: "fixed",
      backgroundRepeat: "repeat-y",
      height:"auto",
      width: "100%",
      [theme.breakpoints.down('sm')]: {
        minHeight: "100vh",
      },
      [theme.breakpoints.up('md')]: {
        minHeight: "100vh",
      },
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
    card:{
      [theme.breakpoints.down('lg')]: {
        width:"15rem",
        height:"15rem",
        margin:"auto auto 1.5rem auto"
      },
      [theme.breakpoints.up('lg')]: {
        width:"15rem",
        height:"15rem",
        margin:"auto auto 2.5rem auto"
      },
      transition: "all .2s ease-in-out",
      '&:hover':{
        transform: "scale(1.05)",
        cursor:"pointer"
      }
    },
    blok:{
      [theme.breakpoints.down('sm')]: {
        width:"90%",
        height:"auto",
        margin:"auto"      
      },
      [theme.breakpoints.between('sm', 'lg')]: {
        width:"35rem",
        height:"auto",
        margin:"auto"      
      },
      [theme.breakpoints.up('lg')]: {
        width:"70rem",
        height:"auto",
        margin:"auto"      
      },
    },
    topicTitle:{
      textAlign:"center",
      fontFamily:'Lobster',
      fontSize:'8vh',
      marginTop:"7rem",
      marginBottom:"5rem",
      textShadow: "-5px 5px #30303033",
      color: "#3b3a3a"
    },
    cardContent:{
    height: "100%",
    textAlign:"center"
    },
    bottomButtonDiv:{
      textAlign:"center",
      color:"grey",
      transition: "all .2s ease-in-out",
      '&:hover':{
        transform: "scale(1.1)",
        cursor:"pointer"
      }
    }
  }));

const getStartingLetters=(string)=>{
  let firstLetters=[];
  firstLetters.push(string[0]);
  let br=0;
  for(let i=1;i<string.length;i++){
    if(string[i]===' '&& string[i+1]!==' '&&string[i+1]!=undefined&&br<3){firstLetters.push(string[i+1].toUpperCase()); br++;}
  }
  return firstLetters;
};

const randomColor=()=>{
  let colors=["#27ae60","#4373ec","#8f8e8b","#EB4949"];
  return colors[(Math.floor(Math.random()*10000))%4];
};

const formatName=(string)=>{
  if(string.length>22){
    let formated=[];
    formated=string.slice(0,20)+"...";
    return formated;
  }
  else return string;
};


const CardsOfSubjects=(props)=>{
  let classes=useStyles();
  //let colorFont

  const handleClickCard=(subject_id)=>{
    props.page.history.push(`/student/units/${subject_id}`);
  };

  let i=0;
  let block=props.subjects.map((sub)=>{
    let colorCircle=randomColor();
    i++;
    return(
      <Grid item xs={12} sm={6} lg={3} className={classes.card}>
          <Paper elevation={3} className={classes.card} onClick={()=>handleClickCard(sub.id)}> 
            <Grid container flexDirection="column" justify="center" alignItems="center" className={classes.cardContent}>
              <Grid item xs={12}>
                {""}
              </Grid>
              <Grid item xs={12}>
                {""}
              </Grid>
              <Grid item style={{backgroundColor:`${props.arrayOfColors[i-1]}`,color:"white" ,width:"100px",height:"100px",borderRadius: "50%",textAlign: "center",lineHeight: "100px",fontSize: "2rem",fontWeight: "bold",display: "block"}}>
                {getStartingLetters(sub.name)}
              </Grid>
              <Grid item xs={12}>
                {formatName(sub.name)}
              </Grid>
              <Grid item xs={12} style={{marginBottom:"1rem"}}>
                {formatName(sub.class_name)}
              </Grid>
            </Grid>
          </Paper>
      </Grid>
    )
  });

  return block;
};


function StudentSubjects(props)
{   
    let classes=useStyles();
    const offline= useSelector(state=>state.offline);
    const [loading,setLoading]=useState(offline);//OFFLINE:true
    const [subjects,setSubjects]=useState(()=>fakeSubjects);
    const [blocksOfSubjects,setBlocksOfSubjects]=useState(()=>null);
    const [currentBlockVisible,setCurrentBlockVisible]=useState(()=>0);
    const [numberOfBlocks,setNumberOfBlocks]=useState(()=>((subjects.length+8-(subjects.length%8))/8));
    const [firstTime,setFirstTime]=useState(()=>true);
    const [arrayOfColors,setArrayOfColors]=useState(()=>[]);

    const getSubjects=()=>{
      //FETCH
    };

    function handleScroll(num,upDown) {
      //up je true down je false
       if(upDown){window.scrollTo({ behavior: 'smooth', top: (document.getElementById(`blok${num}`).offsetTop -300) });}
       else if(!upDown){
        window.scroll({
          top: document.body.offsetHeight,
          left: 0, 
          behavior: 'smooth',
        });
       }

    };

    let ren=[];
    for(let i=0;i<numberOfBlocks;i++){
      let sliceOfSubjects=subjects.slice(i*8,i*8+8);
      ren.push(
          <Grid id={`blok${i}`} container flexDirection="row" alignItems="center" justify="center" item xs={12} style={{display:(currentBlockVisible<i)?"none":"flex"}} className={classes.blok}>
              <CardsOfSubjects subjects={sliceOfSubjects} arrayOfColors={arrayOfColors} page={props}/>
          </Grid>
    );
    };


   useEffect(()=>{
    let fetchedSubjects;
    if(!offline){
      fetchedSubjects=getSubjects();
    }
    else if(offline){
      fetchedSubjects=subjects;
    };

    if(firstTime){
      let ArOc=[];
      for(let i=0;i<fetchedSubjects.length;i++){
        ArOc.push(randomColor());
      };
      setArrayOfColors(ArOc);
      setFirstTime(false);
    }
    else if(window.innerWidth>=1280){handleScroll(currentBlockVisible,false);};
   });



  return(
    <div style={{display: "flex", flexDirection: "column", alignItems:"center"}} className={classes.background}> 
    {
      loading? 
        <div>
            <Typography color="primary" className={classes.topicTitle}>Subjects</Typography>
            {ren}
            <div 
                className={classes.bottomButtonDiv} 
                onClick={()=>{
                  if(window.innerWidth>=1280){
                    handleScroll(currentBlockVisible-1,true);
                    setTimeout(() => {setCurrentBlockVisible(currentBlockVisible-1);}, 500);
                  }
                  else{setCurrentBlockVisible(currentBlockVisible-1);};
                  }
                }
                style={{display:(currentBlockVisible>0)?"block":"none"}}
            >
              <Typography>Less</Typography>
              <Icon style={{fontSize:"2rem"}}>expand_less</Icon>
            </div>
            <div 
              className={classes.bottomButtonDiv} 
              onClick={()=>{
                if(window.innerWidth>=1280){
                setTimeout(() => {setCurrentBlockVisible(currentBlockVisible+1);}, 300);
                }
                else {setCurrentBlockVisible(currentBlockVisible+1)}
                }
              } 
              style={{display:((currentBlockVisible+1)<numberOfBlocks)?"block":"none"}}
            >
              <Icon style={{fontSize:"2rem"}}>expand_more</Icon>
              <Typography>More</Typography>
            </div>
        </div>
    :
    <MatrixSkeleton/>
    }
    </div>
  )
};

export default StudentSubjects;