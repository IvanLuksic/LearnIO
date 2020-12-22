//kada ude u topic pa da zna renderirat na matrici imena i znacenje stupaca i koliko ima redova-> vrati objekt 
//Izlistaj sve topice studenta na stranici
//Dodaj topic u tablicu rezulati kad ga otkljuca-> BOOLEANBLUE ZNACI DA NIJE JOS NITI JEDNAPUT OTKLJUCAN-> TO TREBAM ZNATI JER AKO JE flase onda ga TREBA PROMIJNEITI u true i GENERIAT MU PITANJA U TABLICU save
const { QueryTypes } = require('sequelize');
const { Op } = require("sequelize");
const {sequelize}=require('../models');
module.exports=class topic{
    constructor(topic,assesment,course,subject,result,save,question,tags_of_topic,course_topic,result_instance,logger)//svi mogući dependenciesi, ako se neki ne budu korstili maknit
    {
        this.Topic=topic,
        this.Logger=logger;
        this.Assesment=assesment;
        this.Course=course;
        this.Subject=subject;
        this.Result=result;
        this.Save=save;
        this.Tags_of_topic=tags_of_topic;
        this.Course_topic=course_topic;
        this.Question=question;
        this.Result_instance=result_instance;//kod otključavanja topica nam treba kada spremamo otključani topic u tablicu results
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
            this.Logger.error('Error in function getTopicsForUserAndCourse '+error);
            throw(error);
        }
    }
    async getAsesmentsForTopic(topic_id)// Za određeni topic pronaći assesmente->Povezani su preko tablice topic_assesment
    {
        try {
            try {
                var assesments=await this.Topic.findAll({
                    attributes:['id','name','description','rows_D','column_numbers'],
                    include:{
                        model:this.Assesment,//JOIN sa predmetima od tog topica
                        attributes:['id','name'],
                        as:'assesments_topic',
                        through: { attributes: [] },
                    },
                where:{
                   id:topic_id//za topic ciji smo id primili
                }
                });
                this.Logger.info('Assesments succesfully fetched from database');
            } catch (error) {
                this.Logger.error('Error in etching assesment objectives');
                throw(error);
            }
            var matrica={};//formatirat za response
            var format={};
            var assesments_niz=[];//tu cemo stavit sve asesmente
            for(let i=0;i<assesments[0].assesments_topic.length;i++)
            {
                format={
                   asessment_id:assesments[0].assesments_topic[i].id,
                   asessment_name:assesments[0].assesments_topic[i].name
                };
                assesments_niz.push(format);
                format={};
            }
            matrica={//TU SU SVI PODACI ZA RENDERIRAT MATRICU OSIM PITANJA
                topic_id:assesments[0].id,
                topic_name:assesments[0].name,
                topic_description:assesments[0].description,
                rows_D:assesments[0].rows_D,
                column_numbers:assesments[0].column_numbers,
                asessments_array:assesments_niz
            };
            this.Logger.info(JSON.stringify(matrica));
            return matrica;//vrati fomratiranu matricu*/
        } catch (error) {
            this.Logger.error('Error in function getAsesmentsForTopic '+error);
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
            this.Logger.error('Error in function asscoaitedTopics'+error);
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
            this.Logger.error('error in function isBlue'+error);
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
                        through: { attributes: []},
                        include:{//nadi koji je to predmet
                            model:this.Subject,
                            as:'subjects_course',
                            through: { attributes: []}
                            }
                    }
                });
            } catch (error) {
                this.Logger.error('Error in fetching topics from database');
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
                            course_id:top.courses_topic[i].id,
                            course_name:top.courses_topic[i].name,
                            subject_id:top.courses_topic[i].subjects_course[j].id,
                            subject_name:top.courses_topic[i].subjects_course[j].name
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
            this.Logger.error('Error in function getAllTopics'+error);
            throw(error);
        }
    }
    async getTopicInfo(topics_id)
    {
        try {
            try {
               var topic_info=await this.Topic.findOne({
                    attributes:['name','rows_D','column_numbers','description'],
                    where:{
                        id:topics_id
                    },
                    raw:true
                })
            } catch (error) {
                this.Logger.error('Error in fetching topic from databse');
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
    async getSubject_CoursePairs()//za dodavanje topica da možemo odabrat kojem ćemo ga paru subject course dodat
    {
        try {
            try {
                var subject_course=await this.Course.findAll({
                    include:[
                        {model:this.Subject,
                        as:'subjects_course',
                        through: { attributes: []}}
                    ]
                });
                this.Logger.info('Subject courses pairs succesfuly fetched from database');
            } catch (error) {
                this.Logger.error('Error in fetching subject cpourse pairs from database');
                throw(error);
            }
            let format=[];
            let temp={};
            for(let i=0;i<subject_course.length;i++)
            {
                for(let j=0;j<subject_course[i].subjects_course.length;j++)
                {
                    temp={
                        subject_id:subject_course[i].subjects_course[j].id,
                        subject_name:subject_course[i].subjects_course[j].name,
                        course_id:subject_course[i].id,
                        course_name:subject_course[i].name
                    };
                    format.push(temp);
                    temp={};
                }
            }
            for(let i=0;i<format.length;i++)
            this.Logger.info(JSON.stringify(format[i]));
            return format;
        } catch (error) {
            this.Logger.error('Errro in function getSubject_CoursePairs '+error);
            throw(error);
        }
    }
    async addTopic(associated_topics_id,columns_AO,row_D,courses_id,subjects_id,topic_name,topic_description)
    {
        //Dodat u topic tablicu u subject topic course topic i tagsoftopic
        try {
           const new_topic= await this.Topic.create({
                name:topic_name,
                rows_D:row_D,
                column_numbers:columns_AO,
                description:topic_description
            });
            await this.Course_topic.create({
                topic_id:new_topic.id,
                course_id:courses_id
            });
            for(let i=0;i<associated_topics_id.length;i++)//associated topcis je NIZ koji sadrži idove povezanih topica
            {
                await this.Tags_of_topic.create({
                    source_topic:new_topic.id,
                    associated_topic:associated_topics_id[i],
                    required_level:3//zasasd spremamio po defaultu na 3
                });
            }
            this.Logger.info('New topic succesfuly added to dataabase');
            return new_topic.id;            
        } catch (error) {
            this.Logger.error('Error in function addTopic'+error);
            throw(error);
        }
    }
    async unlockAssociatedTopics(students_id,clas_id,courses_id,subjects_id)
    {
        try {
            //1. Izvuc sve POLOZENEtopice iz tablice rezultati za tog korisnika i pridruzit im njihovu ocjenu -> niz objekata
            try {
                var passed_topics=await this.Result.findAll({
                    attributes:['topic_id','grade'],
                    where:{
                        subject_id:subjects_id,
                        student_id:students_id,
                        course_id:courses_id,
                        class_id:clas_id,
                        grade:{
                            [Op.gt]:1//moraju biti polozeni
                        }
                    }
                });
            } catch (error) {
                this.Logger.error('Error in fetching topic and grades from dattaabse');
                throw(error);
            }
            this.Logger.info('Topic id and grades succesguly fetched from datatabse');
            for(let i=0;i<passed_topics.length;i++)
            this.Logger.info(JSON.stringify(passed_topics[i]));
            //2. IZVUC SE source topice KOJI SU U TABLICI TAGS_OF_TOPIC A KOJI SU ZAKLJUCANI-> NISU U TABLICI REZULTATIT-> LEFT JOIN
            try {//u source topics se nalaze id-ovi svih ZAKLJUCANIH TOPICS
                var source_topics=await sequelize.query('SELECT DISTINCT source_topic  FROM tags_of_topic LEFT JOIN result ON tags_of_topic.source_topic=result.topic_id WHERE topic_id IS null' ,{//ONI TOPICI IZ TAGS_OF_TOPIC KOJI NISU U TABLICI REZULTATI ĆE IMATI ATRIBUTE IZ TABLICE REZULTATI POSTAVLJENE NA NULL A SAMO NAS ONI ZANIMAJU PA KORISTIMO WHERE topic_id IS null
                    raw:true,
                    type: QueryTypes.SELECT
                   });
            } catch (error) {
                this.Logger.error('Error in left joining tags of topic with results table')
                throw(error);
            }
            this.Logger.info('Locked topics succesfuly fetched from database');
            for(let i=0;i<source_topics.length;i++)
            this.Logger.info(JSON.stringify(source_topics[i]));
            //3. Za svaki topic iz liste zakjucanih topica spremamo sve njegove povezane topice u niz objekata [{associated_id: required_level:}....]
            this.Logger.info('Associated');
            for(let source of source_topics)
            {
                try {
                    var associated=await this.Tags_of_topic.findAll({
                        attributes:['associated_topic','required_level'],
                        where:{
                            source_topic:source.source_topic
                        }
                    });
                } catch (error) {
                    this.Logger.error('Error in fetching asscoaited topics and required level');
                    throw(error);
                }

                for(let i=0;i<associated.length;i++)
                this.Logger.info(JSON.stringify(associated[i]));
                //4. Za SVAKI povezani topic iz gornje dobivenog niza associated gledamo:
                //a)JELI SE NALAZI U NIZU POLOZENIH
                //b)JELI grade>=required_level
                let temp=0;//flag koji ce se postavit na 1 ako za neki od povezanih topica NE zadovoljimo oba uvjeta
                for(let assoc of associated)
                {
                    for(let pass of passed_topics )//gleda jeli se nalazi u polozenima
                    {
                        if(assoc.associated_topic==pass.topic_id && pass.grade>=assoc.required_level)//ako za NEKI povezani topic ovo ne vrijedi-> NISMO GA NASLIO U LISTI POLOZENIH ILI NIJE DOVOLJNA OCJENA-> break->MORA VRIJEDIT ZA SVE-> IZADI IZ PETLJE associated topoica i idi na listu povezanih topica od iduceg source topica
                        {
                            this.Logger.info('nasli ga');
                            temp=1;
                            break;//izadi iz petlje-> NASLI SMO GA I IMA ODGOVORAJUCU OCJENU-> PROVJERAVAMO TO ZA IDUCI ASSOCIATED
                        }
                    }
                    if(temp==0)//ako nije postavljen u 1 odnosno ako je osta na 0 onda NIJE zadovoljen uvjet za taj povezani topic-> NISMO GA NASLIO U LISTI POLOZENIH ILI NIJE DOVOLJNA OCJENA-> UVJET MORA BITI ZADOVOLJEN ZA SVE POVEZABE TOPICE-> PREKINI PETLJU I IDI NA NOVI NIZ POVEZANIH TOPICA
                    {
                        temp=1;//signaliziraj vanjskoj petlji da NE MOZE OTKLJUCATI TAJ SOURCE TOPIC
                        break;//temp ce izac vanka s vrijdnosti 1 ako nisu zadovoljeni uvjeti
                    }
                    else temp=0;//nastavi provjeravat iduce associated topice i vrti temp na 0
                }
                if(temp==0)//MOZE SE OTKLJUCATI-> UBACI GA U TABLICU REZULTATI->DA NE MOZE BIO BI temp=1!!!!
                {
                    try {
                        this.Result_instance.insertIntoResults(subjects_id,courses_id,source.source_topic,clas_id,students_id);//spremi u tabliocu rezultati preko funkcije definirane u result serviceima
                    } catch (error) {
                        this.Logger.error('Error in inserting into results table');
                        throw(error);
                    }
                }
            temp=0;//vrati na 0 neovisno o tome moze li se ili ne moze otkljucati-> za iduci source topic pregled
        }
        } catch (error) {
            this.Logger.error('Error in function unlockAsscoiatedTopics '+error);
            throw(error);
        }
    }
}
