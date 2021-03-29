import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  root: {
    width:"100%",
    maxWidth:"30rem",
    margin:"0 auto"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
  actions:{
    justifyContent: "center", 
    padding:"0px !important"
  }
}));

const ques=                {
    "id":68784,
    "row_D":1,
    "column_A":1,
    "text":"Lorem ipsum dolor sit amet, cfdsonsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "question_type":1,
    "image_path":null,
    "answer_a":"amet",
    "answer_b":"tempor",
    "answer_c":"eiusmod",
    "answer_d":"faert",
    "solution":"eiusmod"
}

export default function QuestionCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
    <CardHeader style={{textAlign:"left"}}
        action={
          <IconButton aria-label="settings" onClick={()=>props.deleteSelected()}>
            <Icon>close_rounded_icon</Icon>
          </IconButton>
        }
        title="Selected"
        subheader="Existing question"
      />
      {false&&<CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />}
      {!expanded&&<CardContent>
        <Typography style={{textAlign:"left"}} variant="body2" color="textSecondary" component="p">
            {props.question.text.substr(0,50)+"..."}
        </Typography>
      </CardContent>}
      <CardActions disableSpacing className={classes.actions}>
        <IconButton
          className={!expanded?classes.expand:classes.expandOpen}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon/>
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph style={{textAlign:"left"}}>
            <span style={{fontWeight:"bold"}}>QUESTION TEXT:    </span>{props.question.text}
          </Typography>
          <Typography paragraph style={{textAlign:"left"}}>
            <span style={{fontWeight:"bold"}}>SOLUTION:    </span>{props.question.solution}
          </Typography>
          {(props.question.question_type===1)&&
            <Typography paragraph style={{textAlign:"left"}}>
                <span style={{fontWeight:"bold"}}>ANSWERS:       a)  </span>{props.question.answer_a}<span style={{fontWeight:"bold"}}>        b)  </span>{props.question.answer_b}<span style={{fontWeight:"bold"}}>        c)  </span>{props.question.answer_c}<span style={{fontWeight:"bold"}}>        d)  </span>{props.question.answer_d}
            </Typography>
          }
         {/*  {(ques.question_type===1)&&
            <Typography paragraph style={{textAlign:"left"}} >
                
            </Typography>
          }
          {(ques.question_type===1)&&
            <Typography paragraph style={{textAlign:"left"}}>
                <span style={{fontWeight:"bold"}}>C:    </span>{ques.answer_c}
            </Typography>
          }
          {(ques.question_type===1)&&
            <Typography paragraph style={{textAlign:"left"}}>
                <span style={{fontWeight:"bold"}}>D:    </span>{ques.answer_d}
            </Typography>
          } */}
        </CardContent>
      </Collapse>
    </Card>
  );
}