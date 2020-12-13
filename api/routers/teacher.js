const express=require('express');
const teacher=express.Router();
const {authenticate_teacher}=require('../middleware/login');
module.exports=function (main_ruter){//module.exports nije vise objekt nego funkcija
    main_ruter.use('/',teacher);
    teacher.get('/teacher',authenticate_teacher, (req, res) => {
    res.status(301).send('Dobrodosao ucitelju');
  })
}