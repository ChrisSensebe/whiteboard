var auth    = require ('authorized'),
    Article = require('../models/article');

auth.role('article.author', function (record, req, cb){
    cb(null, req.user.id === record._id.toString());
});
    
auth.entity('article', function fetchArticle(req, cb){
    Article.findById(req.params.id, cb);
});

auth.action('modify article', ['article.author']);

module.exports = auth;