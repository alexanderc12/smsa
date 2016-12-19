var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var mongoose = require('mongoose');
var session = require('express-session');

var app = express();
app.use(session({
    secret: 'fgdg45f4dg7*^%$',
    resave: false,
    saveUninitialized: false
}));

if(process.env.OPENSHIFT_MONGODB_DB_URL){
    mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME);
}else{
    mongoose.connect('mongodb://127.0.0.1:27017/votacion');
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
nunjucks.configure('views', { autoescape: true, express: app});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'public', 'images', 'icon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

var index = require('./controllers/index');
var coach = require('./controllers/coach');
var referee = require('./controllers/referee');

app.use('/', index);
app.use('/coach', coach);
app.use('/referee', referee);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var server = http.createServer(app);

server.listen(server_port, server_ip_address, function() {
    console.log( "Listening on " + server_ip_address + ", server_port " + server_port );
});
