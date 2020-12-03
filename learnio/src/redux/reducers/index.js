import loginStatusReducer from './loginStatus';
import {combineReducers} from 'redux';


const universalReducer = combineReducers({
    login: loginStatusReducer,
})

export default universalReducer;