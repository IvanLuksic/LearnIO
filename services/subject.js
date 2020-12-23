module.exports= class subject{
    constructor(subject,clas,user,logger)
    {
        this.Subject=subject;
        this.Clas=clas;
        this.User=user;//npr za ucitelja izlistat sve njegove predmete
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

    }
    
}