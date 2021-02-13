const express=require('express');
const loaders=require('./loaders');//ucitamo sve loadere-> trebamo im poslat app
const {nodelogger}=require('./loaders/logger');
const config=require('./config');
const app=express();
async function start()
{
    try {
        await loaders.load(app);
        app.listen(config.port,()=>{
            nodelogger.info(`App listening on ${config.port} `);
        });
    } catch (error) {
        nodelogger.error(error);
    }
}
start();