const { nodelogger } = require('../../loaders/logger');
const {Login_instanca}=require('../../services');
const config=require('../../config');
module.exports={
    authenticate_student:(req,res,next)=>{
        if(!req.session.user)//nije ulogiran
        {
            nodelogger.info(JSON.stringify(req.session)+req.session.user+req.session.user_type);
            nodelogger.info('nema sessiona');
            res.sendStatus(401);//nije autoriziran-> klijent ga preusmjerava na login
        }
        else //provjeri jeli student
        {
            if(req.session.user_type!=parseInt(config.roles.student,10))
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
            if(req.session.user_type!=parseInt(config.roles.admin,10))
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
            if(req.session.user_type!=parseInt(config.roles.teacher,10))
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
            if(req.session.user_type!=parseInt(config.roles.teacher,10)&&req.session.user_type!=parseInt(config.roles.admin,10))
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
            if(req.session.user_type!=parseInt(config.roles.teacher,10)&&req.session.user_type!=parseInt(config.roles.student,10))
            {
                res.sendStatus(404);
            }else next();   //pozovi sljedeci middleware za taj request za tu rutu
        }
    },
    authenticate_student_or_teacher_or_admin:(req,res,next)=>
    {
        if(!req.session.user)//ako postoji sesija onda ona ima jednu od 3 vrijednosti->BITNO SAMO DA IMA SESSION COOKIE DA NIJE NEKO BEZ COOKIEJA ZA RUTE KOJIMA DOPUSTAMO SVIM ROLAMA(npr za dohvat rezultata kad provjerava na server strai koja je rola )
        {
            res.sendStatus(401);//NEAUTORIZIRAN
        }
        else next();//MOZE IC DALJE-> admin,teacher ili user JE ,jedno od toga
    },
    session:(req,res,next)=>
    {
        if(!req.session.user)//NEMA COOKIEJA
        {
            res.status(401).json({role: null });//SVE ISTO KO GORE SAMO VRATIMO ROLE=null uz status 401
        }
        else next();//NASTAVI DALJE I VRATI MU ROLU + STATUS 200
    }
}