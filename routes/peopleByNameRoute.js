'use strict'
const express = require('express');
const router = express.Router();
const people = require('../models/people');

//GET - get persons by the sent name
router.get('/:name',async(req, res) => {
    console.log(`the person id is :${req.params.name}`)
    const person = await people.find({name:req.params.name}).exec();
    res.json(person);
})

//DELETE - delete persons by the sent name
router.delete('/:name', async(req, res) =>  {
    const result = await people.deleteMany({ name: req.params.name });
    res.json(result);
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
});

module.exports = router;
