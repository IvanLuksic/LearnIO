const { nodelogger } = require("../loaders/logger");
const { Op } = require("../models");//izvuc ga iz sequelizea koji vraca index.js file u modelsima
module.exports=class Question{
    constructor(question,logger,topic,save,course,user)//svi dependency modeli od ove klase
    {
        this.Question=question;
        this.Logger=logger;
        this.Topic=topic;
        this.Save=save;
        this.Course=course;
        this.User=user;
    }
     async getQuestionsFromSave(topics_id,courses_id,users_id)//za odredeni topic,usera i kurs izvuc pitanja iz tog topica i slozit ih po retcima i stupcima i vratit na frontend
     {
        //1. vidit koliki je broj stupaca i redaka od tog TOPICA da znamo u for petlji izvlacit redom po retcima i stupcima ta pitanja i stavljat u json
        try {
        try {
            var rows_columns= await this.Save.findOne({
                include: {model:this.Topic,attributes:['rows_D','column_numbers']},
                where:{
                    topic_id:topics_id//operator jednakosti
                }
            });
        } catch (error) {
            throw(error);//idi na vanjski error handler-> OVO RADIMO ZATO JER BI SE ODI HANDLEA ERROR I DALJE BI SE SVE NASTAVILO RADIT NORMALNO A MI ZELIMO SVE PREKINUTI I IZACI IZ FUNKCIJE PA IDEMO SKROZ DO VANJSKOG ERROR HANDLEARA
        }
        this.Logger.info(rows_columns.Topic.rows_D+' '+rows_columns.Topic.column_numbers);
        //2. izvuci sva pitanja iz tog topica koja su spremljena za tog korisnika taj topic i kurs s potrebnin atributima
        try {
            var questions= await this.Save.findAll({//vraca NIZ modela
                attributes:['row_D','column_A','status'],
                include:{model:this.Question,attributes:['text','solution','question_type','image_path','answer_a','answer_b','answer_c','answer_d']},
                where:{
                    topic_id : topics_id
                },
                raw : true //da vrati instance kao normalne objekte a ne kao sequelize instance
            });
        } catch (error) {
            throw(error);
        }
        //3. soritraj pitanja po retcima i stupcima sa 2 for petlje-> matrica json objekata sa podacima od pitanja 
        var matrica=[];//'1D matrica'-> niz koji predstavlja matricu-> slozeni po redu retci u matrici u 1 niz
       // nodelogger.info('Questions array:\n'+questions[0]);
       

       for(let i=1;i<=rows_columns.Topic.rows_D;i++) //jer se unutar question modela rows_columns nalazi includeani Topic model-> ugniježđeni su
        {
            for(let j=1;j<=rows_columns.Topic.column_numbers;j++)
            {
                for(let k=0;k<questions.length;k++)
                {
                    if(questions[k].row_D==i && questions[k].column_A==j)//nasli to pitanje
                    {
                        matrica.push(questions[k]);//stavi ga u niz matrice poredane po stupcu i retku
                        break;
                    }
                }
            }
        }
        return matrica;//nju vracamo
    } catch (error) {
            this.Logger.error('error in reading questions '+ error);
        }

    }
    async GenerateQuestions(students_id,topics_id,courses_id)//Za prvi ulazak korisnika u topic
    {
        //1.Saznat retke i stupce od topica
        try {
            try {
                const rows_columns=await this.Topic.findOne({
                    attributes:['rows_D','column_numbers'],
                    where:{
                        id:topics_id
                    }
                 } );
            } catch (error) {
                this.Logger.info('Error in fetching rows and columns of topic');
                throw(error);//idi na vanjski error handler
            }
            //2.za svaki redak i stupac po redu popunjavat pitanja u tablicu Save
            //Izvlaci sva pitanja od tog retka i stupca za taj topic i od svih njih odaberi random jedno i pushaj ga u niz objekata koji ćemo kasnije bulk insertad u tablicu SAVE
            var save_questions=[];//u njega ćemo spremat odabrano pitanje i kasnije ga bulk insertad
            var questions_ij=[];//u njega ćemo spremat sva pitanja s odredenim retkom i stupcom i birat random jednog
            var random;//random broj
            var temp={};//privremeni objekt prije dodavanja u niz save questions
            var status_flag;//postavit ga na 1 2 3 ovisno o polozaju pitanja u matrici
            for(let i=1;i<=rows_columns.rows_D;i++)
            {
                for(let j=1;j<=rows_columns.column_numbers;j++)
                {
                    try {
                        questions_ij=await this.Question.findAll({
                            attributes:['id'],//trebat će nam jedino id od pitanja
                            where:{
                               /*operator and*/ [Op.and]: [
                                    { row_D: i },
                                    { column_A: j }
                                  ]
                            },
                            raw:true//vrati niz objekata
                        });
                        this.Logger.info('Succesfully read questions');
                    } catch (error) {
                        this.Logger.error('Error in reading questions from QUESTIONS table');
                        throw(error);
                    }
                    random=Math.floor(Math.random() * questions_ij.length);//random broj izmedu 0 i duljine niza -1
                    //dodati atribute objektu prije nego ga dodamo u niz-> sve atribute koji trebaju tablici save
                    if(i==1&&j==1)//prvo pitanje moramo otkljucat
                    {
                        status_flag=2;//otkljucano-> 
                        /*STATUS 1=ZELENO->RJESENO
                        STATUS 2=ZUTO-> OTKLJUCANO
                        STATUS 3=CRVENO-> ZAKLJUCANO */
                    }
                   else status_flag=3;//zakljucani svi osim prvog
                    temp={
                        row_D:i,
                        column_A:j,
                        status:status_flag,
                        course_id:courses_id,
                        topic_id:topics_id,
                        student_id:students_id,
                        question_id:questions_ij[random].id//id od rnadom questiona iz niza questiona
                    }
                    save_questions.push(temp);
                    temp={};//vrati ga na prazan objekt
                }
            }
            //3. Kad smo dobili sva pitanja onda ih spremimo u SAVE tablicu
            try {
                    const saved=await this.Save.bulkInsert(save_questions);
                    this.Logger.info('Saved to database');
            } catch (error) {
                this.Logger.error('Error in saving questions to database');
                throw(error);
            }

        } catch (error) {
            this.Logger.error('Error in generating questions '+error);
        }
       
    }

}
/* 1) funkcija za provjeru rjesenja/odgovora
2)funkcija za otkljucavanje iduceg pitanja nakon tocnog odgovora
3 funkcija za slanje pitanja useru-> iz tablice SAVE->NAPRAVLJENO
4) funkcija za generianje pitanja kada prvi put ude u topic-> sprema u save tablicu -> slicno ko ovo-> to napravi sljedece!!!!*/