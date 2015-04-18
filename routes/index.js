var express  = require('express');
var Article  = require('../models/article');
var passport = require('passport');
var router   = express.Router();


/* todo : move middlewares to another file */
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

// GET home page
function getHome(req, res){
    // getting all articles in collection
    Article.find({}, function(error, docs){
        res.render('pages/index', {
            logged :   req.isAuthenticated(),
            title :    'Articles',
            articles : docs
        });
    });
}

// GET article page by id
function getArticleById(req, res){
    // getting 'id' atribute
    var id = req.id;
    // getting entry that match 'title'
    Article.find({'_id': id}, function(e, docs){
        var doc = docs[0];
        res.render(   'pages/article', {
            logged :  req.isAuthenticated(),
            article : doc
        });
    });
}

// GET login page
function getLogin(req, res){
    // display login page
    res.render('pages/login', {
        logged    : req.isAuthenticated(),
        csrfToken : req.csrfToken(),
        message   : req.flash('message')
    });
}

// GET signup page
function getSignup(req, res){
    //display login page
    res.render('pages/signup', {
        logged  :   req.isAuthenticated(),
        csrfToken : req.csrfToken(),
        message :   req.flash('message')
    });
}

// POST login
router.post('/login', passport.authenticate('login', {
    
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash    : true
    
}));

// POST register
router.post('/signup', passport.authenticate('signup', {
    
    successRedirect : '/',
    failureRedirect : '/signup',
    failureFlash    : true
    
}));

// GET logout
function getLogout(req, res) {
    req.logout();
    res.redirect('/');
}

// GET edit index page
function getEdit(req, res){
    //getting all articles in collection
    Article.find({}, function(e, docs){
       res.render('pages/edit', {
           logged    : req.isAuthenticated(),
           title     : 'Edit',
           csrfToken : req.csrfToken(),
           articles  : docs
       });
    });
}

// GET new article page
function getAddArticle(req, res){
    res.render('pages/addArticle', {
        logged    : req.isAuthenticated(),
        csrfToken : req.csrfToken(),
        title     : 'Add new article'
    });
}

// GET edit article page
function getEditArticleById(req, res){
    // getting 'id' atribute
    var id = req.id;
    console.log(id);
    // getting entry that match 'title'
    Article.find({'_id': id}, function(e, docs){
        var doc = docs[0];
        res.render('pages/editArticle', {
            logged    : req.isAuthenticated(),
            csrfToken : req.csrfToken(),
            article   : doc
        });
    });
}

// POST addArticle
function postAddArticle(req, res){
    //inputs
    var articleTitle       = req.body.title;
    var articlearticleBody = req.body.article;
    
    // create new Article
    var newArticle = Article({
        title: articleTitle,
        articleBody: articlearticleBody,
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
}

// POST update
function postUpdateArticle(req, res){
    //inputs
    var articleId          = req.body.id;
    var articleTitle       = req.body.title;
    var articlearticleBody = req.body.article;
    
    // find article and update
    Article.findByIdAndUpdate(articleId, {title: articleTitle, articleBody: articlearticleBody}, function(err){
        if(err){
            console.log(err);
        }
        
        //redirect to edit
        res.location('/edit');
        res.redirect('/edit');
    });
}

// POST deleteArticle
function postDeleteArticle(req, res){
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
}

// About
function getAbout(req, res){
    res.render('pages/about', {
        logged : req.isAuthenticated()
    });
}

// 404
function get404(req, res){
    if(req.accepts('html')){
        res.render('pages/404', {
            logged : req.isAuthenticated()
        });
    }
}

/* GET routes */
router.get('/',                getHome);
router.get('/article/:id',     getArticleById);
router.get('/login',           getLogin);
router.get('/signup',          getSignup);
router.get('/logout',          getLogout);
router.get('/edit',            getEdit);
router.get('/addArticle',      getAddArticle);
router.get('/editArticle/:id', getEditArticleById);
router.get('/about',           getAbout);
router.get('*',                get404);

/* POST routes */
router.post('/addArticle',    postAddArticle);
router.post('/update',        postUpdateArticle);
router.post('/deleteArticle', postDeleteArticle);

module.exports = router;
