const { RateLimiterPostgres } = require("rate-limiter-flexible");//tu sprema kredite
const config = require("../../config");
const {sequelize}=require('../../models');//instanca baze za povezivanje rate limitera na bazu
let rate_limiter_global_options=config.rateLimiter.global;
rate_limiter_global_options.storeClient=sequelize;//dodajemo klijenta nakon što se povežemo na bazu kako bi se mogli spremat podaci u bazu
// Postavke rate limitera
const rateLimiter = new RateLimiterPostgres(rate_limiter_global_options);//stvorimo rate limiter
//!!!!!!!RATE LIMITER ĆE BRISATI POLJA U BAZI KOJA SU EXPIREALA(TO ZNA PO EXPIRE STUPCU) SVAKIH 5 MINUTA PERIODIČKI I TO ONA POLJA KOJA SU ISTEKLA PRIJE SAT VREMENA!!!!!
//U BAZI ĆE SE NAPRAVIT TABLICA S 3 STUPCA:
//1) STUPAC KEY SA PREFIKSOM KOJI ZADAMO ĆE BITI IP ADRESA AKO SMO TAKO ODABRALI
//2) STUPCA points ĆE OZNAČAVAT KOLIKO SMO POINTIOVA POTROŠILI/CONSUMALI-> POVEĆAVA SE ZA SVAKI REQUEST KOJI UPUTIMO
//3) expire stupac koji ima timestamp UNIX kojo označava datum kada se radi reset vrijednosti odnosno on ovisi o blockDuration koji smo zadali
//Rate limiter middleware
const globalRateLimiterMiddleware = async (req, res, next) => {//ovo je middleware ZA GLOBALNI RATE LIMITER KOJI ĆE SE POZVATI ZA SVAKU RUTU i KOJI BROJI REQUESTOVE PREMA TIM RUTAMA-> CONSUMA 1 POINT ZA SVAKI REQUEST PREMA BILO KOJOJ RUTI
  try {
    await rateLimiter.consume(req.ip,points = 1);//po IP ADRESI GLEDAMO, IMAMO JOŠ OPCIJE PO LOKACIJI ILI NEKON JEDINSTVENON USERID AL NJEGA NE MOŽEMO KORISTIT JZA USERE KOJI NISU REGISTRIRANI
    next();//ako je proslo sve dobro odnosno ako ima kredita za consumanje onda možemo ići dalje na middleware za tu rutu
    //AKO DOĐE DO GREŠKE ILI AKO NE U OBA SLUČAJA SE RESOLVA PROMISE SA rateLimiterRes OBJEKTOM-> TAJ OBJEKT IMA 4 PROPERTYA OD KOJIH KORISTIMO 3 DOLJE U SLUČAJU GREŠKE
  } catch (rateLimiterRes) {//ako ide iskoristit više pointova nego što je zadano throwat će error koji će resolvat sa ratelimiterres objektom
    res.set({//POSTAVIT OVA ZAGLAVLJA U RESPONSEU
      "Retry-After": rateLimiterRes.msBeforeNext / 1000,
      "X-RateLimit-Limit": config.rateLimiter.global.points,
      "X-RateLimit-Remaining": rateLimiterRes.remainingPoints,
      "X-RateLimit-Reset": new Date(Date.now() + rateLimiterRes.msBeforeNext),
    });//X zaglavlja su custom zaglavlja
    res.status(429).json({ error: { message: "Too Many Requests" } });//Nemoj throwat error na express error middleware nego vrati odma response
  }//status 429= too many requests
};
//funkcija za handleanje errora kada bude previse zahtjeva u ostalin rate limiterima
const rateLimiterTooManyRequests=async (rateLimiter,req,res,points)=>//dobija rate limiter respinse objket, resonse objekt od expreesa i broj pointsova koji su dzovoljeni koji može varirat ovisno o specifičnom rate limiteru za konstruirat response
{
  try {
    await rateLimiter.consume(req.ip,points=1);//NAMJERNO CONSUMAMO DODATNI 1 PUT KAKO BI THROWALI ERROR KOJI ĆE BLOKIRATI KORISNIKA NA BLOCKDURATION TIME JER INAČE SE KORISNIKA BLOKIRA DURATION TIME AKO NE RADIMO OVAKO
  } catch (rateLimiterRes) {
    console.log(rateLimiterRes);
    res.set({//POSTAVIT OVA ZAGLAVLJA U RESPONSEU
      "Retry-After": rateLimiterRes.msBeforeNext / 1000,
      "X-RateLimit-Limit": points,
      "X-RateLimit-Remaining": rateLimiterRes.remainingPoints,
      "X-RateLimit-Reset": new Date(Date.now() + rateLimiterRes.msBeforeNext),
    });
      res.status(429).json({ error: { message: "Too Many Requests" } });
  }
}
module.exports = {
  globalRateLimiterMiddleware:globalRateLimiterMiddleware,
  rateLimiterTooManyRequests: rateLimiterTooManyRequests
}