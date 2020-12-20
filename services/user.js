module.exports=class user {
    constructor(user,logger)
    {
        this.User=user;
        this.Logger=logger
    }
    async addUser(properties)//ovdje ce doc req.body po unaprojed dogovorenom formatu
    {
        try {
            this.Logger.info(properties.username);
            await this.User.create({
                name:properties.name,
                surname:properties.surname,
                mail:properties.mail,
                date_of_birth:properties.date_of_birth,
                username:properties.username,
                password:properties.password,
                created_at:properties.created_at,
                user_type:properties.user_type,
            });
            this.Logger.info('User added sucessfuly into database');
        } catch (error) {
            this.Logger.error('Error in inserting user to database'+error);
            throw(error);
        }
    }
}