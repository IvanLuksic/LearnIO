const express  = require('express');
const config = require('./config/config');
const database = require('./config/database');
const bodyParser = require('body-parser');

const router = express.Router();
database.authenticate()
.then( () => console.log("Database radi") )
.catch( (err) => console.log("Error: " + err));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get ('/', (req, res) => res.send("hello world"));


app.use('/api/result', require('./api/routers/result'));
app.use('/api/topic', require('./api/routers/topic'));
app.use('/api/tagsoftopic', require('./api/routers/tags_of_topic'));


app.listen( PORT, console.log("radi") );