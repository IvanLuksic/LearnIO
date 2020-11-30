const { nodelogger } = require('../../loaders/logger');
const {Login_instanca}=require('../../services');
module.exports={
    authenticate_login: (req,res,next)=>{//provjeri samo jeli logiran-> sljedeci midleware ce ga presumjerit na odredenu rutu koja treba
        if(!req.session.user)
        {
           res.send('Dobrodolsi ulogirajte se');
        }
        else next();//ulogiran ali ne znamo s kojom ulogom
    },
    authenticate_student:(req,res,next)=>{
        if(!req.session.user)//nije ulogiran
        {
            res.status(301).redirect('/login')
        }
        else //provjeri jeli student
        {
            if(req.session.user_type!=parseInt(process.env.STUDENT,10))
            {
                res.status(404).send('Not found. Out of your authority');
            }else next();   //pozovi sljedeci middleware za taj request za tu rutu-> ULOGIRAN JE KAO STUDENT I IMA PRAVA
        }
    },
    authenticate_admin:(req,res,next)=>{
        if(!req.session.user)//nije ulogiran
        {
            res.status(301).redirect('/login')
        }
        else //provjeri jeli admin
        {
            if(req.session.user_type!=parseInt(process.env.ADMIN,10))
            {
                res.status(404).send('Not found. Out of your authority');
            }
            else next();   //pozovi sljedeci middleware za taj request za tu rutu
        }
    },
    authenticate_teacher:(req,res,next)=>{
        if(!req.session.user)//nije ulogiran
        {
            res.status(301).redirect('/login');
        }
        else //provjeri jeli teacher
        {
            if(req.session.user_type!=parseInt(process.env.TEACHER,10))
            {
                res.status(404).send('Not found. Out of your authority');
            }else next();   //pozovi sljedeci middleware za taj request za tu rutu
        }
    }
}