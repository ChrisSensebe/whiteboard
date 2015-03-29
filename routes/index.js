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

/* GET delete article page */
router.get('/deleteArticle', function(req, res){
    
    //internal DB variable
    var db = req.db;
    //getting collection in db
    var collection = db.get('articles');
    
    collection.find({}, function(e, docs){
        res.render('deleteArticle', {
            title: 'Delete article',
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
        res.render('article', {
            article : docs
        });
    });
    
});

/* POST to add article */
router.post('/addArticle', function(req, res){
    
    //internal DB variable
    var db = req.db;
    //getting form values 'name' atributes
    var title = req.body.title;
    var article = req.body.article;
    //getting collection
    var collection = db.get('articles');
    
    //submit to the db
    collection.insert({
        'title': title,
        'section1': article
    }, function(err, doc){
        if(err){
            //return error if failed
            res.send('There was a problem adding the article to the database');
        }
        else{
            //else, set the header so the address bar doesn't still say /newArticle
            res.location('/');
            //redirect to index
            res.redirect('/');
        }
    });
});

/* POST to del article */
router.post('/delArticle', function(req, res){
    
    //internal DB variable
    var db = req.db;
    //getting form values 'name' atributes
    var title = req.body.title;
    //getting collection
    var collection = db.get('articles');
    
    //submit to the db
    collection.remove({
        'title': title
    }, function(err, doc){
        if(err){
            //return error if failed
            res.send('There was a problem deleting the article from the database');
        }
        else{
            //else, set the header so the address bar doesn't still say /newArticle
            res.location('/');
            //redirect to index
            res.redirect('/');
        }
    });
});

module.exports = router;
