const {Login_instanca}=require('../../services');//object destrucuturing(jer require vrati objekt) + automatski trazi index.js file u service folderu
const {nodelogger}=require('../../loaders/logger');//-> cacheano je
module.exports={
    logiraj:async (req,res)=>{//arrow funckije imaju lexical scope koji sto znaci da imaju pristup varijablama koje se nalaze u scopeu s mjesta koje ih je pozvalo-> ovdje su pozvane iz middleware funkcije unutar validatora koja ima pristup req,res objektima pa stoga ima i ona
        const {username,password}=req.body;//object destrucutiring,uz preptostavku da saljemo JSON body pa ne parsiramo
        try {
            const user=await Login_instanca.dohvatiKorisnika(username);
            if(user && user.password===password)//ako je user =NULL -> vratit ce NULL i nece uci u if
            {
                //res.status(200).send('Correct crednetials. Login succesful');
                if(user.user_type===1)//admin
                {
                //redirect na admin stranicu->res.redirect('/admin)
                nodelogger.info("Logging succesful");
               return  res.status(200).send('Hello admin.Correct crednetials. Login succesful');
                }
                else if(user.user_type===2)//ucitelj
                {
                      //redirect na učitelj stranicu->res.redirect('/teacher)
                nodelogger.info("Logging succesful");
               return res.status(200).send('Hello teacher.Correct crednetials. Login succesful');
                }
                else {
                      //redirect na ucenik stranicu->res.redirect('/student)
                nodelogger.info("Logging succesful");
                return res.status(200).send('Hello student.Correct crednetials. Login succesful');
                }

            }
            else if(!user) {
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
    }
    
}