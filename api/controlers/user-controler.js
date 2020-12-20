const {User_instance}=require('../../services');
const {nodelogger}=require('../../loaders/logger');
module.exports={
    insertUser:async (req,res,next)=>
    {
        try {
            await User_instance.addUser(req.body);//posalji parametre iz req bodya
            res.sendStatus(200);
        } catch (error) {
            nodelogger.error('Error in inserUser');
            next(error);
        }
    }
}