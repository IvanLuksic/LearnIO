const express=require('express');
const student=express.Router();
const {authenticate_student}=require('../middleware/login');
module.exports=function (main_ruter){//module.exports nije vise objekt nego funkcija
    main_ruter.use('/',student);
    student.get('/student',authenticate_student, (req, res) => {
    res.status(301).send('Dobrodosao ucenice');
  })
}