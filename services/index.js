const {User,Session}=require('../models');//exportano unutar db objekta u index.js fileu u models folderu
const session_class=require('./session');
const login_class=require('./login');//kod exportanja klasa
const {nodelogger}=require('../loaders/logger');
login_instance=new login_class(User,nodelogger);
session_instance=new session_class(Session,nodelogger);
//inicijalizirat topic i questions instance
module.exports={
    Login_instance:login_instance,
    Session_instance:session_instance
}