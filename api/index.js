const express=require('express');
const login=require('./routers/login');//funkcija koja ocekuje glavni ruter
const hello=require('./routers/hello');
const main_ruter=express.Router();
login(main_ruter);
hello(main_ruter);
module.exports={
    Main_ruter: main_ruter
}
