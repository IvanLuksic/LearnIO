//ovaj file ucitavamo u index.js file u models folderu koji učitava sve postavke seqelizea
dotenv=require("dotenv");
const envFound = dotenv.config();//ovaj dio cita .env file parsira sadrzaj i sprema environment varijable u process.env objekt
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

module.exports={
  database_url:process.env.DATABASE_URL,
  port:process.env.PORT,
  rootpath:process.env.ROOTPATH,
  roles:{
    admin:process.env.ADMIN,
    teacher:process.env.TEACHER,
    student:process.env.STUDENT
  },
  express_session:{
    signature_secret:process.env.SESSION_SECRET
  },
  otp_length:parseInt(process.env.OTP_LENGTH),
  colors:{
    red:process.env.RED,
    blue:process.env.BLUE,
    grey:process.env.GREY,
    green:process.env.GREEN
  },
  bcrypt:{
    saltRounds: parseInt(process.env.SALT_ROUNDS)
  },
  multer:{
    question_images_storage: process.env.QUESTION_IMAGE_FOLDER_PATH,
    question_images_root_path: process.env.QUESTION_IMAGE_ROOT_PATH,
    ftp_hname: process.env.HOST,
    ftp_uname: process.env.UNAME,
    ftp_pwd: process.env.PASSWD,
    maxImageFileSize:1024*1024//ui bajtovima , 1MB
  },
  rateLimiter: {
    global: {//za sve rute ce se primijeniti-> ako neko napada jako brzo bilo koju rutu ukljucujući i login i register neće ga ovo propustiti
      points: 25, //broj pokusaja
      duration: 1,//unutar intervala od 1 sekunde-> to je nemoguće postić za usera garant je neki napad-> blokiraj šta duže
      blockDuration:60*60*24,//blokiraj ga 1 dan
      tableName:'global_rate_limiter',
      keyPrefix:'global'
    },
    loginPath: {//za logiranje ako ne napada toliko brzo ko u prvom primjeru nego sporije npr pogađa passworde
      points: 25,//broj pokusaja
      duration: 60,//unutar intervala od 1 minute 5 puta falio password-> najvj neki drugi user pokusava upast-> blokiraj ga-> ako neko ide bruteforcat brzo onda će ga sprječit prvi rate limiter
      blockDuration:60*60,//blokiraj ga 1 sat
      tableName:'login_rate_limiter',
      keyPrefix:'login'
    },
    registerPath:{//za registraciju ako salje vise od 1 post requesta za registraciju-> nema dobre namjere-> blokiraj ga
      points:21,
      duration:60*60*24*30,//vise od 1 zahtjeva za registraciju unutar misec dana
      blockDuration:60*60*24*365,//blokiraj ga godinu dana
      tableName:'register_rate_limiter',
      keyPrefix:'register'
    },
    checkLoginPath:{
      points: 10,
      duration:1,
      blockDuration:60*60,//blokiraj 1 sat
      tableName:'check_login_rate_limiter',
      keyPrefix:'check_login'
    }
  }
}