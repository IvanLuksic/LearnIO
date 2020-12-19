module.exports= class clas{
    constructor(clas,user,logger)
    {
        this.Clas=clas;
        this.User=user;//student ili ucitelj
        this.Logger=logger;
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
}