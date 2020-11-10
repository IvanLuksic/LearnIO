const express=require('express');
const hello=express.Router();
module.exports=function (main_ruter){//module.exports nije vise objekt nego funkcija
    main_ruter.use('/',hello);
    hello.get('/', (req, res) => {
    res.send('Dobrodosli na LearnIO stranicu.')
  })
}