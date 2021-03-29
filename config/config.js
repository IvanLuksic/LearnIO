//ovaj file ucitavamo u index.js file u models folderu koji učitava sve postavke seqelizea
dotenv=require("dotenv");
const envFound = dotenv.config();//ovaj dio cita .env file parsira sadrzaj i sprema environment varijable u process.env objekt
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}
const { nodelogger } = require("../loaders/logger");
module.exports= {
  "development": {
    use_env_variable: "DATABASE_URL",
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // <<<<<< YOU NEED THIS
    }
  },  
    logging: (msg) => nodelogger.info(`Node logger: ${msg}`)
  },
  "production": {
    use_env_variable: "DATABASE_URL",
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // <<<<<< YOU NEED THIS
    }
     },
    logging: (msg) => nodelogger.info(`Node logger: ${msg}`)
  },
}
