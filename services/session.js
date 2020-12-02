module.exports= class Session{
    constructor(session_model,logger)
    {
        this.Session=session_model;
        this.Logger=logger;
    }
    async createSession(users_id)
    {
        try {
           await this.Session.create({
                timestamp_LOGIN: new Date(),
                timestamp_LOGOUT:new Date(),
                user_id:users_id
            })
        } catch (error) {
           this.Logger(error);
        }
    }
}