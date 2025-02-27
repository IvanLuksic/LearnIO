const express=require('express');
const clas=express.Router();
const ShemaValidator=require('../scheme/validator');
const shema=require('../scheme/class-shema');
ShemaValidator.addSchemas(shema);
const {authenticate_student,authenticate_admin,authenticate_teacher, authenticate_admin_or_teacher}=require('../middleware/login');
const class_controler=require('../controlers/class-controler');
module.exports=function (main_ruter){
    main_ruter.use('/',clas);
    clas.get('/teacher/classes',authenticate_teacher,class_controler.getClassesAndSubjectsForTeacher);//ako imaju pristup naslovnoj strnaicik o student
    clas.get('/student/classes',authenticate_student,class_controler.getClassesAndSubjectsForStudent);
    clas.get('/admin/classes',authenticate_admin,class_controler.getClassesAndSubjectsForAdmin);
    clas.get('/admin/all/classes',authenticate_admin,class_controler.getClasses);//kod unosa predmeta treba nam izlist svih razreda->KADA ADMIN UNOSI
    clas.get('/teacher/all/classes',authenticate_teacher,class_controler.getClassesTeacher);//kada ucitelj unosi predmet onda ga moze pridruzit samo onim razrdima koje predaje
    clas.post('/class/insert',ShemaValidator.validate('addClass'),authenticate_admin,class_controler.insertClass);//admin samo moze unosit class
}