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
    maxImageFileSize:1024*1024//ui bajtovima , 1MB
  }
}