const { QueryTypes } = require('sequelize');
const {sequelize}=require('../models');
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
    //2. Dohvati SVE rezultate za ispis na formi
    async getAllResults()
    {
        try {
            try {
                var results=await this.Result.findAll({
                    attributes:['grade','result_array_by_columns'],
                    include:[{model:this.Course,attributes:['name']},
                            {model:this.Topic,attributes:['name']},
                            {model:this.Subject,attributes:['name','column_number'],
                                include:{
                                model:this.Assesment,
                                attributes:['name'],
                                as:'Asessments_subject',
                                through: { attributes: [] }
                                }
                            },
                            {model:this.Student,attributes:['name','surname']}
                        ]
                })
                this.Logger.info('Results succesfuly fetched from database');
                //saznati razred za tog određenog studenta za taj odredeni kurs iz tog odredenog predmeta-> NAJLAKSE PRIKO RAW QUERYA
                var clases=await sequelize.query('SELECT * FROM result JOIN class_student ON result.student_id=class_student.student_id JOIN class_course ON result.course_id=class_course.course_id JOIN class_subject ON result.subject_id=class_subject.subject_id JOIN clas ON class_subject.class_id=clas.id ',{
                    raw:true,
                    type: QueryTypes.SELECT
                   })
                this.Logger.info('Class fetched succesfuly');
                for(let i=0;i<clases.length;i++)
                this.Logger.info(JSON.stringify(clases[i]));
            } catch (error) {
                this.Logger.error('Error in fetching results from database');
                throw(error);
            }
            for(let i=0;i<results.length;i++)
                this.Logger.info(JSON.stringify(results[i]));
            /*var temp={};
            var format=[];//formatirat ih u niz
            for(let result of results)
            {
                temp={
                    grade:result.grade,
                    result_array_by_columns:result.result_array_by_columns,
                    course:result.course.name,
                    topic:result.topic.name,
                    subject:result.subject.name,
                    columns:result.subject.column_number,
                    assesments:result.Asessments_subject,
                    name:result.user.name,
                    surname:result.user.surname,
                    clas_name:result.classes_student.name,
                    clas_year:result.classes_student.school_year

                }
            }*/
        } catch (error) {
            this.Logger.error('Error in function getResults' + error);
            throw(error);
        }
    }
}


//1. Ubaci u tablicu result kada se odredeni topic otkljuca u tagovima
//3. FILTAR po UČENIKU 
//4. FILTAR po RAZREDU
//5. FILTAR po PREDMETU
//6. FILTAR po KURSU
//7. FILTAR po TOPICU
//8. FILTAR PO SKOLSKOJ GODINI