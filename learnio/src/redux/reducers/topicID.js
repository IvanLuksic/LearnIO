const topicIDReducer=(state='null', action)=>{
    switch(action.type){
        case 'TOPIC_SELECTED':
            return action.payload;
        default:
            return null;
    }
}

export default topicIDReducer;