const express=require('express');
const clas=express.Router();
const {authenticate_student,authenticate_admin,authenticate_teacher}=require('../middleware/login');
const class_controler=require('../controlers/class-controler');
module.exports=function (main_ruter){
    main_ruter.use('/',clas);
    clas.get('/teacher/classes',authenticate_teacher,class_controler.getClassesForTeacher);
    clas.get('/student/classes',authenticate_student,class_controler.getClassesForStudent);;
}