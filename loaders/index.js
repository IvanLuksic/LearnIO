const {DatabaseConnection}=require('./sequelize');
const exprr=require('./express');
const {httplogger,nodelogger}=require('./logger.js');//ubacivat loggere po dependency injectionu pa ako budemo mijenjali novi logir onda ga requiramo u ovoj datoteci i pošaljemo samo drugi u sequelize i express
module.exports={
    load: async function(app){
        try {
            await DatabaseConnection(nodelogger);
            nodelogger.info("Sequelize loadan");
            try {
                await exprr(app,httplogger);
               nodelogger.info('express loadan');
            } catch (error) {
                nodelogger.error(error);
                throw (new Error());
            }
        } catch (error) {
           nodelogger.error(error);
            throw(new Error());//da se greska od loadanja expressa propagira do app.js filea u kojem se nece pokrenuti aplikacija jer ce ici u catch dio
        }
    }
}