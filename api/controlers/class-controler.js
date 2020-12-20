const {Class_instance}=require('../../services');
const {nodelogger}=require('../../loaders/logger');
module.exports={
    getClassesForStudent:async (req,res,next)=>
    {
        try {
            let classes=await Class_instance.getAllClassForStudent(req.session.user);//u sessionu je spremljen id studenta
            res.json(classes);
        } catch (error) {
            nodelogger.error('Error in  getClassesForStudent');
            next(error);
        }
    },
    getClassesForTeacher:async (req,res,next)=>
    {
        try {
            let classes=await Class_instance.getAllClassForTeacher(req.session.user);//u sessionu je spremljen id studenta
            res.json(classes);
        } catch (error) {
            nodelogger.error('Error in  getClassesForTeacher');
            next(error);
        }
    },
    /*insertClass:async(req,res,next)=>
    {
        try {
            await Class_instance.insertClasses(req.body);
            res.sendStatus(200);
        } catch (error) {
            nodelogger.error('Error in inserting class');
            next(error);
        }
    }*/
}