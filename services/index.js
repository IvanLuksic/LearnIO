const {user,session}=require('../models');//exportano unutar db objekta u index.js fileu u models folderu
const session_class=require('./session');
const login_class=require('./login');//kod exportanja klasa
const {nodelogger}=require('../loaders/logger');
login_instance=new login_class(user,nodelogger);
session_instance=new session_class(session,nodelogger);
//inicijalizirat topic iquestions instance
module.exports={
    Login_instance:login_instance,
    session_instance:session_instance
}