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
            paddingTop:"10vh",
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
    paper:{ 
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
            height: "100vh",
          },
    },
    matrix:{
        [theme.breakpoints.up('md')]: {
             overflowY: "scroll",
             maxHeight: "100vh"
          },
       
    }
}));

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
                <Paper onClick={(event)=>{props.changeSelected(event,props.ao,props.d);}} className={classes.paper} style={{backgroundColor: color}} >
                    <Grid container direction="column" justify="center" alignItems="center" style={{height: "100%"}}>
                        <Grid item><h1>AO={props.ao} D={props.d}</h1></Grid>
                        <Grid item><Icon className={classes.icons}>{icon}</Icon></Grid>
                        <Grid item><p>{status}</p></Grid>
                    </Grid>
                </Paper> 
            </Grid>
        )
}

function DisplayRow(props){
    let returnRow = props.questions.map( (field,index) => <DisplayField key={index} questions={field.question} changeSelected={props.changeSelected} ao={field.ao} d={field.d} aoSelected={props.aoSelected} dSelected={props.dSelected}/> )
    return(<Grid container item direction="row" justify="center" alignItems="center" spacing={3}>{returnRow}</Grid>);
    }

function DisplayMatrix(props){
    let returnMatrix=props.ar.map(row=><DisplayRow key={row.id} changeSelected={props.changeSelected} questions={row.arr} aoSelected={props.aoSelected} dSelected={props.dSelected}/>)
    return returnMatrix;
}

function MatricaAdmin(props)
{
    const [topicID,setTopicID] = useState(()=>{
       return props.match.params.id;
    });
    const [aoSelected,setAoSelected]=useState(1);
    const [dSelected,setDSelected]=useState(1);
    const [aoLVL,setAoLVL]=useState(3);
    const [dLVL,setDLVL]=useState(3);
    const changeAoDSelected= (e,ao,d)=>{
        e.preventDefault();
        setDSelected(d);
        setAoSelected(ao);

    };

    const field=[
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
        //     get status() {
        //         return((this.question.length>0) ? "INSERTED":"EMPTY");
        //     },
        //     get color() {
        //         return ((this.status==="INSERTED") ? " #4373ec" : "grey");
        //     },
        //     get icon(){
        //         return ((this.status==="INSERTED") ? "check_circle_out_icon" : "cancel_icon");
        //     }
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
                // get status() {
                //     return((this.question.length>0) ? "INSERTED":"EMPTY");
                // },
                // get color() {
                //     return ((this.status==="INSERTED") ? " #4373ec" : "grey");
                // },
                // get icon(){
                //     return ((this.status==="INSERTED") ? "check_circle_out_icon" : "cancel_icon");
                // }
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
                // get status() {
                //     return((this.question.length>0) ? "INSERTED":"EMPTY");
                // },
                // get color() {
                //     return ((this.status==="INSERTED") ? " #4373ec" : "grey");
                // },
                // get icon(){
                //     return ((this.status==="INSERTED") ? "check_circle_out_icon" : "cancel_icon");
                // }
        },
        {
            question: [
                ],
                ao: 1,
                d: 2,
                // get status() {
                //     return((this.question.length>0) ? "INSERTED":"EMPTY");
                // },
                // get color() {
                //     return ((this.status==="INSERTED") ? " #4373ec" : "grey");
                // },
                // get icon(){
                //     return ((this.status==="INSERTED") ? "check_circle_out_icon" : "cancel_icon");
                // }
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
                // get status() {
                //     return((this.question.length>0) ? "INSERTED":"EMPTY");
                // },
                // get color() {
                //     return ((this.status==="INSERTED") ? " #4373ec" : "grey");
                // },
                // get icon(){
                //     return ((this.status==="INSERTED") ? "check_circle_out_icon" : "cancel_icon");
                // }
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
                // get status() {
                //     return((this.question.length>0) ? "INSERTED":"EMPTY");
                // },
                // get color() {
                //     return ((this.status==="INSERTED") ? " #4373ec" : "grey");
                // },
                // get icon(){
                //     return ((this.status==="INSERTED") ? "check_circle_out_icon" : "cancel_icon");
                // }
        },
        {
            question: [
            ],
            ao: 1,
            d: 3,
            // get status() {
            //     return((this.question.length>0) ? "INSERTED":"EMPTY");
            // },
            // get color() {
            //     return ((this.status==="INSERTED") ? " #4373ec" : "grey");
            // },
            // get icon(){
            //     return ((this.status==="INSERTED") ? "check_circle_out_icon" : "cancel_icon");
            // }
        },
        {
            question: [
            ],
            ao: 2,
            d: 3,
            // get status() {
            //     return((this.question.length>0) ? "INSERTED":"EMPTY");
            // },
            // get color() {
            //     return ((this.status==="INSERTED") ? " #4373ec" : "grey");
            // },
            // get icon(){
            //     return ((this.status==="INSERTED") ? "check_circle_out_icon" : "cancel_icon");
            // }
        },
        {
            question: [
            ],
            ao: 3,
            d: 3,
            // get status() {
            //     return((this.question.length>0) ? "INSERTED":"EMPTY");
            // },
            // get color() {
            //     return ((this.status==="INSERTED") ? " #4373ec" : "grey");
            // },
            // get icon(){
            //     return ((this.status==="INSERTED") ? "check_circle_out_icon" : "cancel_icon");
            // }
        },
    ]

    const fieldToRows=(field,ao,d)=>{
        let ar=[{   
                    arr: field.slice(0,(ao)),
                    id: 1,
                }];
        for(var i=2;i<=d;i++)
        {
            let o={ arr: field.slice((i-1)*ao,(i*ao)),
                    id: i,};
            ar=[...ar,o];
        }
        console.log(ar);
        return ar;
    };

    const handleChange = (value)=>{
        field[(aoSelected+aoLVL*(dSelected-1)-1)].question = value
    };

    const classes = useStyles();

    return (
        <div style={{display: "flex", flexDirection: "column",justifyContent:"space-evenly", alignItems:"center"}} className={classes.background}> 
        <Grid container direction="row" justify="space-evenly" alignItems="center"  height="100%">
            <Grid container item md={6} direction="row"  className={classes.matrix} justify="center" alignItems="center" >
                <Grid item xs={11} md={8} className={classes.topicTitle} direction="column" justify="center" alignItems="flex-start"  container>
                    <Grid item><Typography  xs={11} color="primary" variant="h2" component="h2" className={classes.lobster}>Topic {topicID}</Typography></Grid>
                    <Grid item><p style={{fontSize:'2vh', color: 'black', display: 'block'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></Grid>
                </Grid>
                <Grid item md = {11} xs = {11} sm = {11} spacing={3} container direction="row" justify="center" alignItems="center" >
                    <DisplayMatrix changeSelected={changeAoDSelected} ar={fieldToRows(field,aoLVL,dLVL)} aoSelected={aoSelected} dSelected={dSelected}/>
                </Grid>
            </Grid> 
            <Divider orientation="vertical" className={classes.divider} flexItem/>
            <Grid container item md={5} sm={12} xs={12} direction="row" alignContent="flex-start" alignItems="flex-start" justify="center">
                <EditQuestion questChange={handleChange} questions={(field[(aoSelected+aoLVL*(dSelected-1)-1)].question.length!==0) ? field[(aoSelected+aoLVL*(dSelected-1)-1)].question : null }/>
            </Grid>
        </Grid>
        </div>
        );
}


export default MatricaAdmin;
