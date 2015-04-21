var mongoose = require('mongoose');

var schema   = mongoose.Schema({
   username : {type : String, unique : true},
   email    : String,
   password : String
});

module.exports = mongoose.model('Users', schema);