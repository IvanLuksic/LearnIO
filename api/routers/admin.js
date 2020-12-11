const express=require('express');
const admin=express.Router();
const {authenticate_admin}=require('../middleware/login');
module.exports=function (main_ruter){//module.exports nije vise objekt nego funkcija
    main_ruter.use('/',admin);//svi pathoovi koje definiramo na admin ruteru se odnose prema main_ruteru na path /-> path /admin se odnosi na path /admin u main_ruteru
   //da smo imali .use('/foo',...) onda bi se na sve pathove u admin ruteru na početku dodalo /foo u odnosu na main_ruter-> / bi zarpavo bio /foo/ od main_rutera
    admin.get('/admin',authenticate_admin, (req, res) => {
    res.status(301).send('Dobrodosao admine');
  })
}
/*npr.
1)
definiramo u glavnom programu app.use('/',main_ruter)
a u admin ruteru radimo main_ruter.use(/,admin) i onda admin.get(/admin)
 SLIJED AKCIJA: a) Kada korinsik upiše / aplikacija gleda u main_ruter i u njemu trazi koja je funkcija za /
 ako korisnikm upise /admin onda se gleda u main_ruter jer je on definiran za svaki path / i u njemu se trazi /admin ruta koja se zapravo nalazi u admin ruteru
 
 2)
 definiramo u glavnom programu app.use(/foo,main_ruter) a u adminu radimo main_ruter.use(/bar,admin i admin.get(/baz
  SLIJED AKCIJA: korisnik upiše path /-> ne odgovora nijednom ruteru
  path /foo-> aplikacija ide u mainruter i gleda ima li išta u main ruteru za taj path-> ako ima nešto onda bi u main_ruteru bilo definirano kao main_ruter.metoda(/) jer bi se na to nadodalo /foo i dobili bitu rutu
  path /foo/bar onda bi se u main ruteru trazilo sta je mountano na path /bar i dosli bi to admin ruterua u kojem bi metoda za taj path bila definirana kao admin.metoda(/ jer se njoj sprijeda dodaju /foo/bar
  parh /foo/bar/baz bi došči do rute koja je u admin pathu definirana kao admin.metod(/baz) i ona bi se izvršila
  
  ZAKLJUČAKKKK-> pomoću .use MOUNTAMO RUTERE REALTIVNO U ODNOSU NA RAZLIČITE PATHOVE-> SVI PATHOVI/RUTE KOJE DEFINIRAMO NA TOM RUTERU ĆE 
  BITI DEFINIRANI RELATIVNO U DOSNOU NA TAJ MOUNTANI PATH I ZAPRAVO ĆE SE MOUNTANI PATH DODAVATI NA POČETAK PATHA TOG RUTERA ŠTO ĆE 
  ČINITI UKUPNI PATH APLIKACIJE->*/