var mongoose = require('mongoose');

var Schema   = mongoose.Schema;

var ArticleSchema = new Schema({
   title:    String,
   section1: String
});

module.exports = mongoose.model('Article', ArticleSchema);