var uuid = require('node-uuid');//npm paket koji ce geneirat random string koji cemo zakacit na url od invite link
const { QueryTypes } = require('sequelize');
const {sequelize}=require('../models');
module.exports=class invite_link{
    constructor(invite_links,class_student,clas,logger)
    {
        this.Invite_links=invite_links;
        this.Class_student=class_student;
        this.Clas=clas;
        this.Logger=logger;
    }
    async generateInviteLink(created_by_id,clas_id,max_joins)//saljemo id onoga tko je kreirao ovaj link i razred za koji je kreiran
    {
        try {
            //1. kreiramo unique URL koji cemo zakacit na http://localhost:3000/api/invite
            var randomID = uuid.v4();//geneiramo unique dio URL 
            this.Logger.info('Unique URL part: '+randomID);
            try {
                let invite_instance=await this.Invite_links.create({
                    unique_link_part:randomID,
                    class_id:clas_id,
                    creator_id:created_by_id,
                    max_number:max_joins,
                    created_at:new Date()
                });
            } catch (error) {
                this.Logger.error('Error in inserting invite link to database');
                throw(error);
            }
           // let invite_link_href=encodeURI('http://localhost:3000/api/invite/'+randomID);//URL enkodiramo zadani link i vratimo ga
           //ovo je hypertext koji ce se dijelit i prikazivat na stranici a GORNJI DIO JE HREF DIO KOJI CE BITI URI za pristup invite dijelu-> na njega ce voditi klik na hypertext
           
            let format={};
            format.link=encodeURI(randomID);
            this.Logger.info('Invite link: '+format.link);
            return format;
        } catch (error) {
            this.Logger.error('Error in function generateInviteLink'+error);
            throw(error);
        }
    }
    async enrollStudentInClass(students_id,unique_URL)//upis studenta u razred preko jedinstvenog dijela u URL koji definira u koji razred cemo ga upisat
    {
        try {
            let unique_URL_part=decodeURI(unique_URL);//prvo dekodiramo URL karaktere u normalni format koji je spremljen u bazi
            this.Logger.info('URL encoded: '+unique_URL+' URL decoded: '+unique_URL_part);
            //1.Pronađi razred u koji ga treba upisa preko unique_Url dijela
            try {
                var invite_link=await this.Invite_links.findOne({
                    where:{
                        unique_link_part:unique_URL_part
                    }
                });
            } catch (error) {
                this.Logger.error('Error in fetching invite link from invite_link table');
                throw(error);
            }
            this.Logger.info('Fetched invite link: localhost:3000/invite/'+invite_link.unique_link_part);
            try {
                let temp={};
                //moramo mu dohvatit razred u koji smo ga upisali da mu to mozemo ispisat
                let clas= await this.Clas.findOne({
                    where:{
                        id:invite_link.class_id
                    }
                });
                temp.class_name=clas.name;
                temp.class_year=clas.school_year;
                //provjeri je li premasen maksimalan broj upisanih studenata
                if(invite_link.current_number>=invite_link.max_number)
                {
                    this.Logger.info('No left space in class');
                    temp.is_enrolled=0;
                    return temp;
                }
                //upisi ucenika u razred ako vec nije upisan postoji
                let is_enrolled=await this.Class_student.findOne({
                    where:{
                        class_id:invite_link.class_id,
                        student_id:students_id
                    }
                });
                if(!is_enrolled)
                {//ako jos nije upisan u razred upisi ga
                await this.Class_student.create({
                    class_id:invite_link.class_id,
                    student_id:students_id
                });
                await sequelize.query('UPDATE invite_links SET current_number=current_number+1 WHERE id=:id ',{
                    raw:true,
                    replacements: {id:invite_link.id },
                    type: QueryTypes.UPDATE
                   });
                this.Logger.info('Student enrolled succesfuly');
                temp.is_enrolled=1;
                return temp;
                }
                else {
                    this.Logger.info('Student already enrolled into this class');
                    temp.is_enrolled=0;
                    return temp;
                }
            } catch (error) {
                this.Logger.error('Error in enrolling student into class');
                throw(error);
            }
        } catch (error) {
            this.Logger.error('Error in function enrollStudentInClass'+error);
            throw(error);
        }
    }
}