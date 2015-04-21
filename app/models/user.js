var mongoose = require('mongoose');

var schema   = mongoose.Schema({
   username : {type : String, required : true, unique : true},
   email    : {type : String, required : true},
   password : {type : String, required : true}
});

schema.set('autoIndex', false);

module.exports = mongoose.model('User', schema);