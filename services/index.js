const {Korisnik}=require('../models');//exportano unutar db objekta u index.js fileu u models folderu
const login_class=require('./login');//kod exportanja klasa
const {nodelogger}=require('../loaders/logger');
login_instanca=new login_class(Korisnik,nodelogger);
module.exports={
    Login_instanca:login_instanca
}