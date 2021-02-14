module.exports={
    updateQuestion:{
        title:'Shema za izmjenu pitanja',
        type:'object',
        properties:{
            id:{
                type:"number",
                minimum:1
            },
            answer_a:{
                type:["null","number", "string"],
                isNotEmpty: true,//definiran keyword u shema validatoru
                maxLength:1000
            },
            answer_b:{
                type:["null","number", "string"],
                isNotEmpty: true,
                maxLength:1000
            },
            answer_c:{
                type:["null","number", "string"],
                isNotEmpty: true,
                maxLength:1000
            },
            answer_d:{
                type:["null","number", "string"],
                isNotEmpty: true,
                maxLength:1000
            },
            row_D:{
                type:"number",
                minimum:1,
                maximum:15
            },
            column_A:{
                type:"number",
                minimum:1,
                maximum:15
            },
            image_path:{
                type:["null","string"],
                maxLength:100
            },
            question_type:{
                type:["integer"],
                minimum:1,//zasad imamo samo 2 tipa pitanja
                maximum:2
            },
            solution:{
                type:["number","string"],
                isNotEmpty: true,
                maxLength:50
            },
            text:{
                type:"string",
                isNotEmpty: true,
                maxLength:1000
            }
        }
    },
    addQuestion:{
        title:'Shema za dodavanje pitanja',
        type:'object',
        properties:{
            topic_id:{
                type:"number",
                minimum:1
            },
            answer_a:{
                type:["null","number", "string"],
                isNotEmpty: true,
                maxLength:1000
            },
            answer_b:{
                type:["null","number", "string"],
                isNotEmpty: true,
                maxLength:1000
            },
            answer_c:{
                type:["null","number", "string"],
                isNotEmpty: true,
                maxLength:1000
            },
            answer_d:{
                type:["null","number", "string"],
                isNotEmpty: true,
                maxLength:1000
            },
            row_D:{
                type:"number",
                minimum:1,
                maximum:15
            },
            column_A:{
                type:"number",
                minimum:1,
                maximum:15
            },
            image_path:{
                type:["null","string"],
                maxLength:100
            },
            question_type:{
                type:["integer"],
                minimum:1,//zasad imamo samo 2 tipa pitanja
                maximum:2
            },
            solution:{
                type:["number","string"],
                isNotEmpty: true,
                maxLength:50
            },
            text:{
                type:"string",
                isNotEmpty: true,
                maxLength:1000
            }
        }
    },
    replaceQuestion:{
        title:'Shema za zamjenu određenog pitanja s drugim',
        type:'object',
        properties:{
            source_question_id:{
                type:'number',
                minimum:1
            },
            new_question_id:{
                type:'number',
                minimum:1
            }
        }
    }
}