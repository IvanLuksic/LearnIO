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



app.use(express.static(path.join(__dirname, '/client/build')))

/*app.get('/api/*', (req,res) => {})*/

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'))
})