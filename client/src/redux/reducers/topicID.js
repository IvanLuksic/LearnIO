const topicReducer=(state=1, action)=>{
    switch(action.type){
        case 'TOPIC_SELECTED':
            return action.id
        default:
            return state
    }
}

export default topicReducer;