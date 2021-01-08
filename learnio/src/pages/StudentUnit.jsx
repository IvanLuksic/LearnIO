import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {topicSelected} from '../redux/actions/topicID';
import NotFound from '../components/common/NotFound';
import StudentTopics from '../components/student/StudentTopics';


function StudentUnit(props){
    const [noError,setNoError]=useState(()=> true);
    const changeToError=()=>{if(noError===true) setNoError(false);}
    const changeToNoError=()=>{if(noError===false) setNoError(true);}
    // let dispatch=useDispatch();
    if(Number(props.match.params.unit_id)){changeToNoError();};//dispatch(subjectSelected(props.match.params.id,"Topic"))
    if((!Number(props.match.params.unit_id))){changeToError()};


    return(
        <div>
            {noError?
                <StudentTopics subject_id={props.match.params.subject_id} class_id={props.match.params.class_id}/>
                :
                <NotFound/>
            }
        </div>
);
}
export default StudentUnit;


