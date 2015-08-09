var mongoose = require('mongoose');

var schema   = mongoose.Schema({
   authorId    : {type : mongoose.Schema.Types.ObjectId},
   title       : {type : String, required : true, unique : true},
   articleBody : {type : String, required : true},
   author      : {type : String, required : true},
   created     : {type : Date, default : Date.now},
   updated     : {type : Date, default : Date.now}
});

schema.set('autoIndex', false);

module.exports = mongoose.model('Article', schema);