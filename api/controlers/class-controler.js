const {Class_instance}=require('../../services');
const {nodelogger}=require('../../loaders/logger');
module.exports={
    getClassesAndSubjectsForStudent:async (req,res,next)=>//za studenta na početnoj strani mu izlistamo boxove sa imenima njegovih razreda i nazivima predemta u tim razredima izlistane u svakom boxu
    {
        try {
            let classes=await Class_instance.getAllClassAndSubjectsForStudent(req.session.user);//u sessionu je spremljen id studenta
            res.json(classes);
        } catch (error) {
            nodelogger.error('Error in  getClassesForStudent');
            next(error);
        }
    },
    getClassesAndSubjectsForTeacher:async (req,res,next)=>//sve isto za studenta samo što radimo za samio učoteljeve razrede
    {
        try {
            let classes=await Class_instance.getAllClassAndSubjectsForTeacher(req.session.user);//u sessionu je spremljen id studenta
            res.json(classes);
        } catch (error) {
            nodelogger.error('Error in  getClassesForTeacher');
            next(error);
        }
    },
    getClassesAndSubjectsForAdmin: async (req,res,next)=>//dohvaćamo sve razrede i predmete iz tih razreda
    {
        try {
            let classes=await Class_instance.getAllClassAndSubjectsForAdmin();
            res.json(classes);
        } catch (error) {
            nodelogger.error('Error in  getClassesForAdmin');
            next(error);
        }
    },
    getClasses:async (req,res,next)=>
    {
        try {
            let classes=await Class_instance.getAllClasses();
            res.json(classes);
        } catch (error) {
            nodelogger.error('Error in getClasses');
            next(error);
        }
    },
    insertClass:async(req,res,next)=>
    {
        try {
            await Class_instance.addClass(req.body);//Format:{class_name,class_year}
            res.sendStatus(200);
        } catch (error) {
            nodelogger.error('Error in insertClass');
            next(error);
        }
    },
    getClassesTeacher:async(req,res,next)=>
    {
        try {
            classes=await Class_instance.getClassesForTeacher(req.session.user);
            res.json(classes);
        } catch (error) {
            nodelogger.error('Error in getClassesTeacher');
            next(error);
        }
    }
}