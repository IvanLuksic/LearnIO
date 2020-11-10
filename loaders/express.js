const  { Main_ruter}=require('../api');//index.js u api gdje se loadaju svi ruteri
const bodyParser = require('body-parser');
module.exports=(app,httplogger)=>{//module.exports nije vise objekt nego funkcija
    app.use(httplogger);
    app.use(bodyParser.json());
    app.use(bodyParser.text());
    app.use('/',Main_ruter);

      //next(err) kada bude pozvan ce odma ici do prve error midleware funkcije-> to je ova naša ulitmate error handler
    app.use((err, req, res, next) => {//midleware error handler-> ima 4 argumenta-> bit ce zadnja u midleware stacku i pozivom nexta u slucaju errora ce greska sigurno doci do nje i biti handleana i dobit cemo resposne
        res.status(err.status || 500);
        res.json({
          error: {
            message: err.message,
          },
        });
      });
}
