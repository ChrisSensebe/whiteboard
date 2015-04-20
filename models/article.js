var mongoose = require('mongoose');

var schema   = mongoose.Schema({
   title       : String,
   articleBody : String
});

module.exports = mongoose.model('Article', schema);