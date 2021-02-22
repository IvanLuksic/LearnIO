const express = require('express');
const question = express.Router();
const ShemaValidator=require('../scheme/validator');
const shema=require('../scheme/question-shema');
ShemaValidator.addSchemas(shema);
const {authenticate_student,authenticate_admin_or_teacher}=require('../middleware/login');
const question_controler=require('../controlers/question-controler');
let {upload}=require('../../services/multer');//multer upload objekt
module.exports=function (main_ruter){
    main_ruter.use('/',question);
    question.get('/question/:class_id/:subject_id/:course_id/:topic_id',authenticate_student,question_controler.getQuestions);
    question.post('/question/check',authenticate_student,question_controler.checkAnswer);
    question.delete('/question/delete/:questionID',authenticate_admin_or_teacher,question_controler.deleteQuestionByID);
    question.put('/question/update',ShemaValidator.validate('updateQuestion'),authenticate_admin_or_teacher,question_controler.updateQuestions);
    question.post('/question/add',ShemaValidator.validate('addQuestion'),authenticate_admin_or_teacher,upload.single('questionImage'),question_controler.addQuestions);// multer.single('ime propertya/fileda u request bodyu)    multer.single middleware konstruira req.file objekt
    question.get('/question/image/:questionID',authenticate_student,question_controler.getQuestionImage);
    question.get('/question/check/sessions/:questionID',authenticate_admin_or_teacher,question_controler.checkQuestion)//provjera je li se pitanje koje se želi izbrisati već nalazi spremljeno u nekoj od sesija studenata-> ako nije onda ga možemo brisat a ako je onda moramo pitat korisnika s kojin ga pitanjen od pitanja za to polje želi zamijeniti
    question.put('/question/replace/with',ShemaValidator.validate('replaceQuestion'),authenticate_admin_or_teacher,question_controler.replaceQuestion);
}
