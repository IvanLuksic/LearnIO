const express=require('express');
const user=express.Router();
const {authenticate_admin, authenticate_admin_or_teacher}=require('../middleware/login');
const ShemaValidator=require('../scheme/validator');
const shema=require('../scheme/user-shema');
ShemaValidator.addSchemas(shema);
const user_controler=require('../controlers/user-controler');
module.exports=function(main_ruter)
{
    main_ruter.use('/',user);
    user.post('/student/insert',ShemaValidator.validate('addUser'),authenticate_admin_or_teacher,user_controler.insertUser);//mogu unosit admin ili teacher
    user.post('/teacher/insert',ShemaValidator.validate('addUser'),authenticate_admin,user_controler.insertUser);//samo admin moze unosit drugog admina ili teachera
    user.post('/admin/insert',ShemaValidator.validate('addUser'),authenticate_admin,user_controler.insertUser);
    user.get('/students/class/:classID',authenticate_admin,user_controler.getAllStudentsForClassWithAllClasses);//niz studenata i niz razreda za svakog studenta u kojima se nalazi
    user.get('/students/all',authenticate_admin,user_controler.getAllStudentsForAdmin);
}