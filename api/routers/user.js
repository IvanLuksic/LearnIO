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
    user.post('/student/insert',ShemaValidator.validate('addUser'),authenticate_admin_or_teacher,user_controler.insertUser);
    user.post('/teacher/insert',ShemaValidator.validate('addUser'),authenticate_admin,user_controler.insertUser);
    user.post('/admin/insert',ShemaValidator.validate('addUser'),authenticate_admin,user_controler.insertUser);
}