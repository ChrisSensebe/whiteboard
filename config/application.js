var express        = require('express'),
    packageJson    = require('../package.json'),
    path           = require('path'),
    env            = process.env.NODE_ENV || 'development',
    routes         = require('../app/routes/routesIndex'),
    favicon        = require('serve-favicon'),
    bodyParser     = require('body-parser'),
    cookieParser   = require('cookie-parser'),
    expressSession = require('express-session'),
    passport       = require('passport'),
    flash          = require('connect-flash'),
    csurf          = require('csurf');

console.log('Loading Whiteboard...');

global.App = {
    app     : express(),
    env     : env,
    port    : process.env.PORT || 8080,
    version : packageJson.version,
    root    : path.join(__dirname, '..'),
    appPath : function(path){return this.root + '/' + path},
    require : function(path){return require(this.appPath(path))},
    start   : function(){
        if(!this.started){
            this.started = true;
            this.app.listen(this.port);
            console.log('Running App version: ' + App.version + ', on port: ' + App.port + ', in ' + App.env + ' mode.');
        }
    }
};

// database connection
App.require('config/database')(process.env.IP + '/whiteboard');

// view engine setup
App.app.set('views', App.appPath('app/views'));
App.app.set('view engine', 'ejs');

/* Middlewares */ 

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
App.app.use(bodyParser.json());
App.app.use(bodyParser.urlencoded({ extended: false }));
App.app.use(cookieParser());
App.app.use(expressSession({
  secret: 'Top secret Trololo',
  saveUninitialized: true,
  resave: true}));
App.app.use(passport.initialize());
App.app.use(passport.session());
App.app.use(flash());
App.app.use(csurf());
App.app.use(express.static(App.appPath('public')));
App.app.use('/', routes);