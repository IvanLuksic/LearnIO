const express = require('express');
const topic = express.Router();
const ShemaValidator=require('../scheme/validator');
const shema=require('../scheme/topic-shema');
ShemaValidator.addSchemas(shema);
const {authenticate_student,authenticate_admin,authenticate_teacher,authenticate_admin_or_teacher}=require('../middleware/login');
const topic_controler=require('../controlers/topic-controler');
module.exports=function (main_ruter){
    main_ruter.use('/',topic);
    topic.get('/student/topics/:class_id/:subject_id/:course_id',authenticate_student,topic_controler.getTopicsStudent);//za studenta->svi topici iz kursa u koji uđe-> prethodno su odabrali razred i predmet
    topic.get('/topics/:course_id',authenticate_admin_or_teacher,topic_controler.getTopicsFromCourse);//ovde dohvacamo sve topice za odabrani kurs kada admin ili teacher udu u njega
    topic.get('/student/topics/associated/:topic_id',authenticate_student,topic_controler.associated);
    topic.get('/admin/topics',authenticate_admin,topic_controler.getAdminTopics);//za admina svi topici
    topic.get('/teacher/topics',authenticate_teacher,topic_controler.getTeacherTopics);//dati sve topice kojima moze pristupiti ucitelj zajedno sa njihovin subject course parovima
    topic.get('/admin/topics/edit/:topic_id',authenticate_admin_or_teacher, topic_controler.getAdminTopicsEdit);//glavna matrica di se uređuje topic-> to mogu i admin i teacher
    topic.delete('/admin/topics/delete/:topic_id',authenticate_admin_or_teacher,topic_controler.deleteTopic);
    topic.get('/admin/topics/associated/:subject_id',authenticate_admin_or_teacher,topic_controler.getAssociatedFromSubject);
    topic.get('/admin/topics/subject/course/pairs',authenticate_admin,topic_controler.getSubject_Courses);//kada dodajemo topic da može kliknit kojem će paru course subject pridružit taj topic
    topic.get('/teacher/topics/subject/course/pairs',authenticate_teacher,topic_controler.getSubject_Courses_Teacher);//samo parove subject course koje teacher predaje
    topic.post('/add/topic',ShemaValidator.validate('addTopic') ,authenticate_admin_or_teacher,topic_controler.addTopics);
}
