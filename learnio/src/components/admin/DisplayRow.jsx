import React from 'react';
import Grid from '@material-ui/core/Grid';
import DisplayField from './DisplayField';
import StudentNames from './StudentNames';


//renders the rows of the matrix element, takes changeSelected function, row (only one) of fields (length = AO), AO and D of selected field as props

function DisplayRow(props){
    let returnRow = props.questions.map( (field,index) => <DisplayField key={index} questions={field.question} changeSelected={props.changeSelected} ao={field.ao} d={field.d} aoSelected={props.aoSelected} dSelected={props.dSelected}/> )
    return(<Grid container item direction="row" justify="center" alignItems="center" spacing={3}>{returnRow} <StudentNames/> </Grid>);
    }


export default DisplayRow;    