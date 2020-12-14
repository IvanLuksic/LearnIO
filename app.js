const express=require('express');
const loaders=require('./loaders');//ucitamo sve loadere-> trebamo im poslat app
const {nodelogger}=require('./loaders/logger');
const path = require('path');
const app=express();
async function start()
{
    try {
        await loaders.load(app);
        app.listen(process.env.PORT,()=>{
            nodelogger.info(`App listening on ${process.env.PORT} `);
        });
    } catch (error) {
        nodelogger.error(error);
    }
}


start(); 
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));