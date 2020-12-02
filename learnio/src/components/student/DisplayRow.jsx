import React from 'react';
import Grid from '@material-ui/core/Grid';
import DisplayField from './DisplayField';


//renders the rows of the matrix element, takes changeSelected function, row (only one) of fields (length = AO), AO and D of selected field as props

function DisplayRow(props){
    let returnRow = props.tests.map( (test,index) => <DisplayField key={index} test={test.test} changeSelected={props.changeSelected} ao={test.ao} d={test.d} aoSelected={props.aoSelected} dSelected={props.dSelected}/> )
    return(<Grid container item direction="row" justify="center" alignItems="center" spacing={3}>{returnRow}</Grid>);
    }


export default DisplayRow;