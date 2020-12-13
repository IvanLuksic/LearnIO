const questionclass= require('./services/question');
const topicclass= require('./services/topic');
const resultclass=require('./services/result');
const {question,sequelize,topic,save,course,user,subject,result,asessment_objective,clas}=require('./models');
const {nodelogger}=require('./loaders/logger');
//const models=require('./models');
instance=new questionclass(question,topic,save,course,user,result,nodelogger);
//instance=new topicclass(models.topic,models.asessment_objective,models.course,models.subject,models.result,models.save,models.question,models.topic_subject,models.tags_of_topic,models.course_topic,nodelogger);
//instance=new resultclass(result,user,subject,course,topic,asessment_objective,clas,nodelogger);
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
       // const x= await instance.generateQuestions(1,1,1);
        //const x=await instance.unlockQuestions(1,1,1,17);//await zato jer vraca promise
         //const x=await instance.getTopicsForUserAndCourse(3,1,1);
      // const x=await instance.getAsesmentsForTopic(1,1);
       //nodelogger.info(JSON.stringify(x));
        //const x=await instance.associatedTopics(5);
       // nodelogger.info( await instance.isBlue(1,1,3));
        //const x=await instance.getQuestionsFromSave(1,1,3);
      //await instance.insertIntoResults(1,1,1,1,4);
      //await instance.getQuestionsForA0D(1,3,2);
      //await instance.filterByStudent('Andi','Gunther');
      //await instance.filterByClass('7.b','2017/2018');
      //await instance.filterBySubject('Matematika');
      //await instance.filterByCourse('Geometrija');
     // await instance.filterByTopic('Mnozenje');
     //await instance.filterBySchool_year('2019/2020');
     ///await instance.filterByGrade(4);
      //await instance.getAllResults();
     //await instance.getAllTopicsForAdmin();
     //await instance.getTopicInfo(2);
     //await instance.getSubject_CoursePairs();
        nodelogger.info('Uspjesno');
    } catch (error) {
        console.log('Greska pri citanju rezultata'+error);
    }
    
}
init();
