import React, {useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import backgroundIMG from '../images/learniobg10-15.png';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme)=>({
    background:{
        position: 'absolute',
        backgroundImage:"url("+backgroundIMG+")",
        backgroundSize: "cover",
        backgroundPosition: "fixed",
        backgroundAttachment: "fixed",
        backgroundRepeat: "repeat-y",
        width: "100%",
        [theme.breakpoints.down('sm')]: {
          minHeight: "100vh",
        },
        [theme.breakpoints.up('md')]: {
          minHeight: "200vh",
        },
    },
    root: {
        backgroundColor: 'white',
        maxWidth: '50%',
        marginTop: '10%',
        marginLeft: '25%',
        height: '500px',

        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: 'black',
    },
    tableHeader: {
        position: 'relative',
        marginLeft: '5%',
        top: '5%',
        width: '90%',
        height: '10vh',
        backgroundColor: '#27AE60',
        borderStyle: 'hidden',
        borderRadius: '10px',
    },
    accRoot: {
        position: 'relative',
        marginTop: '5%',
        marginLeft: '5%',
        width: '90%',
    },
    accHeading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    accSecondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

function Background() {
    const classes = useStyles();
    return(
    <div className={classes.background}>
        <EditQuestion/>
    </div>
    )
}

function EditQuestion() {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };

    return(
        <div className={classes.root}>
            <div className={classes.tableHeader}>
            </div>
            <div className={classes.accRoot}>


              
      {/* <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.accHeading}>General settings</Typography>
          <Typography className={classes.accSecondaryHeading}>I am an accordion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
            maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </div>
        </div>
    )
}

export default Background;