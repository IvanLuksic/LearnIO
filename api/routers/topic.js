const express = require('express');
const topic = express.Router();
const {authenticate_student,authenticate_admin,authenticate_teacher}=require('../middleware/login');
const topic_controler=require('../controlers/topic-controler');
module.exports=function (main_ruter){
    main_ruter.use('/',topic);
    topic.post('/topic',authenticate_student,topic_controler.getTopics);
    topic.get('/admin/topics',authenticate_admin,topic_controler.getAdminTopics);
    topic.post('/admin/topics/edit',authenticate_admin, topic_controler.getAdminTopicsEdit);
    topic.post('/student/topics/associated',authenticate_student,topic_controler.associated);
    topic.delete('/admin/topics/delete/:topicID',authenticate_admin,topic_controler.deleteTopic);
}
