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
            subject_id:{//samo 1 predmetu pripada kurs
                    type:"number",
                    isNotEmpty:true
            }
        }
    }
}