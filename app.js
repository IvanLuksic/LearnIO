const express=require('express');
const loaders=require('./loaders');//ucitamo sve loadere-> trebamo im poslat app
const {nodelogger}=require('./loaders/logger');
const app=express();
async function start()
{
    try {
        await loaders.load(app);
        app.listen(3000,()=>{
            nodelogger.info("App listening on port 3000 ");
        });
    } catch (error) {
        nodelogger.error(error);
    }
}
start();