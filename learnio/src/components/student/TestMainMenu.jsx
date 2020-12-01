import React, {useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import 'reactjs-popup/dist/index.css';
import Icon from '@material-ui/core/Icon';
import {Dialog} from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    root: {
        width: '90%',
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'flex-start',
        alignItems: 'flex-start',
        position: 'relative',
    },
    acc: {
      display:'flex',
      backgroundColor:'white',
      borderStyle: 'solid',
      boxShadow: "0px 1px 0px 0.2px rgba(0,0,0,0.35)",
      borderColor: 'transparent',
      borderWidth: '1px',
      borderRadius: '4px',
      padding:'2%',
      marginTop:'2px',
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
    btn: {
      height: '30px',
      width: '50px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderRadius: '5px',
      backgroundColor: 'white',
      marginRight: '3%',
    },
    tableHeader: {
        position: 'relative',
        width: '100%',
        height: '6vh',
        backgroundColor: '#27AE60',
        borderStyle: 'hidden',
        borderRadius: '10px',
        alignItems:'center',
        display: 'flex',
        justifyContent: "space-between",
        marginBottom: '4%',
    },
    Heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
      fontWeight: 'bold',
      color: 'white',
      marginLeft: '3%',
      position: 'relative',
    },
    accRoot: {
        position: 'relative',
        marginTop: '10vh',
        // marginLeft: '5%',
        width: '90%',
    },
}));

function TestMainMenu(props) {
    const classes = useStyles();

    return(
        <div className={classes.root}>
          <div className={classes.accRoot}>
          <div className={classes.tableHeader}>
            <Typography className={classes.Heading}>Test results</Typography>
            <Button className={classes.btn}>Hello</Button>
          </div>
            {
            props.questions.slice(0,5).map((question, index) =>(
              <div key={question.id}>
                <div className={classes.acc}>
                  <Typography className={classes.accHeading}>header thing {question.id}</Typography>
                  <Typography className={classes.accSecondaryHeading}>hello world</Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
    )
}

export default TestMainMenu;