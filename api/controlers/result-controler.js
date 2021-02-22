const {Result_instance}=require('../../services');
const {nodelogger}=require('../../loaders/logger');
const config=require('../../config');
module.exports={
    getResults: async(req,res,next)=>//ako je došao do ovde onda je prijavljen kao ADMIN-> IMA PRAVA PREGLEDA REZULTATA
    {
        let results;
        try {
            if(req.session.user_type==config.roles.admin)
            try {
                 results=await Result_instance.getAllAdminResults();
            } catch (error) {
                nodelogger.error('Error in fetching results from database');
                throw(error);
            }
            else if(req.session.user_type==config.roles.teacher)
            {
                try {
                    results=await Result_instance.getAllTeacherResults(req.session.user);
                } catch (error) {
                    nodelogger.error('Error in fetching results from database');
                    throw(error);
                }
            }
            else {
                try {
                    results=await Result_instance.getAllStudentResults(req.session.user);//poslat user_id
                } catch (error) {
                    nodelogger.error('Error in fetching results from database');
                    throw(error);
                }
            }
            res.json(results);
        } catch (error) {
            nodelogger.error('Error in getAdminResults');
            next(error);//idii na error middleware handler
        }
    }
}