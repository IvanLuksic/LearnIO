const express=require('express');
const course=express.Router();
const ShemaValidator=require('../scheme/validator');
const shema=require('../scheme/course-shema');
ShemaValidator.addSchemas(shema);
const {authenticate_student_or_teacher, authenticate_admin_or_teacher}=require('../middleware/login');
const course_controler=require('../controlers/course-controler');
module.exports=function (main_ruter){
    main_ruter.use('/',course);
    course.get('/courses/:subject_ID',authenticate_student_or_teacher,course_controler.getCoursesWithTopics);//dohvacamo kurs i sve njegove topice radi ljepseg prikaza->neovisno jeli student ili teacher bira prethodno predmet pa mu dajemo sve kurseve iz tgo predmeta
    course.post('/course/insert',ShemaValidator.validate('addCourse'),authenticate_admin_or_teacher,course_controler.insertCourse);
    course.get('/courses/with/topics/:subject_ID',authenticate_admin_or_teacher,course_controler.getCoursesWithTopics);//isto kao i prva ruta samo nam ovo treba za unos postojeceg pitanja
}