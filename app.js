const express = require('express');
require('dotenv').config();
var app = express();

require("./helper").init(app);
require('./routes')(app);
require('./events').events();
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
