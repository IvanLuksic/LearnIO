const {User_instance}=require('../../services');
const {nodelogger}=require('../../loaders/logger');
const config=require('../../config');
module.exports={
    insertUser:async (req,res,next)=>
    {
        try {
            await User_instance.addUser(req.body);//posalji parametre iz req bodya
            res.sendStatus(200);
        } catch (error) {
            nodelogger.error('Error in inserUser');
            next(error);
        }
    },
    getAllStudentsForClassWithAllClasses:async (req,res,next)=>
    {
        try {
            const students=await User_instance.getAllStudentsWithClassForClass(req.params.classID);
            res.json(students);
        } catch (error) {
            nodelogger.error('Error in  getStudentsFromClass');
            next(error);
        }
    },
    getAllStudentsWithAllClasses:async(req,res,next)=>
    {
        try {
            const students=await User_instance.getAllStudentsWithClassesAdmin();
            res.json(students);
        } catch (error) {
            nodelogger.error('Error in getAllStudentsWithAllClasses');
            next(error);
        }
    },
    getAllStudentsWithAllClassesForTeacher:async(req,res,next)=>
    {
        try {
            const students=await User_instance.getAllStudentsWithClassesTeacher(req.session.user);//saljemo id od ucitelja
            res.json(students);
        } catch (error) {
            nodelogger.error('Error in getAllStudentsWithAllClassesForTeacher');
            next(error);
        }
    },
    getAllStudentsForAdmin:async(req,res,next)=>
    {
        try {
            const students=await User_instance.getAllStudents();
            res.json(students);
        } catch (error) {
            nodelogger.error('Error in getAllStudentsForAdmin');
            next(error);
        }
    },
    deleteUser:async(req,res,next)=>
    {
        try {
            await User_instance.deleteUserFromDB(req.params.student_id);
            nodelogger.info('Student deleted from database');
            res.sendStatus(200);
        } catch (error) {
            nodelogger.error('Error in deleteStudent');
            next(error);
        }
    },
    updateStudent:async(req,res,next)=>
    {
        try {
            await User_instance.updateStudentData(req.body);
            nodelogger.info('Student data updated');
            res.sendStatus(200);
        } catch (error) {
            nodelogger.error('Error in updateStudent');
            next(error);
        }
    }
}