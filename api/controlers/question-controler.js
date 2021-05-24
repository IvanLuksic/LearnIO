const { Question_instance,Topic_instance}=require('../../services');
const {nodelogger}=require('../../loaders/logger');
const path = require('path');
const config= require('../../config');
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
                    nodelogger.error('Errro in fetching from database ');
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
                    nodelogger.error('Errro in fetching from database ');
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
            nodelogger.error('Errro in  getQuestions '+error);
            next(error);
        }
    },
    checkAnswer: async (req,res,next)=>{
        try {
            const {topic_id,course_id,class_id,subject_id,question_id,solution}=req.body;
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
             {//3) Svim topicima kojima je ovaj topic povezan topic otkljucamo netocno odgovorena pitanja
                response.correct=true;
                try {
                    await Question_instance.unlockQuestionsAndUpdateResultsAndGrade(solution,student_id,topic_id,course_id,class_id,subject_id,question_id);
                } catch (error) {
                    nodelogger.error('Error in unlocking questions ');
                    throw(error);
                }
                try {
                    var questions=await Question_instance.getQuestionsFromSave(topic_id,course_id,student_id,class_id,subject_id);
                } catch (error) {
                    nodelogger.error('Errro in fetching questions from database ');
                    throw(error);
                }
                try {
                    await Question_instance.unlockQuestionsInSourceTopics(topic_id,course_id,student_id,class_id,subject_id);//svim source topciima kojima je ovaj topic associated topic mijenjamo status kirivih(crvenih) pitanja u plava-> OTKLJUČVAMO IH
                } catch (error) {
                    nodelogger.error('Error in unlocking wrong answers from associated topics');
                }
                response.Questions=questions;
                res.json(response);
             }
             else {//netocno-> vrati response sa flagom correct:false + VRATI MU NIZ POVETZANIH TOPICA DA GA MOŽEMO ODVEST LINKOM NA NJIH
                response.correct=false;
                try {
                   await  Question_instance.wrongAnswer(solution,student_id,topic_id,course_id,class_id,subject_id,question_id);
                } catch (error) {
                    nodelogger.error('Error in locking question');
                    throw(error);
                }
                try {
                    var questions=await Question_instance.getQuestionsFromSave(topic_id,course_id,student_id,class_id,subject_id);
                } catch (error) {
                    nodelogger.error('Errro in fetching from database ');
                    throw(error);
                }
                response.Questions=questions;//prazan niz
                res.json(response);
             }
         } catch (error) {
            nodelogger.error('Error in checkAnswer');
            next(error);
        }
    },
    deleteQuestionByID: async(req,res,next)=>//QUERY URL PARAMETRI SU DOSTUPNI PREKO req.params objekta
    {
        try {
            await Question_instance.deleteAndReplaceQuestion(req.params.questionID);
            nodelogger.info('Questipn deleted from database');
            res.sendStatus(200);
        } catch (error) {
            nodelogger.error('Error in  deleteQuestionByID');
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
            nodelogger.error('Error in   updateQuestions');
            next(error);
        }
    },
    addQuestions: async (req,res,next)=>
    {
        try {
            let question_id;
            nodelogger.info(JSON.stringify(req.file));
            if(req.file===undefined)//saljemo bez req.file propertiesa
            {
                nodelogger.info('Nema slike');
                question_id= await Question_instance.addQuestion(req.body.text,req.body.solution,req.body.question_type,req.body.row_D,req.body.column_A,req.body.answer_a,req.body.answer_b,req.body.answer_c,req.body.answer_d,req.body.topic_id);
            }
            else question_id= await Question_instance.addQuestion(req.body.text,req.body.solution,req.body.question_type,req.body.row_D,req.body.column_A,req.body.answer_a,req.body.answer_b,req.body.answer_c,req.body.answer_d,req.body.topic_id,req.file.path,req.file.mimetype,req.file.size);
            nodelogger.info('Question succesfuly added to database');
            let response={
                id:question_id
            };
            res.json(response);
        } catch (error) {
            nodelogger.error('Error in  addQuestions');
            next(error);
        }
    },
    getQuestionImage:async (req,res,next)=>{
        try {
            const {image_path,mime_type,image_size}=await Question_instance.getQuestionImagePath(req.params.questionID);
            nodelogger.info(__dirname);
            if(!image_path)//NULL-> NEMA SLIKE-> VRATI STATUS 201
            {
                res.sendStatus(201);//NO CONTENT
            }
            else {
                let options = {
                    headers: {
                        'Content-Type':mime_type,
                    }
                  };
                res.sendFile(path.join(config.multer.question_images_root_path,image_path),options);
            }
        } catch (error) {
            nodelogger.error('Error in getQuestionImage');
            next(error);
        }
    },
    checkQuestion:async (req,res,next)=>{
        try {
            let can_delete=await Question_instance.checkSessionsWithQuestion(req.params.questionID);
            let response={
                can_delete:can_delete
            };
            res.json(response);//ako se moze izbrisati odnosno ako se ne nalazi u nekoj od sesija onda je can_delete true
        } catch (error) {
            nodelogger.error('Error in checkQuestion');
            next(error);
        }
    },
    replaceQuestion:async (req,res,next)=>{
        try {
            await Question_instance.replaceQuestionWithAnother(req.body.source_question_id,req.body.new_question_id);
            res.sendStatus(200);
        } catch (error) {
            nodelogger.error('Error in replaceQuestion');
            next(error);
        }
    },
    getUserChoice:async (req,res,next)=>{
        try {
            let student_answer=await Question_instance.studentQuestionChoice(req.session.user,req.params.topic_id,req.params.course_id,req.params.subject_id,req.params.class_id,req.params.question_id);
            res.json({
                previous:student_answer
            });
        } catch (error) {
            nodelogger.error('Error in getUserChoice');
            next(error);
        }
    },
    insertExistingQuestion:async (req,res,next)=>{
        try {
            await Question_instance.insertExistingQuestionIntoTopic(req.body.topic_id,req.body.question_id,req.body.row_D,req.body.column_A);
            res.sendStatus(200);
        } catch (error) {
            nodelogger.error('Error in insertExistingQuestion');
            next(error);
        }
    }
}