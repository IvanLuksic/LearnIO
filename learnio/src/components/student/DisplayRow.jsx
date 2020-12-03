import React from 'react';
import Grid from '@material-ui/core/Grid';
import DisplayField from './DisplayField';


//renders the rows of the matrix element, takes changeSelected function, row (only one) of fields (length = AO), AO and D of selected field as props

function DisplayRow(props){
    let returnRow = props.questions.map( (question,index) => <DisplayField key={index} question={question} changeSelected={props.changeSelected} ao={question.ao} d={question.d} aoSelected={props.aoSelected} dSelected={props.dSelected}/> )
    return(<Grid container item direction="row" justify="center" alignItems="center" spacing={3}>{returnRow}</Grid>);
    }


export default DisplayRow;