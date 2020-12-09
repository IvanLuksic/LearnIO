const topicIDReducer=(state={id:1,name:"Topic"}, action)=>{
    switch(action.type){
        case 'TOPIC_SELECTED':{
            state={
                id: action.id,
                name: action.name
            }; 
            break;
        }

        default:
            state={id:1,name:"Topic N"};
    }
    return state;
}

export default topicIDReducer;