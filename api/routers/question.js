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
    question.delete('/question/delete/:questionID',authenticate_admin_or_teacher,question_controler.deleteQuestionByID);//izbrisat pitanje + ako pitanje postoji u nekoj već sesiji onda ga zamijnetit na svim tim mjestima sa random pitanjem od skupine svih pitanja za tu poziciju
    question.put('/question/update',ShemaValidator.validate('updateQuestion'),authenticate_admin_or_teacher,question_controler.updateQuestions);
    question.post('/question/add',ShemaValidator.validate('addQuestion'),authenticate_admin_or_teacher,upload.single('questionImage'),question_controler.addQuestions);// multer.single('ime propertya/fileda u request bodyu)    multer.single middleware konstruira req.file objekt
    question.get('/question/image/:questionID',authenticate_student,question_controler.getQuestionImage);
    question.get('/question/check/sessions/:questionID',authenticate_admin_or_teacher,question_controler.checkQuestion)//provjera je li se pitanje koje se želi izbrisati već nalazi spremljeno u nekoj od sesija studenata-> ako nije onda ga možemo brisat a ako je onda moramo pitat korisnika s kojin ga pitanjen od pitanja za to polje želi zamijeniti
    question.get('/student/choice/:class_id/:subject_id/:course_id/:topic_id/:question_id',authenticate_student,question_controler.getUserChoice);
    question.post('/insert/existing/question',authenticate_admin_or_teacher,question_controler.insertExistingQuestion)//requet u kojem postojeće pitanje sa zadanim idom unosimo u taj topic i ono će se nalaziti među svim mogućim pitanjima na zadane pozicije u matrici od tog topica
}
