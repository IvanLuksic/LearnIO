import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {topicSelected} from '../redux/actions/topicID';
import Matrix from '../components/admin/Matrix';
import NotFound from '../components/common/NotFound';


function AdminMatrix(props){
    const [noError,setNoError]=useState(()=> true);
    const changeToError=()=>{if(noError===true) setNoError(false);}
    const changeToNoError=()=>{if(noError===false) setNoError(true);}
    let dispatch=useDispatch();
    if(Number(props.match.params.id)){changeToNoError();dispatch(topicSelected(props.match.params.id,"Topic"))};
    if(!Number(props.match.params.id)){changeToError()};


    return(
        <div>
            {noError?
                <Matrix props={props}/>
                :
                <NotFound/>
            }
        </div>
);
}
export default AdminMatrix;





