const express = require('express');
const result = express.Router();
const {authenticate_student,authenticate_admin,authenticate_teacher}=require('../middleware/login');
const result_controler=require('../controlers/result-controler');
module.exports=function (main_ruter){
    main_ruter.use('/',result);
    result.get('/results',authenticate_admin,result_controler.getResults);
}