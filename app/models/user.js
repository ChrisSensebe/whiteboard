var mongoose                 = require('mongoose');
var bcrypt                   = require('bcrypt');
var SALT_WORK_FACTOR         = 10;
var REQUIRED_PASSWORD_LENGTH = 8;

var schema = mongoose.Schema({
   email        : {type : String, required : true, unique : true},
   passwordHash : {type : String, required : true}
});

/* Methods */

// generate hash
schema.methods.generateHash = function(password){
   return bcrypt.hash(password, SALT_WORK_FACTOR, null);
};

// chek if password is valid
schema.methods.isValidPassword = function(password){
   return bcrypt.compare(password, this.local.password);
};

module.exports = mongoose.model('User', schema);