import React, {useState, useEffect} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Pagination from '@material-ui/lab/Pagination';
import Button from '@material-ui/core/Button';
import 'reactjs-popup/dist/index.css';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';

import offlineData from '../../../sampleData/admin/allTopics.json';


const useStyles = makeStyles((theme)=>({
    accHeading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    accSecondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
  pagin: {
    backgroundColor:'white',
    borderStyle: 'solid',
    boxShadow: "0px 2px 0.5px 1px rgba(0,0,0,0.18)",
    borderColor: 'transparent',
    borderWidth: '1px',
    borderRadius: '10px',
    padding:'5px',
    marginTop:'5%',
  },
  iconButtons:{
    minWidth:'0',
    maxWidth:'3em',
    maxHeight:'3em',
    alignItems:"flex-start"
  },
  toggleButton: {
    border: 0,
    MarginRight: 0,
    marginLeft: "auto",
    color: "#FFFFFF",
    fontFamily: "Lobster !important",
    borderRadius:"25px",
    backgroundColor: "#8c8c8c",
    maxHeight: 30,
    '&:hover': {
    backgroundColor: "#595959",
  },},
}));

const course = {
    course_name: "Course 1",
    course_id: 1,
    topic_list:[
        {
            topic: offlineData[0],
        },
        {
            topic: offlineData[1],
        },
        {
            topic: offlineData[2],
        },
        {
            topic: offlineData[3],
        },
    ]
}

export default function CustomAccordion() {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => {
        setExpanded( expanded? false:panel.course_id);
    };

    return(
        <div style={{width:"100%"}}>
            <Accordion style={{marginTop:'2px'}} expanded={expanded === course.course_id}>
                <AccordionSummary>
                    <Typography className={classes.accHeading}>{course.course_name}</Typography>
                    <Button className={classes.toggleButton} size="small" onClick={() => handleChange(course)}> {expanded? "Close":"Open"} </Button>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid  container direction="row" justify="center" alignItems="center" spacing={1}>
                        <Grid container item md={9} xs={8} direction="column" justify="flex-start" alignItems="flex-start">
                            {
                                course.topic_list.map((topic, index)=>{
                                    return <Typography>{topic.topic.topic_name}</Typography>
                                })
                            }
                        </Grid>
                        <Grid container item md={3} xs={4} direction="row" justify="flex-end" alignItems="center"> 
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}