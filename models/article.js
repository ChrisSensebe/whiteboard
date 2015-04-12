var mongoose = require('mongoose');

var Schema   = mongoose.Schema;

var ArticleSchema = new Schema({
   title       : String,
   articleBody : String
});

module.exports = mongoose.model('Article', ArticleSchema);