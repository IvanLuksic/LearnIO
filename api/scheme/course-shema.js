module.exports={
    addCourse:{
        title:"Shema za dodoavanje kursa",
        type:"object",
        properties:{
            course_name:{
                type:"string",
                isNotEmpty: true,
                maxLength:30
            },
            subject_id:{
                type:"array",
                minItems:1,
                items:{
                    type:"number"
                }
            }
        }
    }
}