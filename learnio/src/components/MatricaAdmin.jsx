import { Typography } from "@material-ui/core";
import React from 'react';
import Grid from '@material-ui/core/Grid';
import backgroundIMG from '../images/learniobg10-15.png';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
  



const useStyles = makeStyles((theme) => ({
    paper:{
        width: 150,
        height: 150,
        textAlign: 'center',
        variant: "outlined",
        backgroundColor: '#BDBDBD',
        fontFamily:'Roboto',
        fontSize: '3vh',
        paddingTop:  '10px',
        padding: theme.spacing(1),
        color:"white",
        borderRadius: "10px"
    },
}));

const styles = theme => ({
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
            paddingTop:"1vh",
          },
          paddingBottom:'9px', 
      },
      icons:{
          padding:'15px',
          fontSize:'1.25em',
      },
      lobster: {
          fontFamily: "Lobster"
      }
  });
 


 function DisplayRow(props){
    const classes=useStyles();
    let returnRow = props.questions.map( (question, index) =>  <Grid item key={index}> <Paper className={classes.paper} style={{backgroundColor:question.color}} >
                                                                     <Grid container direction="column" justify="center" alignItems="center" style={{height: "100%"}}>
                                                                        <Grid item><h1>AO={question.a} D={question.d}</h1></Grid>
                                                                        <Grid item><Icon className={classes.icons}>{question.type}</Icon></Grid>
                                                                        <Grid item><p>{question.text}</p></Grid>
                                                                     </Grid>
                                                                </Paper> </Grid>)
      return <Grid container item direction="row" justify="center" alignItems="center" spacing={3} >{returnRow}</Grid>
    }

class Matrica extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            dis: false,
            topicId: this.props.match.params.id,
            };
    }
    
    // displayAdmin=(bool)=>{
    //     this.setState({dis: bool});
    // }


    render()
    {
        const {classes}=this.props;
        return (
        <div style={{display: "flex", flexDirection: "column",justifyContent:"space-evenly", alignItems:"center"}} className={classes.background}> 
        <Grid container direction="row"   justify="space-evenly" alignItems="center"  >
          <Grid item md={6}>
            <Grid container direction="column" justify="center" alignItems="center" >
                <Grid item xs={11} md={8} className={classes.topicTitle} direction="column" justify="center" alignItems="flex-start"  container>
                    <Grid item><Typography  xs={11} color="primary" variant="h2" component="h2" className={classes.lobster}>Tema matrice</Typography></Grid>
                    <Grid item><p style={{fontSize:'2vh', color: 'black', display: 'block'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></Grid>
                </Grid>
                <Grid item md = {8} xs = {12} sm = {12} spacing={3} container direction="row" justify="center" alignItems="center" >
                    <DisplayRow displayAdmin={this.displayAdmin} questions={[{a: 1, d: 1, color: "#EB4949",text: "Wrong", type:"cancel_icon"},{a: 2, d: 1, color: " ", text: "Locked", type:"lock_icon"}, {a: 3, d: 1, color: "#27AE60",text: "Solve",type:"lock_open_icon"} ]}/>
                    <DisplayRow  questions={[{a: 1, d: 2, color: "#EB4949", text: "Wrong",type:"cancel_icon"},{a: 2, d: 2, color: "#4372ec", text: "Done", type:"check_circle_out_icon"}, {a: 3, d: 2, color: "#27AE60",text: "Solve", type:"lock_open_icon"} ]}/>
                    <DisplayRow  questions={[{a: 1, d: 3, color: "#EB4949", text: "Wrong", type:"cancel_icon"},{a: 2, d: 3, color: "#4372ec", text: "Done",type:"check_circle_out_icon"}, {a: 3, d: 3, color:" ",text: "Locked", type:"lock_icon" } ]}/>
                </Grid>
            </Grid> 
            </Grid>
         <Divider orientation="vertical" flexItem/>
         <Grid item md={5} sm={12} xs={12}>
            <Grid container direction="column" justify="center" alignItems="center" >
                <Grid item xs={11} md={8} className={classes.topicTitle} direction="column" justify="center" alignItems="flex-start"  container>
                    <Grid  item><Typography  xs={11} color="primary" variant="h2" component="h2" className={classes.lobster}>Tema matrice</Typography></Grid>
                    <Grid item><p style={{fontSize:'2vh', color: 'black', display: 'block'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></Grid>
                </Grid>
            </Grid>
          </Grid> 
        </Grid>
        </div>
        )
       
    }
}


export default withStyles(styles, { withTheme: true })(Matrica);
