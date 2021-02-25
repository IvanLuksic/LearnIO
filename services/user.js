const { Op } = require("sequelize");
const config=require('../config');
const hash=require('./crypto');
const {sequelize}=require('../models');
const { QueryTypes } = require('sequelize');
const session_store=require('../loaders/session_store');
module.exports=class user {
    constructor(user,clas,class_student,result,save,session,teacher_subject,invite_links,class_of_teacher,one_time_password,logger)
    {
        this.User=user;
        this.Clas=clas;
        this.Class_student=class_student;
        this.Result=result;
        this.Save=save;
        this.Session=session;
        this.Teacher_subject=teacher_subject;
        this.Invite_links=invite_links;
        this.One_time_password=one_time_password;
        this.Class_of_teacher=class_of_teacher;
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
                password:await hash(properties.password),//string
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
    async getAllStudentsWithClassForClass(clas_id)//za studente iz tog odabranog razreda dohvatit njihove podatke i sve ostale razrede u kojima se nalaze
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
                    user_type:config.roles.student
                }
            });
            let student_ids=[];
            for(let student of students)
            student_ids.push(student.id);
            this.Logger.info(JSON.stringify(students));
            var students_with_classes=await this.User.findAll({
                attributes:['id','name','surname','mail','username','created_at'],
                include:{
                    model:this.Clas,
                    as:'classes_student',
                    through: { attributes: [] },
                },
                where:{
                    id:{
                        [Op.in]:student_ids
                    },
                    user_type:config.roles.student//doatno osiguranje da dohvati samo studente
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
            this.Logger.error('Error in function getAllStudentsForClass'+error);
            throw(error);
        }
    }
    async getAllStudentsWithClassesAdmin()//sve
    {
        try {
            try {
                var students_with_classes=await this.User.findAll({
                    attributes:['id','name','surname','mail','username','created_at'],
                    include:{
                        model:this.Clas,
                        as:'classes_student',
                        through: { attributes: [] },
                    },
                    where:{
                        user_type:config.roles.student
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
                        user_type:config.roles.student//DOHVATI SAMO STUDENTE,OSIGURAMO SE ZA SVAKI SLUCAJ
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
    async getAllUsers(user_type)//dohvati sve podatke o svim korisnicima odredenog tipa/role
    {
        try {
            const users=await this.User.findAll({
                attributes:['id','name','surname','mail','username','created_at'],
                where:{
                    user_type:user_type
                }
            });
            let format=[];
            let temp={};
            for(let user of users)
            {
                let date=new Date(Date.parse(user.created_at));
                let date_format=date.getDate().toString()+' '+(date.getMonth()+1).toString()+' '+date.getFullYear().toString()+' '+date.getHours().toString()+'h '+date.getMinutes().toString()+'m ';
                temp={
                    id:user.id,
                    name:user.name,
                    surname:user.surname,
                    email:user.mail,
                    username:user.username,
                    created:date_format
                };
                format.push(temp);
                temp={};
            }
            this.Logger.info(JSON.stringify(format));
            return format;
        } catch (error) {
            this.Logger.error('Error in function getAllUsers'+error);
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
            if(user.user_type==config.roles.student)
            {
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
            }
            if(user.user_type==config.roles.teacher)
            {
                await this.Teacher_subject.destroy({
                    where:{
                        teacher_id:user_id
                    }
                });
                await this.Class_of_teacher.destroy({
                    where:{
                        teacher_id:user_id
                    }
                })
            }
            if(user.user_type==config.roles.admin || user.user_type==config.roles.teacher)
            {
                await this.Invite_links.destroy({
                    where:{
                        creator_id:user_id
                    }
                });
            }
             //+ dodat da izbrise njegove session cookiese u mmeory store + vodit računa da se ne može logirat 2 puta ako već ima cookie-> ne dat mu login botun nigdi
             await this.Session.destroy({
                where:{
                    user_id:user_id
                }
            });
             await this.User.destroy({
                where:{
                    id:user_id
                }
            });
            let results=await sequelize.query('SELECT * FROM user_session',{
                type:QueryTypes.SELECT,
                 raw:true
              });
              //dohvati sve sessionse od tog usera
            let sessions=[];//svi session cookiesi(njighovi idovi) koji su izdani tom useru-> u pravilu bi treba bit samo 1 ali ako je on npr brisa cookie pa smo mu ponovo izdali novi pokrijemo i te slučajeve pa zato stavljamo da je ovo niz
            for(let i=0;i<results.length;i++)
            {
                if(results[i].sess.user==user_id)
                this.Logger.info(rsults[i].sid);
                sessions.push(results[i].sid);
            }
            //brisi ih sve
            for(let i=0;i<sessions.length;i++)
            {
                session_store.destroy(sessions[i]);//dajemo mu sid
                this.Logger.info('Deleted session: '+sessions[i]);
            }
            await this.One_time_password.destroy({//ako postoji OTP igdi
                where:{
                    user_id:user_id
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
                    id:properties.id,
                    user_type:config.roles.student
                }
            });
            if(student)//postoji student + novi username nije zauzet-> username se provjerava na client strani
            {
            student.name=properties.name;
            student.surname=properties.surname;
            student.mail=properties.email;
            student.username=properties.username;
           // student.password=await hash(properties.password); to se radi u drugoj formi
            student.date_of_birth=properties.date_of_birth;
            await this.Class_student.destroy({
                where:{
                    [Op.and]: [
                        {student_id:properties.id},
                        {class_id:{
                            [Op.notIn]:properties.classes//izbrisi sve koji posotje u tablici a nisu u dobivenom nizu-> IZBRISAO IH JE KORISNIK
                        }
                    }
                    ]
                }
            })
            //dodaj u bazu NOVE RAZREDE KOJIMA JE KORISNIK PRIDRUZIO STUDENTA
            for(let i=0;i<properties.classes.length;i++)//dobivamo i niz razreda kojima student pripada koji se mogu mijenjat-> dodavat novi ili micat stari
            {
                await this.Class_student.findOrCreate({//ako je doda nove napravit ce samo njih
                    where:{//uvjeti po kojima trazimo
                        class_id:properties.classes[i],
                        student_id:properties.id
                    },
                    default:{// u slucaju da se ne pronade-> kakvu zelimo instnacu kreirati ako ne postoji vec u bazi
                        class_id:properties.classes[i],
                        student_id:properties.id
                    }
                })
            }
            await student.save();
            }
            else throw(new Error('Student does not exist'));
        } catch (error) {
            this.Logger.error('Error in function updateStudent'+error);
            throw(error);
        }
    }
    async updateTeacherData(properties)
    {
        try {
           this.Logger.info(' u izradi');
        } catch (error) {
            this.Logger.error('Error in function updateTeacherData'+error);
            throw(error);
        }
    }
    async getAllTeachers()
    {
        try {
            let teachers=await this.User.findAll({
                where:{
                    role:parseInt(config.roles.teacher)
                }
            });
            let temp={};
            let format=[];
            for(let teacher of format)
            {
                format={
                    teacher_name:teacher.name,
                    teacher_surname:teacher.surname,
                    teacher_id:teacher.id
                };
                teachers.push(format);
                format={};
            }
            return format;
        } catch (error) {
            this.Logger.error('Error in function getAllTeachers'+error);
            throw(error);
        }
    }
}