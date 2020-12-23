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
                for(let i=0;i<request.subject_id.length;i++)
                {
                    await this.Course_subject.create({
                        subject_id:request.subject_id[i],
                        course_id:new_course.id
                    });
                }
                this.Logger.info('Course added succesfuly ');
            }
            else throw(new Error('Defined course already exists'));
        } catch (error) {
            this.Logger.error('Error in function addCourse '+error);
            throw(error);
        }
    }
    
}