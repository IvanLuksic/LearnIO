const questionclass= require('./services/question');
const topicclass= require('./services/topic');
const {Question,sequelize,Topic,Save,Course,User,Subject,Result,Asessment_objective}=require('./models');
const {nodelogger}=require('./loaders/logger');
//instance=new questionclass(Question,nodelogger,Topic,Save,Course,User);
instance=new topicclass(nodelogger,Topic, Asessment_objective,Course,Subject,Result);
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
        //const x= await instance.GenerateQuestions(1,1,1);
        //const x=await instance.UnlockQuestions(1,1,1,17);//await zato jer vraca promise
        const x=await instance.GetTopicsForUserAndCourse(3,1,1);
        nodelogger.info('Uspjesno');
    } catch (error) {
        console.log('Greska pri citanju rezultata'+error);
    }
    
}
init();