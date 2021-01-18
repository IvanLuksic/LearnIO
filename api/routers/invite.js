const express=require('express');
const invite=express.Router();
const {authenticate_student, authenticate_admin_or_teacher}=require('../middleware/login');
const invite_controler=require('../controlers/invite-controler');
module.exports=function(main_ruter)
{
    main_ruter.use('/',invite);
    invite.get('/invite/to/class/:class_id',authenticate_admin_or_teacher,invite_controler.getInviteLink);//admin ili teacher odabere razred za kojeg zeli generirat JEDINSTVENI link preko kojeg ce se ucenik upisati u razred
    invite.get('/invite/:unique_URL',authenticate_student,invite_controler.enrollInClass);//ovaj request ce upisat studenta u razred ili ce vratit gresku-> NE VRACA NIKAKVI BODY NEGO SAMO HEADERE PA ZATO KIRSTIMO HEAD METODU
}//JEDINO CE SE STUDENT MOC UPISAT JER PISE AUTHENTICATE STUDENT-> SPRJECAVAMO MOGUCNOST DA ADMIN ILI TEACHER STISNU NA TAJ LINK PA SE UPISU U RAZRED SA STUDENTIMA