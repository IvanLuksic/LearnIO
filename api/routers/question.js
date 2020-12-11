const express = require('express');
const question = express.Router();
const ShemaValidator=require('../scheme/validator');
const shema=require('../scheme/question-shema');
ShemaValidator.addSchemas(shema);
const {authenticate_student,authenticate_admin,authenticate_teacher}=require('../middleware/login');
const question_controler=require('../controlers/question-controler');
module.exports=function (main_ruter){
    main_ruter.use('/',question);
    question.get('/question/:class_id/:subject_id/:course_id/:topic_id',authenticate_student,question_controler.getQuestions);
    question.post('/question/check',authenticate_student,question_controler.checkAnswer);
    question.delete('/question/delete/:questionID',authenticate_admin,question_controler.deleteQuestionByID);
    question.put('/question/update',ShemaValidator.validate('updateQuestion'),authenticate_admin,question_controler.updateQuestions);
    question.post('/question/add',ShemaValidator.validate('addQuestion'),authenticate_admin,question_controler.addQuestions);
}
