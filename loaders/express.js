const  { Main_ruter}=require('../api');//index.js u api gdje se loadaju svi ruteri
const bodyParser = require('body-parser');//za parsirat body od requesta
const session=require('express-session');
const {globalRateLimiterMiddleware}=require('..//api/middleware/rate-limiter-global');
const config=require('../config');

var PostgreSqlStore = require('connect-pg-simple')(session);
var cors = require('cors')
var corsOptions = {
    origin: '*',
    credentials: true };

module.exports=(app,httplogger)=>{//module.exports nije vise objekt nego funkcija
    app.use(httplogger);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors(corsOptions));
    app.disable('etag');//OVO SMO ISLJUČILI ZBOG CACHEANJA PODATAKA KADA BROWSER VRAĆA STATUS 304 UMJESTO 200
    app.options("/*", function(req, res, next){// regularni izraz /*-> ovo se odnosi na sve rute koji pocinju sa /-> TO SU ZAPRAVO SVE RUTE
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
      res.header('Access-Control-Allow-Credentials','true');
      res.send(200);
    });
    app.set('trust proxy', 1)
    /*MORA BITI PRIJE MAIN RUTERA JER SE INACE NECE MOC KORSITIT U NJIMA*/
    app.use(session({/*session objektu lako pristupimo preko request objekta-> req.session i njemu dodajemo propertiese:
      POSTUPCI KOD ZAHTJEVA KORISNIKA:
    1)generate a unique session id
    2)store that session id in a session cookie (so subsequent requests made by the client can be identified)
    3)create an empty session object, as req.session
    4)depending on the value of saveUninitialized, at the end of the request, the session object will be stored in the session store (which is generally some sort of database)
*/
    saveUninitialized:false,//ne spremaj sessione koje nismo modificirali(req.session objekt smo modificirali) odnsono kojima nismo pridruzili id od usera jer zelimo spremat samo login sessione a ne sve sessione
    resave:false,
    key:'user_sid',//ime cookieja
    //store: stavit sotre za postgres da ih sprema
    secret:'50794A91D858997DD137B114C6F1AB233D0907E1F869E3CC08BF5EEBBE78751C',//This is the secret used to sign the session ID cookie-> KOD HASH FUNKCIJE DA OSIGURAMO INTEGIRTET JER JE JEDINO MI ZNAMO->DA NEBI NEKO DRUGI MOGA NESTO HASHIRAT I POSLAT->OČUVAN INTEGRITET SESIJE->NE MOZE NIKO MIJENJAT SESSION ID I PROBAT UPAST U TUĐU SESIJU
    store: new PostgreSqlStore({
      conString:config.database_url,
      tableName : 'session',
      prunesessionInterval:60//svako 60 sekundi brise sesije koje se expireale
    }),
    cookie:{
     path: '/',secureProxy: true, sameSite:'lax',secure: true, maxAge: 1000*60*60*60 //60 sec, POSTAVTI NA NEKI RAZUMNI BROJ->defulte vrijednosti-> maxage null znaci da se brise kada izade iz browsera,BROJ MILISKEUNDI KOLIKO TRAJE COOKIE
    }//PROBLEM S maxage=null je sta se nece pruneat nikako u bazi pa bolje postavti na neko odredeno vrijeme->DOGOVORIT SE
  }))//SVE RUTE U MAINRUTERU SSE ODNOSE RELATIVNO U ODNOSU NA /ovajstringiz.enva, KAO DA IM NA POCETAK SVAKOG PATHA DODAMO /ovajstringiz.enva
  
  app.use('*',globalRateLimiterMiddleware);//za sve rute korsitit globlani rate limiter
  
  app.use(`/${config.rootpath}`,Main_ruter);//>VEŽEMO Main_ruter NA NEKI PATH IZ ENV KOJI MOZMO PODESAVATI> KADA URL BUDE TAJ PATH ili bilo koji drugi ->onda će aplikacija gledati u Main_ruter i ako je tamo definiran get request za / izvršit će taj request-> RUTE SE U Main_ruter definiraju u odnosu prema / ruti-> ako imamo /foo rutu u Main_ruteru onda će to predstavljat /foo rutu APLIKACIJE
      //DA SMO OVDE STAVILI /foo ONDA BI U Main_ruteru ruta / zapravo bilo ruta foo/ od aplikacije-> NA SVE RUTE U Main_ruteru na početak dodajemo /foo
  //next(err) kada bude pozvan ce odma ici do prve error midleware funkcije-> to je ova naša ulitmate error handler
  app.use((err, req, res, next) => {//midleware error handler-> ima 4 argumenta-> bit ce zadnja u midleware stacku i pozivom nexta u slucaju errora ce greska sigurno doci do nje i biti handleana i dobit cemo resposne
        res.status(err.status || 500);//STATUS ZA SVE GRESKE NA STRANIC SERVERA CE BITI 500-> PRESUMJERIMO SVE GRESKE NA OVAJ ERROR HANDLER MIDDLEWARE POZIVOM next(error)
        res.json({
          error: {
            message: err.message,
          },
        });
      });
}
