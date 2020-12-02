const {Login_instance, Session_instance}=require('../../services');//object destrucuturing(jer require vrati objekt) + automatski trazi index.js file u service folderu
const {nodelogger}=require('../../loaders/logger');//-> cacheano je
module.exports={
    logiraj:async (req,res)=>{
        const {username,password}=req.body;//object destrucutiring,uz preptostavku da saljemo JSON body pa ne parsiramo
        try {
            const user=await Login_instance.getUser(username);
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
                nodelogger.info("Logging succesful tu smoo");
                //res.redirect('/admin');
                }
                else if(user.user_type==process.env.TEACHER)//ucitelj
                {
                nodelogger.info("Logging succesful");
                res.redirect('/teacher');
                }
                else {//student
                nodelogger.info("Logging succesful");
                res.redirect('/student');
                }

             } else if(!user) {
                nodelogger.error('Login failed');
               return res.status(401).send('Authnetication failed. Username not found. Check your username');
            }
            else {
                nodelogger.error('Login failed');
                return res.status(401).send('Authnetication failed. Incorrect pasword. Check your password');
            }
        } catch (err) {
            nodelogger.error(err);
           return res.status(400).send('error in login controler ');
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
    logout: async(req,res)=>{
        try {
            req.session.destroy();//tribalo bi izbrisat sesiju iz memory storea
        } catch (error) {
            nodelogger.info('Error in session deleting');
        }
    }
    
}