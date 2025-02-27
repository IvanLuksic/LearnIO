module.exports={
    addUser:{
        title:"Shema za dodavanje usera",
        type:"object",
        properties:{
            name:{
                type:"string",
                isNotEmpty: true,
                maxLength:30
            },
            surname:{
                type:"string",
                isNotEmpty: true,
                maxLength:30
            },
            mail:{
                type:"string",
                format:'email',
                isNotEmpty: true,
                maxLength:30
            },
            date_of_birth:{
                type:"string",
                format:'date-time',
                isNotEmpty: true,
                maxLength:30
            },
            username:{
                type:"string",
                isNotEmpty: true,
                minLength:5,
                maxLength:20
            },
            password:{
                type:"string",
                isNotEmpty: true,
                minLength: 7,
                maxLength:70
            },
            user_type:{
                type:"number",
                isNotEmpty: true,
                minimum:1,
                maximum:3
            }
        }
    }
}