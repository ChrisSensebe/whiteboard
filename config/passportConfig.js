var LocalStrategy   = require('passport-local').Strategy,
    User            = require('../app/models/user');

module.exports = function(passport){
    
    // serializing user
    passport.serializeUser(function(user, cb){
        cb(null, user.id);
    });
    // deserializing user
    passport.deserializeUser(function(id, cb){
        User.findById(id, function(err, user){
            cb(err, user);
        });
    });
    
    // local strategies
    
    // local signup
    passport.use('local-signup', new LocalStrategy({
        usernameField     : 'username',
        passwordField     : 'password',
        passReqToCallback : true
    },
    function(req, username, password, cb){
        process.nextTick(function(){
            User.findOne({'username' : username}, function(err, user){
                if(err){
                    return cb(err);
                }
                if(user){
                    return cb(null, false, req.flash('warning', 'user already exists'));
                }
                
                var newUser          = new User;
                newUser.username     = username;
                newUser.passwordHash = password;
                
                newUser.save(function(err){
                    if(err){
                        throw err;
                    }
                    return cb(null, newUser);
                });
            });
        });
    }));
    
    // local login
    passport.use('local-login', new LocalStrategy({
        usernameField     : 'username',
        passwordField     : 'password',
        passReqToCallback : true
    },
    function(req, username, password, cb){
        User.findOne({'username' : username},
        function(err, user){
            if(err){
                return cb(err);
            }
            if(!user){
                return cb(null, false, req.flash('warning', 'user not found'));
            }
            if(!user.validPassword(password)){
                return cb(null, false, req.flash('warning', 'invalid password'));
            }
            return cb(null, user);
        });
    }));
};