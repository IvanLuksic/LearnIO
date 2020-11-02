const {sequelize,Rezultati,Korisnik,Predmet,Topic,Kursevi}=require('./models');
async function DatabaseConnection ()
{
    console.log('Connecting to database....');
    try {
        await sequelize.authenticate();
        console.log('Connected to database.');
    } catch (error) {
        console.log('Error in database connection '+error);
        process.exit(1);//jer ce inace nastavit ići dalje nakon sta error handleamo ovaj promise,bi ga zelimo prekinuti
    }
}
async function getResults()
{
    try{
    const rezovi= await Rezultati.findAll({
        attributes:['ocjena'],
        include: [
           {model: Korisnik,attributes:['ime','prezime']},
           {model:Predmet,attributes:['naziv']},
           {model:Kursevi,attributes:['naziv']},//PREIMENOVALI KURS U KURSEVI JER SEQUELIZE IZGLEDA SVIM RIJECIMA KOJE IMAJU s na kraju mice s kod querya->BIO PROBLEM STA JE KOD QUERYA UMJESTO KURS KORISIO KUR
           {model:Topic,attributes:['naziv']}
        ]
    });
    return rezovi;
    }catch(err)
    {
    console.log('Error reading results'+err);
    }
}
function ispisrezultata(rezovi)
{
   if(rezovi)
   {
    const rezultati= rezovi.map((rez)=>   
        ({
        ime: rez.Korisnik.ime,
        prezime: rez.Korisnik.prezime,
        predmet_naziv: rez.Predmet.naziv,
        kurs_naziv:rez.Kursevi.naziv,
        topic_naziv: rez.Topic.naziv,
        ocjena:rez.ocjena
        })
    );
    console.table(rezultati);
}else console.log('Niz rezultat je prazan.');
}
async function init()
{
    await DatabaseConnection();//ne trebamo ga handleat sa try catch jer ce u slucaju greske ona sama terminirat proces
    //async funkcija vraca promise pa je awaitamo
    try {
        console.log(Kursevi.getTableName());
        let rezultati= await getResults();
        ispisrezultata(rezultati);
    } catch (error) {
        console.log('Greska pri citanju rezultata'+error);
    }
    
}
init();