var express         = require('express');
var Article         = require('../models/article');
var isAuthenticated = require('../middlewares/isAuthenticated');
var router          = express.Router();

/* Routes functions */

// GET home page
function getHome(req, res){
    // getting all articles in collection
    Article.find({}, function(error, docs){
        res.render('pages/index', {
            title :    'Articles',
            articles : docs
        });
    });
}

// GET article page by id
function getArticleById(req, res){
    // getting 'id' atribute
    var id = req.params.id;
    // getting entry that match 'title'
    Article.find({'_id': id}, function(e, docs){
        var doc = docs[0];
        res.render(   'pages/article', {
            article : doc
        });
    });
}

// GET login page
function getLogin(req, res){
    // display login page
    res.render('pages/login', {
        csrfToken : req.csrfToken(),
        message   : req.flash('message')
    });
}

// GET signup page
function getSignup(req, res){
    //display login page
    res.render('pages/signup', {
        csrfToken : req.csrfToken(),
        message :   req.flash('message')
    });
}

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
           title     : 'Edit',
           csrfToken : req.csrfToken(),
           articles  : docs
       });
    });
}

// GET new article page
function getAddArticle(req, res){
    res.render('pages/addArticle', {
        csrfToken : req.csrfToken(),
        title     : 'Add new article'
    });
}

// GET edit article page
function getEditArticleById(req, res){
    // getting 'id' atribute
    var id = req.params.id;
    // getting entry that match 'title'
    Article.find({'_id': id}, function(e, docs){
        var doc = docs[0];
        res.render('pages/editArticle', {
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
    var articleId          = req.body.articleId;
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
    var articleId = req.body.articleId;
    console.log(articleId);
    
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

// POST login
function postLogin(req, res){
    if(req.body.username){
        req.session.username = req.body.username;
        res.redirect('/edit');
    }
    else{
        res.redirect('/');
    }
}

// About
function getAbout(req, res){
    res.render('pages/about');
}

/* Routes */

// Unprotected routes
router.get('/',            getHome);
router.get('/article/:id', getArticleById);
router.get('/login',       getLogin);
router.get('/signup',      getSignup);
router.post('/login',      postLogin);

// Ensure authentication
router.all('/*', isAuthenticated);

// Protected routes
router.get('/logout',          getLogout);
router.get('/edit',            getEdit);
router.get('/addArticle',      getAddArticle);
router.get('/editArticle/:id', getEditArticleById);
router.get('/about',           getAbout);
router.post('/addArticle',     postAddArticle);
router.post('/update',         postUpdateArticle);
router.post('/deleteArticle',  postDeleteArticle);

module.exports = router;
