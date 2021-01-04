const express = require('express');
const result = express.Router();
const {authenticate_student,authenticate_admin,authenticate_teacher}=require('../middleware/login');
const result_controler=require('../controlers/result-controler');
module.exports=function (main_ruter){
    main_ruter.use('/',result);
    result.get('/admin/results',authenticate_admin,result_controler.getAdminResults);//admin vidi sve rezultate
    result.get('/teacher/results',authenticate_teacher,result_controler.getTeacherResults);//teacher vidi samo rezultate iz svojih razreda i onih predemta koje predaje
    result.get('/student/results',authenticate_student,result_controler.getStudentResults);//vidi samo svoje rezultate->opcionalno možda dodat da vidi i ostale iz svog razreda
}