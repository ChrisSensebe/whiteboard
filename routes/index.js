var express = require('express');
var router  = express.Router();

/* GET home page */
router.get('/', function(req, res, next){
    var db = req.db;
    var collection = db.get('articles');
    collection.find({}, function(e, docs){
       res.render('index', {
           title: 'Articles',
           articles : docs
       });
    });
});

/* GET add article page */
router.get('/newArticle', function(req, res){
    res.render('newArticle', {
        title: 'Add new article'
    });
});

module.exports = router;
