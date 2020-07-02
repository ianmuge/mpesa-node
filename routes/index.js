var express = require('express');
var route = express.Router();
const createError = require('http-errors');

/* GET home page. */
module.exports =(app)=>{
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  app.use('/',require('./mpesa'));
  app.use('/transaction',require('./transaction'));

// catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });
  // error handler

};
