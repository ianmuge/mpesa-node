const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors=require("cors");
const mongoose = require('mongoose');
const Agenda = require('agenda');
exports.init=(app)=>{
// view engine setup
    app.set('views', './views');
    app.set('view engine', 'twig');
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(express.static('./public'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    mongoose
        .connect(process.env.MONGODB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to the Database successfully');
        }).catch((err) => {
        console.log(`Error: ${err}`);
    });
    const agenda=new Agenda({
        // db: {address: mongoose.connection.toString(), collection: 'delayed'},
        mongo: mongoose.connection,
        processEvery: '30 seconds'
    });
    require("../tasks")(agenda);
    (async function() {
        await agenda.start();
    })();
    exports.agenda=agenda;
};