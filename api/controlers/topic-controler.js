const {Topic_instance,Question_instance}=require('../../services');
const {nodelogger}=require('../../loaders/logger');
module.exports={
    getTopics:async (req,res,next)=>{//da bi dosaoo do ovde morao je proci autentikaciju-> ne treba se brinuti o tome ovde
        try {
        const student_id= req.session.user;//u cookie se nalazi user id
        nodelogger.info('Parametri: '+req.params.course_id+' '+req.params.subject_id+' '+student_id+' '+req.params.class_id);
        try {
            var topics=await Topic_instance.getTopicsForUserAndCourse(student_id,req.params.course_id,req.params.subject_id,req.params.class_id);
        } catch (error) {
            nodelogger.error('Error in fetching topics frrom database '+error);
            throw(error);
        }
        nodelogger.info('Fetched succesfuly from database');
        res.json(topics);//dodaj u resposne objekt-> RESPOSNE NEMA BODY OBJEKT-> OVAKO ŠALJEMO JSON OBJEKT U RESPOSNE BODYU
    } catch (error) {
            nodelogger.error('Error in geting topics '+error);
            next(error);//idi na error midleware hadler-> on ce vratiti resposne i koja je greska
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
            nodelogger.error('Error in fetching admin topics from database');
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
                name:topic_info.name,
                rows:topic_info.rows_D,
                columns:topic_info.column_numbers
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
            nodelogger.error('Error in fetching topic info for admin');
            next(error);
        }
    },
    associated: async (req,res,next)=>
    {
        try {
            nodelogger.info("parametar: "+req.params.topic_id);
            try {
                var associated=await Topic_instance.associatedTopics(req.params.topic_id);
            } catch (error) {
                nodelogger.error('Error in fetching asscoaited topics from database');
                throw(error);
            }
            let response={};
            response.Associated=associated;
            res.json(response);
        } catch (error) {
            nodelogger.error('Error in getting associated topics');
            next(error);
        }
    },
    deleteTopic:async (req,res,next)=>
    {
        try {
            await Topic_instance.deleteTopicFromEverywhere(req.params.topicID);
            nodelogger.info('Topic succesfuly deleted from database');
            res.sendStatus(200);
        } catch (error) {
            nodelogger.error('Error in deleting topic form databaase'+error);
            next(error);
        }
    }
}