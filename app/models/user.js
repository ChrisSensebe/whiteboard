var mongoose                 = require('mongoose');
var bcrypt                   = require('bcrypt');
var SALT_WORK_FACTOR         = 10;
var REQUIRED_PASSWORD_LENGTH = 8;

var schema = mongoose.Schema({
   email        : {type : String, required : true, unique : true},
   passwordHash : {type : String, required : true}
});

schema.pre('save', function(next){
   var self = this;
   
   if(!self.isModified('passwordHash')){
      return next();
   }
   
   bcrypt.hash(self.passwordHash, SALT_WORK_FACTOR, function(err, hash){
      if(err){
         return next(err);
      }
      self.passwordHash = hash;
      next();
   });
});

schema.statics.findByUsernameAndPassword = function findByUsernameAndPassword(email, password, cb){
   this.findOne({email : email}, function(err, user){
      if(err){
         return cb(err);
      }
      if(!user){
         return cb();
      }
      
      bcrypt.compare(password, user.passwordHash, function(err, res){
         return cb(err, res ? user : null);
      });
   });
};

schema.set('autoIndex', false);

module.exports = mongoose.model('User', schema);