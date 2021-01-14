import loginStatusReducer from './loginStatus';
import topicReducer from './topicID';
import classReducer from './classID';
import subjectReducer from './subjectID';
import unitReducer from './unitID';
import offlineReducer from './offline';
import {combineReducers} from 'redux';


const universalReducer = combineReducers({
    login: loginStatusReducer,
    class: classReducer,
    subject: subjectReducer,
    unit: unitReducer,
    topic: topicReducer,
    offline: offlineReducer,

})

export default universalReducer;