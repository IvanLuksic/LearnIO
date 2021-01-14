const express = require('express');
const result = express.Router();
const {authenticate_student_or_teacher_or_admin}=require('../middleware/login');
const result_controler=require('../controlers/result-controler');
module.exports=function (main_ruter){
    main_ruter.use('/',result);
    result.get('/results',authenticate_student_or_teacher_or_admin,result_controler.getResults);//admin vidi sve rezultate
}