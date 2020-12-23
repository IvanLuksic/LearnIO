module.exports={
    addTopic:{
        title:"Shema za dodavanje topica",
        type:"object",
        properties:{
            associated_topics_id:{//niz idova
                type:"array",
                maxLength:20,
                items:{
                    type:"number"
                }
            },
            course_id:{
                type:"number",
                minimum:1
            },
            columns_A:{
                type:"number",
                minimum:1,
                maximum:15,
                isNotEmpty: true,
            },
            rows_D:{
                type:"number",
                minimum:1,
                maximum:15,
                isNotEmpty: true,
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