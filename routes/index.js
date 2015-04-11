var express  = require('express');
var Article  = require('../models/article');
var passport = require('passport');
var router   = express.Router();

/* route middleware to validate : title */

router.param('title', function(req, res, next, title){
    //url encode title
    var urlEncodedTitle = encodeURI(title);
    //saving in req
    req.title = urlEncodedTitle;
    //go to next thing
    next();
});

/* middleware to check authentication */

var isAuthenticated = function(req, res, next){
    
    // user is authenticated, call next()
    if(req.isAuthenticated()){
        return next();
    }
    
    // if not redirect to login
    res.redirect('/login');
    
};

/* site routes */

// GET home page
router.get('/', function(req, res, next){
    
    // getting all articles in collection
    Article.find({}, function(error, docs){
        res.render('site/index', {
            logged : req.isAuthenticated(),
            title : 'Articles',
            articles : docs
        });
    });
    
});

// GET article page
router.get('/article/:title', function(req, res){
    
    // getting 'title' atribute
    var title = unescape(req.title);
    // getting entry that match 'title'
    Article.find({'title': title}, function(e, docs){
        var doc = docs[0];
        res.render('site/article', {
            logged : req.isAuthenticated(),
            article : doc
        });
    });
    
});

/* login & signup routes */

// GET login page
router.get('/login', function(req, res){
    
    // display login page
    res.render('authentication/login', {
        logged : req.isAuthenticated(),
        message : req.flash('message')
    });
    
});

// GET signup page
router.get('/signup', function(req, res){
    
    //display login page
    res.render('authentication/signup', {
        logged : req.isAuthenticated(),
        message : req.flash('message')
    });
    
});

// POST login
router.post('/login', passport.authenticate('login', {
    
    successRedirect  : '/admin',
    failureRedirect  : '/login',
    failureFlash     : true
    
}));

// POST register
router.post('/signup', passport.authenticate('signup', {
    
    successRedirect  : '/admin',
    failureRedirect  : '/signup',
    failureFlash     : true
    
}));

// GET logout
router.get('/logout', function(req, res) {
    
    req.logout();
    res.redirect('/');
    
});

/* admin routes */

// GET admin home page
router.get('/admin', isAuthenticated, function(req, res, next){
    
    //getting all articles in collection
    Article.find({}, function(e, docs){
       res.render('admin/admin', {
           logged : req.isAuthenticated(),
           title: 'Admin',
           articles : docs
       });
    });
    
});

// GET new article page
router.get('/addArticle', isAuthenticated, function(req, res){
    res.render('admin/addArticle', {
        logged : req.isAuthenticated(),
        title: 'Add new article'
    });
});

// GET edit article page
router.get('/editArticle/:title', isAuthenticated, function(req, res){
    
    //getting 'title' atribute
    var title = unescape(req.title);
    //getting entry that match 'title'
    Article.find({'title': title}, function(e, docs){
        var doc = docs[0];
        res.render('admin/editArticle', {
            logged : req.isAuthenticated(),
            article : doc
        });
    });
    
});

// POST addArticle
router.post('/addArticle', isAuthenticated, function(req, res){
    
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
    //redirect to admin
    res.location('/admin');
    res.redirect('/admin');
    });
});

// POST updateArticle
router.post('/updateArticle', isAuthenticated, function(req, res){
    
    //inputs
    var articleId       = req.body.id;
    var articleTitle    = req.body.title;
    var articleSection1 = req.body.article;
    
    // find article and update
    Article.findByIdAndUpdate(articleId, {title: articleTitle, section1: articleSection1}, function(err){
        if(err){
            console.log(err);
        }
        
        //redirect to admin
        res.location('/admin');
        res.redirect('/admin');
    });
});

// POST deleteArticle
router.post('/deleteArticle', isAuthenticated, function(req, res){
    
    //inputs
    var articleId = req.body.id;
    
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

// 404
router.get('*', function(req, res){
    
    if(req.accepts('html')){
        res.render('site/404', {
            logged : req.isAuthenticated()
        });
    }
    
});

module.exports = router;
