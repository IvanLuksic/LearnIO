const {Topic_instance}=require('../../services');
const {nodelogger}=require('../../loaders/logger');
module.exports={
    getTopics:async (req,res,next)=>{//da bi dosaoo do ovde morao je proci autentikaciju-> ne treba se brinuti o tome ovde
        nodelogger.info(JSON.stringify(req.body));
        const {course_id=1,subject_id=1}=req.body;//stavi default 1 zasad ako oni ne budu mogli poslat s forntenda
        const student_id= req.session.user;//u cookie se nalazi user id
        nodelogger.info('Parametri: '+course_id+' '+subject_id+' '+student_id);
        try {
            var topics=await Topic_instance.GetTopicsForUserAndCourse(student_id,course_id,subject_id);
        } catch (error) {
            nodelogger.error('Error in fetching topics frrom database '+error);
            next(error);//idi na error midleware hadler-> on ce vratiti resposne i koja je greska
        }
        nodelogger.info('Fetched succesfuly from database');
        res.json(topics);//dodaj u resposne objekt-> RESPOSNE NEMA BODY OBJEKT-> OVAKO ŠALJEMO JSON OBJEKT U RESPOSNE BODYU
    }
}