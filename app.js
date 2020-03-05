const express = require('express');
const app = express()
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const layout = require('express-ejs-layouts');
require('dotenv').config()


// middlewares
app.use(cors())
app.use(layout)
app.use(bodyParser.json())

// mongodb
mongoose.connect(process.env.DB_STRING,{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
    console.log("Connected")
})


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static('uploads'))

// API routes

app.use('/', require('./routers/index'))
app.use('/home', require('./routers/home'));
app.use('/upload', require('./routers/upload'));



app.listen(3000,function(e){
    console.log("Listening on 3000")
})