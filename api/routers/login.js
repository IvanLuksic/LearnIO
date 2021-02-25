const express=require('express');
const login=express.Router();
const shema=require('../scheme/login-shema');
const login_controler=require('../controlers/login-controler');
const ShemaValidator=require('../scheme/validator');//.. idu 1 direktorij iznad u odnosu na trenutni direktorij-> login trenutni direktorij je routers-> mi zelimo doc do api-a pa onda u sheme
ShemaValidator.addSchemas(shema);//tako zahtjeva validator, inače bi za dohvatit login objekt trebali stavit shema.login
const {authenticate_login,session}=require('../middleware/login');
module.exports= function (main_router)//module.expots nece vise biti objekt nego funkcija
{
    main_router.use('/',login);//koristi ga od roota-> sve routeve koje cemo pisati u ovom fileu se odnose s obizrom na root / ruter-> app.use(/login)-> odnosi se na rutu /login
    
    login.get('/checklogin',session,login_controler.restoreSession);//KADA SE PRIJAVI S COOKIEM KOJI MU JOŠ VRIJEDI ONDA GA NATRIBA TRAZIT PONOVO LOGIN NEGO GA PUSTIT NA TU STRANICU AKO IMA PRAVA-> VRATIT ROLU KLIJENTU KOJI CE GA REDIRECTAT DI TRIBA(AKO JE NA HOME PAGE) ILI GA PROPUSTIT NA STRANICU(AKO IMA PRAVA ZA TU STRANICU)-> 404 AKO NEMA,IF SE RADI NA KLIJENTU KOJI OVISNO O ROLI I STRANICI KOJA SE ZAHTJEVA ODLUČUJE ŠTA ĆE RADIT-> NPR ZA HOME PAGE IH PREUMJSERI DI TRIBA A AKO SE TRAZI ADMIN STRANICA A ROLA JE STUDENT ONDA MU REČE 404
    login.post('/login',ShemaValidator.validate('login'),login_controler.login);
    login.head('/logout',login_controler.logout);//head request jer ne vraca ništa nazad pa da ne bude get
    login.post('/check/username',ShemaValidator.validate('username'),login_controler.checkUsername);
    login.get('/OTP/:username',login_controler.generateOTP);
    login.put('/change/password',login_controler.changePassword)//provejra prethodnog passworda ili OTP prije nego mu dozovlimo promjenu passworda
    //PROBAT DA SE NAKON ZATVARANJA TABA ILI BROWSERA LOGOUTA ALI JE ONDA PROBLEM STA GA TRIBA I PONOVO ZAPISAT KAD OPET DODE U SUSTAV A MI GA ZASAD UPISUJEMO SAMO KOD LOGIN KAD DOBIJE COOKIE-> MOŽDA IZBACIT SESSION TABLICU ILI VIDIT KAKO DRUGI GLEDAJU KO JE ONLINE OD KORISNIKA A KO NIJE
}