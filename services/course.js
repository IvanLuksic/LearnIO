module.exports= class course{
    constructor(course,clas,subject,course_subject,logger)
    {
        this.Course=course;
        this.Subject=subject;
        this.Clas=clas;
        this.Course_subject=course_subject;
        this.Logger=logger;
    }
    async getAllCoursesForSubject(subjects_id)//NEOVISNO JELI DOHVACAMO ZA STUDENTA ILI TEACGERA->ZANIMA NAS SAMO PREDMET->nakon sta je odabran razred i predmet iz njega-> kada odaberemo razred i njegov predmet onda su i svi tooici iz tog predmeta automatski u tom razredu-> dovoljan samo subject id
    {
        try {
            try {
                var courses=await this.Course.findAll({
                    attributes:['id','name'],
                    include:{
                        model:this.Subject,
                        attributes:['id'],
                        as: "subjects_course",
                        through: { attributes: [] },
                        where:{
                            id:subjects_id
                        }
                    }
                });
            } catch (error) {
                this.Logger.error('Error in fetching courses from database');
                throw(error);
            }
            this.Logger.info('Courses fetched succesfuly from database');
            let format=[];
            let temp={};
            for(let course of courses)
            {
                temp={
                    course_id:course.id,
                    course_name:course.name
                };
                this.Logger.info(JSON.stringify(temp));
                format.push(temp);
                temp={};
            }
            return format;
        } catch (error) {
            this.Logger.error('Error in function getAllCoursesForStudent'+error);
            throw(error);
        }
    }
    async getCourseWithAllSubjects()//za dodavanje topica da možemo odabrat kojem ćemo ga KURSU DODAT A DA U ISTO VRIJEME IMAMO PREGLED PREDEMTA KOJIMA PRIPADA TAJ KURS
    {
        try {
            try {
                var course_subject=await this.Course.findAll({
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
            //vratiti niz kurseva oblika[ { course_id,course_name,subjects:[{subject_id,subject_name},....]},....]
            let format=[];
            let temp={};
            let format2=[];
            for(let i=0;i<course_subject.length;i++)
            {
                for(let j=0;j<course_subject[i].subjects_course.length;j++)
                {
                    temp={
                        subject_id:course_subject[i].subjects_course[j].id,
                        subject_name:course_subject[i].subjects_course[j].name,
                    };
                    format2.push(temp);
                    temp={};
                }
                temp={
                    course_id:course_subject[i].id,
                    course_name:course_subject[i].name,
                    subjects:format2
                };
                format.push(temp);
                temp={};
                format2=[];
            }
            for(let i=0;i<format.length;i++)
            this.Logger.info(JSON.stringify(format[i]));
            return format;
        } catch (error) {
            this.Logger.error('Errro in function getSubject_CoursePairs '+error);
            throw(error);
        }
    }
    async addCourse(request)//request body objektz s podacima za unos
    {
        try {
            const course=await this.Course.findOne({
                where:{
                    name:request.course_name
                }
            });
            if(!course)//ne postoji taj kurs
            {
                const new_course=await this.Course.create({
                    name:request.course_name
                });
                //KURS moze biti povezan samo s jednim predmetom
                    await this.Course_subject.create({
                        subject_id:request.subject_id,
                        course_id:new_course.id
                    });
                this.Logger.info('Course added succesfuly ');
            }
            else throw(new Error('Defined course already exists'));
        } catch (error) {
            this.Logger.error('Error in function addCourse '+error);
            throw(error);
        }
    }
    
}