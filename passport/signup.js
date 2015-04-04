var LocalStrategy = require('passport-local').Strategy;
var Users         = require('../models/users');
var bCrypt        = require('bcrypt-nodejs');

module.exports = function(passport){
    
    passport.use('signup', new LocalStrategy({
        
        // allows to pass the request to the callback
        passReqToCallback : true
    },
    function(req, username, password, done){
        
        var findOrCreateUser = function(){
            
            // find user in mongo
            Users.findOne({'username' : username}, function(err, user){
                
                // return using the done method
                if(err){
                    console.log(err);
                    return done(err);
                }
                
                // already exists
                if(user){
                    console.log('user ' + username + ' already exists');
                    return done(null, false, req.flash('message', 'user already exists'));
                }
                
                // create the user
                else{
                    var newUser = new Users();
                    
                    newUser.username = req.body.username;
                    newUser.password = bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
                    newUser.email    = req.body.email;
                    
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
    
    }));
    
};