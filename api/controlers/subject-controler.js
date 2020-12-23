const {Subject_instance}=require('../../services');
const {nodelogger}=require('../../loaders/logger');
module.exports={
    getAllSubjects:async (req,res,next)=>//za odredeni razred
    {
        try {
            let subjects=await Subject_instance.getAllSubjectsForClass(req.params.class_ID);
            res.json(subjects);
        } catch (error) {
            nodelogger.error('Error in getAllSubjects');
            next(error);
        }
    },
    insertSubject:async (req,res,next)=>
    {
        try {
            await Subject_instance.addSubject(req.body);
            res.sendStatus(200);
        } catch (error) {
            nodelogger.error('Error in insertSubject');
            next(error);
        }
    }
}