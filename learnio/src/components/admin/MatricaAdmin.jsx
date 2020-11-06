import { Typography } from "@material-ui/core";
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import backgroundIMG from '../../images/learniobg10-15.png';
import { makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import {EditQuestion} from './EditQuestion'; 
import DisplayMatrix from './DisplayMatrix';
import data from './questions.json'


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

function useForceUpdate() {
    let [value, setState] = useState(true);
    console.log("pozvan forceUpdate");
    return () => setState(!value);
  }

function MatricaAdmin(props)
{
    const forceUpdate = useForceUpdate();
    const [topicID,setTopicID] = useState(()=>{
       return props.match.params.id;
    });
    const [aoSelected,setAoSelected]=useState(1);
    const [dSelected,setDSelected]=useState(1);
    const [expanded, setExpanded] = useState(false);
    const [page, setPage] = useState(1);
    const [fields, setFields]=useState(data);
    const [aoLVL,setAoLVL]=useState(3);
    const [dLVL,setDLVL]=useState(3);
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
        var polje=fields[(aoSelected+aoLVL*(dSelected-1)-1)];
        setFields(
            [ ...fields.filter(question=> ((question.ao!==aoSelected)&&(question.d!==dSelected)))]
        );
        polje.question= [...polje.question.filter(question=>(question.id!==value.id))];
        setFields([...fields, polje]);
    };
    //adds a value=question to the selected field's array of questions
    const addQuestion=(value)=>{
        var polja=fields;
        polja.map(polje=>{
            if(polje.ao===aoSelected && polje.d===dSelected){
                polje.question=[...polje.question,value];
                polje.question=polje.question.sort((a,b)=>(a.id-b.id));
            }
        });
        setFields(polja);
    };
    //combination of latter functions for editQuestion component
    const changeQuestion = (value)=>{
        deleteQuestion(value);
        addQuestion(value);
    };
    

    const classes = useStyles();

    return (
        <div style={{display: "flex", flexDirection: "column",justifyContent:"space-evenly", alignItems:"center"}} className={classes.background}> 
        <Grid container direction="row" justify="center" alignItems="center"  height="100%" >
            <Grid container item md={6} direction="row"  className={classes.matrix} justify="center" alignItems="center" >
                <Grid item xs={11} md={8} className={classes.topicTitle} direction="column" justify="center" alignItems="flex-start"  container>
                    <Grid item><Typography  xs={11} color="primary" variant="h2" component="h2" className={classes.lobster}>Topic {topicID}</Typography></Grid>
                    <Grid item><p style={{fontSize:'2vh', color: 'black', display: 'block'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></Grid>
                </Grid>
                <Grid item md = {11} xs = {11} sm = {11} spacing={3} container direction="row" justify="center" alignItems="center" >
                    <DisplayMatrix changeSelected={changeAoDSelected} ar={fieldToRows(fields,aoLVL,dLVL)} aoSelected={aoSelected} dSelected={dSelected}/>
                </Grid>
            </Grid>
            <Divider  orientation="vertical" className={classes.divider} flexItem/>
            <Grid container item md={5} sm={12} xs={12} direction="row" alignContent="flex-start" alignItems="flex-start" justify="center" className={classes.questionsTable}>
                <EditQuestion forceUpdate={forceUpdate} page={page} changePage={changePage} questChange={changeQuestion} questAdd={addQuestion} questDelete={deleteQuestion} expanded={expanded} changeExpanded={changeExpanded} questions={(fields[(aoSelected+aoLVL*(dSelected-1)-1)].question.length!==0) ? fields[(aoSelected+aoLVL*(dSelected-1)-1)].question : null }/>
            </Grid>
        </Grid>
        </div>
        );
}


export default MatricaAdmin;