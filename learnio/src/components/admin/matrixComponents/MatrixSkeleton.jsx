import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles} from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    skeletonMatrica:{
        paddingTop:"20vh",
    },
    skeletonTable:{
        minHeight: "100vh",
        paddingTop:"20vh"
    },
}));

function MatrixSkeleton(){
    const classes = useStyles();

    return(
        <Grid container direction="row" justify="center" alignItems="center"  height="100%" >
            <Grid container item md={6} direction="row" justify="center" alignItems="center" className={classes.skeletonMatrica}>
                <Grid item xs={11} md={8}  direction="row" justify="center" alignItems="flex-start"  container>
                    <Grid item style={{margin:"5px"}}><Skeleton variant="reck"  animation="wave" height={200}  width={200}/></Grid> 
                    <Grid item style={{margin:"5px"}}><Skeleton variant="reck"  animation="wave" height={200}  width={200} /></Grid> 
                    <Grid item style={{margin:"5px"}}><Skeleton variant="reck"  animation="wave" height={200}  width={200} /></Grid> 
                </Grid>
                <Grid item xs={11} md={8}  direction="row" justify="center" alignItems="flex-start"  container>
                    <Grid item style={{margin:"5px"}}><Skeleton variant="reck"  animation="wave" height={200}  width={200}/></Grid> 
                    <Grid item style={{margin:"5px"}}><Skeleton variant="reck"  animation="wave" height={200}  width={200} /></Grid> 
                    <Grid item style={{margin:"5px"}}><Skeleton variant="reck"  animation="wave" height={200}  width={200} /></Grid> 
                </Grid>
                <Grid item xs={11} md={8}  direction="row" justify="center" alignItems="flex-start"  container>
                    <Grid item style={{margin:"5px"}}><Skeleton variant="reck"  animation="wave" height={200}  width={200}/></Grid> 
                    <Grid item style={{margin:"5px"}}><Skeleton variant="reck"  animation="wave" height={200}  width={200} /></Grid> 
                    <Grid item style={{margin:"5px"}}><Skeleton variant="reck"  animation="wave" height={200}  width={200} /></Grid> 
                </Grid>
            </Grid>
            <Divider  orientation="vertical" className={classes.divider} flexItem/>
            <Grid container item md={5} sm={12} xs={12} direction="row" alignContent="flex-start" alignItems="flex-start" justify="center" className={classes.skeletonTable}>
                <Grid item style={{margin:"5px"}}><Skeleton variant="text"  animation="wave"  height={60} width={600}/></Grid> 
                <Grid item style={{margin:"5px"}}><Skeleton variant="reck"  animation="wave" height={400}  width={600} /></Grid>
                <Grid item style={{margin:"5px"}}><Skeleton variant="text"  animation="wave"  height={60} width={600}/></Grid>
            </Grid>
        </Grid>
    )
};
export default MatrixSkeleton;
