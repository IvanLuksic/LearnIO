import loginStatusReducer from './loginStatus';
import topicReducer from './topicID';
import classReducer from './classID';
import subjectReducer from './subjectID';
import unitReducer from './unitID';
import offlineReducer from './offline';
import {combineReducers} from 'redux';
import redirectReducer from './loginRedirect';
import usernameReducer from './user';

const universalReducer = combineReducers({
    login: loginStatusReducer,
    redirect:redirectReducer,
    username:usernameReducer,
    class: classReducer,
    subject: subjectReducer,
    unit: unitReducer,
    topic: topicReducer,
    offline: offlineReducer,

})

export default universalReducer;