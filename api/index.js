const express=require('express');
const login=require('./routers/login');//funkcija koja ocekuje glavni ruter
const topic=require('./routers/topic');
const question = require('./routers/question');
const result=require('./routers/result');
const clas=require('./routers/class');
const course=require('./routers/course');
const subject=require('./routers/subject');
const user=require('./routers/user');
const main_ruter=express.Router();
login(main_ruter);
topic(main_ruter);
question(main_ruter);
result(main_ruter);
clas(main_ruter);
course(main_ruter);
subject(main_ruter);
user(main_ruter);
module.exports={
    Main_ruter: main_ruter
}
