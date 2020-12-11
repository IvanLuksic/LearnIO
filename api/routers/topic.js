const express = require('express');
const topic = express.Router();
const {authenticate_student,authenticate_admin,authenticate_teacher}=require('../middleware/login');
const topic_controler=require('../controlers/topic-controler');
module.exports=function (main_ruter){
    main_ruter.use('/',topic);
    topic.get('/topic/:class_id/:subject_id/:course_id',authenticate_student,topic_controler.getTopics);
    topic.get('/admin/topics',authenticate_admin,topic_controler.getAdminTopics);
    topic.get('/admin/topics/edit/:topic_id',authenticate_admin, topic_controler.getAdminTopicsEdit);
    topic.get('/student/topics/associated/:topic_id',authenticate_student,topic_controler.associated);
    topic.delete('/admin/topics/delete/:topicID',authenticate_admin,topic_controler.deleteTopic);
}
