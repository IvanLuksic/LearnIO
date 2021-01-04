const { noExtendLeft } = require("sequelize/types/lib/operators");

module.exports= class session{
    constructor(session_model,logger)
    {
        this.session=session_model;
        this.Logger=logger;
    }
    async createSession(users_id)
    {
        try {
           await this.session.create({
                timestamp_LOGIN: new Date(),
                timestamp_LOGOUT:null,//dok se ne odjavi je null
                user_id:users_id
            })
        } catch (error) {
          this.Logger.error('Error in function createSession'+error);
         throw(error);
        }
    }
    async Logout_time(users_id)
    {
        try {
            await this.session.update({timestamp_LOGOUT:new Date()},{
                where:{
                  user_id:users_id,
                  timestamp_LOGOUT:null  
                }
            });
            this.Logger.info('Logout timestamp added succesfuly');
        } catch (error) {
            this.Logger.error('Error in function Logout_time');
            throw(error);
        }
    }
}