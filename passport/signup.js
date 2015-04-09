var LocalStrategy = require('passport-local').Strategy;
var User          = require('../models/users');
var bCrypt        = require('bcrypt-nodejs');

module.exports = function(passport){
    
    passport.use('signup', new LocalStrategy(
        {passReqToCallback : true}, // allows to pass the request to the callback
        function(req, username, password, done){
            
            // User.findOne wont fire unless data is sent back
            process.nextTick(function(){
                
                // find user with given username
                User.findOne({ 'username' : username }, function(err, user){
                    
                    // if err, return the error
                    if(err){
                        return done(err);
                    }
                    // check if user already exists
                    if(user){
                        return done(null, false, req.flash('message', 'user ' + username + ' already exists'));
                    }
                    // create the new user
                    else{
                        var newUser = new User();
                        // save user
                        newUser.username = username;
                        newUser.password = bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
                        newUser.email    = req.body.email;
                        newUser.save(function(err){
                            if(err){
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));
};