const express = require('express');
const app = express()
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
var upload = require('express-fileupload');
const layout = require('express-ejs-layouts');

require('dotenv').config()


// middlewares
// app.use(cors())
app.use(layout)
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(upload())


// mongodb
mongoose.connect(process.env.DB_STRING,{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
    if(err){
        console.log(err)
        throw err
    }
    console.log("Connected")
})


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'uploads')))

// API routes

app.use('/', require('./routers/index'))
app.use('/home', require('./routers/home'));



app.listen(3000,function(e){
    console.log("Listening on 3000")
})