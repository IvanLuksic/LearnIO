const express = require('express');
const question = express.Router();
const {authenticate_student,authenticate_admin,authenticate_teacher}=require('../middleware/login');
const question_controler=require('../controlers/question-controler');
module.exports=function (main_ruter){
    main_ruter.use('/',question);
    question.get('/question',authenticate_student,question_controler.getQuestions);
    question.post('/question',authenticate_student,question_controler.checkAnswer);
}