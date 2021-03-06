var auth    = require ('authorized'),
    Article = require('../models/article');

auth.role('article.author', function (record, req, cb){
    cb(null, req.user.id === record.authorId.toString());
});
    
auth.entity('article', function fetchArticle(req, cb){
    if(req.params.id) {
        Article.findById(req.params.id, cb);
    } else {
        Article.findById(req.body.articleId, cb);
    }
    
});

auth.action('modify article', ['article.author']);

module.exports = auth;