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
        //paddingLeft:'8em',
        paddingTop:"2em",
        borderColor: "transparent !important",
        height:"20em",
        [theme.breakpoints.down('sm')]: {
          width:"90%",
          paddingLeft: "5%",
          paddingRight:'5%',
        },
        [theme.breakpoints.up('md')]: {
          width:"75%",
          paddingLeft:'4em',
          paddingRight:'4em',
        },
        [theme.breakpoints.up('xl')]: {
          width:"60%",
          paddingLeft:'20%',
          paddingRight:'20%',
        },
      },
      button:{
        margin:"1em 0 1.5em 0em",
      },
      pickButton:{
        [theme.breakpoints.down('sm')]: {
            margin:"0.5em 0.4em 2em 0.4em",
            width:"5em"
        },
        [theme.breakpoints.up('md')]: {
            margin:"2em 0.5em",     
            width:"7em"     
        },
        fontSize:"1.2em",
        padding:"0.5em 3em ",
        fontFamily:"Lobster",
        borderRadius:"25px",
    },
}))
function WrongPU(props){//uzima samo closePopup 
 
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
            <Grid className={classes.subtitle} >
                <p>You have answered that question wrong.</p>
                <p>Go study connected topics.</p>
                <p>That will help you to understand that question better.</p>
            </Grid>
            <Grid className={classes.button}>
                <Button variant="contained" onClick={props.closePopup} className={classes.pickButton} style={{backgroundColor:"#EB4949", color:"white"}}>Close</Button>
            </Grid>

            {/* <div className={classes.tabela}>
                <DataGrid onRowHover={(Row)=>{linkage=Row.data.id}} rows={rows} hideFooter={"true"} columns={columns} />
            </div> */}

        </div>
    )
}
export default WrongPU;
