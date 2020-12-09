const {Result_instance}=require('../../services');
const {nodelogger}=require('../../loaders/logger');
module.exports={
    getResults: async(req,res,next)=>//ako je došao do ovde onda je prijavljen kao ADMIN-> IMA PRAVA PREGLEDA REZULTATA
    {
        try {
            try {
                var results=await Result_instance.getAllResults();
            } catch (error) {
                nodelogger.error('Error in fetching results from database');
                throw(error);
            }
            res.json(results);
        } catch (error) {
            nodelogger.error(error);
            next(error);//idii na error middleware handler
        }
    }
}