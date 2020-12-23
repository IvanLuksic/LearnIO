const express=require('express');
const clas=express.Router();
const ShemaValidator=require('../scheme/validator');
const shema=require('../scheme/class-shema');
ShemaValidator.addSchemas(shema);
const {authenticate_student,authenticate_admin,authenticate_teacher, authenticate_admin_or_teacher}=require('../middleware/login');
const class_controler=require('../controlers/class-controler');
module.exports=function (main_ruter){
    main_ruter.use('/',clas);
    clas.get('/teacher/classes',authenticate_teacher,class_controler.getClassesForTeacher);
    clas.get('/student/classes',authenticate_student,class_controler.getClassesForStudent);
    clas.get('/admin/classes',authenticate_admin,class_controler.getClassesForAdmin);
    clas.post('/class/insert',ShemaValidator.validate('addClass'),authenticate_admin_or_teacher,class_controler.insertClass);
}