module.exports={
    addTopic:{
        title:"Shema za dodavanje topica",
        type:"object",
        properties:{
            associated_topics_id:{
                type:"array",
                maxLength:20
            },
            course_id:{
                type:"number",
                minimum:1
            },
            columns_A:{
                type:"number",
                minimum:1,
                maximum:15
            },
            rows_D:{
                type:"number",
                minimum:1,
                maximum:15
            },
            subject_id: {
                type:"number",
                minimum:1
            },
            topic_name: {
                type:"string",
                isNotEmpty: true,
                maxLength:50
            },
            topic_description: {
                 type:"string",
                isNotEmpty: true,
                maxLength:1000
            }
        }
    }
}