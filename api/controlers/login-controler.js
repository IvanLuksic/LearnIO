const {Login_instance, Session_instance}=require('../../services');//object destrucuturing(jer require vrati objekt) + automatski trazi index.js file u service folderu
const {nodelogger}=require('../../loaders/logger');//-> cacheano je
module.exports={
    login:async (req,res,next)=>{
        try {
            nodelogger.info(req.body);
            const {username,password}=req.body;//object destrucutiring,uz preptostavku da saljemo JSON body pa ne parsiramo
            try {
                var user=await Login_instance.getUser(username);
            } catch (error) {
                nodelogger.error('Error in fetching user from database');
                throw(error);
            }
            if(user && user.password===password)//ako je user =NULL -> vratit ce NULL i nece uci u if
            {   
               
                req.session.user=user.id;//ako je loadan napravimo mu session id
                req.session.user_type=user.user_type;
                try {
                    await Session_instance.createSession(user.id);//pohrani ga u sesiju za pracenje aktivnosti
                } catch (error) {
                    throw(error);//idi na iduci catch handler-> ovi skroz doli
                }
                if(user.user_type == process.env.ADMIN)//admin->STAVI == JER JE ADMIN env varijabla string
                {
               res.json({role: process.env.ADMIN });
                }
                else if(user.user_type==process.env.TEACHER)//ucitelj
                {
                nodelogger.info("Logging succesful");
                res.json({role: process.env.TEACHER });
                }
                else {//student
                nodelogger.info("Logging succesful");
                res.json({role: process.env.STUDENT });
                }

             } else if(!user) {
                nodelogger.error('Login failed');
                res.status(401).json({role: null });
            }
            else {
                nodelogger.error('Login failed');
                res.status(401).json({role: null });
            }
        } catch (err) {
            nodelogger.error('Error in login controler'+err);
            next(err);//idii na error middleware handler
        }
    },
    restoresesion:async(req,res)=>{//ovdje dode kada login pozove next()-> ako je tu dosao onda je vec logiran unutra pa ga trebamo samo preusmjerit na zadanu rutu
            if(req.session.user_type===1)//admin
                {
                nodelogger.info("Logging succesful");
                res.redirect('/admin');
                }
                else if(req.session.user_type===2)//ucitelj
                {
                nodelogger.info("Logging succesful");
                res.redirect('/teacher');
                }
                else {
                nodelogger.info("Logging succesful");
                res.redirect('/student');
                }

    },
    logout: async(req,res,next)=>{
        try {
            req.session.destroy();//tribalo bi izbrisat sesiju iz memory storea
        } catch (error) {
            nodelogger.info('Error in session deleting');
            next(error);
        }
    }
    
}