const { Op } = require("sequelize");
const { format } = require("winston");
module.exports=class user {
    constructor(user,clas,logger)
    {
        this.User=user;
        this.Clas=clas;
        this.Logger=logger
    }
    async addUser(properties)//ovdje ce doc req.body po unaprojed dogovorenom formatu
    {
        try {//provjerti jeli postoji vec taj korisnik
            const user=await this.User.findOne({
                where:{
                    username:properties.username
                }
            });
            if(!user)//ako je vratio null-> ne postoji korisnik s tin usernameon-> dodaj ga
            {
            await this.User.create({
                name:properties.name,
                surname:properties.surname,
                mail:properties.mail,
                date_of_birth:properties.date_of_birth,
                username:properties.username,
                password:properties.password,
                created_at:properties.created_at,
                user_type:properties.user_type,
            });
            this.Logger.info('User added sucessfuly into database');
        }
        else {
            throw(new Error('Username '+properties.username+' already exists'));
        }
        } catch (error) {
            this.Logger.error('Error in function addUser'+error);
            throw(error);
        }
    }
    async getAllStudentsForClassWithAllClasses(clas_id)//za studente iz tog odabranog razreda dohvatit njihove podatke i sve ostale razrede u kojima se nalaze
    {
        try {
            //1.Dohvatit sve student idove iz tog razreda
            const students=await this.User.findAll({
                attributes:['id'],
                include:{
                    attributes:['id'],
                    model:this.Clas,
                    as:'classes_student',
                    through: { attributes: [] },
                    where:{
                        id:clas_id
                    }
                },
            });
            let student_ids=[];
            for(let student of students)
            student_ids.push(student.id);
            this.Logger.info(JSON.stringify(students));
            const students_with_classes=await this.User.findAll({
                attributes:['id','name','surname','mail','username','created_at'],
                include:{
                    model:this.Clas,
                    as:'classes_student',
                    through: { attributes: [] },
                },
                where:{
                    id:{
                        [Op.in]:student_ids
                    }
                }
            });
            let format=[];
            let format_classes=[];
            let temp={};
            for(let student of students_with_classes)
            {
               for(let clas of student.classes_student)
               {
                temp={
                    class_id:clas.id,
                    class_name:clas.name,
				    class_year:clas.school_year
                };
                format_classes.push(temp);
                temp={};
               }
               this.Logger.info(student.created_at)
               let date=new Date(Date.parse(student.created_at));
               let date_format=date.getDate().toString()+' '+(date.getMonth()+1).toString()+' '+date.getFullYear().toString()+' '+date.getHours().toString()+'h '+date.getMinutes().toString()+'m ';
               temp={
                id:student.id,
                name:student.name,
                surname:student.surname,
                email:student.mail,
                username:student.username,
                created:date_format,
                classes:format_classes
               };
               format.push(temp);
               temp={};
            }
           this.Logger.info(JSON.stringify(format));
           return format;
        } catch (error) {
            this.Logger.error('Error in function getAllStudentsForClass'+error);
            throw(error);
        }
    }
    async getAllStudents()
    {
        try {
            const students=await this.User.findAll({
                attributes:['id','name','surname','mail','username','created_at']
            });
            let format=[];
            let temp={};
            for(let student of students)
            {
                let date=new Date(Date.parse(student.created_at));
                let date_format=date.getDate().toString()+' '+(date.getMonth()+1).toString()+' '+date.getFullYear().toString()+' '+date.getHours().toString()+'h '+date.getMinutes().toString()+'m ';
                temp={
                    id:student.id,
                    name:student.name,
                    surname:student.surname,
                    email:student.mail,
                    username:student.username,
                    created:date_format
                };
                format.push(temp);
                temp={};
            }
            this.Logger.info(JSON.stringify(format));
            return format;
        } catch (error) {
            this.Logger.error('Error in function getAllStudents'+error);
            throw(error);
        }
    }
}