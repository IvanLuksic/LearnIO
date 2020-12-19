const {Class_instance}=require('../../services');
const {nodelogger}=require('../../loaders/logger');
module.exports={
    getClassesForStudent:async (req,res,next)=>
    {
        try {
            let classes=await Class_instance.getAllClassForStudent(req.session.user);//u sessionu je spremljen id studenta
            res.json(classes);
        } catch (error) {
            nodelogger.error('Error in fetching classes for student');
            next(error);
        }
    },
    getClassesForTeacher:async (req,res,next)=>
    {
        try {
            let classes=await Class_instance.getAllClassForTeacher(req.session.user);//u sessionu je spremljen id studenta
            res.json(classes);
        } catch (error) {
            nodelogger.error('Error in fetching classes for teacher');
            next(error);
        }
    }
}