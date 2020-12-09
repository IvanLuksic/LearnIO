const express = require('express');
const topic = express.Router();
const {authenticate_student,authenticate_admin,authenticate_teacher}=require('../middleware/login');
const topic_controler=require('../controlers/topic-controler');
module.exports=function (main_ruter){
    main_ruter.use('/',topic);
    topic.post('/topic',authenticate_student,topic_controler.getTopics);
}
/*router.get('/', (req, res) => {
    console.log(req.query);

    let args = {
        where: {}
    };

    let arr = [];
    
    for (let element in Topic.rawAttributes) 
        arr.push(element);    

    for (let element in req.query) 
        if(arr.includes(element))
            args['where'][element] = req.query[element];    

    Topic.findAll(args)
    .then(Topic => {
        res.send(Topic);
    })
    .catch(err => console.log(err))

});

router.get('/create', (req, res) => {

    // /create?name=Zbrajanje&rows_D=5&column_numbers=3&subject_id=2

    const insertion = {
        name: req.query.name,
        rows_D: req.query.rows_D,
        column_numbers: req.query.column_numbers,        
        subject_id: req.query.subject_id
    };
    
    Topic.create(insertion)
    .then(() => {
        console.log("Proslo");
        res.send(insertion);
    })
    .catch(err => console.log(err));
});

router.get('/delete', (req,res) => {
    Topic.destroy({
        where: {
            id: req.query.id
        }
    })
    .then(() => {
        res.send("Deleted element with id " + req.query.id);
    })
    .catch(err => console.log(err))
});

router.get('/test', (req,res) => {
    
    Topic.findAll({
        include: [{
            model: Topic,
            as: 'association',
            through: {
            model: TagsOfTopic,
            attributes: ['required_level']
            }
        }]
    })
    .then(Topic => {
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(Topic, null, 4));
    });
});
  
module.exports = router;*/