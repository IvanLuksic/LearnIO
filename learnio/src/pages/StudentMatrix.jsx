import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {topicSelected} from '../redux/actions/topicID';
import Matrica from '../components/student/Matrica';
import NotFound from '../components/common/NotFound';


function StudentMatrix(props){
    const [noError,setNoError]=useState(()=> true);
    const changeToError=()=>{if(noError===true) setNoError(false);}
    const changeToNoError=()=>{if(noError===false) setNoError(true);}
    let dispatch=useDispatch();
    if(Number(props.match.params.topic_id)){changeToNoError();dispatch(topicSelected(props.match.params.topic_id,"Topic"))};
    if(!Number(props.match.params.topic_id)){changeToError()};


    return(
        <div>
            {noError?
                <Matrica props={props}/>
                :
                <NotFound/>
            }
        </div>
    )
}
export default StudentMatrix;


