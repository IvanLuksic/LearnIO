const subjectReducer=(state=1, action)=>{
    switch(action.type){
        case 'SUBJECT_SELECTED':
            return action.id
        default:
            return state
    }
}

export default subjectReducer;