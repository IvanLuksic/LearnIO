import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import backgroundIMG from '../images/learniobg10-15.png';
import { makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import {EditQuestion} from './EditQuestion'; 




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
      icons:{
          padding:'15px',
          fontSize:'1.25em',
      },
      lobster: {
          fontFamily: "Lobster"
      },
    paper:{ //ode stani
        width: "6em",
        height: "6em",
        textAlign: 'center',
        variant: "outlined",
        backgroundColor: '#BDBDBD',
        fontFamily:'Roboto',
        fontSize: '3vh',
        paddingTop:  '10px',
        padding: theme.spacing(1),
        color:"white",
        borderRadius: "10px",
        cursor: "pointer"
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
//renders the field of the matrix element, takes changeSelected function, question = array of questions, AO and D of selected field as props
function DisplayField(props){
    const classes=useStyles();
    const [status,setStatus] = useState(()=>{
        return ((props.questions.length>0)?"INSERTED":"EMPTY");
    });
    const [color,setColor]= useState(()=>{
        if(status==="SELECTED") return "#27AE60";
        else return ((props.questions.length>0)?"#4373ec":"grey");
    });
    const [icon,setIcon]= useState(()=>{
        return ((props.questions.length>0)?"check_circle_out_icon":"cancel_icon");
    });
    useEffect(()=>{
        if((props.aoSelected===props.ao) && (props.dSelected===props.d))
        {
            setStatus("SELECTED");
            setColor("#27AE60")
        }
        else  
        {
            setStatus((props.questions.length>0)?"INSERTED":"EMPTY");
            setColor((props.questions.length>0)?"#4373ec":"grey");
        }
    });
    return (

            <Grid item> 
                <Paper onClick={(event)=>{props.changeSelected(event,props.ao,props.d);}} className={classes.paper} style={{backgroundColor: color}}>
                    <Grid container direction="column" justify="center" alignItems="center" style={{height: "100%"}}>
                        <Grid item><h1>AO={props.ao} D={props.d}</h1></Grid>
                        <Grid item><Icon className={classes.icons}>{icon}</Icon></Grid>
                        <Grid item><p>{status}</p></Grid>
                    </Grid>
                </Paper> 
            </Grid>
        )
}
//renders the rows of the matrix element, takes changeSelected function, row (only one) of fields (length = AO), AO and D of selected field as props
function DisplayRow(props){
    let returnRow = props.questions.map( (field,index) => <DisplayField key={index} questions={field.question} changeSelected={props.changeSelected} ao={field.ao} d={field.d} aoSelected={props.aoSelected} dSelected={props.dSelected}/> )
    return(<Grid container item direction="row" justify="center" alignItems="center" spacing={3}>{returnRow}</Grid>);
    }
//renders the matrix element, takes changeSelected function, rowS (plural) of fields (length = AO), AO and D of selected field as props
function DisplayMatrix(props){
    let returnMatrix=props.ar.map(row=><DisplayRow key={row.id} changeSelected={props.changeSelected} questions={row.array} aoSelected={props.aoSelected} dSelected={props.dSelected}/>)
    return returnMatrix;
}

function MatricaAdmin(props)
{
    const [topicID,setTopicID] = useState(()=>{
       return props.match.params.id;
    });
    const [aoSelected,setAoSelected]=useState(1);
    const [dSelected,setDSelected]=useState(1);
    const [expanded, setExpanded] = useState(false);
    const [page, setPage] = useState(1);
    const [fields, setFields]=useState([
        {
            question: [
            {id: 1, heading:"1 head", secondary:"prva", photo:false, url:'', text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
            {id: 2, heading:"2 head", secondary:"second something", photo:false, url:'', text:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
            {id: 3, heading:"3 head", secondary:"third something", photo:true, url:'', text:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},
            {id: 4, heading:"4 head", secondary:"first something", photo:true, url:'', text:"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
            {id: 5, heading:"5 head", secondary:"second something", photo:false, url:'', text:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."},
            {id: 6, heading:"6 head", secondary:"third something", photo:false, url:'', text:"Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."},
            {id: 7, heading:"7 head", secondary:"first something", photo:true, url:'', text:"Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."},
            {id: 8, heading:"8 head", secondary:"second something", photo:false, url:'', text:"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"},
            {id: 9, heading:"9 head", secondary:"third something", photo:true, url:'', text:"Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"},
            {id: 10, heading:"10 head", secondary:"first something", photo:false, url:'', text:"Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."},
            {id: 11, heading:"11 head", secondary:"second something", photo:true, url:'', text:"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"},
            {id: 12, heading:"12 head", secondary:"third something", photo:false, url:'', text:"Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"},
            {id: 13, heading:"13 head", secondary:"first something", photo:false, url:'', text:"Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."},
            {id: 14, heading:"14 head", secondary:"second something", photo:true, url:'', text:"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"},
            {id: 15, heading:"15 head", secondary:"third something", photo:true, url:'', text:"Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"},
            ],
            ao: 1,
            d: 1,
        },
        {
            question: [
                {id: 1, heading:"1 head", secondary:"druga", photo:false, url:'', text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
                {id: 2, heading:"2 head", secondary:"second something", photo:false, url:'', text:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
                {id: 3, heading:"3 head", secondary:"third something", photo:true, url:'', text:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},
                {id: 4, heading:"4 head", secondary:"first something", photo:true, url:'', text:"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
                {id: 5, heading:"5 head", secondary:"second something", photo:false, url:'', text:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."},
                {id: 6, heading:"6 head", secondary:"third something", photo:false, url:'', text:"Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."},
                {id: 7, heading:"7 head", secondary:"first something", photo:true, url:'', text:"Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."},
                {id: 8, heading:"8 head", secondary:"second something", photo:false, url:'', text:"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"},
                {id: 9, heading:"9 head", secondary:"third something", photo:true, url:'', text:"Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"},
                {id: 10, heading:"10 head", secondary:"first something", photo:false, url:'', text:"Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."},
                {id: 11, heading:"11 head", secondary:"second something", photo:true, url:'', text:"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"},
                {id: 12, heading:"12 head", secondary:"third something", photo:false, url:'', text:"Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"},
                {id: 13, heading:"13 head", secondary:"first something", photo:false, url:'', text:"Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."},
                {id: 14, heading:"14 head", secondary:"second something", photo:true, url:'', text:"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"},
                {id: 15, heading:"15 head", secondary:"third something", photo:true, url:'', text:"Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"},
                ],
                ao: 2,
                d: 1,
        },
        {
            question: [
                {id: 1, heading:"1 head", secondary:"treca", photo:false, url:'', text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
                {id: 2, heading:"2 head", secondary:"second something", photo:false, url:'', text:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
                {id: 3, heading:"3 head", secondary:"third something", photo:true, url:'', text:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},
                {id: 4, heading:"4 head", secondary:"first something", photo:true, url:'', text:"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
                {id: 5, heading:"5 head", secondary:"second something", photo:false, url:'', text:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."},
                {id: 6, heading:"6 head", secondary:"third something", photo:false, url:'', text:"Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."},
                {id: 7, heading:"7 head", secondary:"first something", photo:true, url:'', text:"Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."},
                {id: 8, heading:"8 head", secondary:"second something", photo:false, url:'', text:"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"},
                {id: 9, heading:"9 head", secondary:"third something", photo:true, url:'', text:"Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"},
                {id: 10, heading:"10 head", secondary:"first something", photo:false, url:'', text:"Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."},
                {id: 11, heading:"11 head", secondary:"second something", photo:true, url:'', text:"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"},
                {id: 12, heading:"12 head", secondary:"third something", photo:false, url:'', text:"Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"},
                {id: 13, heading:"13 head", secondary:"first something", photo:false, url:'', text:"Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."},
                {id: 14, heading:"14 head", secondary:"second something", photo:true, url:'', text:"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"},
                {id: 15, heading:"15 head", secondary:"third something", photo:true, url:'', text:"Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"},
                ],
                ao: 3,
                d: 1,
        },
        {
            question: [
                ],
                ao: 1,
                d: 2,
        },
        {
            question: [
                {id: 1, heading:"1 head", secondary:"peta", photo:false, url:'', text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
                {id: 2, heading:"2 head", secondary:"second something", photo:false, url:'', text:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
                {id: 3, heading:"3 head", secondary:"third something", photo:true, url:'', text:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},
                {id: 4, heading:"4 head", secondary:"first something", photo:true, url:'', text:"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
                {id: 5, heading:"5 head", secondary:"second something", photo:false, url:'', text:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."},
                {id: 6, heading:"6 head", secondary:"third something", photo:false, url:'', text:"Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."},
                ],
                ao: 2,
                d: 2,
        },
        {
            question: [
                {id: 1, heading:"1 head", secondary:"sesta", photo:false, url:'', text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
                {id: 2, heading:"2 head", secondary:"second something", photo:false, url:'', text:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
                {id: 3, heading:"3 head", secondary:"third something", photo:true, url:'', text:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},
                {id: 4, heading:"4 head", secondary:"first something", photo:true, url:'', text:"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
                {id: 5, heading:"5 head", secondary:"second something", photo:false, url:'', text:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."},
                {id: 6, heading:"6 head", secondary:"third something", photo:false, url:'', text:"Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."},
                {id: 7, heading:"7 head", secondary:"first something", photo:true, url:'', text:"Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."},
                {id: 8, heading:"8 head", secondary:"second something", photo:false, url:'', text:"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"},
                {id: 9, heading:"9 head", secondary:"third something", photo:true, url:'', text:"Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"},
                {id: 10, heading:"10 head", secondary:"first something", photo:false, url:'', text:"Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."},
                {id: 11, heading:"11 head", secondary:"second something", photo:true, url:'', text:"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"},
                {id: 12, heading:"12 head", secondary:"third something", photo:false, url:'', text:"Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"},
                {id: 13, heading:"13 head", secondary:"first something", photo:false, url:'', text:"Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."},
                {id: 14, heading:"14 head", secondary:"second something", photo:true, url:'', text:"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"},
                {id: 15, heading:"15 head", secondary:"third something", photo:true, url:'', text:"Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"},
                ],
                ao: 3,
                d: 2,
        },
        {
            question: [
            ],
            ao: 1,
            d: 3,
        },
        {
            question: [
            ],
            ao: 2,
            d: 3,
        },
        {
            question: [
            ],
            ao: 3,
            d: 3,
        },
    ]);
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
        console.log(value);
        console.log("pozvan delete");
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
        console.log(fields);
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
                <EditQuestion page={page} changePage={changePage} questChange={changeQuestion} questAdd={addQuestion} questDelete={deleteQuestion} expanded={expanded} changeExpanded={changeExpanded} questions={(fields[(aoSelected+aoLVL*(dSelected-1)-1)].question.length!==0) ? fields[(aoSelected+aoLVL*(dSelected-1)-1)].question : null }/>
            </Grid>
        </Grid>
        </div>
        );
}


export default MatricaAdmin;