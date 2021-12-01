'use strict'
const express = require('express');
const router = express.Router();
const people = require('../models/people');

// GET - get all people from db
router.get('/', (req, res) => {
    people.find({},(err,result) =>{
        if(err)
            console.log("error with getAll");
        if(result)
            res.json(result);
    })
})

//GET - get one person by id
router.get('/:id',async(req, res) => {
    console.log(`the person id is :${req.params.id}`)
    const person = await people.findById(req.params.id).exec();
    res.json(person);
})

//POST - add new person
router.post('/',async (req, res) => {
    const person = new people({
        name: 'Esther Malka',
        age: 38
    });
 
    // save model to database
    await person.save(function (err, result) {
        if (err) 
            console.error(err);
        if(result){
            res.json(result);
            console.log(`${result.name} saved to people collection. id: ${result._id}`);
        }
    });
});

//DELETE - delete person by the sent id
router.delete('/:id', async(req, res) =>  {
    const result = await people.deleteOne({ id: req.params.id });
    res.json(result);
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
});

//PUT - update person by sent id
router.put('/:id', async (req, res) => {
    const result = await people.updateOne({ _id: req.params.id }, { $set: {name: 'updated100',age:100} }, {upsert: false});
    res.json(result);
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
});


module.exports = router;
