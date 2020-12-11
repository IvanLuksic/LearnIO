//kada ude u topic pa da zna renderirat na matrici imena i znacenje stupaca i koliko ima redova-> vrati objekt 
//Izlistaj sve topice studenta na stranici
//Dodaj topic u tablicu rezulati kad ga otkljuca-> BOOLEANBLUE ZNACI DA NIJE JOS NITI JEDNAPUT OTKLJUCAN-> TO TREBAM ZNATI JER AKO JE flase onda ga TREBA PROMIJNEITI u true i GENERIAT MU PITANJA U TABLICU save
const { QueryTypes } = require('sequelize');
const { Op } = require("sequelize");
const {sequelize}=require('../models');
module.exports=class topic{
    constructor(topic,assesment,course,subject,result,save,question,topic_subject,tags_of_topic,course_topic,logger)//svi mogući dependenciesi, ako se neki ne budu korstili maknit
    {
        this.Topic=topic,
        this.Logger=logger;
        this.Assesment=assesment;
        this.Course=course;
        this.Subject=subject;
        this.Result=result;
        this.Save=save;
        this.Topic_subject=topic_subject;
        this.Tags_of_topic=tags_of_topic;
        this.Course_topic=course_topic;
        this.Question=question;
    }
    async getTopicsForUserAndCourse(students_id,subjects_id,courses_id,clas_id)//svi topici koji se nalaze u tablici rezultati-> oni su trenutno otkljucani za tog korisnika
    {

        try {
            try {
                var topics=await this.Result.findAll({//joinamo je sa topic tablicom
                    attributes:['grade','result_array_by_columns','status'],//za prikazati na topic stranici
                    include:{model:this.Topic,attributes:['id','name']},//id bitan kasnije kada ulazimo u topic da ga saljemo za dohvatit pitanja i assesmenta
                    where:{
                        subject_id:subjects_id,
                        course_id:courses_id,
                        student_id:students_id,
                        class_id:clas_id,
                    }
                });
                this.Logger.info('topics succesfully fetced');
                var temp={};
                var format=[];
                for(let top of topics)
                {
                    temp={
                        grade:top.grade,
                        result_array_by_columns:top.result_array_by_columns,
                        topic_id:top.topic.id,
                        name:top.topic.name,
                        status:top.status
                    }
                    format.push(temp);
                    temp={};
                }
                for(let i=0;i<topics.length;i++)
                    this.Logger.info(JSON.stringify(format[i]));
                
                return format;
            } catch (error) {
                this.Logger.error('Error in fetching topcis from database');
                throw(error);
            }
        } catch (error) {
            this.Logger.error('Error in geting topics for user and course '+error);
            throw(error);
        }
    }
    async getAsesmentsForTopic(topic_id,subject_id)// Za određeni topic i određeni predmet pornaći assesmente-> TOPIC MOZE PIRPADATI VIŠE ASSESMENTA PA JE ONDA POTREBNO NAVESTI O KOJEM PREDEMTU JE RIJEC DA ZNAMO KOJE NAZIVE ASSESMENTA KORISTIIT-> SVAKI PREDMET MOZE IMAT DRUKCIJE NAZIVE ASSESMENTA
    //JOIN topic s predmetom preko predmet_id i onda predmet sa Asesmentsubject tablicom pa to sa AseesmentObjective
    {
        try {
            try {
                var assesments=await this.Topic.findAll({
                    attributes:['id','rows_D','column_numbers'],
                    include:{
                        model:this.Subject,//JOIN sa predmetima od tog topica
                        attributes:['id'],
                        as:'subject_topics',
                        where:{
                            id:subject_id// id od subjecta jednak id koji smo primili u funkciju
                        },
                        through: { attributes: [] },
                        include:{
                            model:this.Assesment,
                            attributes:['name'],
                           as:'Asessments_subject',//OBAVEZNO ALIAS NAVEST-> ON OZNACAVA ALIAS OD Assesmenta!!! KOJI SE KORISTI KOD DEFINIRANJE ASOCIJACIJE N:M i kod upita
                           through: { attributes: [] }//!!!!!!!!DA NE UKLJUCUJE NIKOJE ATRIBUTE IZ JOIN TABLICA!!!!!!
                        }
                    },
                where:{
                   id:topic_id//za topic ciji smo id primili
                },
                    //raw:true->BEZ RAW:TRUE LAKŠE FOMATRIANJE
                });
                this.Logger.info('Assesments succesfully fetched from database');
            } catch (error) {
                this.Logger.error('Error in etching assesment objectives ');
                throw(error);
            }
           for(let i=0;i<assesments.length;i++)
            this.Logger.info(JSON.stringify(assesments[i]));
           var matrica={};//formatirat za response
            var format={};
            var assesments_niz=[];//tu cemo stavit sve asesmente
            for(let i=0;i<assesments[0].subject_topics[0].Asessments_subject.length;i++)
            {
                format={
                    name:assesments[0].subject_topics[0].Asessments_subject[i].name //ime asesmenta
                };
                assesments_niz.push(format);
                format={};
            }
            matrica={//TU SU SVI PODACI ZA RENDERIRAT MATRICU OSIM PITANJA
                rows_D:assesments[0].rows_D,
                column_numbers:assesments[0].column_numbers,
                asessments_array:assesments_niz
            };
            return matrica;//vrati fomratiranu matricu
        } catch (error) {
            this.Logger.error('Error in getAsesmentsForTopic '+error);
            throw(error);
        }
    }
    async associatedTopics(topics_id)
    {
        try {
            try {//POTREBNO DEFINIRAT ALIAS ZA TABLICU TOOIC JER 2 PUTA JOINAMO PO NJOJ
               var association=await sequelize.query('SELECT * FROM topic t1 JOIN tags_of_topic  ON t1.id=tags_of_topic.source_topic JOIN topic t2 ON tags_of_topic.associated_topic=t2.id WHERE t1.id= :topic_id ',{
                raw:true,
                replacements: { topic_id: topics_id },
                type: QueryTypes.SELECT
               })
                this.Logger.info('Fetched asscoaited topics succesfuly');
            } catch (error) {
                this.Logger.error('Error in fetching asscoaited topics ');
                throw(error);
            }
            for(let i=0;i<association.length;i++)
            this.Logger.info(JSON.stringify(association[i]));
            var temp={};
            var format=[];
            for(let assoc of association)
            {
                temp={
                    topic_id:assoc.id,
                    name:assoc.name,
                    required_level:assoc.required_level
                };
                format.push(temp);
                temp={};
            }
            for(let temp of format)
            this.Logger.info(JSON.stringify(temp));
            return format;
        } catch (error) {
            this.Logger.error('Error in asscoaitedTopics function '+error);
            throw(error);
        }
    }
    async isBlue(topics_id,courses_id,users_id,clas_id,subjects_id)//gleda je li se u zadani topic dosada ulazilo->AKO NIJE ONDA JE CRVEN
    {
        //1.Dohvati zadani topic za zadanog usera i kurs iz tablice rezultati
        try {
            try {
                var topic=await this.Result.findOne({
                    where:{
                        course_id:courses_id,
                        topic_id:topics_id,
                        student_id:users_id,
                        class_id:clas_id,
                        subject_id:subjects_id
                    }
                });
            } catch (error) {
                this.Logger.error('error in fetching from database ');
                throw(error);
            }
            if(topic.status==process.env.RED)//nije se prethodno ulazilo u njega-> updejtaj mu status u 1 jer je student kliknuo na njega i vrati 0
            {
                try {
                    await this.Result.update({status:process.env.BLUE},{
                        where:{
                            course_id:topic.course_id,
                            topic_id:topic.topic_id,
                            student_id:topic.student_id
                        }
                    })
                } catch (error) {
                    this.Logger.error('error in updating status in table results');
                    throw(error);
                }
                this.Logger.info('Succesfuly updated status in table results');
                return 0;
            }
            else return 1;//vec se ulazilo u njega
        } catch (error) {
            this.Logger.error('error in isBlue function'+error);
            throw(error);
        }
    }
    async getAllTopicsForAdmin()
    {
        try {
            try {
                var topics=await this.Topic.findAll({
                    attributes:['id','name'],
                    include:{
                         model:this.Course,
                        as:'courses_topic',
                        attributes:['name'],
                        through: { attributes: []},
                        include:{//nadi koji je to predmet
                            model:this.Subject,
                            as:'subjects_course',
                            through: { attributes: []}
                            }
                    }
                });
            } catch (error) {
                this.Logger.error('Error in fetching topics from database'+error);
                throw(error);
            }
           let format=[];
           let temp={};
           for(let top of topics)//tu se nalaze svi topici povezani sa kursevima i predmetima u kojima se nalaze-> SVE KOMBINACIJE-> TOPIC KOJI NEMA NIJEDAN KURS ILI PREDMET NEĆE
           //SE OVDJE POJAVITI-> TO I IMA SMISLA JER PRI UNOŠENJU MORAMO OGRANIČIT KORISNIKA DA UNESENI TOPIC POVEŽE S KURSOM I PREDMETOM
           {
               for(let i=0;i<top.courses_topic.length;i++)//za svaki kurs od topica
               {
                    for(let j=0;j<top.courses_topic[i].subjects_course.length;j++)//za svaki predmet kojem pripada taj kurs od tog topica
                    {
                        //formatiraj to sve u 1 objekt za ispis na frontendu
                        temp={
                            topic_id:top.id,
                            topic_name:top.name,
                            course:top.courses_topic[i].name,
                            subject:top.courses_topic[i].subjects_course[j].name
                        }
                        format.push(temp);
                        temp={};
                    }
               }
           }
           for(let i=0;i<format.length;i++)
           this.Logger.info(JSON.stringify(format[i]));
           return format;
        } catch (error) {
            this.Logger.error('Error in getAllTopics function'+error);
            throw(error);
        }
    }
    async getTopicInfo(topics_id)
    {
        try {
            try {
               var topic_info=await this.Topic.findOne({
                    attributes:['name','rows_D','column_numbers'],
                    where:{
                        id:topics_id
                    },
                    raw:true
                })
            } catch (error) {
                this.Logger.error('Error in fetching topic from databse'+error);
                throw(error);
            }
            this.Logger.info('Topic info fetched succesfuly from database');
            this.Logger.info(JSON.stringify(topic_info));
            return topic_info;
        } catch (error) {
            this.Logger.error('Error in function getTopicInfo'+error);
            throw(error);
        }
    }
    async deleteTopicFromEverywhere(topics_id)// izbrisati topic iz svih tablica u kojima se pijavljuje
    {
        try {
           await this.Topic_subject.destroy({
                where:{
                    topic_id:topics_id
                }
            });
            await this.Tags_of_topic.destroy({
                where:{
                    [Op.or]:[
                        {
                        source_topic:topics_id
                        },
                        {
                            associated_topic:topics_id
                        }
                ]
                }
            });
            await this.Course_topic.destroy({
                where:{
                    topic_id:topics_id
                }
            });
            await this.Result.destroy({
                where:{
                    topic_id:topics_id
                }
            });
            await this.Save.destroy({
                where:{
                    topic_id:topics_id
                }
            });
            await this.Question.destroy({
                where:{
                    topic_id:topics_id
                }
            });
            await this.Topic.destroy({
                where:{
                    id:topics_id
                }
            });
        } catch (error) {
            this.Logger.error('Error in function deleteTopicFromEverywhere '+error);
            throw(error);
        }
    }
}
