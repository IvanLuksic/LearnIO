const {Course_instance}=require('../../services');
const {nodelogger}=require('../../loaders/logger');
module.exports={
    getAllCourses:async (req,res,next)=>
    {
        try {
            let courses=await Course_instance.getAllCoursesForSubject(req.params.subject_ID);// salje se u query URL jer je get request
            res.json(courses);
        } catch (error) {
            nodelogger.error('Error in fetching courses');
            next(error);
        }
    }
}