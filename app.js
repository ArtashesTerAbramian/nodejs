const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());

//Import routes
const personRoute = require('./routes/person');

app.use('/person', personRoute);


//Connect to db
mongoose.connect(process.env.DB_CONNECTION, 
() =>{
    console.log("mongo is connected")
});


app.listen(3000);