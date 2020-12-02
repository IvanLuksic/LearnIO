const questionclass= require('./services/question');
const {Question,sequelize,Topic,Save,Course,User}=require('./models');
const {nodelogger}=require('./loaders/logger');
instance=new questionclass(Question,nodelogger,Topic,Save,Course,User);
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
        const x= await instance.getQuestionsFromSave(1,1,1);
        for (const iterator of x)//slanje nazad u resposne body-> res.body.payload=x +res.body.retci=retci +res.body.stupci=stupci da znaju renderirat
        nodelogger.info(JSON.stringify(iterator));
    } catch (error) {
        console.log('Greska pri citanju rezultata'+error);
    }
    
}
init();