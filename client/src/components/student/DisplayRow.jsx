import React from 'react';
import Grid from '@material-ui/core/Grid';
import DisplayField from './DisplayField';


//renders the rows of the matrix element, takes changeSelected function, row (only one) of fields (length = AO), AO and D of selected field as props

function DisplayRow(props){
    let returnRow = props.questions.map( (questionToDisplay,index) => <DisplayField key={index} questionToDisplay={questionToDisplay} changeSelected={props.changeSelected} ao={questionToDisplay.column_A} d={questionToDisplay.row_D} aoSelected={props.aoSelected} dSelected={props.dSelected}/> )
    return(<Grid container item direction="row" justify="center" alignItems="center" spacing={3}>{returnRow}</Grid>);
    }


export default DisplayRow;