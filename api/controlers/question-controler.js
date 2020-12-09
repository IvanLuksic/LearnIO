const { Question_instance,Topic_instance}=require('../../services');
const {nodelogger}=require('../../loaders/logger');
module.exports={
    getQuestions: async (req,res,next)=>//ako je dosao do ovde onda je prosao provjere autentikacije
    {
        //1.provjeri jeli se u zadani topic ulazi prvi put-> AKO JE ONDA MU GENERIRAJ PITANJA U BAZU PA ONDA TEK ŠALJI
        nodelogger.info(JSON.stringify(req.body));
        const {course_id=1,topic_id=1,class_id=1,subject_id=1}=req.body;
        const student_id=req.session.user;
        nodelogger.info('Parametri: '+course_id+' '+topic_id+' '+student_id);
        var response={};//u njega ćemo stavit objekte pitanja i objekt naziva assesment objectivea za taj topic
        //1. Vidi jeli se u zadani topic u bazi NIKAD NIJE UŠLO-> AKO JEST ONDA JE PLAV->NE TREBA GENEIRAT PITANJA
        try {
            try {
                var blue=await Topic_instance.isBlue(topic_id,course_id,student_id,class_id,subject_id)
                nodelogger.info(blue);
            } catch (error) {
                nodelogger.error('Error in fetching status of topic');
                throw(error);
            }
            if(blue)
            {
                try {
                    var questions=await Question_instance.getQuestionsFromSave(topic_id,course_id,student_id,class_id,subject_id);
                } catch (error) {
                    nodelogger.error('Errro in fetching from database '+error);
                    throw(error);
                }
                nodelogger.info('Fetched succesfuly form database');
               response.Questions=questions;
            }
            else {//generiraj pitanja pa ih onda dohvati
                try {
                    var questions=await Question_instance.generateQuestions(student_id,topic_id,course_id,class_id,subject_id);
                } catch (error) {
                    nodelogger.error('Error in generating questions');
                    throw(error);
                }
                //Kad si izgenerira onda ih dohvati i pošalji
                try {
                    var questions=await Question_instance.getQuestionsFromSave(topic_id,course_id,student_id,class_id,subject_id);
                } catch (error) {
                    nodelogger.error('Errro in fetching from database '+error);
                    throw(error);
                }
                nodelogger.info('Fetched succesfuly form database');
                response.Questions=questions;
            }
            try {
                matrica=await Topic_instance.getAsesmentsForTopic(topic_id,subject_id);
                response.Matrix=matrica;
            } catch (error) {
                nodelogger.error('Error in fetching assemsents');
                throw(error);
            }
            res.json(response);
        } catch (error) {
            nodelogger.error('Errro in checking boolena status '+error);
            next(error);
        }
    },
    checkAnswer: async (req,res,next)=>{
        const {topic_id=1,course_id=1,class_id=1,subject_id=1,question_id=5,solution='d'}=req.body;
        const student_id=req.session.user;
        nodelogger.info('Parametri: '+course_id+' '+topic_id+' '+student_id+' '+question_id+subject_id+class_id+'Solution '+solution);
        var response={};//formatirat resposne-> sadržavat će flag correct i niz pitanja-> ako je kriv odgovor onda je on prazan
        try {
             //1. provjeri jeli dobar odgovor
             try {
                 var correct=await Question_instance.checkAnswer(question_id,solution,student_id,topic_id,course_id,class_id,subject_id);
             } catch (error) {
                 nodelogger.error('error in checking answer');
                 throw(error);
             }
             if(!correct)//odgovor je točan -> 1)Otključaj pitanja 2)Vrati u resposne ponovo sva pitanja sa promijenjenim statusom za ponovno renderiranje matrice
             {
                response.correct=true;
                try {
                    await Question_instance.unlockQuestions(student_id,topic_id,course_id,class_id,subject_id,question_id);
                } catch (error) {
                    nodelogger.error('Error in unlocking questions ');
                    throw(error);
                }
                try {
                    var questions=await Question_instance.getQuestionsFromSave(topic_id,course_id,student_id,class_id,subject_id);
                } catch (error) {
                    nodelogger.error('Errro in fetching from database '+error);
                    throw(error);
                }
                response.Questions=questions;
                res.json(response);
             }
             else {//netocno-> vrati response sa flagom correct:false
                response.correct=false;
                try {
                   await  Question_instance.wrongAnswer(student_id,topic_id,course_id,class_id,subject_id,question_id);
                } catch (error) {
                    nodelogger.error('Error in locking question');
                }
                try {
                    var questions=await Question_instance.getQuestionsFromSave(topic_id,course_id,student_id,class_id,subject_id);
                } catch (error) {
                    nodelogger.error('Errro in fetching from database '+error);
                    throw(error);
                }
                response.Questions=questions;//prazan niz
                res.json(response);
             }
         } catch (error) {
            nodelogger.error('Error in checking answer');
            next(error);
        }
    }
}