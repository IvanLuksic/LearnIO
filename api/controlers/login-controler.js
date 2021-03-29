const {Login_instance, Session_instance}=require('../../services');//object destrucuturing(jer require vrati objekt) + automatski trazi index.js file u service folderu
const {nodelogger}=require('../../loaders/logger');//-> cacheano je
const config=require('../../config');
const { RateLimiterPostgres } = require("rate-limiter-flexible");
const { rateLimiterTooManyRequests}=require('../middleware/rate-limiter-global');//funkcija za handleanje slučajeva kada se prevrši broj mogućih kredita
const bcrypt=require('bcrypt');
const {sequelize}=require('../../models');//instanca baze za povezivanje rate limitera na bazu
//Login rate limiter
let rate_limiter_login_options=config.rateLimiter.loginPath;
rate_limiter_login_options.storeClient=sequelize;//dodajemo klijenta nakon što se povežemo na bazu kako bi se mogli spremat podaci u bazu
// Postavke rate limitera za login
const loginRateLimiter = new RateLimiterPostgres(rate_limiter_login_options);

//Check login rate limiter
let rate_limiter_check_login_options=config.rateLimiter.checkLoginPath;
rate_limiter_check_login_options.storeClient=sequelize;

// Postavke rate limitera za check login
const checkLoginRateLimiter=new RateLimiterPostgres(rate_limiter_check_login_options);
module.exports={
    login:async (req,res,next)=>{
        try {
            const {username,password}=req.body;//object destrucutiring,uz preptostavku da saljemo JSON body pa ne parsiramo
            try {
                var user=await Login_instance.getUser(username);
            } catch (error) {
                nodelogger.error('Error in fetching user from database');
                throw(error);
            }
            //PROVJERIMO RATE LIMIT ZA TOG USERA SA TE IP ADRESE
            try {//1) OVDE ĆE DOĆ SAMO AKO JE PROŠAO GLOBALNI RATE LIMITER
                var login_limiter_response=await loginRateLimiter.get(req.ip);//po ip adresi+ PREFIX KAO KLJUČU
                //AKO ZAPIS NE POSTOJI(ZNAMO DA ĆE POSTOJAT JER ĆE GA UPISAT AKO JE PO PRVI PUT odnosno ako nema zapisa u tablici,NE TREBA NAM SET FUNKCIJA) ILI JE ISTEKAO TAJ KEY-> VRAĆA NULL INAČE VRAĆA RateLimiterRes OBJEKT
                //>= zato što se consuma nakon provjere pa će onda kad bude 5 bit consumano 5 puta pa ako ga propustimo sa > on će ga propustit i doli će javit erro kad ga ide consumat 6. put
               if(login_limiter_response&&login_limiter_response.consumedPoints>=rate_limiter_login_options.points)//AKO JE NULL-> NIJE POSTAVLJEN KEY-> NIJE SE JOŠ CONSUMAO NIKAKO->INAČE SE RESSOLVA SA RateLimiterRes OBJEKTON KOJEN MOŽEMO PRISTUPAT PARAMETRIMA
                {//ako je ispunjen gornji slučaj onda je konzumirano više od dozovljenog-> javi error
                    rateLimiterTooManyRequests(loginRateLimiter,req,res,rate_limiter_login_options.points);//Rate limiter kako bi pozvali consume koji će blokirat tog usera za block duration puta jer se inače blokira duration time umisto block duration,block duration se blokira kad se overconsuma i kad throwa error,express response objekt i dozovoljeni mogući broj pointova odnosno pokusaja
                    return;//kraj nakon što se pozove ova funkcija-> da nebi išli dalje u kodu i naknadno modificirali response što bi javilo error jer response šaljemo samo 1 put
                }
            } catch (error) {
                nodelogger.error('Error in fetching rate limiter options'+error);
                throw(error);
            }
            let is_correct_password;//true ako je isti hash
            //compare funckija od bcrypta sitit od timing napada+ vraća true ili false
            if(user && (is_correct_password=await bcrypt.compare(password,user.password)))//ako je user =NULL -> vratit ce NULL i nece uci u if
            {  //KAD SE POZOVE req.session TADA SESSION MIDDLEWARE RADI COOKIE I SESSION OBJEKT SVE ZA NAS I DODAJE GA U REQUEST TAKO DA MU PRISTUPAMO PREKO req.session kao normalnom objektu kojen možemo i dodavat propertiese
               nodelogger.info('Tu smooo'+user.id+user.user_type);
                req.session.user=user.id;//REQ.SESSION JE COOKIE OBJEKT-> NA OVAJ NAČIN MU DODAJEMO COOKIE PROPERTIESE KOJI SE SPREMAJU NA SERVERSKOJ STRANI(U MEMORY STOREU U BAZI) A SAMO SE COOKIE PROPEERTIESI ŠALJU KLIJENTU
                req.session.user_type=user.user_type;
                nodelogger.info('Postavili smo:'+req.session.user+req.session.user_type);
                nodelogger.info('SessionID:'+req.sessionID);
                //PROŠAO JE LOGIN->RESETIRAMO MU RATE LIMITER-> KRENE IZ POČETKA AKO JE DOSAD IMAO NEUPSJEŠNE POKUŠAJE i ako postoji spremljen-> AKO SE LOGIRAO ODMA TOČNIO-> CONSUMED POINTS SU MU 0 PA NE TREBAMO NIŠTA BRISATI->RESETIRAMO TAKO DA GA IZBRIŠEMO 
                if(login_limiter_response&&login_limiter_response.consumedPoints>0)
                {
                    try {
                        await loginRateLimiter.delete(req.ip);
                        nodelogger.info('izbrisano');
                    } catch (error) {
                        nodelogger.error('Error in deleting field from rate limiter table'+error);
                        throw(error);
                    }
                }
                try {
                    await Session_instance.createSession(user.id);//pohrani ga u sesiju za pracenje aktivnosti
                } catch (error) {
                    throw(error);//idi na iduci catch handler-> ovi skroz doli
                }
                let acronim=new String();//prvo slovo imena i prezimena
                nodelogger.info(user.name);
                acronim=user.name.slice(0,1)+user.surname.slice(0,1);
                if(user.user_type == config.roles.admin)//admin->STAVI == JER JE ADMIN env varijabla string
                {
                    nodelogger.info("Logging succesful");
                res.json({
                   acronim:acronim.toUpperCase(),
                   role: config.roles.admin });
                }
                else if(user.user_type==config.roles.teacher)//ucitelj
                {
                nodelogger.info("Logging succesful");
                res.json({
                    acronim:acronim.toUpperCase(),
                    role: config.roles.teacher });
                }
                else {//student
                nodelogger.info("Logging succesful");
                res.json({
                    acronim:acronim.toUpperCase(),
                    role: config.roles.student });
                }
            }
            else {//!!!!!OVDE MU BROJIMO SLUČAJEVE I KAD FALIOJE USERNAME ILI PASSWORD
                //PROVJERI IMA LI MOŽDA OTP JER JE ZABORAVIO LOZINKU
                if(user&&(is_correct_password=await Login_instance.checkForOTP(user.id,password)))//ako vrati true onda ima validan OTP-> napravi mu sesiju
                {
                    req.session.user=user.id;//REQ.SESSION JE COOKIE OBJEKT-> NA OVAJ NAČIN MU DODAJEMO COOKIE PROPERTIESE KOJI SE SPREMAJU NA SERVERSKOJ STRANI(U MEMORY STOREU U BAZI) A SAMO SE COOKIE PROPEERTIESI ŠALJU KLIJENTU
                    req.session.user_type=user.user_type;
                    nodelogger.info('Postavili smo:'+req.session.user+req.session.user_type);
                    nodelogger.info('SessionID:'+req.sessionID);
                    if(login_limiter_response&&login_limiter_response.consumedPoints>0)
                    {
                        try {
                            await loginRateLimiter.delete(req.ip);
                            nodelogger.info('izbrisano');
                        } catch (error) {
                            nodelogger.error('Error in deleting field from rate limiter table'+error);
                            throw(error);
                        }
                    }
                    try {
                        await Session_instance.createSession(user.id);//pohrani ga u sesiju za pracenje aktivnosti
                    } catch (error) {
                        throw(error);//idi na iduci catch handler-> ovi skroz doli
                    }
                    let acronim=new String();//prvo slovo imena i prezimena
                    acronim=user.name.slice(0,1)+user.surname.slice(0,1);
                    if(user.user_type == config.roles.admin)//admin->STAVI == JER JE ADMIN env varijabla string
                    {
                        nodelogger.info("Logging succesful");
                    res.json({
                        acronim:acronim.toUpperCase(),
                       role: config.roles.admin });
                    }
                    else if(user.user_type==config.roles.teacher)//ucitelj
                    {
                    nodelogger.info("Logging succesful");
                    res.json({
                        acronim:acronim.toUpperCase(),
                        role: config.roles.teacher });
                    }
                    else {//student
                    nodelogger.info("Logging succesful");
                    res.json({
                        acronim:acronim.toUpperCase(),
                        role: config.roles.student });
                    }
                }
                else {
                    nodelogger.error('Login failed');
                    //POTROŠI MU KREDIT ZA RATE LIMIT
                        try {
    //!!!!!!!!VAŽNOOOOO-> ZAPIS U TABLICI SE KONSTRUIRA TEK NAKON ŠTO SE POZOVE consume FUNKCIJA prije toga će get vraćat null ILI AKO TO OĆEMO NAPRAVIT PRIJE TO RADIMO SA SET FUNKCIJOM
                            await loginRateLimiter.consume(req.ip,points = 1);
                        } catch (error) {
                            nodelogger.error('Errro in consuming rate limiter credit'+error);
                            throw(error);
                        }
                    res.status(401).json({role: null });
                }
            }
        } catch (err) {
            nodelogger.error('Error in login controler function login');
            next(err);//idii na error middleware handler
        }
    },
    restoreSession:async(req,res,next)=>{//ovdje dode kada login pozove next()-> ako je tu dosao onda POSTOJI SESSION COOKIE KOJI JOŠ VRIJEDI-> KORISNIK PRIPADA NEKOJ OD 3 ROLE unutra pa ga trebamo samo preusmjerit na zadanu rutu
    try {//SAMO MU VRATIMO ROLU,AKO NIJE ULOGIRAN ONDA MU JE VEĆ VRAĆENA role=null u prethodnoj middleware funkciji
            
        try {
            let check_login_rate_limiter_response=await checkLoginRateLimiter.get(req.ip);
                  //AKO ZAPIS NE POSTOJI(ZNAMO DA ĆE POSTOJAT JER ĆE GA UPISAT AKO JE PO PRVI PUT odnosno ako nema zapisa u tablici,NE TREBA NAM SET FUNKCIJA) ILI JE ISTEKAO TAJ KEY-> VRAĆA NULL INAČE VRAĆA RateLimiterRes OBJEKT
            //>= zato što se consuma nakon provjere pa će onda kad bude 5 bit consumano 5 puta pa ako ga propustimo sa > on će ga propustit i doli će javit erro kad ga ide consumat 6. put
           if(check_login_rate_limiter_response && check_login_rate_limiter_response.consumedPoints>= rate_limiter_check_login_options.points)//AKO JE NULL-> NIJE POSTAVLJEN KEY-> TO NAM SE NEČE DOGODIT JER ĆE SE POSTAVIT,INAČE SE RESSOLVA SA RateLimiterRes OBJEKTON KOJEN MOŽEMO PRISTUPAT PARAMETRIMA
           {//ako je ispunjen gornji slučaj onda je konzumirano više od dozovljenog-> javi error
               //PROBLEM-> AKO GA NE BLOKIRAMO NA NAČIN DA OVERCONSUMAMO ZA 1 DODATNI POINT ŠTO ĆE THROWAT ERROR ONDA ĆE GA RATE LIMITER BLOKIRAT duration time ODNOSNO ZA PREOSTALO VRIJEME OD TOG INTERVALA I NJEGOVOG POČETKA-> MANJE OD SAMOG duration TIMEA-> A NE blockDuration TIME PA GA ZATO NAMJERNO OVERCONSUMAMO 1 DODATNI PUT KAKO BI TO REALIZIRALI ŠTO RADIMO U DONJE POZVANIOJ FUNKCIJI
               rateLimiterTooManyRequests(checkLoginRateLimiter,req,res,rate_limiter_check_login_options.points);//rate limiter response objekt,express response objekt i dozovoljeni mogući broj pointova odnosno pokusaja
               return;
           }
           else await checkLoginRateLimiter.consume(req.ip,points = 1);//ako ima još pointova onda ih konzumiraj
            } catch (error) {
                nodelogger.error('Error in rate limiter'+error);
                throw(error);
            }
            let format={};
            format.role=req.session.user_type;
            format.acronim=await Login_instance.getUserAcronim(req.session.user);
            res.json(format);
    } catch (error) {
        nodelogger.error('Error in restoreSession');
        next(error);
    }
    },
    logout: async(req,res,next)=>{
        try {
            nodelogger.info('User id:'+req.session.user);
            //STAVITI TRENUTAK LOGOUTA U SESSION TABLICI-> pronaći redak di je user_id iz sessiona i di je timestamp_LOGOUT =null jer može bit više zapisa prethodnih za tog usera ali u njima je vec prethodno postavljen LOGOUT na neko vrijeme
            Session_instance.Logout_time(req.session.user);//poslat user_id
            res.clearCookie('user_sid',{//BRISANJE COOKIEJA NAKON LOGOUT-> NAVEST IME COOKIEA I SVE OPCIJE
                path: '/',   
                sameSite:'lax',
                secure:true
            });
            req.session.destroy();//IZBRISE SESIJU IZ MEMORY STOREA
            res.sendStatus(204);//STATUS 204 No Content ako je sve dobro proslo
        } catch (error) {
            nodelogger.error('Error in session deleting-logout');
            next(error);
        }
    },
    checkUsername: async (req,res,next)=>
    {
        try {
            let available=await Login_instance.checkAvailabilityOfUsername(req.body.username);//vrati objekt
            res.json(available);
        } catch (error) {
            nodelogger.error('Error in checkUsername');
            next(error);
        }
    },
    generateOTP:async (req,res,next)=>//generiranje OTP ako je zaboravio lozinku
    {
        try {
            await Login_instance.createOTPForUser(req.params.username);
            res.sendStatus(201);
        } catch (error) {
            nodelogger.error('Error in generateOTP');
            next(error);
        }
    },
    changePassword:async (req,res,next)=>
    {
        try {
            await Login_instance.changePassword(req.body.user_id,req.body.previous,req.body.new);
            res.status(204);
        } catch (error) {
            nodelogger.error('Error in changePassword');
            next(error);
        }
    }
    
}