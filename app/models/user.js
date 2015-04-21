var mongoose = require('mongoose');

var schema   = mongoose.Schema({
   username : {type : String, unique : true},
   email    : String,
   password : String
});

schema.set('autoIndex', false);

module.exports = mongoose.model('User', schema);