module.exports={//exportamo ovako zbog shema validatora koji ce izvacliti sve enumerable propetiese iz ovog objekta a to će zapravo bit ovi objekti kao što je login i dodjeljivat će im imena ista kao što su imena objekata unutar module.exporta-> u ovom slučaju login
login:{
    title:"Shema za login",
    type: "object",
    properties:{
        username:{
            title:"username od korisnika",
            type:"string",
            minLength:1
        },
        password:{
            title:"Password od korosnika",
            type:"string",
            minLength: 7
        }
    },
    required:["username","password"]
}
}