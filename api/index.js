const express=require('express');
const login=require('./routers/login');//funkcija koja ocekuje glavni ruter
const admin=require('./routers/admin');
const teacher=require('./routers/teacher');
const student=require('./routers/student');
const topic=require('./routers/topic');
const question = require('./routers/question');
const result=require('./routers/result');
const clas=require('./routers/class');
const course=require('./routers/course');
const subject=require('./routers/subject');
const main_ruter=express.Router();
login(main_ruter);
admin(main_ruter);
teacher(main_ruter);
student(main_ruter);
topic(main_ruter);
question(main_ruter);
result(main_ruter);
clas(main_ruter);
course(main_ruter);
subject(main_ruter);
module.exports={
    Main_ruter: main_ruter
}
