const express=require('express');
const admin=express.Router();
const {authenticate_admin}=require('../middleware/login');
module.exports=function (main_ruter){//module.exports nije vise objekt nego funkcija
    main_ruter.use('/',admin);
    admin.get('/admin',authenticate_admin, (req, res) => {
    res.status(301).send('Dobrodosao admine');
  })
}