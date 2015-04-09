var LocalStrategy = require('passport-local').Strategy;
var Users         = require('../models/users');
var bCrypt        = require('bcrypt-nodejs');

module.exports = function(passport){
    
    //check if valid password
    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
    
    passport.use('login', new LocalStrategy(
        {passReqToCallback : true}, // allows to pass the request to the callback
    function(req, username, password, done){
        // check if user in db
        Users.findOne({'username' : username},
        function(err, user){
            
            // if err return using done method
            if(err){
                return done(err);
            }
            
            // username !exists return err & redirect back
            if(!user){
                return done(null, false, req.flash('message', 'user not found'));
            }
            
            // user exists but wrong return err & redirect back
            if(!isValidPassword(user, password)){
                return done(null, false, req.flash('message', 'invalid password'));
            }
            
            // user & password match  --> return user
            return done(null, user);
            
        });
    }));
};