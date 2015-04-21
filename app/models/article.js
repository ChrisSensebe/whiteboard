var mongoose = require('mongoose');

var schema   = mongoose.Schema({
   title       : {type : String, unique : true},
   articleBody : String
});

schema.set('autoIndex', false);

module.exports = mongoose.model('Article', schema);