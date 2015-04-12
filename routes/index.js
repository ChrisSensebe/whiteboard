var express  = require('express');
var Article  = require('../models/article');
var passport = require('passport');
var router   = express.Router();

/* route middleware to validate : id */

router.param('id', function(req, res, next, id){
    
    // todo : validations
    
    req.id = id;
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
        res.render('pages/index', {
            logged : req.isAuthenticated(),
            title : 'Articles',
            articles : docs
        });
    });
    
});

// GET article page
router.get('/article/:id', function(req, res){
    
    // getting 'id' atribute
    var id = req.id;
    // getting entry that match 'title'
    Article.find({'_id': id}, function(e, docs){
        var doc = docs[0];
        res.render('pages/article', {
            logged : req.isAuthenticated(),
            article : doc
        });
    });
    
});

/* login & signup routes */

// GET login page
router.get('/login', function(req, res){
    
    // display login page
    res.render('pages/login', {
        logged : req.isAuthenticated(),
        message : req.flash('message')
    });
    
});

// GET signup page
router.get('/signup', function(req, res){
    
    //display login page
    res.render('pages/signup', {
        logged : req.isAuthenticated(),
        message : req.flash('message')
    });
    
});

// POST login
router.post('/login', passport.authenticate('login', {
    
    successRedirect  : '/',
    failureRedirect  : '/login',
    failureFlash     : true
    
}));

// POST register
router.post('/signup', passport.authenticate('signup', {
    
    successRedirect  : '/',
    failureRedirect  : '/signup',
    failureFlash     : true
    
}));

// GET logout
router.get('/logout', function(req, res) {
    
    req.logout();
    res.redirect('/');
    
});

/* edit routes */

// GET edit index page
router.get('/edit', isAuthenticated, function(req, res, next){
    
    //getting all articles in collection
    Article.find({}, function(e, docs){
       res.render('pages/edit', {
           logged : req.isAuthenticated(),
           title: 'Edit',
           articles : docs
       });
    });
    
});

// GET new article page
router.get('/addArticle', isAuthenticated, function(req, res){
    res.render('pages/addArticle', {
        logged : req.isAuthenticated(),
        title: 'Add new article'
    });
});

// GET edit article page
router.get('/editArticle/:id', isAuthenticated, function(req, res){

    // getting 'id' atribute
    var id = req.id;
    console.log(id);
    // getting entry that match 'title'
    Article.find({'_id': id}, function(e, docs){
        var doc = docs[0];
        res.render('pages/editArticle', {
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
    //redirect to edit
    res.location('/edit');
    res.redirect('/edit');
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
        
        //redirect to edit
        res.location('/edit');
        res.redirect('/edit');
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
        
        //redirect to edit
        res.location('/edit');
        res.redirect('/edit');
    });
});

/* Others */

// About
router.get('/about',  function(req, res){
    
    res.render('pages/about', {
        logged : req.isAuthenticated()
    });
    
});

// 404
router.get('*', function(req, res){
    
    if(req.accepts('html')){
        res.render('pages/404', {
            logged : req.isAuthenticated()
        });
    }
});

module.exports = router;
