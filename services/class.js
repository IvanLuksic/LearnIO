module.exports= class clas{
    constructor(clas,user,class_student,subject,logger)
    {
        this.Clas=clas;
        this.User=user;//student ili ucitelj
        this.Class_student=class_student;
        this.Subject=subject;
        this.Logger=logger;
    }
    async getAllClassAndSubjectsForAdmin()
    {
        try {
            const classes=await this.Clas.findAll({
                include:{
                    model:this.Subject,
                    as:'subject_class',
                    through: { attributes: [] }
                }
            });
            let format=[];
            let format2=[];
            let temp={};
            for(let clas of classes)
            {
                for(let subject of clas.subject_class)
                {
                    temp={
                        subject_id:subject.id,
                        subject_name:subject.name
                    };
                    format2.push(temp);
                    temp={};
                }
                temp={
                    class_id: clas.id,
                    class_name:clas.name,
                    class_year:clas.school_year,
                    subjects:format2
                };
                format.push(temp);
                temp={};
                format2=[];
            }
            for(let x of format)
            this.Logger.info(JSON.stringify(x));
            return format;
        } catch (error) {
            this.Logger.error('Error in function  getAllClassForAdmin'+error);
            throw(error);
        }
    }
    async getAllClassAndSubjectsForStudent(students_id)//pronac samo razrede i predemte u koje je upisan zadani student
    {
        try {
            try {
                var classes=await this.User.findAll({//rezultat će biti classes niz sa samo 1 clanom jer izvlacimo podatke za samo 1 studenta-> samo 1 id koji nam nije bitan ,zanimaju nas razredi i predemti
                    attributes:['id'],
                    include:{
                        model:this.Clas,
                        as:'classes_student',
                       through: { attributes: [] },
                       include:{
                        model:this.Subject,
                        as:'subject_class',
                        through: { attributes: [] }
                       }
                    },
                    where:{
                        id:students_id//samo za onog studenta ciji je to id-> ovo se odnosi na tablicu user-> dobijemo samo parove razred predmet u kojima je upisan taj student
                    }
                });
            } catch (error) {
                this.Logger.error('Error in fetching classes from dataabse');
                throw(error);
            }
            this.Logger.info('Classes succesfuly fetched from database');
            let format=[];
            let format2=[];
            let temp={};
            for(let i=0;i<classes[0].classes_student.length;i++)//pisemo classes[0] jer vanjski niz ima samo 1 clana jer nas zanima samo 1 student pa preko njega pristupamo ostalim podnizovima
            {
                for(let j=0;j<classes[0].classes_student[i].subject_class.length;j++)
                {
                    temp={
                        subject_id:classes[0].classes_student[i].subject_class[j].id,
                        subject_name:classes[0].classes_student[i].subject_class[j].name
                    };
                    format2.push(temp);
                    temp={};
                }
                temp={
                    class_id:classes[0].classes_student[i].id,
                    class_name:classes[0].classes_student[i].name,
                    class_year:classes[0].classes_student[i].school_year,
                    subjects:format2
                };
                format.push(temp);
                temp={};
                format2=[];
            }
            this.Logger.info(JSON.stringify(format));
            return format;
        } catch (error) {
            this.Logger.error('Error in function getAllClassForStudent '+error);
            throw(error);
        }
    }
    async getAllClassAndSubjectsForTeacher(teachers_id)
    {
        try {
            try {
                var classes=await this.User.findAll({//rezultat će biti classes niz sa samo 1 clanom jer izvlacimo podatke za samo 1 teachera-> samo 1 id koji nam nije bitan ,zanimaju nas razredi i predemti
                    attributes:['id'],
                    include:{
                        model:this.Clas,
                        as:'classes_teacher',
                       through: { attributes: [] },
                       include:{
                        model:this.Subject,
                        as:'subject_class',
                        through: { attributes: [] }
                       }
                    },
                    where:{
                        id:teachers_id//samo za onog steachera ciji je to id-> ovo se odnosi na tablicu user-> dobijemo samo parove razred predmet u kojima je upisan taj student
                    }
                });
            } catch (error) {
                this.Logger.error('Error in fetching classes from dataabse');
                throw(error);
            }
            this.Logger.info('Classes succesfuly fetched from database');
            let format=[];
            let format2=[];
            let temp={};
            for(let i=0;i<classes[0].classes_teacher.length;i++)//pisemo classes[0] jer vanjski niz ima samo 1 clana jer nas zanima samo 1 student pa preko njega pristupamo ostalim podnizovima
            {
                for(let j=0;j<classes[0].classes_teacher[i].subject_class.length;j++)
                {
                    temp={
                        subject_id:classes[0].classes_teacher[i].subject_class[j].id,
                        subject_name:classes[0].classes_teacher[i].subject_class[j].name
                    };
                    format2.push(temp);
                    temp={};
                }
                temp={
                    class_id:classes[0].classes_teacher[i].id,
                    class_name:classes[0].classes_teacher[i].name,
                    class_year:classes[0].classes_teacher[i].school_year,
                    subjects:format2
                };
                format.push(temp);
                temp={};
                format2=[];
            }
            this.Logger.info(JSON.stringify(format));
            return format;
        } catch (error) {
            this.Logger.error('Error in function getAllClassForTeacher '+error);
            throw(error);
        }
    }
    async getAllClasses()
    {
        try {
            try {
                var classes=await this.Clas.findAll();
            } catch (error) {
                this.Logger.error('Error fetching classes from database');
            }
            let format=[];
            let temp={};
            for(let clas of classes)
            {
                temp={
                    class_id:clas.id,
                    class_name:clas.name,
                    class_year:clas.school_year
                };
                format.push(temp);
                temp={};
            }
            this.Logger.info(JSON.stringify(format));
            return format;
        } catch (error) {
            this.Logger.error('error in function getAllClasses'+error);
            throw(error);
        }
    }
    async getClassesForTeacher(teachers_id)
    {
        try {
            try {
                var classes=await this.User.findAll({
                    attributes:['id'],
                    include:{
                        model:this.Clas,
                        as:'classes_teacher',
                        through: { attributes: [] }
                    },
                    where:{
                        id:teachers_id
                    }
                });
            } catch (error) {
                this.Logger.error('Error in fetching classes for teacher from database');
                throw(error);
            }
            this.Logger.info('Classes for teacher fetched succesfuly from database');
            let format=[];
            let temp={};
            for(let i=0;i<classes[0].classes_teacher.length;i++)
            {
                temp={
                    class_id:classes[0].classes_teacher[i].id,
                    class_name:classes[0].classes_teacher[i].name,
                    class_year:classes[0].classes_teacher[i].school_year
                };
                format.push(temp);
                temp={};
            }
            for(let clas of format)
            this.Logger.info(JSON.stringify(clas));
            return format;
        } catch (error) {
            this.Logger.error('Error in function getClassesForTeacher'+error);
            throw(error);
        }
    }
    async addClass(request)//request body objektz s podacima za unos
    {
        try {//provjeriti jeli postoji vec isti taj razred
            var clas=await this.Clas.findOne({
                where:{
                    name:request.class_name,
                    school_year:request.class_year
                }
            });
            if(!clas)//ne postoji vec taj razred
            {
               const new_clas= await this.Clas.create({
                    name:request.class_name,
                    school_year:request.class_year
                });
               /* ZASAD NE UNOSIMO STUDENTE U CLASS JER BI BILO NEPRAKTICNO PA CEMO PROBAT PREKO INVITE LINKA for(let i=0;i<request.student_id.length;i++)//povezi sve studente s tin razredon
                {
                    await this.Class_student.create({
                        student_id:request.student_id[i],
                        class_id:new_clas.id//id novog dodanog razreda
                    });
                }*/
                this.Logger.info('Class inserted succesfuly');
            }
            else throw(new Error('Defined class already exists'));
        } catch (error) {
            this.Logger.error('Error in function addClass'+error);
            throw(error);
        }
    }
  
}