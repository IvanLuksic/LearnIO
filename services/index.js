const models=require('../models');//exportano unutar db objekta u index.js fileu u models folderu
const {nodelogger}=require('../loaders/logger');
const session_class=require('./session');
const login_class=require('./login');//kod exportanja klasa
const topic_class=require('./topic');
const question_class=require('./question');
const result_class=require('./result');
let login_instance=new login_class(models.user,nodelogger);
let session_instance=new session_class(models.session,nodelogger);
let topic_instance=new topic_class(models.topic,models.asessment_objective,models.course,models.subject,models.result,models.save,models.question,models.topic_subject,models.tags_of_topic,models.course_topic,nodelogger);
let question_instance=new question_class(models.question,models.topic,models.save,models.course,models.user,nodelogger);
let result_instance=new result_class(models.result,models.user,models.subject,models.course,models.topic,models.asessment_objective,models.clas,nodelogger)
//inicijalizirat topic iquestions instance
module.exports={
    Login_instance:login_instance,
    Session_instance:session_instance,
    Topic_instance:topic_instance,
    Question_instance:question_instance,
    Result_instance:result_instance
}