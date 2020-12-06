const models=require('../models');//exportano unutar db objekta u index.js fileu u models folderu
const {nodelogger}=require('../loaders/logger');
const session_class=require('./session');
const login_class=require('./login');//kod exportanja klasa
const topic_class=require('./topic');
const question_class=require('./question');
var login_instance=new login_class(models.user,nodelogger);
var session_instance=new session_class(models.session,nodelogger);
var topic_instance=new topic_class(models.topic,models.asessment_objective,models.course,models.subject,models.result,nodelogger);
var question_instance=new question_class(models.question,models.topic,models.save,models.course,models.user,nodelogger);
//inicijalizirat topic iquestions instance
module.exports={
    Login_instance:login_instance,
    Session_instance:session_instance,
    Topic_instance:topic_instance,
    Question_instance:question_instance
}