var mongoose        = require('mongoose'),
   bcrypt           = require('bcrypt');

var schema = mongoose.Schema({
   email        : {type : String, required : true, unique : true},
   passwordHash : {type : String, required : true}
});

/* Methods */

// generate hash
schema.methods.generateHash = function(password){
   return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// chek if password is valid
schema.methods.validPassword = function(password){
   return bcrypt.compareSync(password, this.passwordHash);
};

module.exports = mongoose.model('User', schema);