var Article = require('../models/article'),
    bcrypt  = require('bcrypt'),
    User    = require('../models/user');

// GET home page
exports.getHome = function getHome(req, res){
    // getting all articles in collection
    Article.find({}, function(error, docs){
        res.render('pages/index', {
            title :    'Articles',
            articles : docs
        });
    });
};

// GET article page by id
exports.getArticleById = function getArticleById(req, res){
    // getting 'id' atribute
    var id = req.params.id;
    // getting entry that match 'title'
    Article.find({'_id': id}, function(e, docs){
        var doc = docs[0];
        res.render(   'pages/article', {
            article : doc
        });
    });
};

// GET login page
exports.getLogin = function getLogin(req, res){
    // display login page
    res.render('pages/login', {
        csrfToken : req.csrfToken(),
    });
};

// GET signup page
exports.getSignup = function getSignup(req, res){
    //display login page
    res.render('pages/signup', {
        csrfToken : req.csrfToken(),
    });
};

// GET logout
exports.getLogout = function getLogout(req, res) {
    req.logout();
    res.redirect('/');
};

// GET edit index page
exports.getEdit = function getEdit(req, res){
    //getting all articles in collection
    Article.find({}, function(e, docs){
       res.render('pages/edit', {
           title     : 'Edit',
           csrfToken : req.csrfToken(),
           articles  : docs
       });
    });
};

// GET new article page
exports.getAddArticle = function getAddArticle(req, res){
    res.render('pages/addArticle', {
        csrfToken : req.csrfToken(),
        title     : 'Add new article'
    });
};

// GET edit article page
exports.getEditArticleById = function getEditArticleById(req, res){
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
};

// GET about
exports.getAbout = function getAbout(req, res){
    res.render('pages/about');
};

// POST addArticle
exports.postAddArticle = function postAddArticle(req, res){
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
};

// POST update
exports.postUpdateArticle = function postUpdateArticle(req, res){
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
};

// POST deleteArticle
exports.postDeleteArticle = function postDeleteArticle(req, res){
    //inputs
    var articleId = req.body.articleId;
    
    // find article and delete
    Article.findByIdAndRemove(articleId, function(err){
        if(err){
            console.log(err);
        }
        
        //redirect to edit
        res.location('/edit');
        res.redirect('/edit');
    });
};