const {Result_instance}=require('../../services');
const {nodelogger}=require('../../loaders/logger');
module.exports={
    getAdminResults: async(req,res,next)=>//ako je došao do ovde onda je prijavljen kao ADMIN-> IMA PRAVA PREGLEDA REZULTATA
    {
        try {
            try {
                var results=await Result_instance.getAllAdminResults();
            } catch (error) {
                nodelogger.error('Error in fetching results from database');
                throw(error);
            }
            res.json(results);
        } catch (error) {
            nodelogger.error('Error in getAdminResults');
            next(error);//idii na error middleware handler
        }
    },
    getTeacherResults:async (req,res,next)=>{
        try {
            try {
                var results=await Result_instance.getAllTeacherResults(req.session.user);
            } catch (error) {
                nodelogger.error('Error in fetching results from database');
                throw(error);
            }
            res.json(results);
        } catch (error) {
            nodelogger.error('Error in getTeacherResults');
            next(error);
        }
    },
    getStudentResults:async (req,res,next)=>{
        try {
            try {
                var results=await Result_instance.getAllStudentResults(req.session.user);//poslat user_id
            } catch (error) {
                nodelogger.error('Error in fetching results from database');
                throw(error);
            }
            res.json(results);
        } catch (error) {
            nodelogger.error('Error in  getStudentResults');
            next(error);
        }
    }
}