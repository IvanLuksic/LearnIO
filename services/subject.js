module.exports= class subject{
    constructor(subject,clas,user,class_subject,logger)
    {
        this.Subject=subject;
        this.Clas=clas;
        this.User=user;//npr za ucitelja izlistat sve njegove predmete
        this.Class_subject=class_subject;
        this.Logger=logger;
    }
    async getAllSubjectsForClass(class_id)
    {
        try {
            try {
                var subjects=await this.Subject.findAll({
                    attributes:['id','name'],
                    include:{
                        model:this.Clas,
                        attributes:['id'],
                        as:'classes_subject',
                        through: { attributes: [] },
                        where:{
                            id:class_id
                        }
                    }
                });
            } catch (error) {
                this.Logger.error('Error in fetching subjects from database');
                throw(error);
            }
            this.Logger.info('Subjects fetched succesfuly from database');
            let format=[];
            let temp={};
            for(let subject of subjects)
            {
                temp={
                    subject_id:subject.id,
                    subject_name:subject.name
                };
                this.Logger.info(JSON.stringify(temp));
                format.push(temp);
                temp={};
            }
            return format;
        } catch (error) {
            this.Logger.error('Error in function getAllSubjectsForClass'+error);
            throw(error);
        }
    }
    async addSubject(request)//request body objektz s podacima za unos
    {
        try {
            let subject=await this.Subject.findOne({//provjerti jel postoji vec taj isti predmet
              where:{
                name:request.subject_name
              }
            });
            if(!subject)//ako ne postoji
            {
                const new_subject=await this.Subject.create({
                    name:request.subject_name
                });
                for(let i=0;i<request.class_id.length;i++)
                {
                    await this.Class_subject.create({
                        class_id:request.class_id[i],
                        subject_id:new_subject.id
                    });
                }
                this.Logger.info('Subject added succesfully to database');
            }
            else throw(new Error('Defined subject already exists'));
        } catch (error) {
            this.Logger.error('Error in function addSubject'+error);
            throw(error);
        }
    }
    async getAllSubjectsWithClasses()  //dohvaćanje svih predmeta s njohovim pridruzenim razredima kod unosa kursa-> za ADMINA DOHVACAMO SVE
    {
        try {
            const subjects=await this.Subject.findAll({
                attributes:['id','name'],
                include:{
                    model:this.Clas,
                    as:'classes_subject',
                    attributes:['name','school_year'],
                    through: { attributes: [] },
                }
            });
            let format=[];
            let format_clas=[];
            let temp={};
            for(let subject of subjects)
            {
                for(let clas of subject.classes_subject)
                {
                    temp={
                        class_name:clas.name,
                        class_year:clas.school_year
                    };
                    format_clas.push(temp);
                    temp={};
                }
                temp={
                    subject_id:subject.id,
                    subject_name:subject.name,
                    classes:format_clas
                };
                format.push(temp);
                format_clas=[];
                temp={};
            }
            this.Logger.info(JSON.stringify(format));
            return format;
        } catch (error) {
            this.Logger.error('Error in function  getAllSubjectsWithClasses'+error);
            throw(error);
        }
    }
    async getAllSubjectsWithClassesForTeacher(teachers_id)//kad teacher unosi kurs moze odabrat samo one predemte kojima predaje
    {
        try {
            const subjects=await this.User.findAll({
                attributes:['id'],
                include:{
                    model:this.Subject,
                    as:'subjects_teacher',
                    through: { attributes: []},
                    include:{
                        model:this.Clas,
                        as:'classes_subject',
                        attributes:['name','school_year'],
                        through: { attributes: [] },
                    }
                },
                where:{
                    id:teachers_id//samo za tog teachera
                }
            });
            let format=[];
            let format_clas=[];
            let temp={};
            for(let i=0;i<subjects[0].subjects_teacher.length;i++)//samo 1 teacher-> samo 1 clan subjects niza
            {
                for(let j=0;j<subjects[0].subjects_teacher[i].classes_subject.length;j++)
                {
                    temp={
                        class_name:subjects[0].subjects_teacher[i].classes_subject[j].name,
                        class_year:subjects[0].subjects_teacher[i].classes_subject[j].school_year
                    };
                    format_clas.push(temp);
                    temp={};
                }
                temp={
                    subject_id:subjects[0].subjects_teacher[i].id,
                    subject_name:subjects[0].subjects_teacher[i].name,
                    classes:format_clas
                };
                format.push(temp);
                format_clas=[];
                temp={};
            }
            this.Logger.info(JSON.stringify(format));
            return format;
        } catch (error) {
            this.Logger.errro('Error in function getAllSubjectsWithClassesForTeacher'+error);
            throw(error);   
        }
    }
}