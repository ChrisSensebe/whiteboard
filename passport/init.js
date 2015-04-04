var login  = require('./login');
var signup = require('./signup');
var Users   = require('../models/users');

module.exports = function(passport){
    
    // serializing & deserializing user to support persistent login sessions
    passport.serializeUser(function(user, done){
        done(null, user._id);
    });
    
    passport.deserializeUser(function(id, done){
        Users.findById(id, function(err, user){
            done(err, user);
        });
    });
    
    // setting passport strategies for login/registration
    login(passport);
    signup(passport);
    
};