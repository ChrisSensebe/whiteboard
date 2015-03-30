/* Site routes */

var express = require('express');
var router  = express.Router();

/* route middleware to validate :title */
router.param('title', function(req, res, next, title){
    //url encode title
    var urlEncodedTitle = encodeURI(title);
    //saving in req
    req.title = urlEncodedTitle;
    //go to next thing
    next();
});

/* GET home page */
router.get('/', function(req, res, next){
    
    //internal DB variable
    var db = req.db;
    //getting collection in db
    var collection = db.get('articles');
    
    //getting all articles in collection
    collection.find({}, function(e, docs){
       res.render('site/index', {
           title: 'Articles',
           articles : docs
       });
    });
    
});

/* GET article page */
router.get('/article/:title', function(req, res){
    
    //internal DB variable
    var db = req.db;
    //getting collection
    var collection = db.get('articles');
    //getting 'title' atribute
    var title = unescape(req.title);
    //getting entry that match 'title'
    collection.findOne({'title': title}, {'_id': 0,'title': 1, 'section1': 1}, function(e, docs){
        res.render('site/article', {
            article : docs
        });
    });
    
});

module.exports = router;