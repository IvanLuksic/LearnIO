<<<<<<< HEAD:client/src/redux/reducers/loginStatus.js
const loginStatusReducer=(state='admin', action)=>{//OFFLINE:'guest'->'admin'
=======
const loginStatusReducer=(state='guest', action)=>{//OFFLINE:'guest'->'admin'
>>>>>>> frontend:learnio/src/redux/reducers/loginStatus.js
    switch(action.type){
        case 'ADMIN_LOGGED_IN':
            return 'admin'
        case 'STUDENT_LOGGED_IN':
            return 'student'
        case 'TEACHER_LOGGED_IN':
            return 'teacher'
        case 'LOGGED_OUT':
            return 'guest'
        default:
            return state
    }
}

export default loginStatusReducer;