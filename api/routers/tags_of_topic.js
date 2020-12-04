const express = require('express');
const router = express.Router();

const models = require('../../models');
const Topic = models.Topic;
const TagsOfTopic = models.Tags_of_topic;
const Result = models.Result;

let args = {
    where: {}
};

let attributeArray = [];

for (let element in TagsOfTopic.rawAttributes) 
    attributeArray.push(element);

router.get('/', (req, res) => {
    for (let element in req.query) 
        if(attributeArray.includes(element))
            args['where'][element] = req.query[element];    

    TagsOfTopic.findAll(args)
    .then(TagsOfTopic => {
        res.send(TagsOfTopic);
    })
    .catch(err => console.log(err))

});

// //   Calculate topic achievement level for student_id \\
// let resultsByColumns = [];
// let sum = 0, achievement_level = 0;

// let row = Result[0];
// console.log("Row je: %o", row['dataValues']['topic_id']);
// resultsByColumns = row['dataValues']['result_array_by_columns'];

// for (let i=0; i<resultsByColumns['length']; i++) 
//     sum = sum + parseInt(resultsByColumns[i]);        

// achievement_level = Math.floor(sum / resultsByColumns['length']);
// // Calculate achievement level for student_id //


router.get('/create', (req, res) => {

    // /create?source_topic=1&associated_topic=2&required_level=8

    const insertion = {
        source_topic: req.query.source_topic,
        associated_topic: req.query.associated_topic,
        required_level: req.query.required_level
    };
    
    TagsOfTopic.create(insertion)
    .then(() => {
        console.log("Proslo");
        res.send(insertion);
    })
    .catch(err => console.log(err));
});

router.get('/delete', (req,res) => {
    TagsOfTopic.destroy({
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
            as: 'associated',
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
  
module.exports = router;