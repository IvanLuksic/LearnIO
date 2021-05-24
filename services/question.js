const { Op } = require("sequelize");//izvuc ga iz sequelizea koji vraca index.js file u modelsima
const {sequelize}=require('../models');
const config=require('../config');
const queryInterface = sequelize.getQueryInterface();
const { QueryTypes } = require('sequelize');

                        /*
                        STATUS 1=CRVENO-> NETOCNO
                        STATUS 2=PLAVO-> OTKLJUCANO
                        STATUS 3=SIVO-> ZAKLJUCANO 
                        STATUS 4=ZELENO->TOCNO*/
module.exports=class question{
    constructor(question,topic,save,course,user,result,topic_instance,logger)//svi dependency modeli od ove klase
    {//topic instance nam treba kod otkljucavanja povezanih topic nakon tocno odgovorenig pitanja
        this.Question=question;
        this.Logger=logger;
        this.Topic=topic;
        this.Save=save;
        this.Course=course;
        this.User=user;
        this.Result=result;
        this.Topic_instance=topic_instance;
    }
    //JSON.stringify RADI STRING, JSON.parse VRAĆA OBJEKT U JSON TIPU
     async getQuestionsFromSave(topics_id,courses_id,users_id,clas_id,subjects_id)//za odredeni topic,usera kurs razred i predmet izvuc pitanja iz tog topica i slozit ih po retcima i stupcima i vratit na frontend
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
            this.Logger.error('Error in fetching topic number of rows and columns');
            throw(error);//idi na vanjski error handler-> OVO RADIMO ZATO JER BI SE ODI HANDLEA ERROR I DALJE BI SE SVE NASTAVILO RADIT NORMALNO A MI ZELIMO SVE PREKINUTI I IZACI IZ FUNKCIJE PA IDEMO SKROZ DO VANJSKOG ERROR HANDLEARA
        }
        this.Logger.info(rows_columns.topic.rows_D+' '+rows_columns.topic.column_numbers);
        //2. izvuci sva pitanja iz tog topica koja su spremljena za tog korisnika taj topic i kurs s potrebnin atributima
        try {
            var questions= await this.Save.findAll({//vraca NIZ modela
                attributes:['row_D','column_A','status'],
                include:{model:this.Question,attributes:['id','text','question_type','image_path','answer_a','answer_b','answer_c','answer_d']},
                where:{
                    topic_id : topics_id,
                    course_id:courses_id,
                    class_id:clas_id,
                    subject_id:subjects_id,
                },
            });
        } catch (error) {
            this.Logger.error('Error in fetching questions from table save');
            throw(error);
        }
        //3. soritraj pitanja po retcima i stupcima sa 2 for petlje-> matrica json objekata sa podacima od pitanja 
        var matrica=[];//'1D matrica'-> niz koji predstavlja matricu-> slozeni po redu retci u matrici u 1 niz
       // nodelogger.info('questions array:\n'+questions[0]);
       
        var temp={};
        console.log()
       for(let i=1;i<=rows_columns.topic.rows_D;i++) //jer se unutarquestion modela rows_columns nalazi includeani topic model-> ugniježđeni su
        {
            for(let j=1;j<=rows_columns.topic.column_numbers;j++)
            {
                for(let k=0;k<questions.length;k++)
                {
                    if(questions[k].row_D==i &&questions[k].column_A==j)//nasli to pitanje
                    {
                        temp={//formatirat za CLIENT STRANU-> INACE SEQUELIZE STAVI question.id-> TAJ DIO SE NA KLIJENT STRANI INTERPRETIRA KAO OBJEKT KOJI NE POSTOJI
                            row_D: questions[k].row_D,
                            column_A:questions[k].column_A,
                            status:questions[k].status,
                            question_id:questions[k].question.id,
                            question_text:questions[k].question.text,
                            question_type:questions[k].question.question_type,
                            question_image_path:questions[k].question.image_path,
                            question_answer_a:questions[k].question.answer_a,
                            question_answer_b:questions[k].question.answer_b,
                            question_answer_c:questions[k].question.answer_c,
                            question_answer_d:questions[k].question.answer_d
                        }
                        matrica.push(temp);//stavi ga u niz matrice poredane po stupcu i retku
                        temp={};
                        break;
                    }
                }
            }
        }
        for(let i=0;i<matrica.length;i++)
        this.Logger.info(JSON.stringify(matrica[i]));
        return matrica;//nju vracamo-> U NJOJ BI TREBAO BITI ISPRAVAN REDOSLIJED PITANJA PO RETCIMA I STUPCIMA
    } catch (error) {
            this.Logger.error('error in function getQuestionsFromSave'+ error);
            throw(error);//za express error midleware
        }

    }
    async generateQuestions(students_id,topics_id,courses_id,clas_id,subjects_id)//Za prvi ulazak korisnika u topic
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
                            attributes:['id'],//trebat će nam jedino id od pitanja za spremanje u tablicu save
                            where:{
                               /*operator and*/ [Op.and]: [
                                    { row_D: i },
                                    { column_A: j },
                                    {topic_id:topics_id}//iz odabranog topica
                                  ]
                            },
                            raw:true//vrati niz objekata
                        });
                        this.Logger.info('Succesfully readquestions');
                    } catch (error) {
                        this.Logger.error('Error in readingquestions from questions table');
                        throw(error);
                    }
                    random=Math.floor(Math.random() *questions_ij.length);//random broj izmedu 0 i duljine niza -1
                    //dodati atribute objektu prije nego ga dodamo u niz-> sve atribute koji trebaju tablici save
                    if(i==1&&j==1)//prvo pitanje moramo otkljucat
                    {
                        status_flag=config.colors.blue;//otkljucano-> 
                        /*STATUS 4=ZELENO->TOCNO
                        STATUS 1=CRVENO-> NETOCNO
                        STATUS 2=PLAVO-> OTKLJUCANO
                        STATUS 3=SIVO-> ZAKLJUCANO */
                    }
                   else status_flag=config.colors.grey;//zakljucani svi osim prvog
                    temp={
                        row_D:i,
                        column_A:j,
                        status:status_flag,
                        course_id:courses_id,
                        topic_id:topics_id,
                        student_id:students_id,
                        class_id:clas_id,
                        subject_id:subjects_id,
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
            this.Logger.error('Error in function generateQuestions '+error);
            throw(error);//za index.js
        }
       
    }
    async getQuestionsForAllA0D(topics_id,rows,columns)//Vraća sva pitanja koja su definirana za određeni topic i koja se nalaze na poziciji A0 i D ZA SVAKI A0 I D MATRICE-> Pregled za onoga tko dodaje pitanja ili ih hoće editat
    {//saljemo retke i stupce jer smo ih prethodno dohvatili u controleru pa da ne moramo opet
        try {
            var format=[];
            var temp={};
            for(let i=1;i<=rows;i++)
            {
                for(let j=1;j<=columns;j++)
                {
                    try {
                        var questions_A0D=await this.Question.findAll({
                            attributes:['id','text','question_type','solution','row_D','column_A','image_path','answer_a','answer_b','answer_c','answer_c','answer_d'],//sve osim rjesenja i topic_id
                            where:{
                               /*operator and*/ [Op.and]: [
                                    { row_D: i},
                                    { column_A: j },
                                    {topic_id:topics_id}
                                  ]
                            },
                        });
                    } catch (error) {
                        this.Logger.error('Error in fetching questions for A: '+j+'D: '+ i);
                        throw(error);
                    }
                    temp={
                        ao:j,
                        d:i,
                        Questions:questions_A0D
                    }
                    format.push(temp);
                }
            }
            this.Logger.info('Questions fetched succesfully from database for all A0 D');
            for(let i=0;i<format.length;i++)
            this.Logger.info(JSON.stringify(format[i]));
            return format;
        } catch (error) {
            this.Logger.error('Error in function getQuestionsForAllA0D '+error);
            throw(error);
        }
    }
    //1)ako je funkcija check answer uspješna odma se poziva i funkcija otkljucaj->AKO JE KRIV ODGOVOR ZASAD 2 OPCIJE:1)VRATI MU NEKI KOD+ PONOVI MU SVA PITANJA pomoću getquestionsFromsave,2) SAMO VRATI STATUSNI KOD POMOCU KOJEG ON SKUZI DA NE MORA NISTA RENDERIRAT
    //2)NAKON funkcije otkljucaj se mijenjaju statusi onih koji se otkljucaju-> to radimo u LAGORITMU OTKLJUCAVANJA-> promjene se rade direktno u bazi nad njima poquestion_id
    //3)Nakon toga šaljemo u RESPONSE sve answere pomoću funkcije getquestionsFromsave koje će se ponovno renderirat na klijentu
    async checkAnswer(questions_id,answer,students_id,topics_id,courses_id,clas_id,subjects_id)
    /*answer moze biti:a) Slovo-> a,b,c,d-> type 1
                        b)Rjesenje-> string-> type 2*/
    {
        //1.Izvuci to pitanje iz baze AKO NIJE ZAKLJUCANO-> PROVJERI MU STATUS U TABLICI SAVE-> 
        try {
            try {
                var question_status=await this.Save.findOne({
                    attributes:['status'],
                    where:{
                        question_id:questions_id,
                        student_id:students_id,
                        class_id:clas_id,
                        topic_id:topics_id,
                        course_id:courses_id,
                        subject_id:subjects_id
                    }
                })
            } catch (error) {
                this.Logger.error('Errror in fetching status of question from save');
                throw(error);
            }
            if(question_status.status==config.colors.blue)//-> ako neko npr pomocu fetch api iz browsera ide sanzat otcno rjesenje pitanja koje je zakljucano
            {//SAMO OTKLJUCANIM PITANJIMA MOZEMO PRIVHERAVAT ODGOVORE
            try {
                var question=await this.Question.findOne({
                    attributes:['solution'],
                    where:{
                        id:questions_id
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
        }else {
            this.Logger.error('Cant check answer of locked question');
            throw(new Error);
        }//JAVI ERROR JER SE U NORMALNIM OKOLNOSTIMA NEBI SMILO DOC DO POZIVA CHECKANSWER ZA ZAKLJUCANO PITANJE
        } catch (error) {
            this.Logger.error('Error in function checkAnswer '+error);
            throw(error);
        }

    }//primamo odgovor koji je dao user kako bi mu znali restorat što je odgovorio
    async unlockQuestionsAndUpdateResultsAndGrade(answer,students_id,topics_id,courses_id,clas_id,subjects_id,questions_id)//promjena statusa questiona u tablici save
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
                this.Logger.error('error in fetchingquestion from database ');
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
            //UPDATE REZULTAT-> povećaj vrijednost od tog stupca za 1 u tablici rezultati
            try {//KORISTILI RAW QUERY JER SA UPDATE NE RADI KO ZNA ZAŠTO
                //U POSTGRESU SE ARRAY BROJI OD INDEKSA 1-> ako je x=2 onda je to drugi član niza
               await sequelize.query('UPDATE result SET result_array_by_columns[:pos]=result_array_by_columns[:pos]+1 WHERE student_id=:student_id AND topic_id=:topic_id AND course_id=:course_id AND class_id=:class_id AND subject_id=:subject_id ',{
                    raw:true,
                    replacements: {pos:x,student_id:students_id,course_id:courses_id,subject_id:subjects_id,class_id:clas_id, topic_id: topics_id },
                    type: QueryTypes.UPDATE
                   });//POS:X-> X JE STUPAC TOCNO ODGOVORENOG PITANJA -> TAJ ČLAN NIZA UVEĆAVAMO ZA 1
                   this.Logger.info('Results array by columns updated');
            } catch (error) {
                this.Logger.error('Error in updating results');
                throw(error);
            }
            //UPDATE OCJENA->
            try {
                let results=await this.Result.findOne({
                    attributes:['result_array_by_columns'],
                    where:{
                        student_id:students_id,
                        class_id:clas_id,
                        topic_id:topics_id,
                        subject_id:subjects_id,
                        course_id:courses_id
                    }
                });
                let points=0;//zbroj svih bodova
                //zbroji sve bodove pa onda vidi koliko je to % u odnosu na broj redaka i stupaca->NJIH IMAMO SPREMLJENE U ROWS I COLUMNS VARIJABLAMA
                for(let i=0;i<results.result_array_by_columns.length;i++)
                points+=parseInt(results.result_array_by_columns[i],10);
               this.Logger.info('Points: '+points);
                var grade=0;
                const percent=points*100/(rows*columns);//ukupni broj polja u matrici je broj redaka*broj stupaca
                this.Logger.info(percent+'%');
                if(percent<50)
                {
                    grade=1;
                }
                else if(percent>=50 && percent<60)
                {
                    grade=2;
                }
                else if(percent>=60 && percent <75)
                {
                    grade=3;
                }
                else if(percent>=75 &&percent<90)
                {
                    grade=4;
                }
                else grade=5;
                this.Logger.info('Grade: '+grade);
                await this.Result.update({grade:grade},{
                    where:{
                        student_id:students_id,
                        class_id:clas_id,
                        topic_id:topics_id,
                        subject_id:subjects_id,
                        course_id:courses_id
                    }
                });
            } catch (error) {
                this.Logger.error('Error in reading results or updating grade');
                throw(error);
            }
            if(grade>2)//VIDI JELI SE MOGU OTKLJUCAT NEKI TOPICI KOJIMA JE OVAJ TOPIC UVJET JER JE ZADOVLJEN MINIMALNI UVJET OCJENA=2,NEMA SMISLA PROVJERAVAT AKO JE OCJENA=1
            {
                try {
                    await this.Topic_instance.unlockAssociatedTopics(students_id,clas_id,courses_id,subjects_id);
                } catch (error) {
                    this.Logger.error('Error in unlocking associated topics');
                    throw(error);
                }
            }
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
                var questions_status=await this.Save.update({status:config.colors.blue},{//postavi status na 2
                    where:{
                        row_D:check_status[k].cor_y,//probat nać kako usporedit s jednin pristupon bazi
                        column_A:check_status[k].cor_x,
                        course_id:courses_id,
                        topic_id:topics_id,
                        student_id:students_id,
                        class_id:clas_id,
                        subject_id:subjects_id,
                        status:config.colors.grey//ako su zaklucana promini ih u otkljucane
                    }
                });
                }
                var correct_question=await this.Save.update({status:config.colors.green,user_answer:answer},{//update statusa pitanja u zeleno jer je tocno dogovorio i spremimo što je odgovorio da može kasnije pregledat
                    where:{
                        row_D:y,//koordinate tocno odgovorenog pitanja u bazi
                        column_A:x,
                        course_id:courses_id,
                        topic_id:topics_id,
                        student_id:students_id,
                        class_id:clas_id,
                        subject_id:subjects_id,
                       question_id:questions_id,

                    }
                });
                this.Logger.info('question status changed succesfully');
            } catch (error) {
                this.Logger.error('Error in updating status of questions');
                throw(error);
            }
        } catch (error) {
            this.Logger.error('Error in function unlockQuestionsAndUpdateResultsAndGrade '+error);
            throw(error);
        }
    }
    async wrongAnswer(answer,students_id,topics_id,courses_id,clas_id,subjects_id,questions_id)//ALGORITAM KADA NETOCNO ODGOVORI->ova 4(dovoljna prva 3 ali kad imamo 4. iskoristimo ga) argumenta jedinstveno odreduju redak u tablici save-> samo mu promijenimo status
    {
        //+ DODAT U RESPONSE flag koji ce njima oznacit jeli tocno ili netocno
        try {
            try {
               const wrong_question=await this.Save.update({status:config.colors.red,user_answer:answer},{//zakljucaj prethodno otkljucano pitanje
                where:{
                        course_id:courses_id,
                        topic_id:topics_id,
                        student_id:students_id,
                        class_id:clas_id,
                        subject_id:subjects_id,
                       question_id:questions_id
                }
               });
               this.Logger.info('Succesful lockedquestion');
            } catch (error) {
                this.Logger.error('Error in accesing wrong answer in database ');
                throw(error);
            }
        } catch (error) {
            this.Logger.error('Error in function wrongAnswer '+error);
            throw(error);
        }
    }//FRONTEND NEĆE DOPUSTITI BRISANJE AKO JE PITANJE KOJE SE BRIŠE JEDINO PITANJE ZA TU POZICIJU-> SIGURNO ĆEMO IMATI BAREM 1 PRESOTALO PITANJE ZA ZAMIJENITI S NJIM
    async deleteAndReplaceQuestion(questions_id)//izbrisemo to pitanje iz baze a na mjestima gdje se ono pojavljuje u sesijama zamijeniti ga s random odabranim pitanjem od svih pitanja za tu piziciju u matrici
    {
        try {
            const question=await this.Question.findOne({//prvo vidimo kojoj piozciji u matrici pripada to pitanje
                attributes:['row_D','column_A','topic_id'],
                where:{
                    id:questions_id
                }
            });
            let questions_ij=await this.Question.findAll({
                attributes:['id'],//trebat će nam jedino id od pitanja za spremanje u tablicu save
                where:{
                  [Op.and]: [//sva pitanja iz te skupine osim onog koje se brise
                        { row_D: question.row_D },
                        { column_A: question.column_A },
                        {topic_id:question.topic_id},
                        {id:{
                            [Op.ne]:questions_id
                        }}
                      ]
                },
            });
            this.Logger.info('Succesfully readquestions');
            this.Logger.info(JSON.stringify(questions_ij));
            let random=Math.floor(Math.random() *questions_ij.length);//random broj izmedu 0 i duljine niza -1
            this.Logger.info('Randomly geenrated index and question id'+random +' '+questions_ij[random].id);
            await this.Save.update({question_id:questions_ij[random].id},{//zamijeni na svim jestima s tim novim pitanjem
                where:{
                    question_id:questions_id
                }
            });
            //izbriisi nakon zamjene
            await this.Question.destroy({
                where:{
                    id:questions_id
                }
            });
            this.Logger.info('Questiopn deleted succesffuly from database');
        } catch (error) {
            this.Logger.error('Error in function deleteQuestion '+error);
            throw(error);
        }
    }
    async updateQuestion(request_body)//dogovoreni format request bodya
    {
        try {
           const question= await this.Question.findOne({
                where:{
                    id:request_body.id
                }
            });
            question.text=request_body.text;
            question.solution=request_body.solution;
            question.question_type=request_body.question_type;
            question.row_D=request_body.row_D;
            question.column_A=request_body.column_A;
            question.image_path=request_body.image_path;
            question.answer_a=request_body.answer_a;
            question.answer_b=request_body.answer_b;
            question.answer_c=request_body.answer_c;
            question.answer_d=request_body.answer_d;
            await question.save();
            this.Logger.info('question updated succesfully');
        } catch (error) {
            this.Logger.error('Error in function updateQuestion in dataabse '+error);
            throw(error);
        }
    }
    async addQuestion(text,solution,question_type,row_D,column_A,answer_a,answer_b,answer_c,answer_d,topic_id,image_path,mime_type,image_size)
    {
        try {
            let question;
            if(question_type==1&&image_path!==undefined)//a,b,c pitanje+ ima sliku
            {
                console.log("ABC + slika")
            question=await this.Question.create({
                text:text,
                solution:solution,
                question_type:question_type,
                row_D:row_D,
                column_A:column_A,
                image_path:image_path,
                mime_type:mime_type,
                image_size:image_size,
                answer_a:answer_a,
                answer_b:answer_b,
                answer_c:answer_c,
                answer_d:answer_d,
                topic_id:topic_id
            });
        }
        else if(question_type==1&&image_path===undefined)//a b c pitanje + nema sliku-> nismo poslali parametar pa je on po defaultu undefined
        {
            console.log("ABC - slika")
            question=await this.Question.create({
                text:text,
                solution:solution,
                question_type:question_type,
                row_D:row_D,
                column_A:column_A,
                answer_a:answer_a,
                answer_b:answer_b,
                answer_c:answer_c,
                answer_d:answer_d,
                topic_id:topic_id
            });
        }
        else if(question_type==2&&image_path!==undefined)//pitanje bez a,b,c,d + ima sliku
        {
            console.log("Odg + slika")
            question=await this.Question.create({
                text:text,
                solution:solution,
                question_type:question_type,
                row_D:row_D,
                column_A:column_A,
                image_path:image_path,
                mime_type:mime_type,
                image_size:image_size,
                topic_id:topic_id
            });
        }
        else {//pitanje bez a,b,c,d + nema sliku
            console.log("Odg - slika")
            question=await this.Question.create({
                text:text,
                solution:solution,
                question_type:question_type,
                row_D:row_D,
                column_A:column_A,
                topic_id:topic_id
            });
        }
        return question.id;
        } catch (error) {
            this.Logger.error('Error in function addQuestion '+error);
            throw(error);
        }
    }
    async getQuestionImagePath(question_id)
    {
        try {
            const question=await this.Question.findOne({
                where:{
                    id:question_id
                }
            });
            let image_info={
                image_path:question.image_path,
                mime_type:question.mime_type,
                image_size:question.image_size
            };
            return image_info;
        } catch (error) {
           this.Logger.error('Error in function getQuestionImagePath'+error);
           throw(error); 
        }
    }
    async checkSessionsWithQuestion(question_id)
    {
        try {
            const question_session=await this.Save.findOne({
                where:{
                    question_id:question_id
                }
            });
            if(!question_session)//ako ne postoji nijedna instanca u sesijui onda je null i moze se brisat
            {
                return true;
            }
            else return false;
        } catch (error) {
            this.Logger.error('Error in function checkSessionsWithQuestion'+error);
            throw(error);
        }
    }
    async replaceQuestionWithAnother(source_question,replace_with_question)
    {
        try {
              //AKO JE PITANJE KOJE BRISEMO I MIJENJAMO BILO ZAKLJUCANO I NIJE OTOVRENO ONDA JE SVE OK, AKO JE BILO PLAVO OSTAT CE PLAVO AL AKO JE BILO ZELENO ILI CRVENO ONDA BI GA TREBALI VRATIT U PLAVO JER JE TO NOVO PITANJE I NIJE ISTO KIO PRETHODNO KOJE JE BILO TOCNO/KRIVO ODGOVORENO
            await this.Save.update({status:config.colors.blue},{
                where:{
                    question_id:source_question,
                    [Op.or]: [
                        {status: config.colors.red },
                        {status: config.colors.green },
                      ]
                }
            });
            //zamijeni ga s novim
            await this.Save.update({question_id:replace_with_question},{
                where:{
                    question_id:source_question
                }
            });
        
        } catch (error) {
            this.Logger.error('Error in function replaceQuestionWithAnother'+error);
            throw(error);
        }
    }
    async studentQuestionChoice(student_id,topic_id, course_id, subject_id,class_id,question_id)//za dobit odgovor studenta na to pitanje kako bi mu ga mogli prikazat
    {
        try {
            let question=await this.Save.findOne({
                where:{
                    subject_id:subject_id,
                    topic_id:topic_id,
                    course_id:course_id,
                    class_id:class_id,
                    question_id:question_id,
                    student_id:student_id
                }
            });
            return question.user_answer;
        } catch (error) {
            this.Logger.error('Error in function userQuestionChoice'+error);
            throw(error);
        }
    }
    async insertExistingQuestionIntoTopic(topic_id,question_id,row_D,column_A)//unos postojećeg pitanja sa question_id među sva moguća pitanja topica_id na pozicijama rows_D i column_A
    {
        try {
            let existing_question=await this.Question.findOne({
                attributes:['text','solution','question_type','image_path','mime_type','image_size','answer_a','answer_b','answer_c','answer_d'],
                where:{
                    id:question_id
                }
            });
            if(existing_question)//dodatna zastitia ako ne postoji zadani question
            {
                await this.Question.create({
                    text:existing_question.text,
                    solution:existing_question.solution,
                    question_type:existing_question.question_type,
                    row_D:row_D,
                    column_A:column_A,
                    image_path:existing_question.image_path,
                    mime_type:existing_question.mime_type,
                    image_size:existing_question.image_size,
                    answer_a:existing_question.answer_a,
                    answer_b:existing_question.answer_b,
                    answer_c:existing_question.answer_c,
                    answer_d:existing_question.answer_d,
                    topic_id:topic_id
                });
            }
            else throw(new Error('Question doesnt exist'));
        } catch (error) {
            this.Logger.error('Error in function insertExistingQuestionIntoTopic'+error);
            throw(error);
        }
    }
    async unlockQuestionsInSourceTopics(topic_id,course_id,student_id,class_id,subject_id)//svim source topciima kojima je ovaj topic associated topic mijenjamo status kirivih(crvenih) pitanja u plava-> OTKLJUČVAMO IH
    {
        try {
            //1) pronaći source topice kojima je topic_id topic associated
            let source_topics=await sequelize.query('SELECT  source_topic  FROM tags_of_topic WHERE associated_topic=:topic_id ' ,{
                raw:true,
                replacements: { topic_id: topic_id},
                type: QueryTypes.SELECT
               });
            let source_topics_ids=[];
               for(let source of source_topics)
                source_topics_ids.push(source.source_topic);
            this.Logger.info('Source topics: '+JSON.stringify(source_topics));
            //2) Svim sesijama za tog usera u gornjim source topicima otključamo sva zaključana pitanja-> crvena boja
            this.Logger.info(parseInt(config.colors.blue))
            await this.Save.update({status:parseInt(config.colors.blue)},{
                where:{
                    [Op.and]:[
                        {course_id:course_id},
                        {student_id:student_id},
                        {class_id:class_id},
                        {subject_id:subject_id},
                        {status:parseInt(config.colors.red)},
                        {topic_id:{
                            [Op.in]:source_topics_ids
                        }}
                    ]
                }
            });
            this.Logger.info('Questions unlocked succesfuly');
        } catch (error) {
            this.Logger.error('Error in function unlockQuestionsInSourceTopics '+error);
            throw(error);
        }
    }
}