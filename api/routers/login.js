const express=require('express');
const login=express.Router();
const shema=require('../scheme/login-shema');
const login_controler=require('../controlers/login-controler');
const ShemaValidator=require('../scheme/validator');//.. idu 1 direktorij iznad u odnosu na trenutni direktorij-> login trenutni direktorij je routers-> mi zelimo doc do api-a pa onda u sheme
ShemaValidator.addSchemas(shema);//tako zahtjeva validator, inače bi za dohvatit login objekt trebali stavit shema.login
const {authenticate_login}=require('../middleware/login');
module.exports= function (main_router)//module.expots nece vise biti objekt nego funkcija
{
    main_router.use('/',login);//koristi ga od roota-> sve routeve koje cemo pisati u ovom fileu se odnose s obizrom na root / ruter-> app.use(/login)-> odnosi se na rutu /login
    //dodat login.get koja će prikazat zadanu stranicu
    login.get('/login',authenticate_login,login_controler.restoresesion);
    login.post('/login',ShemaValidator.validate('login'),login_controler.logiraj);
}