const topicIDReducer=(state=1, action)=>{
    switch(action.type){
        case 'TOPIC_SELECTED':
            return action.payload;
        default:
            return 1;
    }
}

export default topicIDReducer;