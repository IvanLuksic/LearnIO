const { Invite_instance}=require('../../services');
const {nodelogger}=require('../../loaders/logger');
module.exports={
    getInviteLink:async (req,res,next)=>
    {
        try {
            let link =await Invite_instance.generateInviteLink(req.session.user,req.params.class_id);//saljemo id teachera iz session cookieja i id razreda
            res.json(link);
        } catch (error) {
            nodelogger.error('Error in getInviteLink');
            next(error);
        }
    },
    enrollInClass:async (req,res,next)=>
    {
        try {
            let isenrolled=await Invite_instance.enrollStudentInClass(req.session.user,req.params.unique_URL);//posaljemo user_id iz session cookieja i jedinstveni dio URL koji ce definiat u koji razred cemo ga upisat
            if(isenrolled)//ako je vratilo 1 onda nije bio upisan i kreirana je nova instanca u JOIN tablici-> status 201 created
            {
                res.sendStatus(201);
            }
            else res.sendStatus(200);//student vec upisan-> ispisi mu to na klijnet strani
        } catch (error) {
            nodelogger.error('Error in enrollInClass');
            next(error);
        }
    }
}