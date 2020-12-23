module.exports={
    addClass:{
        title:"Shema za dodavanje razreda",
        type:"object",//request body kojeg provjeravamo je objekt
        properties:{//JER JE GORE TYPE:OBIJECT ONDA MOZEMO I DEFINIRAT UVJETE ZA PROPOERTIESE TOG OBJEKTA
            class_name:{
                type:"string",
                isNotEmpty: true,
                maxLength:10
            },
            class_year:{
                type:"string",
                isNotEmpty: true,
                maxLength:20
            },
            student_id:{
                type:"array",
                minItems:1,
                items:{
                    type:"number"
                }
            }
        }
    }
}