import loginStatusReducer from './loginStatus';
import topicIDReducer from './topicID';
import offlineReducer from './offline';
import {combineReducers} from 'redux';


const universalReducer = combineReducers({
    login: loginStatusReducer,
    studentTopic: topicIDReducer,
    offline: offlineReducer
})

export default universalReducer;