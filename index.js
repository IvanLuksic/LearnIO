// const express  = require('express');
// const config = require('./config/config');
// const database = require('./config/database');
// const bodyParser = require('body-parser');

// const router = express.Router();
// database.authenticate()
// .then( () => console.log("Database radi") )
// .catch( (err) => console.log("Error: " + err));

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json());

// app.get ('/', (req, res) => res.send("hello world"));


// app.use('/api/result', require('./api/routers/result'));
// app.use('/api/topic', require('./api/routers/topic'));
// app.use('/api/tagsoftopic', require('./api/routers/tags_of_topic'));


// app.listen( PORT, console.log("radi") );

const questionclass= require('./services/question');
const topicclass= require('./services/topic');
const {question,sequelize,topic,save,course,user,subject,result,asessment_objective}=require('./models');
const {nodelogger}=require('./loaders/logger');
//instance=new questionclass(question,topic,save,course,user,nodelogger);
instance=new topicclass(topic, asessment_objective,course,subject,result,nodelogger);
async function DatabaseConnection ()
{
    console.log('Connecting to database....');
    try {
        await sequelize.authenticate();
        console.log('Connected to database.');
    } catch (error) {
        console.log('Error in database connection '+error);
        process.exit(1);//jer ce inace nastavit ići dalje nakon sta error handleamo ovaj promise,bi ga zelimo prekinuti
    }
}

async function init()
{
    await DatabaseConnection();//ne trebamo ga handleat sa try catch jer ce u slucaju greske ona sama terminirat proces
    //async funkcija vraca promise pa je awaitamo
    try {
       // const x= await instance.GenerateQuestions(1,1,1);
        //const x=await instance.UnlockQuestions(1,1,1,17);//await zato jer vraca promise
        // const x=await instance.GetTopicsForUserAndCourse(3,1,1);
      // const x=await instance.GetAsesmentsForTopic(1);
       //nodelogger.info(JSON.stringify(x));
        //const x=await instance.AssociatedTopics(5);
       // nodelogger.info( await instance.isBlue(1,1,3));
        nodelogger.info('Uspjesno');
    } catch (error) {
        console.log('Greska pri citanju rezultata'+error);
    }
    
}
init();
