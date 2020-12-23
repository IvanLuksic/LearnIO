const express=require('express');
const subject=express.Router();
const ShemaValidator=require('../scheme/validator');
const shema=require('../scheme/class-shema');
ShemaValidator.addSchemas(shema);
const {authenticate_student_or_teacher, authenticate_admin_or_teacher}=require('../middleware/login');
const subject_controler=require('../controlers/subject-controler');
module.exports=function(main_ruter)
{
    main_ruter.use('/',subject);
    subject.get('/subjects/:class_ID',authenticate_student_or_teacher,subject_controler.getAllSubjects);
    subject.post('/subject/insert',ShemaValidator.validate('addSubject'),authenticate_admin_or_teacher.toString,subject_controler.insertSubject);
}