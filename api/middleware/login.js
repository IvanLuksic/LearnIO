const { nodelogger } = require('../../loaders/logger');
const {Login_instanca}=require('../../services');
module.exports={
    authenticate_login: (req,res,next)=>{//provjeri samo jeli logiran-> sljedeci midleware ce ga presumjerit na odredenu rutu koja treba
        if(!req.session.user)
        {
            res.sendStatus(401);
        }
        else next();//ulogiran ali ne znamo s kojom ulogom
    },
    authenticate_student:(req,res,next)=>{
        if(!req.session.user)//nije ulogiran
        {
            res.sendStatus(401);//nije autoriziran-> klijent ga preusmjerava na login
        }
        else //provjeri jeli student
        {
            if(req.session.user_type!=parseInt(process.env.STUDENT,10))
            {
                res.sendStatus(404);//IZVAN NJEGOVIH PRAVA
            }else next();   //pozovi sljedeci middleware za taj request za tu rutu-> ULOGIRAN JE KAO STUDENT I IMA PRAVA
        }
    },
    authenticate_admin:(req,res,next)=>{
        if(!req.session.user)//nije ulogiran
        {
            res.sendStatus(401);
        }
        else //provjeri jeli admin
        {
            if(req.session.user_type!=parseInt(process.env.ADMIN,10))
            {
                res.sendStatus(404);
            }
            else next();   //pozovi sljedeci middleware za taj request za tu rutu
        }
    },
    authenticate_teacher:(req,res,next)=>{
        if(!req.session.user)//nije ulogiran
        {
            res.sendStatus(401);
        }
        else //provjeri jeli teacher
        {
            if(req.session.user_type!=parseInt(process.env.TEACHER,10))
            {
                res.sendStatus(404);
            }else next();   //pozovi sljedeci middleware za taj request za tu rutu
        }
    },
    authenticate_admin_or_teacher:(req,res,next)=>
    {
        if(!req.session.user)//nije ulogiran
        {
            res.sendStatus(401);
        }
        else //provjeri jeli teacher ili admin
        {
            if(req.session.user_type!=parseInt(process.env.TEACHER,10)&&req.session.user_type!=parseInt(process.env.ADMIN,10))
            {
                res.sendStatus(404);
            }else next();   //pozovi sljedeci middleware za taj request za tu rutu
        }
    },
    authenticate_student_or_teacher:(req,res,next)=>
    {
        if(!req.session.user)//nije ulogiran
        {
            res.sendStatus(401);
        }
        else //provjeri jeli teacher ili admin
        {
            if(req.session.user_type!=parseInt(process.env.TEACHER,10)&&req.session.user_type!=parseInt(process.env.STUDENT,10))
            {
                res.sendStatus(404);
            }else next();   //pozovi sljedeci middleware za taj request za tu rutu
        }
    }
}