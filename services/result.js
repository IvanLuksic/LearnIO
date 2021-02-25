const { Op } = require("sequelize");
const config=require('../config');
module.exports= class result{
    constructor(result,user,subject,course,topic,assesment,clas,logger)
    {
        this.Result=result;
        this.User=user;
        this.Course=course;
        this.Topic=topic;
        this.Subject=subject;
        this.Assesment=assesment;
        this.Clas=clas;
        this.Logger=logger;
    }
    //1. Ubaci u tablicu rezultati kada se odredeni topic tek otkljuca
    async insertIntoResults(subjects_id,courses_id,topics_id,clas_id,students_id)
    {
        //1. Saznat broj stupaca tog topica da znamo koliki niz trebamo alocirat
        try {
            try {
                var topic=await this.Topic.findOne({
                    attributes:['column_numbers'],
                    where:{
                        id:topics_id
                    }
                });
                this.Logger.info('Topic column fetched succsfully'+topic.column_numbers);
            } catch (error) {
                this.Logger.error('Error in fetching column numbers of topic');
                throw(error);
            }
            var results=[];//niz rezultata po stupcima-> za pocetak 0 sve
            for(let i=0;i<topic.column_numbers;i++)
                results.push(0);
            try {
                await this.Result.create({
                    grade:0,
                    result_array_by_columns:results,
                    status:config.colors.red,
                    subject_id:subjects_id,
                    course_id:courses_id,
                    topic_id:topics_id,
                    class_id:clas_id,
                    student_id:students_id
                });
                this.Logger.info('Inserted into table Results succesfuly');
            } catch (error) {
                this.Logger.error('Error in inserting into table results');
                throw(error);
            }

        } catch (error) {
            this.Logger.error('Error in function insertIntoResults'+error);
            throw(error);
        }
    }
    //2. Dohvati SVE rezultate za ispis na formi
    async getAllAdminResults()
    {
        try {
            try {
                var results=await this.Result.findAll({
                    attributes:['grade','result_array_by_columns'],
                    include:[{model:this.Course,attributes:['id','name']},
                            {model:this.Topic,attributes:['name','id','rows_D','column_numbers'],
                            include:{
                            model:this.Assesment,
                            attributes:['id','name'],
                            as:'assesments_topic',
                            through: { attributes: [] },
                            }
                            },
                            {model:this.Subject,attributes:['name']},
                            {model:this.User,attributes:['id','name','surname']},
                            {model:this.Clas,attributes:['name','school_year']}
                        ]
                });
                this.Logger.info('Results succesfuly fetched from database');
            } catch (error) {
                this.Logger.error('Error in fetching results from database');
                throw(error);
            }
            for(let i=0;i<results.length;i++)
                this.Logger.info(JSON.stringify(results[i]));
            var temp={};
            var format=[];//formatirat ih u niz
            for(let result of results)
            {
                temp={
                    grade:result.grade,
                    result_array_by_columns:result.result_array_by_columns,
                    course_id:result.course.id,
                    course:result.course.name,
                    topic:result.topic.name,
                    topic_id:result.topic.id,
                    subject:result.subject.name,
                    columns:result.topic.column_numbers,
                    rows:result.topic.rows_D,
                    assesments:result.topic.assesments_topic,
                    student_id:result.user.id,
                    name:result.user.name,
                    surname:result.user.surname,
                    class_name:result.cla.name,//SEQUELIZE IZBACUJE s KADA IME PROPERTYA ZAVRSAVA S NJIM-> class pretvori u cla
                    class_year:result.cla.school_year
                }
                format.push(temp);
                temp={};
            }
            for(let i=0;i<format.length;i++)
            {
                this.Logger.info(JSON.stringify(format[i]));
            }
            return format;
        } catch (error) {
            this.Logger.error('Error in function getAllAdminResults' + error);
            throw(error);
        }
    }
    async getAllStudentResults(students_id)//dohvat rezultata od određenog studenta
    {
        try {
            try {
                var results=await this.Result.findAll({
                    attributes:['grade','result_array_by_columns'],
                    include:[{model:this.Course,attributes:['id','name']},
                            {model:this.Topic,attributes:['name','id','rows_D','column_numbers'],
                            include:{
                            model:this.Assesment,
                            attributes:['id','name'],
                            as:'assesments_topic',
                            through: { attributes: [] },
                            }
                            },
                            {model:this.Subject,attributes:['name']},
                            {model:this.User,attributes:['id','name','surname']},
                            {model:this.Clas,attributes:['name','school_year']}
                        ],
                        where:{//SAMO ZA ODREDENOG STUDENTA
                            student_id:students_id
                        }
                });
                this.Logger.info('Results succesfuly fetched from database');
            } catch (error) {
                this.Logger.error('Error in fetching results from database');
                throw(error);
            }
           /* for(let i=0;i<results.length;i++)
                this.Logger.info(JSON.stringify(results[i]));*/
            var temp={};
            var format=[];//formatirat ih u niz
            for(let result of results)
            {
                temp={
                    grade:result.grade,
                    result_array_by_columns:result.result_array_by_columns,
                    course_id:result.course.id,
                    course:result.course.name,
                    topic:result.topic.name,
                    topic_id:result.topic.id,
                    subject:result.subject.name,
                    columns:result.topic.column_numbers,
                    rows:result.topic.rows_D,
                    assesments:result.topic.assesments_topic,
                    student_id:result.user.id,
                    name:result.user.name,
                    surname:result.user.surname,
                    class_name:result.cla.name,//SEQUELIZE IZBACUJE s KADA IME PROPERTYA ZAVRSAVA S NJIM-> class pretvori u cla
                    class_year:result.cla.school_year
                }
                format.push(temp);
                temp={};
            }
            for(let i=0;i<format.length;i++)
            {
                this.Logger.info(JSON.stringify(format[i]));
            }
            return format;
        } catch (error) {
            this.Logger.error('Error in function  getAllStudentResults' + error);
            throw(error);
        }
    }
    async getAllTeacherResults(teacher_id)//dohvatit samo rezultate onih razreda i onih predmeta kojima predaje ucitelj-> 
    {//class_id mora bit iz liste razreda kojima predaje ucitelj i subject_id iz liste predemta kojima predaje ucitelj ISTOVREMENO-> AND
        try {
            try {
                //Dohvatit listu id-ova razreda i predemta kojima zadani ucitelj predaje
                let clas=await this.Clas.findAll({
                    attributes:['id'],
                    include:{
                        model:this.User,
                        as:'Teachers_class',
                        through: { attributes: [] },
                        where:{
                            id:teacher_id//id u tablici user
                        }
                    }
                });
                let classes=[];
                for(let i=0;i<clas.length;i++)
                {
                    classes.push(clas[i].id);
                }
                this.Logger.info('Class ids fetched succesfuly'+JSON.stringify(classes));
                let subject=await this.Subject.findAll({
                    attributes:['id'],
                    include:{
                        model:this.User,
                        as:'Teachers_subject',
                        through: { attributes: [] },
                        where:{
                            id:teacher_id
                        }
                    }
                });
                let subjects=[];
                for(let i=0;i<subject.length;i++)
                {
                    subjects.push(subject[i].id);
                }
                this.Logger.info('Subjects fetched succesfuly '+JSON.stringify(subjects));
                var results=await this.Result.findAll({
                    attributes:['grade','result_array_by_columns'],
                    include:[{model:this.Course,attributes:['id','name']},
                            {model:this.Topic,attributes:['name','id','rows_D','column_numbers'],
                            include:{
                            model:this.Assesment,
                            attributes:['id','name'],
                            as:'assesments_topic',
                            through: { attributes: [] },
                            }
                            },
                            {model:this.Subject,attributes:['name']},
                            {model:this.User,attributes:['id','name','surname']},
                            {model:this.Clas,attributes:['name','school_year']}
                        ],
                        where:{
                            [Op.and]:[{
                                class_id:{//nije dovoljno samo provjerit samo razred jer bi onda izbacilo rezultate iz tog razreda iz ostalih predemta
                                [Op.in]:classes
                                }
                            },
                        {
                           subject_id:{//nije dovoljno samo provjerit predmet jer bi onda izbacilo sve ostale razrede u kojima je taj predmet a neki drugi ucitelj npr
                               [Op.in]:subjects
                           } 
                        }]
                        }//-> potrebno provjeitt istovrmeneno i razred i predmet da se nalaze u listi
                });
            } catch (error) {
                this.Logger.error('Error in fetching results from database');
                throw(error);
            }
            var temp={};
            var format=[];//formatirat ih u niz
            for(let result of results)
            {
                temp={
                    grade:result.grade,
                    result_array_by_columns:result.result_array_by_columns,
                    course_id:result.course.id,
                    course:result.course.name,
                    topic:result.topic.name,
                    topic_id:result.topic.id,
                    subject:result.subject.name,
                    columns:result.topic.column_numbers,
                    rows:result.topic.rows_D,
                    assesments:result.topic.assesments_topic,
                    student_id:result.user.id,
                    name:result.user.name,
                    surname:result.user.surname,
                    class_name:result.cla.name,//SEQUELIZE IZBACUJE s KADA IME PROPERTYA ZAVRSAVA S NJIM-> class pretvori u cla
                    class_year:result.cla.school_year
                }
                format.push(temp);
                temp={};
            }
            for(let i=0;i<format.length;i++)
            {
                this.Logger.info(JSON.stringify(format[i]));
            }
            return format;
        } catch (error) {
            this.Logger.error('Error in function getAllTeacherResults'+error);
            throw(error);
        }
    }
   
}