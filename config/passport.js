var LocalStrategy   = require('passport-local').Strategy,
    User            = require('../../app/models/user');

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
    
    // local strategy
    passport.use('local-login', new LocalStrategy({
        usernameField     : 'email',
        passwordField     : 'password',
        passReqToCallback : true
    },
    function(req, email, password, cb){
        User.findOne({'email' : email},
        function(err, user){
            if(err){
                return cb(err);
            }
            if(!user){
                return cb(null, false, req.flash('loginMessage', 'user not found'));
            }
            if(!user.isValidPassword(password)){
                return cb(null, false, req.flash('loginMessage', 'invalid password'));
            }
            return cb(null, user);
        });
    }));
};