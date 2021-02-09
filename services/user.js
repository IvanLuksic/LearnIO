const { Op } = require("sequelize");
const { format } = require("winston");
module.exports=class user {
    constructor(user,clas,class_student,result,save,session,teacher_subject,invite_links,logger)
    {
        this.User=user;
        this.Clas=clas;
        this.Class_student=class_student;
        this.Result=result;
        this.Save=save;
        this.Session=session;
        this.Teacher_subject=teacher_subject;
        this.Invite_links=invite_links;
        this.Logger=logger;
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
                created_at:new Date(),
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
    async getAllStudentsWithClassForClass(clas_id,isadmin)//za studente iz tog odabranog razreda dohvatit njihove podatke i sve ostale razrede u kojima se nalaze
    {
        try {
            //1.Dohvatit sve student idove iz tog razreda-> JER KAD BI JOINALI SA TIM RAZREDOM ONDA BI DOBILI SAMO PODTKE O STUDENTIMA A NAMA TREBAJU SVI RAZREDI OD TIH STUDENTA-> 2 PRISTUPA-> 1. JE DOHVATIT IDOVE STUDENTA IZ TOG RAZREDA I ZA NJIH DOHVACAT NJIOHVE RAZREDE
                                                                                                                                                                                    //2. PRISTUP DOHVATIT SVE STUDENTE PA IZ NJIH IZDVOJIT ONE KOJIMA IMAJU TAJ CLASSID-> GORE JER DIOHVACAMO NEPOTREBNE PODATKE + FOR PETLJA N^2 JER ZA SVAKOG VRTIMO OPET PROLAZAK KROZ NJEGOVU LISTU RAZREDA 
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
                where:{//osiguramo se za svaki slucaj da dohvati samo studente
                    user_type:process.env.STUDENT
                }
            });
            let student_ids=[];
            for(let student of students)
            student_ids.push(student.id);
            this.Logger.info(JSON.stringify(students));
            var students_with_classes=await this.User.findAll({
                attributes:['id','name','surname','mail','username','password','created_at'],
                include:{
                    model:this.Clas,
                    as:'classes_student',
                    through: { attributes: [] },
                },
                where:{
                    id:{
                        [Op.in]:student_ids
                    },
                    user_type:process.env.STUDENT//doatno osiguranje da dohvati samo studente
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
                    id:clas.id,
                    name:clas.name,
				    year:clas.school_year
                };
                format_classes.push(temp);
                temp={};
               }
               this.Logger.info(student.created_at)
               let date=new Date(Date.parse(student.created_at));
               let date_format=date.getDate().toString()+' '+(date.getMonth()+1).toString()+' '+date.getFullYear().toString()+' '+date.getHours().toString()+'h '+date.getMinutes().toString()+'m ';
               if(isadmin)//admin ->dohvati password
               {
               temp={
                id:student.id,
                name:student.name,
                surname:student.surname,
                email:student.mail,
                username:student.username,
                password:student.password,
                created:date_format,
                classes:format_classes
               };
            }else {//ucitelj-> bez passworda
                temp={
                    id:student.id,
                    name:student.name,
                    surname:student.surname,
                    email:student.mail,
                    username:student.username,
                    created:date_format,
                    classes:format_classes
                   };
            }
               format.push(temp);
               format_classes=[];
               temp={};
            }
           this.Logger.info(JSON.stringify(format));
           return format;
        } catch (error) {
            this.Logger.error('Error in function getAllStudentsForClass'+error);
            throw(error);
        }
    }
    async getAllStudentsWithClassesAdmin()//sve
    {
        try {
            try {
                var students_with_classes=await this.User.findAll({
                    attributes:['id','name','surname','mail','username','password','created_at'],
                    include:{
                        model:this.Clas,
                        as:'classes_student',
                        through: { attributes: [] },
                    },
                    where:{
                        user_type:process.env.STUDENT
                    }
                });
            } catch (error) {
                this.Logger.error('Error in fetching all students for admin from database');
                throw(error);
            }
            this.Logger.info('All students fetched succesfuly from database');
            let format=[];
            let format_classes=[];
            let temp={};
            for(let student of students_with_classes)
            {
               for(let clas of student.classes_student)
               {
                temp={
                    id:clas.id,
                    name:clas.name,
				    year:clas.school_year
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
                password:student.password,
                created:date_format,
                classes:format_classes
               };
               format.push(temp);
               format_classes=[];
               temp={};
            }
            this.Logger.info(JSON.stringify(format));
            return format;
        } catch (error) {
            this.Logger.error('Error in function getAllStudentsWithClassesAdmin'+error);
            throw(error);
        }
    }
    async  getAllStudentsWithClassesTeacher(teachers_id)//joinat studenta po razredu i onda razred sa uciteljen-> dobit cemo id-ove studenata koji se nalaze u razredima koje predaje teacher
    {
        try {
            try {
                var teachers_students_ids=await this.User.findAll({
                    attributes:['id'],
                    include:{
                        model:this.Clas,
                        attributes:['id'],
                        through: { attributes: [] },
                        as:'classes_student',
                        include:{//JOINAT SVE RAZREDE S UCITELJEM-> OSTANU SAMO ONI RAZREDI KOJIMA PREDAJE TAJ UCITELJ
                            model:this.User,
                            attributes:['id'],
                            through: { attributes: [] },
                            as:'Teachers_class',
                            where:{//samo razrede od tog ucitelja
                                id:teachers_id
                            }
                        }
                    },
                    where:{
                        user_type:process.env.STUDENT//DOHVATI SAMO STUDENTE,OSIGURAMO SE ZA SVAKI SLUCAJ
                    }
                });
                this.Logger.info('Student ids fetched correctly');
                let student_ids=[];
                this.Logger.info(JSON.stringify(teachers_students_ids));
                for(let student of teachers_students_ids)
                student_ids.push(student.id);//niz idova stduenta kojima predaje taj ucitelj odnosno koji se nalaze u razredima kojima predaje taj ucitelj
                let students_with_classes=await this.User.findAll({
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
                        id:clas.id,
                        name:clas.name,
                        year:clas.school_year
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
                   format_classes=[];
                   temp={};
                }
                this.Logger.info(JSON.stringify(format));
                return format;
            } catch (error) {
                this.Logger.error('Error in fetching students with classses for teacher');
                throw(error);
            }
        } catch (error) {
            this.Logger.error('Error in function getAllStudentsWithClassesTeacher'+error);
            throw(error);
        }
    }
    async getAllStudents()//bez razreda,samo studenti
    {
        try {
            const students=await this.User.findAll({
                attributes:['id','name','surname','mail','username','created_at'],
                where:{
                    user_type:process.env.STUDENT
                }
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
    async deleteUserFromDB(user_id)//izbrisi sve sta ima veze s userom u bazi
    {
        try {
            // Prvo ispitat jeli teacher jer za njega moramo brisat dio u tablici teacher subject a za ADMINA ili TEACHERA BRISAT i dio u INVITE LINK
           let user = await this.User.findOne({
                attributes:['id'],
                where:{
                    id:user_id
                }
            });
            //Sigurno postoji user jer ga inace nebi moga krenija brisat jer mu ne bi bio ponuden na ekranu
            await this.Class_student.destroy({
                where:{
                    student_id:user_id
                }
            });
            await this.Result.destroy({
                where:{
                    student_id:user_id
                }
            });
            await this.Save.destroy({
                where:{
                    student_id:user_id
                }
            });
            await this.Session.destroy({
                where:{
                    user_id:user_id
                }
            });
            if(user.user_type==process.env.TEACHER)
            {
                await this.Teacher_subject.destroy({
                    where:{
                        teacher_id:user_id
                    }
                });
            }
            if(user.user_type==process.env.ADMIN && user.user_type==process.env.TEACHER)
            {
                await this.Invite_links.destroy({
                    where:{
                        creator_id:user_id
                    }
                });
            }
             //+ dodat da izbrise njegove session cookiese u mmeory store + vodit računa da se ne može logirat 2 puta ako već ima cookie-> ne dat mu login botun nigdi
            await this.User.destroy({
                where:{
                    id:user_id
                }
            });
        } catch (error) {
            this.Logger.error('Error in function deleteUsertFromDB'+error);
            throw(error);
        }
    }
    async updateStudentData(properties)//saljemo sve iz request bodya
    {
        try {
            const student= await this.User.findOne({
                where:{
                    id:properties.id
                }
            });
            student.name=properties.name;
            student.surname=properties.surname;
            student.email=properties.email;
            student.username=properties.username;
            student.password=properties.password;
           // student.created_at:properties.created; zasad nepotrebno
            await student.save();
        } catch (error) {
            this.Logger.error('Error in function updateStudent')
        }
    }
}