var Article    = require('../models/article'),
    User       = require('../models/user'),
    path       = require('path'),
    formidable = require('formidable'),
    fs         = require('fs-extra');

// GET home page
exports.getHome = function getHome(req, res){
    // getting all articles in collection
    Article.find({}, function(error, docs){
        res.render('pages/index', {
            articles : docs,
        });
    });
};

// GET article page by id
exports.getArticleById = function getArticleById(req, res){
    // getting 'id' atribute
    var id = req.params.id;
    // getting entry that match 'title'
    Article.find({'_id': id}, function(err, docs){
        if(err){
            console.log(err);
            res.status(404);
            res.send('Page not found');
        }
        else{
            var doc = docs[0];
            res.render('pages/article', {
                article : doc
            }); 
        }
    });
};

// GET login page
exports.getLogin = function getLogin(req, res){
    // display login page
    res.render('pages/login');
};

// GET signup page
exports.getSignup = function getSignup(req, res){
    //display login page
    res.render('pages/signup');
};

// GET logout
exports.getLogout = function getLogout(req, res) {
    req.flash('notice', 'Good bye ' + req.user.username);
    req.logout();
    res.redirect('/');
};

// GET edit index page
exports.getEdit = function getEdit(req, res){
    //getting all articles in collection
    Article.find({'authorId' : req.user._id}, function(e, docs){
       res.render('pages/edit', {
           title     : 'Edit',
           articles  : docs
       });
    });
};

// GET new article page
exports.getAddArticle = function getAddArticle(req, res){
    res.render('pages/addArticle', {
        title     : 'Add new article'
    });
};

// GET edit article page
exports.getEditArticleById = function getEditArticleById(req, res){
    // getting 'id' atribute
    var id = req.params.id;
    // getting entry that match 'title'
    Article.find({'_id': id}, function(err, docs){
        if(err){
            console.log(err);
            res.status(404);
            res.send('Page not found');
        }
        else{
            var doc = docs[0];
            res.render('pages/editArticle', {
                article : doc
            }); 
        } 
    });
};

// GET about
exports.getAbout = function getAbout(req, res){
    res.render('pages/about');
};

// GET upload page
exports.getUpload = function getUpload(req, res){
    res.render('pages/upload');
};

// GET updateProfile page
exports.getProfile = function getUpdateProfile(req, res){
    res.render('pages/profile.ejs');
};

// POST upload
exports.postUpload = function postUpload(req, res){
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../../temp/');
    form.parse(req, function(err, fields, files){
        if(err){
            console.log(err);
        }
    });
    form.on('end', function(fields, files){
        var tempPath  = this.openedFiles[0].path;
        var fileName  = this.openedFiles[0].name;
        var finalPath = path.join(__dirname, '../../public/images/') + fileName;
        fs.copy(tempPath, finalPath, fileName, function(err){
            if(err){
                console.log(err);
            }
            else{
                fs.unlink(tempPath, function(err){
                    if(err){
                        console.log(err);
                    }
                });
            }
        });
        req.flash('notice', 'File successfully uploaded');
        res.redirect('/app/edit');
    });
};

// POST addArticle
exports.postAddArticle = function postAddArticle(req, res){
    //inputs
    var articleTitle       = req.body.title;
    var articlearticleBody = req.body.article;
    var author             = req.user.username;
    var authorId           = req.user._id;
    
    // create new Article
    var newArticle = Article({
        authorId    : authorId,
        title       : articleTitle,
        articleBody : articlearticleBody,
        author      : author,
        date        : Date.now()
    });
    
    //submit to the db
    newArticle.save(function(err){
        if(err){
            console.log(err);
            req.flash('warning', 'Error adding article');
            res.redirect('app/edit');
        }
    //redirect to edit
    res.location('/app/edit');
    req.flash('notice', 'Article succesfully added');
    res.redirect('/app/edit');
    });
};

// POST update
exports.postUpdateArticle = function postUpdateArticle(req, res){
    //inputs
    var articleId    = req.body.articleId;
    var articleTitle = req.body.title;
    var articleBody  = req.body.article;
    
    // find article and update
    Article.findOne({'_id': articleId}, function(err, article){
        if(err){
            throw err;
        }
        else if(!article){
            req.flash('warning', 'Article not found in database');
            res.redirect('/app/edit');
        }
        else{
            article.title       = articleTitle;
            article.articleBody = articleBody;
            article.updated     = Date.now();
            article.save(function(err){
                if(err){
                    console.log(err);
                    req.flash('warning', 'Error saving article');
                    res.redirect('/app/edit');
                }
                else{
                    req.flash('notice', 'Article succesfully updated');
                    res.redirect('/app/edit');
                }
            });
        }
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
        res.location('/app/edit');
        req.flash('notice', 'Article succesfully deleted');
        res.redirect('/app/edit');
    });
};

// POST updateProfile
exports.postUpdateProfile = function postUpdateProfile(req, res){
    
    var username    = req.user.username;
    var newPassword = req.body.password;
    
    User.findOne({'username' : username}, function(err, user) {
        if(err){
            console.log(err);
            req.flash('warning', 'Error updating profile');
            res.redirect('/app/profile');
        }
        else if(!user){
            req.flash('warning', 'User not found');
            res.redirect('/app/edit');
        }
        else{
            user.passwordHash = newPassword;
                
            user.save(function(err){
                if(err){
                    console.log(err);
                    req.flash('warning', 'Error updating profile');
                    res.redirect('/app/profile');
                }
                else{
                    req.flash('notice', 'Profile successfully updated');
                    res.redirect('/app/edit');
                }
            });
        }
    });
};

// GET 404
exports.get404 = function get404(req, res){
    res.status(404);
    res.send('Page not found');
};