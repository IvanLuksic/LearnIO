const express=require('express');
const user=express.Router();
const {authenticate_admin, authenticate_admin_or_teacher,authenticate_teacher}=require('../middleware/login');
const ShemaValidator=require('../scheme/validator');
const shema=require('../scheme/user-shema');
ShemaValidator.addSchemas(shema);
const user_controler=require('../controlers/user-controler');
module.exports=function(main_ruter)
{
    main_ruter.use('/',user);
    user.post('/student/register',ShemaValidator.validate('addUser'),user_controler.insertUser)//ovo je kod registration forma-> nema autentikacije,sutdent se registrira i rola mu je defaukt postavljena na 3 kod unosa
    //user.post('/teacher/student/insert',ShemaValidator.validate('addUser'),authenticate_teacher,user_controler.insertUser);//kad teacher unosi on moze unosit samo studenta
    user.post('/admin/user/insert',ShemaValidator.validate('addUser'),authenticate_admin,user_controler.insertUser);//admin moze unositi sva 3 tipa korisnika->ucenika,ucitelja i admina
   // user.post('admin/teacher/insert',ShemaValidator.validate('addUser'),authenticate_admin,user_controler.insertUser);//samo admin moze unosit drugog admina ili teachera
   // user.post('/admin/insert',ShemaValidator.validate('addUser'),authenticate_admin,user_controler.insertUser);
    user.get('/students/class/:classID',authenticate_admin_or_teacher,user_controler.getAllStudentsForClassWithAllClasses);//niz studenata i niz razreda za svakog studenta u kojima se nalazi->ZA ADMINA PRIKZ PASSWORDA A ZA UCFTELJA NE
    user.get('/admin/students/all/class',authenticate_admin,user_controler.getAllStudentsWithAllClasses);//dohvat svih studenta s razredima tim
    user.get('/teacher/students/all/class',authenticate_teacher,user_controler.getAllStudentsWithAllClassesForTeacher);//dohvat svih studenta kojima predaje taj ucitelj
    user.get('/students/all',authenticate_admin,user_controler.getAllStudentsForAdmin);//dohvat svih studenta bez razreda
    user.delete('/students/delete/:student_id',authenticate_admin,user_controler.deleteUser);
    user.put('/students/update',authenticate_admin,user_controler.updateStudent);
}