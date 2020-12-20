const models=require('../models');//exportano unutar db objekta u index.js fileu u models folderu
const {nodelogger}=require('../loaders/logger');
const session_class=require('./session');
const login_class=require('./login');//kod exportanja klasa
const topic_class=require('./topic');
const question_class=require('./question');
const result_class=require('./result');
const clas_class=require('./class');
const course_class=require('./course');
const subject_class=require('./subject');
const user_class=require('./user');
let login_instance=new login_class(models.user,nodelogger);
let session_instance=new session_class(models.session,nodelogger);
let result_instance=new result_class(models.result,models.user,models.subject,models.course,models.topic,models.asessment_objective,models.clas,nodelogger)
let topic_instance=new topic_class(models.topic,models.asessment_objective,models.course,models.subject,models.result,models.save,models.question,models.topic_subject,models.tags_of_topic,models.course_topic,result_instance, nodelogger);
let question_instance=new question_class(models.question,models.topic,models.save,models.course,models.user,models.result,topic_instance, nodelogger);
let class_instance=new clas_class(models.clas,models.user,nodelogger);
let course_instance=new course_class(models.course,models.clas,models.subject,nodelogger);
let subject_instance=new subject_class(models.subject,models.clas,models.user,nodelogger);
let user_instance=new user_class(models.user,nodelogger);
module.exports={
    Login_instance:login_instance,
    Session_instance:session_instance,
    Topic_instance:topic_instance,
    Question_instance:question_instance,
    Result_instance:result_instance,
    Class_instance:class_instance,
    Course_instance:course_instance,
    Subject_instance:subject_instance,
    User_instance:user_instance
}