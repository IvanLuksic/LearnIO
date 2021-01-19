module.exports={
    addTopic:{
        title:"Shema za dodavanje topica",
        type:"object",
        properties:{
            associated_topics:{//niz idova
                type:"array",
                items:{
                    type:"object",
                    properties:{
                        topic_id:{
                            type:"number",
                            minimum:1
                        },
                        required_level:{
                            type:"number",
                            minimum:1,
                            maximum:5
                        }
                    }
                }
            },
            course_id:{
                type:"number",
                minimum:1
            },
            columns_AO:{
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
            topic_name: {
                type:"string",
                isNotEmpty: true,
                maxLength:50
            },
            topic_description: {
                 type:"string",
                isNotEmpty: true,
                maxLength:1000
            },
            asessments_array:{//za ograničenja će se pobrinuti frontend strana->da u njemu bude točno onoliko asessmenta koliki je broj stupaca
                type:"array",
                isNotEmpty:true,
                items:{
                    type:"string",
                    isNotEmpty:true,//ne smi bit prazan string unutar niza
                    maxLength:50
                }
            }
        }
    }
}