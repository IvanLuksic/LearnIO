const { Op } = require("sequelize");//izvuc ga iz sequelizea koji vraca index.js file u modelsima
const {sequelize}=require('../models');
const queryInterface = sequelize.getQueryInterface();
module.exports=class question{
    constructor(question,topic,save,course,user,logger)//svi dependency modeli od ove klase
    {
        this.Question=question;
        this.Logger=logger;
        this.Topic=topic;
        this.Save=save;
        this.Course=course;
        this.User=user;
    }
    //JSON.stringify RADI STRING, JSON.parse VRAĆA OBJEKT U JSON TIPU
     async getQuestionsFromSave(topics_id,courses_id,users_id)//za odredeni topic,usera i kurs izvuc pitanja iz tog topica i slozit ih po retcima i stupcima i vratit na frontend
     {
        //1. vidit koliki je broj stupaca i redaka od tog topicA da znamo u for petlji izvlacit redom po retcima i stupcima ta pitanja i stavljat u json
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
        this.Logger.info(rows_columns.topic.rows_D+' '+rows_columns.topic.column_numbers);
        //2. izvuci sva pitanja iz tog topica koja su spremljena za tog korisnika taj topic i kurs s potrebnin atributima
        try {
            var questions= await this.Save.findAll({//vraca NIZ modela
                attributes:['row_D','column_A','status'],
                include:{model:this.Question,attributes:['id','text','question_type','image_path','answer_a','answer_b','answer_c','answer_d']},
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
       // nodelogger.info('questions array:\n'+questions[0]);
       

       for(let i=1;i<=rows_columns.topic.rows_D;i++) //jer se unutarquestion modela rows_columns nalazi includeani topic model-> ugniježđeni su
        {
            for(let j=1;j<=rows_columns.topic.column_numbers;j++)
            {
                for(let k=0;k<questions.length;k++)
                {
                    if(questions[k].row_D==i &&questions[k].column_A==j)//nasli to pitanje
                    {
                        matrica.push(questions[k]);//stavi ga u niz matrice poredane po stupcu i retku
                        break;
                    }
                }
            }
        }
        return matrica;//nju vracamo-> U NJOJ BI TREBAO BITI ISPRAVAN REDOSLIJED PITANJA PO RETCIMA I STUPCIMA
    } catch (error) {
            this.Logger.error('error in readingquestions '+ error);
            throw(error);//za index.js catch
        }

    }
    async GenerateQuestions(students_id,topics_id,courses_id)//Za prvi ulazak korisnika u topic
    {
        //1.Saznat retke i stupce od topica
        try {
            try {
                var rows_columns=await this.Topic.findOne({
                    attributes:['rows_D','column_numbers'],
                    where:{
                        id:topics_id
                    }
                 } );
            } catch (error) {
                this.Logger.info('Error in fetching rows and columns of topic');
                throw(error);//idi na vanjski error handler
            }
            //2.za svaki redak i stupac po redu popunjavat pitanja u tablicu save
            //Izvlaci sva pitanja od tog retka i stupca za taj topic i od svih njih odaberi random jedno i pushaj ga u niz objekata koji ćemo kasnije bulk insertad u tablicu save
            var save_questions=[];//u njega ćemo spremat odabrano pitanje i kasnije ga bulk insertad
            var questions_ij=[];//u njega ćemo spremat sva pitanja s odredenim retkom i stupcom i birat random jednog
            var random;//random broj
            var temp={};//privremeni objekt prije dodavanja u niz savequestions
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
                        this.Logger.info('Succesfully readquestions');
                    } catch (error) {
                        this.Logger.error('Error in readingquestions fromquestionS table');
                        throw(error);
                    }
                    random=Math.floor(Math.random() *questions_ij.length);//random broj izmedu 0 i duljine niza -1
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
                       question_id:questions_ij[random].id//id od rnadomquestiona iz nizaquestiona
                    }
                    save_questions.push(temp);
                    temp={};//vrati ga na prazan objekt
                }
            }
            //3. Kad smo dobili sva pitanja onda ih spremimo u save tablicu
            try {
                    const saved=await queryInterface.bulkInsert('save',save_questions);//REDOSLIJED UPISIVANJA NIJE GARANTIRAN?
                    this.Logger.info('saved to database');
            } catch (error) {
                this.Logger.error('Error in savingquestions to database');
                throw(error);
            }

        } catch (error) {
            this.Logger.error('Error in generatingquestions '+error);
            throw(error);//za index.js
        }
       
    }
    //1)ako je funkcija check answer uspješna odma se poziva i funkcija otkljucaj->AKO JE KRIV ODGOVOR ZASAD 2 OPCIJE:1)VRATI MU NEKI KOD+ PONOVI MU SVA PITANJA pomoću getquestionsFromsave,2) SAMO VRATI STATUSNI KOD POMOCU KOJEG ON SKUZI DA NE MORA NISTA RENDERIRAT
    //2)NAKON funkcije otkljucaj se mijenjaju statusi onih koji se otkljucaju-> to radimo u LAGORITMU OTKLJUCAVANJA-> promjene se rade direktno u bazi nad njima poquestion_id
    //3)Nakon toga šaljemo u RESPONSE sve answere pomoću funkcije getquestionsFromsave koje će se ponovno renderirat na klijentu
    async checkAnswer(question_id,answer)
    /*answer moze biti:a) Slovo-> a,b,c,d
                        b)Rjesenje-> string*/
    {
        //1.Izvuci to pitanje iz baze
        try {
            try {
                var question=await this.Question.findOne({
                    attributes:['solution'],
                    where:{
                        id:question_id
                    }
                });
                this.Logger.info('question fetched succesfully from database');
            } catch (error) {
                this.Logger.error('Error in fetchingquestion from database');
                throw(error);
            }
            if(question.solution==answer)//u oba slucaja vrste pitanja je string samo je u jednome brojcani string 
            {
                this.Logger.info('Answer correct');
                return 0;//točan
            }
            else {
                this.Logger.info('Answer incorrect');
                return 1;//netočan
            }
        } catch (error) {
            this.Logger.error('Error in checkAnswer '+error);
            throw(error);
        }

    }
    async UnlockQuestions(students_id,topics_id,courses_id,questions_id)//promjena statusaquestiona u tablici save
    {
        //1. saznaj poziciju u retku i stupcu od togquestiona
        try {
            try {
                var question=await  this.Question.findOne({
                    attributes:['row_D','column_A'],
                    where:{
                        id:questions_id
                    }
                });
                this.Logger.info('question fetched succesfully from database');
                var topic=await this.Topic.findOne({
                    attributes:['rows_D','column_numbers'],
                    where:{
                        id:topics_id
                    }
                 } );
                this.Logger.info('topic fetched succesfully from database');
            } catch (error) {
                this.Logger.error('error in fetchingquestion from database '+error);
                throw(error);
            }
            //koordinate tocnog pitanja u matrici
            const y=question.row_D;
            const x=question.column_A;
            this.Logger.info('Koordinate tocno dogvorenog pitanja. Redak: '+y+'Stupac: '+x);
            //broj redaka i stupaca matrice
            const rows=topic.rows_D;
            const columns=topic.column_numbers;
            this.Logger.info('Broj redaka i stupaca matrice: '+rows+columns);
            //za pocetak otkljucaj susjedne-> otkljucaj livo desno i dole i gore ako postoje
            //vidit koji sve postoje pa onda citat iz baze a ne da citamo za svako pitanje-> bolje performanse i manje pristupa bazi
            //spremamo koordinate u niz objekata od kojih svaki objkt sadrzi x i y koordinate pitanja kojeg trebamo otkljucat
            //NE ZABORAVIT POSTAVIT TOCNO PITANJE U ZELENO
            var check_status=[];//niz pitanja kojima moramo pregledat status i prominit ga ako vec nisu OTKLJUCANI-> STATUS=2
            var temp={};//y=REDAK,x=STUPAC
            if(y-1>=1)//postoji gornji
            {
                temp={
                    cor_x:x,
                    cor_y:y-1
                };
               check_status.push(temp);
               temp={};
                this.Logger.info('Postoji gornji');
            }
            if(y+1<=rows)//postoji donji
            {
                temp={
                    cor_x:x,
                    cor_y:y+1
                };
               check_status.push(temp);
               temp={};
                this.Logger.info('Postoji donji');
            }
            if(x-1>=1)//postoji lijevi
            {
                temp={
                    cor_x:x-1,
                    cor_y:y
                };
               check_status.push(temp);
               temp={};
                this.Logger.info('Postoji lijevi');
            }
            if(x+1<=columns)
            {
                temp={
                    cor_x:x+1,
                    cor_y:y
                };
               check_status.push(temp);
               temp={};
                this.Logger.info('Postoji desni');
            }
            for(let i=0;i<check_status;i++)
            {
                this.Logger.info('Redak: '+check_status.cor_y+'Stupac: '+check_status.cor_x);
            }
            //Promijeni status pitanja iz niza check status
            try {
                for(let k=0;k<check_status.length;k++)
                {
                var questions_status=await this.Save.update({status:2},{//postavi status na 2
                    where:{
                        row_D:check_status[k].cor_y,//probat nać kako usporedit s jednin pristupon bazi
                        column_A:check_status[k].cor_x,
                        course_id:courses_id,
                        topic_id:topics_id,
                        student_id:students_id,
                        status:{
                            [Op.eq]:3//ako su zakljucana promini in status
                        }
                    }
                });
                }
                var correct_question=await this.Save.update({status:1},{
                    where:{
                        row_D:y,//koordinate tocno odgovorenog pitanja u bazi
                        column_A:x,
                        course_id:courses_id,
                        topic_id:topics_id,
                        student_id:students_id,
                       question_id:questions_id
                    }
                });
                this.Logger.info('question status changed succesfully');
            } catch (error) {
                this.Logger.error('Error in updating status ofquestions '+error);
                throw(error);
            }
        } catch (error) {
            this.Logger.error('Error in unlockingquestions '+error);
            throw(error);
        }
    }
    async WrongAnswer(students_id,topics_id,courses_id,questions_id)//ALGORITAM KADA NETOCNO ODGOVORI->ova 4(dovoljna prva 3 ali kad imamo 4. iskoristimo ga) argumenta jedinstveno odreduju redak u tablici save-> samo mu promijenimo status
    {
        //+ DODAT U RESPONSE flag koji ce njima oznacit jeli tocno ili netocno
        try {
            try {
               const wrong_question=await this.Save.update({status:3},{//zakljucaj prethodno otkljucano pitanje
                where:{
                        course_id:courses_id,
                        topic_id:topics_id,
                        student_id:students_id,
                       question_id:questions_id
                }
               });
               this.Logger.info('Succesful lockedquestion');
            } catch (error) {
                this.Logger.error('Error in accesing wrong answer in database ');
                throw(error);
            }
        } catch (error) {
            this.Logger.error('Error in changing wrong answer status '+error);
            throw(error);
        }
    }

}
