var LocalStrategy = require('passport-local').strategy;
var User          = require('../models/user');
var bCrypt        = require('bcrypt-nodejs');

module.exports    = function(passport){
    
    passport.use('signup', new LocalStrategy({
        passReqToCallback : true // allows to pass the request to the callback
    },
    function(req, username, password, done){
        
        var findOrCreateUser = function(){
            // find user in mongo
            User.findOne({'username' : username}, function(err, user){
                // return using the done method
                if(err){
                    console.log(err);
                    return done(err);
                }
                // already exists
                if(user){
                    console.log('user ' + username + 'already exists');
                    return done(null, false);
                }
                // create the user
                else{
                    var newUser = new User();
                    
                    newUser.username = username;
                    newUser.password = bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
                    newUser.email    = req.param('email');
                    
                    // save the user
                    newUser.save(function(err){
                        if(err){
                            console.log(err);
                            throw err;
                        }
                        console.log('user registration succesful');
                        return(null, newUser);
                    });
                }
            });
        };
        // delay execution of findOrCreateUser to the next tick
        process.nextTick(findOrCreateUser);
    })
    );
};