var mongoose = require('mongoose'),
   bcrypt    = require('bcrypt'),
   config    = require('../../config/config.js');
   
var schema = mongoose.Schema({
   username     : {type : String, required : true, unique : true},
   passwordHash : {type : String, required : true},
   email        : {type : String}
});

schema.set('autoIndex', false);

/* Methods */

// pre save function
schema.pre('save', function(next){
   var user = this;
   if(!user.isModified('passwordHash')){
      return next();
   }
   bcrypt.genSalt(config.saltWorkFactor, function(err, salt){
      if(err){
         return next(err);
      }
      bcrypt.hash(user.passwordHash, salt, function(err, hash){
         if(err){
            return next(err);
         }
         user.passwordHash = hash;
         next();
      });
   });
});

// chek if password is valid
schema.methods.validPassword = function(password){
   return bcrypt.compareSync(password, this.passwordHash);
};

module.exports = mongoose.model('User', schema);