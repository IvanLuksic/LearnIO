const {Topic_instance,Question_instance}=require('../../services');
const {nodelogger}=require('../../loaders/logger');
module.exports={
    getTopicsStudent:async (req,res,next)=>{//da bi dosaoo do ovde morao je proci autentikaciju-> ne treba se brinuti o tome ovde
        try {
        nodelogger.info('Parametri: '+req.params.course_id+' '+req.params.subject_id+' '+req.session.user+' '+req.params.class_id);
        try {
            var topics=await Topic_instance.getTopicsForStudent(req.session.user,req.params.course_id,req.params.subject_id,req.params.class_id);//dohvacamo za studenta samo one koji su mu otkljujcani odnosno nalaze se u tablici rezultati
        } catch (error) {
            nodelogger.error('Error in fetching topics frrom database ');
            throw(error);
        }
        res.json(topics);//dodaj u resposne objekt-> RESPOSNE NEMA BODY OBJEKT-> OVAKO ŠALJEMO JSON OBJEKT U RESPOSNE BODYU
    } catch (error) {
            nodelogger.error('Error in getTopics ');
            next(error);//idi na error midleware hadler-> on ce vratiti resposne i koja je greska
    }
    },
    getTopicsFromCourse:async (req,res,next)=>
    {
        try {
            let topics=await Topic_instance.getAllTopicsFromCourse(req.params.course_id);
            res.json(topics);
        } catch (error) {
            nodelogger.error('Eror in getTopicsFromCourse');
        }
    },
    getAdminTopics:async(req,res,next)=>//AKO JE DOSAO DO OVDE ONDA JE ADMIN-> VRATI MU SVE TOPICE
    {
        try {
            try {
                var topics=await Topic_instance.getAllTopicsForAdmin();
            } catch (error) {
                nodelogger.error('Error in fetching topics for admin');
                throw(error);
            }
            let response={};
            response.Topics=topics;
            res.json(response);
        } catch (error) {
            nodelogger.error('Error in getAdminTopics');
            next(error);
        }
    },
    getTeacherTopics:async (req,res,next)=>
    {
        try {
            try {
                var topics=await Topic_instance.getAllTopicsForTeacher(req.session.user);//dati mu id od ucitelja
            } catch (error) {
                nodelogger.error('Error in fetching topics for teacher');
                throw(error);
            }
            let response={};
            response.Topics=topics;
            res.json(response);
        } catch (error) {
            nodelogger.error('Error in getTeacherTopics');
            next(error);
        }
    },
    getAdminTopicsEdit:async(req,res,next)=>//Dohvati mu ime topica retke i stupce + niz svih pitanja za svako polje u matrici
    {
        try {
            nodelogger.info("parametar: "+req.params.topic_id);
            try {
                var topic_info=await Topic_instance.getTopicInfo(req.params.topic_id);
            } catch (error) {
                nodelogger.error('Error in fetching topic info froma database');
                throw(error);
            }
            nodelogger.info('Topic info succesfuly fetched from database');
            var response={//formatirat za client stranu
                topic_name:topic_info.name,
                rows:topic_info.rows_D,
                columns:topic_info.column_numbers,
                topic_description:topic_info.description
            };
            try {
               var questions=await Question_instance.getQuestionsForAllA0D(req.params.topic_id,response.rows,response.columns);
            } catch (error) {
                nodelogger.error('Error in fetching questions arrays');
                throw(error);
            }
            nodelogger.info('Question arrays succesfuly fetched from dataabase');
            response.fields=questions;
            res.json(response);
        } catch (error) {
            nodelogger.error('Error in  getAdminTopicsEdit');
            next(error);
        }
    },
    associated: async (req,res,next)=>
    {
        try {
            nodelogger.info("parametar: "+req.params.topic_id);
            try {
                var associated=await Topic_instance.associatedTopics(req.params.subject_id,req.params.topic_id);
            } catch (error) {
                nodelogger.error('Error in fetching asscoaited topics from database');
                throw(error);
            }
            let response={};
            response.Associated=associated;
            res.json(response);
        } catch (error) {
            nodelogger.error('Error in getting associated topics-associated');
            next(error);
        }
    },
    deleteTopic:async (req,res,next)=>
    {
        try {
            await Topic_instance.deleteTopicFromEverywhere(req.params.topic_id);
            nodelogger.info('Topic succesfuly deleted from database');
            res.sendStatus(200);
        } catch (error) {
            nodelogger.error('Error in deleteTopic');
            next(error);
        }
    },
    getSubject_Courses:async (req,res,next)=>
    {
        try {
            try {
                var subject_course= await Topic_instance.getSubject_CoursePairs();
            } catch (error) {
                nodelogger.error('Error in fetching subject course pairs from databaase');
                throw(error);
            }
            res.json(subject_course);
        } catch (error) {
            nodelogger.error('Error in  getSubject_Courses');
            next(error);
        }
    },
    getSubject_Courses_Teacher:async(req,res,next)=>
    {
        try {
            var subject_course=await Topic_instance.getSubject_CoursePairsForTeacher(req.session.user);
            res.json(subject_course);
        } catch (error) {
            nodelogger.error('Error in getSubject_Courses_Teacher');
            next(error);
        }
    },
    getAssociatedFromSubject:async (req,res,next)=>
    {
        try {
            var associated=await Topic_instance.getAllTopicsFromSubject(req.params.subject_id);
            res.json(associated);
        } catch (error) {
            nodelogger.error('Error in getAssociatedFromSubject');
            next(error);
        }
    },
    addTopics: async (req,res,next)=>
    {
        try {
            try {
                var added_topic_id=await Topic_instance.addTopic(req.body);
            } catch (error) {
                nodelogger.info('Error in adding topic to database');
                throw(error);
            }
            var response={};
            response.topic_id=added_topic_id;
            res.json(response);
        } catch (error) {
            nodelogger.error('Error in addTopics');
            next(error);
        }
    },
    topicInfo:async (req,res,next)=>
    {
        try {
            let response=await Topic_instance.getTopicSubjectAndCourse(req.params.topic_id);//vrati predmet i kurs kojem pripada topic
            response.associated_topics=await Topic_instance.associatedTopics(response.subject_id,req.params.topic_id);//vrati povezane topice i kojin kursevi oni pripadaju unutar tog predmeta
            response.asessments_array=await Topic_instance.getOnlyAsesmentsForTopic(req.params.topic_id);
            nodelogger.info(JSON.stringify(response));
            res.json(response);
        } catch (error) {
            nodelogger.error('Error in topicInfo');
            next(error);
        }
    },
    updateTopic: async (req,res,next)=>
    {
        try {
            await Topic_instance.updateTopic(req.body);
            res.sendStatus(204);
        } catch (error) {
            nodelogger.error('Error in updateTopic');
            next(error);
        }
    }
}