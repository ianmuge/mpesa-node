
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors=require("cors");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
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


require('./routes')(app);
require('./events').events();


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
let PORT=process.env.PORT||5000;
app.listen(PORT, err => {
    if (err) {
        console.log(err);
        process.exit(1);
        return;
    }
    console.log(`Server listening on port: ${PORT}`);
});
