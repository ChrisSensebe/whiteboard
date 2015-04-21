var mongoose = require('mongoose');

var schema   = mongoose.Schema({
   title       : {type : String, required : true, unique : true},
   articleBody : {type : String, required : true}
});

schema.set('autoIndex', false);

module.exports = mongoose.model('Article', schema);