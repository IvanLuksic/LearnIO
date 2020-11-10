module.exports= class LoginService{//exportanje klasa na ovaj način-> module.exports nije vise objekt nego klasa
    constructor(Korisnik_model,logger)
    {
        this.Korisnik=Korisnik_model;
    }
    async dohvatiKorisnika(usersname)
    {
        try {
            const user=await this.Korisnik.findOne({
                attributes:['username','password','user_type'],
                where:{
                    username: usersname
                }
             } )
             return user;
        } catch (error) {
            logger.error("Error in fetching user from database. "+error);
        }
    }
}