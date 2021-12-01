'use strict'
const express = require('express');
const router = express.Router();
const people = require('../models/people');

// GET - get all people from db
router.get('/', async (req, res) => {
    console.log("get all persons");
    const result = await people.find().exec();
    res.json(result);
})

//GET - get one person by id
router.get('/:id',async(req, res) => {
    console.log(`the person id is :${req.params.id}`);
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
    const result = await person.save();
    console.log(`${result.name} saved to people collection. id: ${result._id}`);
    res.json(result);
});

//DELETE - delete person by the sent id
router.delete('/:id', async(req, res) =>  {
    const result = await people.deleteOne({ id: req.params.id });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
    res.json(result);
});

//PUT - update person by sent id
router.put('/:id', async (req, res) => {
    const result = await people.updateOne({ _id: req.params.id }, { $set: {name: 'updated100',age:100} }, {upsert: false});
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
    res.json(result);
});

//BY NAME
// GET - get person by name
router.get('/byname/:name',async(req, res) => {
    console.log(`the person id is :${req.params.name}`)
    const person = await people.find({name:req.params.name}).exec();
    res.json(person);
})

//DELETE - delete persons by the sent name
router.delete('/byname/:name', async(req, res) =>  {
    const result = await people.deleteMany({ name: req.params.name });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
    res.json(result);
});


module.exports = router;
