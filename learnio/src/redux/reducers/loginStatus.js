const loginStatusReducer=(state='admin', action)=>{
    switch(action.type){
        case 'ADMIN_LOGGED_IN':
            return 'admin'
        case 'STUDENT_LOGGED_IN':
            return 'student'
        case 'LOGGED_OUT':
            return 'guest'
        default:
            return state
    }
}

export default loginStatusReducer;