const express = require('express');
const router = express.Router();

const models = require('../../models');
const Result = models.Result;
const Topic = models.Topic;

router.get('/', (req, res) => {
    console.log(req.query);

    let args = {
        where: {}
    };

    let arr = [];
    
    for (let element in Result.rawAttributes) 
        arr.push(element);    

    for (let element in req.query) 
        if(arr.includes(element))
            args['where'][element] = req.query[element];    

    Result.findAll(args)
    .then(Result => {        
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(Result, null, 4));
    })
    .catch(err => console.log(err))

});

router.get('/create', (req, res) => {

    // /create?grade=1&result_array_by_columns[]=1&result_array_by_columns[]=5&booleanblue=false&subject_id=1&course_id=1&topic_id=2&student_id=1

    const insertion = {
        grade: req.query.grade,
        result_array_by_columns: req.query.result_array_by_columns,
        booleanblue: req.query.booleanblue,
        subject_id: req.query.subject_id,
        course_id: req.query.course_id,
        topic_id: req.query.topic_id,
        student_id: req.query.student_id
    };
    
    Result.create(insertion)
    .then(() => {
        console.log("Proslo");
        res.send(insertion);
    })
    .catch(err => console.log(err));
});

router.get('/delete', (req,res) => {
    Result.destroy({
        where: {
            id: req.query.id
        }
    })
    .then(() => {
        res.send("Deleted element with id " + req.query.id);
    })
    .catch(err => console.log(err))
});
  
module.exports = router;