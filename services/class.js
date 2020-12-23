module.exports= class clas{
    constructor(clas,user,class_student,logger)
    {
        this.Clas=clas;
        this.User=user;//student ili ucitelj
        this.Class_student=class_student;
        this.Logger=logger;
    }
    async getAllClassForAdmin()
    {
        try {
            const classes=await this.Clas.findAll();
            let format=[];
            let temp={};
            for(let clas of classes)
            {
                temp={
                    class_id: clas.id,
                    class_name:clas.name,
                    class_year:clas.school_year
                };
                format.push(temp);
                temp={};
            }
            this.Logger.info(JSON.stringify(format));
            return format;
        } catch (error) {
            this.Logger.error('Error in function  getAllClassForAdmin'+error);
            throw(error);
        }
    }
    async getAllClassForStudent(students_id)
    {
        try {
            try {
                var classes=await this.Clas.findAll({
                    attributes:['id','name','school_year'],
                    include:{
                        model:this.User,
                       attributes:['id'],
                       as:'Students_class',
                       through: { attributes: [] },
                       where:{
                           id:students_id//samo za onog studenta ciji je to id-> ovo se odnosi na tablicu user
                       }
                    }
                });
            } catch (error) {
                this.Logger.error('Error in fetching classes from dataabse');
                throw(error);
            }
            this.Logger.info('Classes succesfuly fetched from database');
            let format=[];
            let temp={};
            for(let clas of classes)
            {
                temp={
                    class_id:clas.id,
                    class_name:clas.name,
                    class_year:clas.school_year
                };
                this.Logger.info(JSON.stringify(temp));
                format.push(temp);
                temp={};
            }
            return format;
        } catch (error) {
            this.Logger.error('Error in function getAllClassForStudent '+error);
            throw(error);
        }
    }
    async getAllClassForTeacher(teachers_id)
    {
        try {
            try {
                var classes=await this.Clas.findAll({
                    attributes:['id','name'],
                    include:{
                        model:this.User,
                       attributes:['id'],
                       as:'Teachers_class',
                       through: { attributes: [] },
                       where:{
                           id:teachers_id//ovo se odnosi na tablicu teacher
                       }
                    }
                });
            } catch (error) {
                this.Logger.error('Errro in fetching classes from dataabse');
                throw(error);
            }
            this.Logger.info('Classes succesfuly fetched from database');
            let format=[];
            let temp={};
            for(let clas of classes)
            {
                temp={
                    class_id:clas.id,
                    class_name:clas.name,
                    class_year:clas.school_year
                };
                this.Logger.info(JSON.stringify(temp));
                format.push(temp);
                temp={};
            }
            return format;
        } catch (error) {
            this.Logger.error('Error in function getAllClassForTeacher '+error);
            throw(error);
        }
    }
    async addClass(request)//request body objektz s podacima za unos
    {
        try {//provjertiv jeli postoji vec isti taj razred
            const clas=this.Clas.findOne({
                where:{
                    name:request.name,
                    school_year:request.school_year
                }
            });
            if(!clas)//ne postoji vec taj razred
            {
                await this.Clas.create({
                    name:request.name,
                    school_year:request.school_year
                });
                const added_class_id=await this.Clas.findOne({//izvuci PK od tog dodanog razreda da ga mozemo povezat sa studentima
                    attributes:['id'],
                    where:{
                        name:request.name,
                        school_year:request.school_year
                    }
                })
                for(let i=0;i<request.student_id.length;i++)//povezi sve studente s tin razredon
                {
                    await this.Class_student.create({
                        student_id:request.student_id[i],
                        class_id:added_class_id
                    });
                }
                this.Logger.info('Class inserted succesfuly');
            }
            else throw(new Error('Defined class already exists'));
        } catch (error) {
            this.Logger.error('Error in function addClass'+error);
            throw(error);
        }
    }
  
}