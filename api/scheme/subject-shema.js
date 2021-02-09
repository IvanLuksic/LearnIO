module.exports={
    addSubject:{
        title:"Shema za dodavanje predemeta",
        type:"object",
        properties:{
            subject_name:{
                type:"string",
                isNotEmpty: true,
                maxLength:30
            },
            class_id:{
                type:"array",
                minItems:1,
                items:{
                    type:"number"
                }
            }
        }
    }
}