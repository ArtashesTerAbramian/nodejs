const express = require('express');
const router = express.Router();
const Person = require('../models/Person');
let allPersons;

//get Persons by limit
router.get('/', async (req, res) =>{
    try{
        const persons = await Person.find().limit(10);
        res.json(persons)
    }catch(err){
        res.json({message: err});
    }
});

//Submit a post
router.post('/', async (req, res) =>{
    const newPerson = new Person({
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age
    });
    try{
    const savedPerson = await newPerson
    .save()
    .then(() => {
        allPersons.push(savedPerson);
    });
    res.json(savedPerson);
    }catch(err){
        res.json({message: err})
    }
})

//get post by id
router.get('/:personId', async (req, res) => {
    try{
    const person = await Person.findById(req.params.personId);
    res.json(person); 
    }catch(err){
        res.json({message: err})
    }
});

function getAllPersons() {
    try{
        const filter = {};
        allPersons = JSON.stringify(Person.find(filter));
        console.log(allPersons);
    }catch(err){
        console.log({message: err});
    }
}


module.exports = router;