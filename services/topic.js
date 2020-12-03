//kada ude u topic pa da zna renderirat na matrici imena i znacenje stupaca i koliko ima redova-> vrati objekt 
//Izlistaj sve topice studenta na stranici
//Dodaj topic u tablicu rezulati kad ga otkljuca-> BOOLEANBLUE ZNACI DA NIJE JOS NITI JEDNAPUT OTKLJUCAN-> TO TREBAM ZNATI JER AKO JE flase onda ga TREBA PROMIJNEITI u true i GENERIAT MU PITANJA U TABLICU SAVE
module.exports=class Topic{
    constructor(logger,topic,assesment,course,subject,result)//svi mogući dependenciesi, ako se neki ne budu korstili maknit
    {
        this.Topic=topic,
        this.Logger=logger;
        this.Assesment=assesment;
        this.Course=course;
        this.Subject=subject;
        this.Result=result;
    }
    async GetTopicsForUserAndCourse(students_id,courses_id,subjects_id)//svi Topici koji se nalaze u tablici rezultati-> oni su trenutno otkljucani za tog korisnika
    {

        try {
            try {
               /*niz objekta topic*/ var topics=await this.Result.findAll({//joinamo je sa Topic tablicom
                    attributes:['grade','result_array_by_columns','booleanblue'],//za prikazati na topic stranici
                    include:{model:this.Topic,attributes:['id','name']},//id bitan kasnije kada ulazimo u topic da ga saljemo za dohvatit pitanja i assesmenta
                    where:{
                        subject_id:subjects_id,
                        course_id:courses_id,
                        student_id:students_id
                    },
                    raw:true
                });
                this.Logger.info('Topics succesfully fetced');
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
}