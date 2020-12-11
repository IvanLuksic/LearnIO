const express = require('express');
const question = express.Router();
const {authenticate_student,authenticate_admin,authenticate_teacher}=require('../middleware/login');
const question_controler=require('../controlers/question-controler');
module.exports=function (main_ruter){
    main_ruter.use('/',question);
    question.post('/question',authenticate_student,question_controler.getQuestions);
    question.post('/question/check',authenticate_student,question_controler.checkAnswer);
    question.delete('/question/delete/:questionID',authenticate_admin,question_controler.deleteQuestionByID);
    question.put('/question/update',authenticate_admin,question_controler.updateQuestions);
    question.post('/question/add',authenticate_admin,question_controler.addQuestions);
}
