//kada ude u topic pa da zna renderirat na matrici imena i znacenje stupaca i koliko ima redova-> vrati objekt 
//Izlistaj sve topice studenta na stranici
//Dodaj topic u tablicu rezulati kad ga otkljuca-> BOOLEANBLUE ZNACI DA NIJE JOS NITI JEDNAPUT OTKLJUCAN-> TO TREBAM ZNATI JER AKO JE flase onda ga TREBA PROMIJNEITI u true i GENERIAT MU PITANJA U TABLICU save
const { QueryTypes } = require('sequelize');
const {sequelize}=require('../models');
module.exports=class topic{
    constructor(logger,topic,assesment,course,subject,result)//svi mogući dependenciesi, ako se neki ne budu korstili maknit
    {
        this.Topic=topic,
        this.Logger=logger;
        this.Assesment=assesment;
        this.Course=course;
        this.Subject=subject;
        this.Result=result;
    }
    async GetTopicsForUserAndCourse(students_id,subjects_id,courses_id)//svi topici koji se nalaze u tablici rezultati-> oni su trenutno otkljucani za tog korisnika
    {

        try {
            try {
               /*niz objekta topic*/ var topics=await this.Result.findAll({//joinamo je sa topic tablicom
                    attributes:['grade','result_array_by_columns','booleanblue'],//za prikazati na topic stranici
                    include:{model:this.Topic,attributes:['id','name']},//id bitan kasnije kada ulazimo u topic da ga saljemo za dohvatit pitanja i assesmenta
                    where:{
                        subject_id:subjects_id,
                        course_id:courses_id,
                        student_id:students_id
                    },
                    raw:true
                });
                this.Logger.info('topics succesfully fetced');
                for(let i=0;i<topics.length;i++)
                    this.Logger.info(JSON.stringify(topics[i]));
            } catch (error) {
                this.Logger.error('Error in fetching topcis from database');
                throw(error);
            }
        } catch (error) {
            this.Logger.error('Error in geting topics for user and course '+error);
            throw(error);
        }
    }
    async GetAsesmentsForTopic(topic_id)// Oni se definiraju na razini predmeta a svaki topic pripada samo  predmetu
    //JOIN topic s predmetom preko predmet_id i onda predmet sa Asesmentsubject tablicom pa to sa AseesmentObjective
    {
        try {
            try {
                var assesments=await this.Topic.findAll({
                    attributes:['id'],
                    include:{
                        model:this.Subject,
                        attributes:['id'],
                        include:{
                            model:this.Assesment,
                            attributes:['name'],
                            as:'Asessments_subject'//OBAVEZNO ALIAS NAVEST-> ON OZNACAVA ALIAS OD Assesmenta!!! KOJI SE KORISTI KOD DEFINIRANJE ASOCIJACIJE N:M i kod upita
                        }
                    },
                where:{
                   id:topic_id
                },
                    raw:true
                });
                this.Logger.info('Assesments succesfully fetched from database');
            } catch (error) {
                this.Logger.error('Error in etching assesment objectives ');
                throw(error);
            }
            this.Logger.info('tu sam');
            for(let i=0;i<assesments.length;i++)
            this.Logger.info(JSON.stringify(assesments[i]));
        } catch (error) {
            this.Logger.error('Error in GetAsesmentsFortopic '+error);
            throw(error);
        }
    }
    async AssociatedTopics(topics_id)
    {
        try {
            try {
               var x=await sequelize.query('SELECT * FROM topic JOIN tags_of_topic ON topic.id=tags_of_topic.source_topic WHERE id= :topic_id ',{
                raw:true,
                replacements: { topic_id: topics_id },
                type: QueryTypes.SELECT
               })
                this.Logger.info('Fetched succesfuly');
            } catch (error) {
                this.Logger.error('Error in joining ');
                throw(error);
            }
            for(let i=0;i<x.length;i++)
            this.Logger.info(JSON.stringify(x[i]));
        } catch (error) {
            this.Logger.error('Error in test function '+error);
            throw(error);
        }
    }
}