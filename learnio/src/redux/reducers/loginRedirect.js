const redirectReducer=(state='/', action)=>{
    switch(action.type){
        case 'REDIRECT_CHANGED':
            return action.uri      
        default:
            return state
    }
}

export default redirectReducer;