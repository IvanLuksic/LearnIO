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
                timestamp_LOGOUT:new Date(),
                user_id:users_id
            })
        } catch (error) {
           this.Logger(error);
        }
    }
}