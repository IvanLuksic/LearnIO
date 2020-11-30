const express=require('express');
const login=require('./routers/login');//funkcija koja ocekuje glavni ruter
const admin=require('./routers/admin');
const teacher=require('./routers/teacher');
const student=require('./routers/student');
const main_ruter=express.Router();
login(main_ruter);
admin(main_ruter);
teacher(main_ruter);
student(main_ruter);
module.exports={
    Main_ruter: main_ruter
}
