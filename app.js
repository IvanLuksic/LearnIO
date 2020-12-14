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

app.get('/admin/*', (req,res) => {})
app.get('/student/*', (req,res) => {})
app.get('/teacher/*', (req,res) => {})
app.use(express.static(path.join(__dirname, '/client/build')))
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'))
})
app.get('/topics', (req,res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'))
})
app.get('/AdminTopics', (req,res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'))
})