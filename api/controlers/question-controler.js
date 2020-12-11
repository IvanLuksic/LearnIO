const { Question_instance,Topic_instance}=require('../../services');
const {nodelogger}=require('../../loaders/logger');
const { response } = require('express');
const { transport } = require('winston');
module.exports={
    getQuestions: async (req,res,next)=>//ako je dosao do ovde onda je prosao provjere autentikacije
    {
        try {
              //1.provjeri jeli se u zadani topic ulazi prvi put-> AKO JE ONDA MU GENERIRAJ PITANJA U BAZU PA ONDA TEK ŠALJI
        const student_id=req.session.user;
        nodelogger.info('Parametri: '+req.params.course_id+' '+req.params.topic_id+' '+req.params.student_id);
        var response={};//u njega ćemo stavit objekte pitanja i objekt naziva assesment objectivea za taj topic
        //1. Vidi jeli se u zadani topic u bazi NIKAD NIJE UŠLO-> AKO JEST ONDA JE PLAV->NE TREBA GENEIRAT PITANJA
            try {
                var blue=await Topic_instance.isBlue(req.params.topic_id,req.params.course_id,student_id,req.params.class_id,req.params.subject_id)
                nodelogger.info(blue);
            } catch (error) {
                nodelogger.error('Error in fetching status of topic');
                throw(error);
            }
            if(blue)
            {
                try {
                    var questions=await Question_instance.getQuestionsFromSave(req.params.topic_id,req.params.course_id,student_id,req.params.class_id,req.params.subject_id);
                } catch (error) {
                    nodelogger.error('Errro in fetching from database '+error);
                    throw(error);
                }
                nodelogger.info('Fetched succesfuly form database');
               response.Questions=questions;
            }
            else {//generiraj pitanja pa ih onda dohvati
                try {
                    var questions=await Question_instance.generateQuestions(student_id,req.params.topic_id,req.params.course_id,req.params.class_id,req.params.subject_id);
                } catch (error) {
                    nodelogger.error('Error in generating questions');
                    throw(error);
                }
                //Kad si izgenerira onda ih dohvati i pošalji
                try {
                    var questions=await Question_instance.getQuestionsFromSave(req.params.topic_id,req.params.course_id,student_id,req.params.class_id,req.params.subject_id);
                } catch (error) {
                    nodelogger.error('Errro in fetching from database '+error);
                    throw(error);
                }
                nodelogger.info('Fetched succesfuly form database');
                response.Questions=questions;
            }
            try {
                matrica=await Topic_instance.getAsesmentsForTopic(req.params.topic_id,req.params.subject_id);
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
        try {
            const {topic_id=1,course_id=1,class_id=1,subject_id=1,question_id=7,solution='d'}=req.body;
            const student_id=req.session.user;
            nodelogger.info('Parametri: '+course_id+' '+topic_id+' '+student_id+' '+question_id+subject_id+class_id+'Solution '+solution);
            var response={};//formatirat resposne-> sadržavat će flag correct i niz pitanja-> ako je kriv odgovor onda je on prazan
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
             else {//netocno-> vrati response sa flagom correct:false + VRATI MU NIZ POVETZANIH TOPICA DA GA MOŽEMO ODVEST LINKOM NA NJIH
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
    },
    deleteQuestionByID: async(req,res,next)=>//QUERY URL PARAMETRI SU DOSTUPNI PREKO req.params objekta
    {
        try {
            await Question_instance.deleteQuestion(req.params.questionID);
            nodelogger.info('Questipn deleted from database');
            res.sendStatus(200);
        } catch (error) {
            nodelogger.error('Error in deleting question from database');
            next(error);
        }
    },
    updateQuestions: async (req,res,next)=>
    {
        try {
           await Question_instance.updateQuestion(req.body);//pošalji mu sve iz request body
           nodelogger.info('Question updated succesfully');
           res.sendStatus(200);
        } catch (error) {
            nodelogger.error('Error in updating question '+error);
            next(error);
        }
    },
    addQuestions: async (req,res,next)=>
    {
        try {
           question_id= await Question_instance.addQuestion(req.body);
            nodelogger.info('Question succesfuly added to database');
            let response={
                id:question_id
            };
            res.json(response);
        } catch (error) {
            nodelogger.error('Error in adding questions '+error);
            next(error);
        }
    }
}