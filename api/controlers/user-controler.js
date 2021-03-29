const {User_instance}=require('../../services');
const {nodelogger}=require('../../loaders/logger');
const config=require('../../config');
const { RateLimiterPostgres } = require("rate-limiter-flexible");
const { rateLimiterTooManyRequests}=require('../middleware/rate-limiter-global');//funkcija za handleanje slučajeva kada se prevrši broj mogućih kredita
const {sequelize}=require('../../models');//instanca baze za povezivanje rate limitera na bazu
let rate_limiter_register_options=config.rateLimiter.registerPath;
rate_limiter_register_options.storeClient=sequelize;//dodajemo klijenta nakon što se povežemo na bazu kako bi se mogli spremat podaci u bazu
// Postavke rate limitera za login
const registerRateLimiter = new RateLimiterPostgres(rate_limiter_register_options);
module.exports={
    insertUser:async (req,res,next)=>//kod registracije se poziva-> NE ZAHTJVEA NIKAKVU AUTENTIKACIJU PA ZA NJU NAPRAVIMO POSEBNI RATE LIMITER U SLUČAJU DA NEKO IDE NAMJERNO VIŠE PUTA SE POKUŠAT REGISTRIRAT
    {
        try {//1) OVDE ĆE DOĆ SAMO AKO JE PROŠAO GLOBALNI RATE LIMITER
            var register_limiter_response=await registerRateLimiter.get(req.ip);//po ip adresi KAO KLJUČU-> OBJEKT U BAZI SE RADI TEK NAKON ŠTO SE POZOVE CONSUME INAČE VRATI NULL-> ZA PRVI PUT ĆE VRATIT null
            //AKO ZAPIS NE POSTOJI(ZNAMO DA ĆE POSTOJAT JER ĆE GA UPISAT AKO JE PO PRVI PUT odnosno ako nema zapisa u tablici,NE TREBA NAM SET FUNKCIJA) ILI JE ISTEKAO TAJ KEY-> VRAĆA NULL INAČE VRAĆA RateLimiterRes OBJEKT
            //>= zato što se consuma nakon provjere pa će onda kad bude 5 bit consumano 5 puta pa ako ga propustimo sa > on će ga propustit i doli će javit erro kad ga ide consumat 6. put
           if(register_limiter_response && register_limiter_response.consumedPoints>= rate_limiter_register_options.points)//AKO JE NULL-> NIJE POSTAVLJEN KEY-> TO NAM SE NEČE DOGODIT JER ĆE SE POSTAVIT,INAČE SE RESSOLVA SA RateLimiterRes OBJEKTON KOJEN MOŽEMO PRISTUPAT PARAMETRIMA
            {//ako je ispunjen gornji slučaj onda je konzumirano više od dozovljenog-> javi error
                //PROBLEM-> AKO GA NE BLOKIRAMO NA NAČIN DA OVERCONSUMAMO ZA 1 DODATNI POINT ŠTO ĆE THROWAT ERROR ONDA ĆE GA RATE LIMITER BLOKIRAT duration time ODNOSNO ZA PREOSTALO VRIJEME OD TOG INTERVALA I NJEGOVOG POČETKA-> MANJE OD SAMOG duration TIMEA-> A NE blockDuration TIME PA GA ZATO NAMJERNO OVERCONSUMAMO 1 DODATNI PUT KAKO BI TO REALIZIRALI ŠTO RADIMO U DONJE POZVANIOJ FUNKCIJI
                rateLimiterTooManyRequests(registerRateLimiter,req,res,rate_limiter_register_options.points);//rate limiter response objekt,express response objekt i dozovoljeni mogući broj pointova odnosno pokusaja
                return;
            }
            else await registerRateLimiter.consume(req.ip,points = 1);//ako ima još pointova onda ih konzumiraj
        } catch (error) {
            nodelogger.error('Error in rate limiter'+error);
            throw(error);
        }
        try {
            await User_instance.addUser(req.body);//posalji parametre iz req bodya
            res.sendStatus(200);
        } catch (error) {
            nodelogger.error('Error in inserUser');
            next(error);
        }
    },
    getAllStudentsForClassWithAllClasses:async (req,res,next)=>
    {
        try {
            const students=await User_instance.getAllStudentsWithClassForClass(req.params.classID);
            res.json(students);
        } catch (error) {
            nodelogger.error('Error in  getStudentsFromClass');
            next(error);
        }
    },
    getAllStudentsWithAllClasses:async(req,res,next)=>
    {
        try {
            const students=await User_instance.getAllStudentsWithClassesAdmin();
            res.json(students);
        } catch (error) {
            nodelogger.error('Error in getAllStudentsWithAllClasses');
            next(error);
        }
    },
    getAllStudentsWithAllClassesForTeacher:async(req,res,next)=>
    {
        try {
            const students=await User_instance.getAllStudentsWithClassesTeacher(req.session.user);//saljemo id od ucitelja
            res.json(students);
        } catch (error) {
            nodelogger.error('Error in getAllStudentsWithAllClassesForTeacher');
            next(error);
        }
    },
    getAllStudentsForAdmin:async(req,res,next)=>
    {
        try {
            const students=await User_instance.getAllUsers(parseInt(config.roles.student));
            res.json(students);
        } catch (error) {
            nodelogger.error('Error in getAllStudentsForAdmin');
            next(error);
        }
    },
    deleteStudent:async(req,res,next)=>
    {
        try {
            await User_instance.deleteUserFromDB(req.params.student_id);
            nodelogger.info('Student deleted from database');
            res.sendStatus(200);
        } catch (error) {
            nodelogger.error('Error in deleteStudent');
            next(error);
        }
    },
    updateStudent:async(req,res,next)=>
    {
        try {
            await User_instance.updateStudentData(req.body);
            nodelogger.info('Student data updated');
            res.sendStatus(200);
        } catch (error) {
            nodelogger.error('Error in updateStudent');
            next(error);
        }
    },
    getAllTeachers:async (req,res,next)=>
    {
        try {
            const teachers=await User_instance.getAllUsers(parseInt(config.roles.teacher));
            res.json(teachers);
        } catch (error) {
            nodelogger.error('Error in getAllTeachers');
            next(error);
        }
    },
    updateTeacher:async (req,res,next)=>
    {
        try {
            await User_instance.updateTeacherData(req.body);
            nodelogger.info('Teacher data updated');
            res.sendStatus(200);
        } catch (error) {
            nodelogger.error('Error in updateTeacher');
            next(error);
        }
    },
    deleteTeacher:async (req,res,next)=>
    {
        try {
            await User_instance.deleteUserFromDB(req.params.teacher_id);
            nodelogger.info('Teacher deleted from database');
            res.sendStatus(200);
        } catch (error) {
            nodelogger.error('Error in deleteTeacher');
            next(error);
        }
    },
    getUserInfo: async (req,res,next)=>
    {
        try {
            const user=await User_instance.getUserInformation(req.session.user);
            res.json(user);
        } catch (error) {
            nodelogger.error('Error in getUserInfo');
            next(error);
        }
    }
}