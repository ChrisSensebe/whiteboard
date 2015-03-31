var express  = require('express');
var router   = express.Router();
var Article = require('../models/article');
var Users    = require('../models/user');


/* route middleware to validate :title */
router.param('title', function(req, res, next, title){
    //url encode title
    var urlEncodedTitle = encodeURI(title);
    //saving in req
    req.title = urlEncodedTitle;
    //go to next thing
    next();
});

/* site routes */

/* GET home page */
router.get('/', function(req, res, next){
    
    // getting all articles in collection
    Article.find({}, function(error, docs){
        res.render('site/index', {
           title: 'Articles',
           articles : docs
        });
    });
    
});

/* GET article page */
router.get('/article/:title', function(req, res){
    
    // getting 'title' atribute
    var title = unescape(req.title);
    // getting entry that match 'title'
    Article.find({'title': title}, function(e, docs){
        var doc = docs[0];
        res.render('site/article', {
            article : doc
        });
    });
    
});

/* admin routes */

/* GET admin home page */
router.get('/admin', function(req, res, next){
    
    //getting all articles in collection
    Article.find({}, function(e, docs){
       res.render('admin/admin', {
           title: 'Admin',
           articles : docs
       });
    });
    
});

/* GET new article page */
router.get('/addArticle', function(req, res){
    res.render('admin/addArticle', {
        title: 'Add new article'
    });
});

/* GET edit article page */
router.get('/editArticle/:title', function(req, res){
    
    //getting 'title' atribute
    var title = unescape(req.title);
    //getting entry that match 'title'
    Article.find({'title': title}, function(e, docs){
        var doc = docs[0];
        res.render('admin/editArticle', {
            article : doc
        });
    });
    
});

/* POST addArticle */
router.post('/addArticle', function(req, res){
    
    //inputs
    var articleTitle    = req.body.title;
    var articleSection1 = req.body.article;
    
    // create new Article
    var newArticle = Article({
        title: articleTitle,
        section1: articleSection1,
    });
    
    //submit to the db
    newArticle.save(function(err){
        if(err){
            console.log(err);
        }
    console.log('article created');
    //redirect to admin
    res.location('/admin');
    res.redirect('/admin');
    });
});

/* POST updateArticle */
router.post('/updateArticle', function(req, res){
    
    //inputs
    var articleId              = req.body.id;
    var articleTitle    = req.body.title;
    var articleSection1 = req.body.article;
    
    // find article and update
    Article.findByIdAndUpdate(articleId, {title: articleTitle, section1: articleSection1}, function(err){
        if(err){
            console.log(err);
        }
        console.log('article updated');
        
        //redirect to admin
        res.location('/admin');
        res.redirect('/admin');
    });
});

/* POST deleteArticle */
router.post('/deleteArticle', function(req, res){
    
    //inputs
    var articleId       = req.body.id;
    
    // find article and delete
    Article.findByIdAndRemove(articleId, function(err){
        if(err){
            console.log(err);
        }
        console.log('article deleted');
        
        //redirect to admin
        res.location('/admin');
        res.redirect('/admin');
    });
});

module.exports = router;
