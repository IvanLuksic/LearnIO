const unitReducer=(state=1, action)=>{
    switch(action.type){
        case 'UNIT_SELECTED':
            return action.id
        default:
            return state
    }
}

export default unitReducer;