import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles} from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
      skeleton:{
        paddingTop:"15vh",
        paddingLeft:"25%",
        paddingRight:"25%",
        margin:"2px",
        justifyContent:"center"
      }
}));

function MatrixSkeleton(){
    const classes = useStyles();

    return(
        <div className={classes.skeleton}>
            <Grid container  direction="row"  justify="center" alignItems="center" style={{marginBottom:"5px"}}>
            <Grid item style={{margin:"5px"}}><Skeleton variant="reck"  animation="wave" height={200}  width={200}/></Grid> 
            <Grid item style={{margin:"5px"}}><Skeleton variant="reck"  animation="wave" height={200}  width={200} /></Grid> 
            <Grid item style={{margin:"5px"}}><Skeleton variant="reck"  animation="wave" height={200}  width={200} /></Grid> 
            </Grid>
            <Grid container direction="row"  justify="center" alignItems="center" style={{marginBottom:"5px"}}>
            <Grid item style={{margin:"5px"}}><Skeleton variant="reck" animation="wave" height={200}  width={200} /></Grid> 
            <Grid item style={{margin:"5px"}} ><Skeleton variant="reck" animation="wave" height={200}  width={200} /></Grid> 
            <Grid item style={{margin:"5px"}}><Skeleton variant="reck" animation="wave" height={200}  width={200} /></Grid> 
            </Grid>
            <Grid container  direction="row"  justify="center" alignItems="center" style={{marginBottom:"5px"}}>
            <Grid item style={{margin:"5px"}}><Skeleton variant="reck" animation="wave" height={200}  width={200} /></Grid> 
            <Grid item style={{margin:"5px"}}><Skeleton variant="reck" animation="wave" height={200}  width={200} /></Grid> 
            <Grid item style={{margin:"5px"}}><Skeleton variant="reck" animation="wave" height={200}  width={200} /></Grid> 
            </Grid>
        </div>
    )
};
export default MatrixSkeleton;
