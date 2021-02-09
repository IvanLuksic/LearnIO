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
            let clas=await Invite_instance.enrollStudentInClass(req.session.user,req.params.unique_URL);//posaljemo user_id iz session cookieja i jedinstveni dio URL koji ce definiat u koji razred cemo ga upisat
            let temp={
                class_name:clas.class_name,
                class_year:clas.class_year
            };
            if(clas.is_enrolled)//ako je vratilo 1 onda NIJE bio upisan i kreirana je nova instanca u JOIN tablici-> status 201 created
            {
                res.status(201).json(temp)
            }
            else res.status(200).json(temp);//student vec upisan-> ispisi mu to na klijnet strani
        } catch (error) {
            nodelogger.error('Error in enrollInClass');
            next(error);
        }
    }
}