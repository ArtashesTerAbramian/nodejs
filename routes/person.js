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

//Persons pagination
router.get('/:pageId', async (req, res) => {
    try{
    const persons = await Person.find().limit(10).skip(10 * parseInt(req.params.pageId));
    res.json(persons);
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

//get person by id
router.get('/:personId', async (req, res) => {
    try{
    const person = await Person.findById(req.params.personId);
    res.json(person); 
    }catch(err){
        res.json({message: err})
    }
});

//deleting a person
router.delete('/:personId', async (req, res) =>{
    try{
            const removedPerson = await Person.remove({_id: req.params.personId});
            res.json(removedPerson);
        
    }catch(err){
        res.json({message:err});
    }
});

//Update a Person
router.patch('/:personId', async (req, res) => {
    try{
        const updatedPerson = await Person.updateOne(
            {_id: req.params.personId}, 
            { $set: {name: req.body.name, surname: req.body.surname, age: req.body.age}}
            );
        res.json(updatedPerson);
    }catch(err){
        res.json({message: err});
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