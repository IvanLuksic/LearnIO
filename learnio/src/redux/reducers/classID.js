const classReducer=(state=1, action)=>{
    switch(action.type){
        case 'CLASS_SELECTED':
            return action.id
        default:
            return state
    }
}

export default classReducer;