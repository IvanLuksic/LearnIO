module.exports= class result{
    constructor(result,student,subject,course,topic,assesment,clas,logger)
    {
        this.Result=result;
        this.Student=student;
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
                    status:process.env.RED,
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
    async getAllResults()
    {
        try {
            try {
                var results=await this.Result.findAll({
                    attributes:['grade','result_array_by_columns'],
                    include:[{model:this.Course,attributes:['id','name']},
                            {model:this.Topic,attributes:['name','id','rows_D']},
                            {model:this.Subject,attributes:['name','column_number'],
                                include:{
                                model:this.Assesment,
                                attributes:['name'],
                                as:'Asessments_subject',
                                through: { attributes: [] }
                                }
                            },
                            {model:this.Student,attributes:['id','name','surname']},
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
                    columns:result.subject.column_number,
                    rows:result.topic.rows_D,
                    assesments:result.subject.Asessments_subject,
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
            this.Logger.error('Error in function getResults' + error);
            throw(error);
        }
    }
    //3. FILTAR po UČENIKU 
    async filterByStudent(student_name,student_surname)
    {
        try {
            try{
                var results=await this.Result.findAll({
                    attributes:['grade','result_array_by_columns'],
                    include:[{model:this.Course,attributes:['name']},
                            {model:this.Topic,attributes:['name','id','rows_D']},
                            {model:this.Subject,attributes:['name','column_number'],
                                include:{
                                model:this.Assesment,
                                attributes:['name'],
                                as:'Asessments_subject',
                                through: { attributes: [] }
                                }
                            },
                            {model:this.Student,attributes:['name','surname'],
                            where:{
                                name:student_name,
                                surname:student_surname
                                }
                            },
                            {model:this.Clas,attributes:['name','school_year']}
                        ]
                });
                this.Logger.info('Results filtered by student succesfuly fetched from database');
            } catch (error) {
                this.Logger.error('Error in fetching results from database'+error);
                throw(error);
            }
            var temp={};
            var format=[];//formatirat ih u niz
            for(let result of results)
            {
                temp={
                    grade:result.grade,
                    result_array_by_columns:result.result_array_by_columns,
                    course:result.course.name,
                    topic:result.topic.name,
                    topic_id:result.topic.id,
                    subject:result.subject.name,
                    columns:result.subject.column_number,
                    rows:result.topic.rows_D,
                    assesments:result.subject.Asessments_subject,
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
            this.Logger.error('Error in function filterByStudent'+error);
            throw(error);
        }
    }
    //4. FILTAR po RAZREDU
    async filterByClass(class_name,class_year)
    {
        try {
            try{
                var results=await this.Result.findAll({
                    attributes:['grade','result_array_by_columns'],
                    include:[{model:this.Course,attributes:['name']},
                            {model:this.Topic,attributes:['name','id','rows_D']},
                            {model:this.Subject,attributes:['name','column_number'],
                                include:{
                                model:this.Assesment,
                                attributes:['name'],
                                as:'Asessments_subject',
                                through: { attributes: [] }
                                }
                            },
                            {model:this.Student,attributes:['name','surname'],
                            },
                            {model:this.Clas,attributes:['name','school_year'],
                        where:{
                            name:class_name,
                            school_year:class_year
                        }}
                        ]
                });
                this.Logger.info('Results filtered by class succesfuly fetched from database');
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
                    course:result.course.name,
                    topic:result.topic.name,
                    topic_id:result.topic.id,
                    subject:result.subject.name,
                    columns:result.subject.column_number,
                    rows:result.topic.rows_D,
                    assesments:result.subject.Asessments_subject,
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
            this.Logger.error('Error in function filterByClass'+error);
            throw(error);
        }
    }
    //5. FILTAR po PREDMETU
    async filterBySubject(subject_name)
    {
        try {
            try{
                var results=await this.Result.findAll({
                    attributes:['grade','result_array_by_columns'],
                    include:[{model:this.Course,attributes:['name']},
                            {model:this.Topic,attributes:['name','id','rows_D']},
                            {model:this.Subject,attributes:['name','column_number'],
                                include:{
                                model:this.Assesment,
                                attributes:['name'],
                                as:'Asessments_subject',
                                through: { attributes: [] }
                                },
                            where:{
                                name:subject_name
                            }
                            },
                            {model:this.Student,attributes:['name','surname'],
                            },
                            {model:this.Clas,attributes:['name','school_year'],
                            }
                        ]
                });
                this.Logger.info('Results filtered by subject succesfuly fetched from database');
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
                    course:result.course.name,
                    topic:result.topic.name,
                    topic_id:result.topic.id,
                    subject:result.subject.name,
                    columns:result.subject.column_number,
                    rows:result.topic.rows_D,
                    assesments:result.subject.Asessments_subject,
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
            this.Logger.error('Error in function filterBySubject'+error);
            throw(error);
        }
    }
    //6. FILTAR po KURSU
    async filterByCourse(course_name)
    {
        try {
            try{
                var results=await this.Result.findAll({
                    attributes:['grade','result_array_by_columns'],
                    include:[{model:this.Course,attributes:['name'],
                                where:{
                                    name:course_name
                                }
                            },
                            {model:this.Topic,attributes:['name','id','rows_D']},
                            {model:this.Subject,attributes:['name','column_number'],
                                include:{
                                model:this.Assesment,
                                attributes:['name'],
                                as:'Asessments_subject',
                                through: { attributes: [] }
                                },
                            },
                            {model:this.Student,attributes:['name','surname'],
                            },
                            {model:this.Clas,attributes:['name','school_year'],
                            }
                        ]
                });
                this.Logger.info('Results filtered by course succesfuly fetched from database');
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
                    course:result.course.name,
                    topic:result.topic.name,
                    topic_id:result.topic.id,
                    subject:result.subject.name,
                    columns:result.subject.column_number,
                    rows:result.topic.rows_D,
                    assesments:result.subject.Asessments_subject,
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
            this.Logger.error('Error in function filterByCourse'+error);
            throw(error);
        }
    }
    //7. FILTAR po TOPICU
    async filterByTopic(topic_name)
    {
        try {
            try{
                var results=await this.Result.findAll({
                    attributes:['grade','result_array_by_columns'],
                    include:[{model:this.Course,attributes:['name']},
                            {model:this.Topic,attributes:['name','id','rows_D'],
                            where:{
                                name:topic_name
                            }
                        },
                            {model:this.Subject,attributes:['name','column_number'],
                                include:{
                                model:this.Assesment,
                                attributes:['name'],
                                as:'Asessments_subject',
                                through: { attributes: [] }
                                },
                            },
                            {model:this.Student,attributes:['name','surname'],
                            },
                            {model:this.Clas,attributes:['name','school_year'],
                            }
                        ]
                });
                this.Logger.info('Results filtered by topic succesfuly fetched from database');
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
                    course:result.course.name,
                    topic:result.topic.name,
                    topic_id:result.topic.id,
                    subject:result.subject.name,
                    columns:result.subject.column_number,
                    rows:result.topic.rows_D,
                    assesments:result.subject.Asessments_subject,
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
            this.Logger.error('Error in function filterByTopic'+error);
            throw(error);
        }
    }
    //8. FILTAR PO SKOLSKOJ GODINI
    async filterBySchool_year(schools_year)
    {
        try {
            try{
                var results=await this.Result.findAll({
                    attributes:['grade','result_array_by_columns'],
                    include:[{model:this.Course,attributes:['name']},
                            {model:this.Topic,attributes:['name','id','rows_D']},
                            {model:this.Subject,attributes:['name','column_number'],
                                include:{
                                model:this.Assesment,
                                attributes:['name'],
                                as:'Asessments_subject',
                                through: { attributes: [] }
                                },
                            },
                            {model:this.Student,attributes:['name','surname'],
                            },
                            {model:this.Clas,attributes:['name','school_year'],
                            where:{
                                school_year:schools_year
                            }
                            }
                        ]
                });
                this.Logger.info('Results filtered by school year succesfuly fetched from database');
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
                    course:result.course.name,
                    topic:result.topic.name,
                    topic_id:result.topic.id,
                    subject:result.subject.name,
                    columns:result.subject.column_number,
                    rows:result.topic.rows_D,
                    assesments:result.subject.Asessments_subject,
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
            this.Logger.error('Error in function filterBySchool_year'+error);
            throw(error);
        }
    }
    //9. FILTAR PO OCJENI
    async filterByGrade(student_grade)
    {
        try {
            try{
                var results=await this.Result.findAll({
                    attributes:['grade','result_array_by_columns'],
                    include:[{model:this.Course,attributes:['name']},
                            {model:this.Topic,attributes:['name','id','rows_D']},
                            {model:this.Subject,attributes:['name','column_number'],
                                include:{
                                model:this.Assesment,
                                attributes:['name'],
                                as:'Asessments_subject',
                                through: { attributes: [] }
                                },
                            },
                            {model:this.Student,attributes:['name','surname'],
                            },
                            {model:this.Clas,attributes:['name','school_year'],}
                        ],
                    where:{
                        grade:student_grade
                    }
                });
                this.Logger.info('Results filtered by grade year succesfuly fetched from database');
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
                    course:result.course.name,
                    topic:result.topic.name,
                    topic_id:result.topic.id,
                    subject:result.subject.name,
                    columns:result.subject.column_number,
                    rows:result.topic.rows_D,
                    assesments:result.subject.Asessments_subject,
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
            this.Logger.error('Error in function filterByGrade'+error);
            throw(error);
        }
    }
}