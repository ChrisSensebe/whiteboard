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

/* site routes */

/* GET home page */
router.get('/', function(req, res, next){
    
    // internal DB variable
    var db = req.db;
    // getting collection in db
    var collection = db.get('articles');
    
    // getting all articles in collection
    collection.find({}, function(e, docs){
       res.render('site/index', {
           title: 'Articles',
           articles : docs
       });
    });
    
});

/* GET article page */
router.get('/article/:title', function(req, res){
    
    // internal DB variable
    var db = req.db;
    // getting collection
    var collection = db.get('articles');
    // getting 'title' atribute
    var title = unescape(req.title);
    // getting entry that match 'title'
    collection.findOne({'title': title}, {'_id': 0,'title': 1, 'section1': 1}, function(e, docs){
        res.render('site/article', {
            article : docs
        });
    });
    
});

/* admin routes */

/* GET admin home page */
router.get('/admin', function(req, res, next){
    
    //internal DB variable
    var db = req.db;
    //getting collection in db
    var collection = db.get('articles');
    
    //getting all articles in collection
    collection.find({}, function(e, docs){
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
    
    //internal DB variable
    var db = req.db;
    //getting collection
    var collection = db.get('articles');
    //getting 'title' atribute
    var title = unescape(req.title);
    //getting entry that match 'title'
    collection.findOne({'title': title}, {'_id': 0,'title': 1, 'section1': 1}, function(e, docs){
        res.render('admin/editArticle', {
            article : docs
        });
    });
    
});

/* POST addArticle */
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
            //redirect to admin
            res.location('/admin');
            res.redirect('/admin');
        }
    });
});

/* POST updateArticle */
router.post('/updateArticle', function(req, res){
    
    //internal DB variable
    var db = req.db;
    //getting form values 'name' atributes
    var articleId    = req.body.id;
    console.log(articleId);
    var articleTitle = req.body.title;
    var article      = req.body.article;
    //getting collection
    var collection = db.get('articles');
    
    //submit to the db
    collection.update(
        {'_id': articleId},
        {$set: {
            'title': articleTitle,
            'section1': article
        }}, function(err, doc){
        if(err){
            //return error if failed
            res.send('There was a problem updating the article to the database');
        }
        else{
            //redirect to admin
            res.location('/admin');
            res.redirect('/admin');
        }
    });
});

/* POST deleteArticle */
router.post('/deleteArticle', function(req, res){
    
     //internal DB variable
    var db = req.db;
    //getting form values 'name' atributes
    var articleId = req.body.id;
    //getting collection
    var collection = db.get('articles');
    
    //submit to the db
    collection.remove({
        '_id': articleId
    }, function(err, doc){
        if(err){
            //return error if failed
            res.send('There was a problem deleting the article from the database');
        }
        else{
            //redirect to admin
            res.location('/admin');
            res.redirect('/admin');
        }
    });
});

module.exports = router;
