import React from 'react';
import { makeStyles,withStyles} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import {Link} from 'react-router-dom';
import { DataGrid, Pagination} from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';

const ColorButton = withStyles((theme) => ({
    root: {
        border: 0,
        MarginRight: 0,
        marginLeft: "auto",
        color: "#FFFFFF",
        fontFamily: "Lobster !important",
        borderRadius:"25px",
        backgroundColor: "#EB4949",
        maxHeight: 30,
        '&:hover': {
            backgroundColor: "#D54646",
      },
    },
  }))(Button);
  
const useStyles=makeStyles(theme =>({

    title:{
        fontWeight:"bold",
        fontStyle:"italic",
        padding:"1em 0 1em 0em",
        fontSize:"2em"
    },
    subtitle:{
        padding:"0em 0 1em 0em",
    },
    tabela:{
        paddingLeft:'7vw',
        paddingTop:"2em",
        borderColor: "transparent !important",
        height:"25em",
        [theme.breakpoints.down('sm')]: {
          width:"90%",
        },
        [theme.breakpoints.up('md')]: {
          width:"75%",
        },
        [theme.breakpoints.up('xl')]: {
          width:"60%",
        },
      },
}))
function WrongPU(props){

    const classes=useStyles();
    var linkage='contacts' ;
    const columns = [
        { field: 'topic', width: 200, type:'string', renderHeader: () => (<strong>{"Topic"}</strong>),},
        { field: 'result', headerName:'Result',
        valueGetter: (params) => `${params.getValue('result')}%`,},
        { field: 'open', headerName: `${' '}`, renderCell: (params) => (<Link to={'/topic/'+ linkage} onClick={props.closePopup}><ColorButton size="small"> Open </ColorButton></Link>),},
    ]
    const rows=[
        {id: 1, topic:'Trigonometry 1',result:'10' },
        {id: 2, topic:'Geometry 3', result:'70'},
        {id: 3, topic:'Trigonometry 1',result:'50' },
        {id: 4, topic:'Geometry 3', result:'65'},
    ]
    return(
        <div>
            <Grid className={classes.title}>
                <h1>WRONG ANSWER</h1>
            </Grid>
            <Grid className={classes.subtitle}>
                <p>You have answered that question wrong.</p>
                <p>Go study these topics that will help you to understand that question better.</p>
            </Grid>
            <div className={classes.tabela}>
                <DataGrid onRowHover={(Row)=>{linkage=Row.data.id}} rows={rows} hideFooter={"true"} columns={columns} />
            </div>

        </div>
    )
}
export default WrongPU;
