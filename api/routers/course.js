const express=require('express');
const course=express.Router();
const {authenticate_student_or_teacher, authenticate_admin_or_teacher}=require('../middleware/login');
const course_controler=require('../controlers/course-controler');
module.exports=function (main_ruter){
    main_ruter.use('/',course);
    course.get('/courses/:subject_ID',authenticate_student_or_teacher,course_controler.getAllCourses);
   // course.post('/course/insert',authenticate_admin_or_teacher,course_controler.insertCourse);
}