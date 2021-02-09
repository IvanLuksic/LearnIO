module.exports= class LoginService{//exportanje klasa na ovaj način-> module.exports nije vise objekt nego klasa
    constructor(user_model,logger)
    {
        this.User=user_model;
        this.Logger=logger;
    }
    async getUser(usersname)
    {
        try {
            const user=await this.User.findOne({
                attributes:['id','username','password','user_type'],
                where:{
                    username: usersname
                }
             });
             return user;
        } catch (error) {
            this.Logger.error("Error in function getUser. "+error);
            throw(error);
        }
    }
    async checkAvailabilityOfUsername(usernames)
    {
        try {
            let temp={};//0->ne postoji,1->postoji netko s tim usernameon
            let username=await this.User.findOne({
                where:{
                    username:usernames
                }
            });
            if(!username)//ako findOne vrati null onda NE POSTOJI NITKO S TIM USERNAME-> NIJE ZAUZETO
            {
                temp={
                    available:true
                };
                return temp;
            }
            else {
                temp={
                    available:false
                };
                return temp;
            }
        } catch (error) {
            this.Logger.error('Error in function checkAvailabilityOfUsername '+error);
            throw(error);
        }
    }
    async getUserByID(user_id)
    {
        try {
            const user=await this.User.findOne({
                attributes:['user_type'],
                where:{
                    id: user_id
                }
             } )
             return user;
        } catch (error) {
            this.Logger.error("Error in function getUserByID. "+error);
            throw(error);
        }
    }
}