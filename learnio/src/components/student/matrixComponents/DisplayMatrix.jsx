import React from 'react';
import DisplayRow from './DisplayRow';

//renders the matrix element, takes changeSelected function, rowS (plural) of fields (length = AO), AO and D of selected field as props

function DisplayMatrix(props){
    let returnMatrix=props.ar.map(row=><DisplayRow key={row.id} changeSelected={props.changeSelected} questions={row.array} aoSelected={props.aoSelected} dSelected={props.dSelected}/>)
    return returnMatrix;
}

export default DisplayMatrix