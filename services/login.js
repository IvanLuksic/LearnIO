const OTP=require('otp-generator');
const config=require('../config');
const nodemailer = require('nodemailer');
let hash=require('./crypto.js');
const { bcrypt } = require('../config');
module.exports= class LoginService{//exportanje klasa na ovaj način-> module.exports nije vise objekt nego klasa
    constructor(user_model,one_time_password,logger)
    {
        this.User=user_model;
        this.One_time_password=one_time_password;
        this.Logger=logger;
    }
    async getUser(usersname)
    {
        try {
            const user=await this.User.findOne({
                attributes:['id','name','surname','username','password','user_type'],
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
    async createOTPFromUser(username)
    {
        try {
            //nadi usera
            const user=await this.User.findOne({
                where:{
                    username:username//jedinstven
                }
            });
            if(!user)
            {
                this.Logger.error('User doesnt exis');
                throw(new Error('No user with that username'));
            }else {
                  //Provjeri prvo ima li već prisutan OTP za tog usera->
            const does_already_exist=await this.One_time_password.findOne({// treba vratit null,inače throwamo error
                where:{
                    user_id:user.id
                }
            });
            if(does_already_exist)//već postoji,throw error
            {
                this.Logger.error('User already has OTP');
                throw(new Error('You have already generated one time password(OTP). Check your e-mail'));
            }
            else {
                let one_time_password=await OTP.generate(config.otp_length);
                this.Logger.info('OTP generated: '+one_time_password);
                await this.One_time_password.create({
                    otp:hash(one_time_password),
                    created_at:Date.now(),
                    user_id:user.id
                });
                this.Logger.info('OTP created');
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'mislavivanda454@gmail.com',
                      pass: 'xxxxxxxxx'
                    }
                  });
                  
                  let mailOptions = {
                    from: 'mislavivanda454@gmail.com',
                    to: `${user.mail}`,
                    subject: 'LearnIO OTP',
                    text: `Hi there! Seems like you forgot your password. Use this OTP for single login and then change your password when logged in. If you did not requested this OTP please ignore it and contact your LearnIO adminstrator
                    OTP: ${one_time_password}`
                  };
                  
                  await transporter.sendMail(mailOptions);
                  this.Logger.info('OTP sent to mail');
                }
            }
          
        } catch (error) {
            this.Logger.error('Error in function createOTP'+error);
            throw(error);
        }
    }
    async checkForOTP(user_id,password)//ovaj password je zapravo OTP koji je usder uzeo
    {
        try {
            const user_otp=await this.One_time_password.findOne({
                where:{
                    user_id:user_id
                }
            });//ako postoji user i ako se dosad nije logirao s tim OTP
            if((user_otp && !user_otp.used) && bcrypt.compare(password,user_otp.otp))
            {
                //tocan je uneseni OTP-> propusti ga i oznaci used na true
                await this.One_time_password.update({used:true},{
                    where:{
                        user_id:user_id
                    }
                })
                return true;
            }
            else if(user_otp&&user_otp.used)//već prethodno iskorstio taj OTP-> javljaj mu error
            {
                throw(new Error('You have already used your OTP'));
            }
            else return false;
        } catch (error) {
            this.Logger.error('Error in function checkForOTP '+error);
            throw(error);
        }
    }
    async checkPasswordOrOTP(user_id,pass_or_OTP,new_password)
    {
        try {
            let user=await this.User.findOne({
                where:{
                    id:user_id
                }
            });
            let is_correct_password;
            if(!user)
            {
                throw(new Error('User doesnt exist'));
            }
            else if((is_correct_password=await bcrypt.compare(pass_or_OTP,user.password)))
            {
                await this.User.update({password:hash(new_password)},{
                    where:{
                        id:user_id
                    }
                });
               //korisnik je upisao točnu staru/trenutnu lozinku-> dopusti mijenjanje
            }
            else{
                let OTP=await this.One_time_password.findOne({
                    where:{
                        user_id:user_id
                    }
                });
                //mora biti iskorišten otp za login prethodno-> dodatni osigurač-> used=true
                if((OTP && OTP.used) && (is_correct_password=await bcrypt.compare(pass_or_OTP,OTP.otp)))
                {
                    await this.User.update({password:hash(new_password)},{
                        where:{
                            id:user_id
                        }
                    });
                    await this.One_time_password.destroy({
                        where:{
                            id:OTP.id
                        }
                    });
                  //korisnik je upisao točan OTP-> dopusti mu mijenjanje passworda + izbrisi OTP da se ne moze više koristit
                }
                else throw(new Error('Incorrect previous password or OTP'));
            }
        } catch (error) {
            this.Logger.error('Error in function checkPasswordOrOTP'+error);
            throw(error);
        }
    }
}