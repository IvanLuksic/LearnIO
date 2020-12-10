//kada ude u topic pa da zna renderirat na matrici imena i znacenje stupaca i koliko ima redova-> vrati objekt 
//Izlistaj sve topice studenta na stranici
//Dodaj topic u tablicu rezulati kad ga otkljuca-> BOOLEANBLUE ZNACI DA NIJE JOS NITI JEDNAPUT OTKLJUCAN-> TO TREBAM ZNATI JER AKO JE flase onda ga TREBA PROMIJNEITI u true i GENERIAT MU PITANJA U TABLICU save
const { QueryTypes, json } = require('sequelize');
const {sequelize}=require('../models');
module.exports=class topic{
    constructor(topic,assesment,course,subject,result,logger)//svi mogući dependenciesi, ako se neki ne budu korstili maknit
    {
        this.Topic=topic,
        this.Logger=logger;
        this.Assesment=assesment;
        this.Course=course;
        this.Subject=subject;
        this.Result=result;
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
            try {
               var association=await sequelize.query('SELECT * FROM topic JOIN tags_of_topic ON topic.id=tags_of_topic.source_topic WHERE id= :topic_id ',{
                raw:true,
                replacements: { topic_id: topics_id },
                type: QueryTypes.SELECT
               })
                this.Logger.info('Fetched asscoaited topics succesfuly');
            } catch (error) {
                this.Logger.error('Error in fetching asscoaited topics ');
                throw(error);
            }
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
    
   // Jesu li za user_id zadovoljeni svi preduvjeti za otvaranje topic_id

    async isUnlocked(topic_id, user_id)
    {
        let associatedTopicIdsArray = [];
        let checkUnlocked = 1;
        let pairedResult;
        let associatedTopicsQuery;

        try {
            associatedTopicsQuery = await sequelize.query('SELECT associated_topic AS id, required_level FROM topic JOIN tags_of_topic ON topic.id=tags_of_topic.source_topic WHERE id= :topic_id ',{
                raw: true,
                replacements: { topic_id: topic_id },
                type: QueryTypes.SELECT
            });
            
            for(let associatedTopic of associatedTopicsQuery) {
                associatedTopicIdsArray.push(associatedTopic['id']);
            }
        }
        catch (error) {
            this.Logger.error('Error in getting associated topics.');
            throw(error);
        }

        try {
            let userResults = await this.Result.findAll({
                attributes:['topic_id','grade'],
                where: {
                    student_id: user_id,
                    topic_id: associatedTopicIdsArray
                }
            });

            for(let i = 0; i<associatedTopicsQuery['length']; i++) {
                pairedResult = userResults.find(element => {
                    return (
                        (element['dataValues']['topic_id'] == associatedTopicsQuery[i]['id'])
                        &&
                        (element['dataValues']['grade'] >= associatedTopicsQuery[i]['required_level'])
                    )
                });
                if(!pairedResult) {
                    checkUnlocked = 0;
                }
            }
        }
        catch (error){
            this.Logger.error('Error in getting user results and checking algorithm.');
            throw(error);
        }

        console.log("CHECK: " + checkUnlocked);
    }
}
