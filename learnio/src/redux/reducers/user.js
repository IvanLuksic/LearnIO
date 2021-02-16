const usernameReducer=(state="JohnDoe", action)=>{
    switch(action.type){
        case 'USER_LOGGED_IN':
            return action.username
        default:
            return state
    }
}

export default usernameReducer;