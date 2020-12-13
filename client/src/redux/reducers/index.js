import loginStatusReducer from './loginStatus';
import topicIDReducer from './topicID';
import {combineReducers} from 'redux';


const universalReducer = combineReducers({
    login: loginStatusReducer,
    studentTopic: topicIDReducer,
})

export default universalReducer;