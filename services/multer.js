const config=require('../config');
const multer=require('multer');
var sftpStorage = require('multer-sftp')
//za spremanje slika i drugih fileova npm paket-> VAŽNOOO -> KADA ŠALJEMO JSON FORMATIRANI SADRŽAJ UNUTAR REQUEST BODYA  ONDA NJEGA NAŠ BODY PARSER MOŽE PARSIRATI ALI KADA UNUTAR NJEGA
//ŽELIMO POSLAT I NEKI FILE KOJI JE BINARNA DATOTEKA ENKODIRANA NA ODREĐEN NAČIN TADA NAŠ PARSER TO NE MOŽE PARSIRAT-> ZA TO NAM SLUŽI MULTER KOJI MOŽE PARSIRATI I FILEOVE UNUTAR ISTO REQUEST BODYA NA NAČIN DA DODA req.file objekt preko kojeg možemo pristupat fileu
// pa sad imamo req.body OBJEKT SA SVIM JSON TEKST PODACIMA + req.file objekt sa svim fileovima iz requesta, !!!!!VAŽNA STVAR-> FILEOVI SE ZAJEDNO SA TEKSTOM ŠALJU U REQUEST BODYU UZ OBAVEZNO ZAGLAVLJE Content-Type: multipart/form-data; KOJE RAZDVAJA DJELOVE REQESUT BODYA SA DELIMITEROM I SA NJIHOVIM PRIPADNIM PODACIMA 
/*const storage= multer.diskStorage({//spremamo na disk ne u memoriju
    destination: function (req, file, cb) {
        cb(null, config.multer.question_images_storage);
      },
    filename: function(req,file,cb)
    {
        console.log(Date.now()+'-'+file.originalname);
        cb(null,Date.now()+'-'+file.originalname);//način na koji ćemo spremati ime slike jer kad uzmemo unique ime od multera onda ono nema ekstenziju .jpg,.png pšta nam ne paše a ovako će imat jer će original name bit na kraju
    }
});*/
//filename cemo ostavit da se sam generira-> ima i opcija da izvucemo file name iz req.file
//U FIČTERU MOŽEMO DEFINIRAT KOJE MIME tipoive želimio prihvatiti
const fileFilter=(req,file,cb)=>{//cb je callback funkcija od multera koju pozivamo preko ove reference
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'||file.mimetype==='image/jpg')//prihvaćamo samo ova 2 formata za slike
    {
        cb(null,true);//pozvat ce se middleware sa porukom o uspjehu
    }
    else cb(new Error(file.mimetype + ' is not supported'),false);
}
/*const upload=multer({//konfiguriramo parametre multera-> upload je zapravo middleware od multera
    storage:storage,
    limits:{
    fileSize:config.multer.maxImageFileSize
    },
   fileFilter:fileFilter
});//konfiguriramo parametre multera
module.exports={
    upload:upload
}*/



    // sftp settings     
     var storage = sftpStorage({
       sftp: {
         host: config.multer.ftp_hname,
         port: 22,
         username: config.multer.ftp_uname,
         password: config.multer.ftp_pwd
 
       },
       destination: function (req, file, cb) {
         cb(null, 'images/') // designation folder in host
       },
       filename: function (req, file, cb) {
         // file name settings
         cb(null,Date.now() + '-' +file.fieldname )
       }
     })
 
     var upload = multer({storage: storage,  limits:{
        fileSize:config.multer.maxImageFileSize
        },
       fileFilter:fileFilter
    }).single('questionImage');
 


 module.exports = {
    upload: upload
 }