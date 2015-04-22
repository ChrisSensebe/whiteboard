var express        = require('express'),
    handlers       = require('../routes/routesHandlers'),
    passport       = require('passport'),
    router         = express.Router();

// Unprotected routes
router.get('/',            handlers.getHome);
router.get('/article/:id', handlers.getArticleById);
router.get('/login',       handlers.getLogin);
router.get('/signup',      handlers.getSignup);
router.get('/about',       handlers.getAbout);
router.post('/signup',     handlers.postSignup);
router.post('/login',      passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login', failureFlash: 'invalid username or password'}));

// Protected routes
router.get('/logout',          handlers.getLogout);
router.get('/edit',            handlers.getEdit);
router.get('/addArticle',      handlers.getAddArticle);
router.get('/editArticle/:id', handlers.getEditArticleById);
router.get('/logout',          handlers.getLogout),
router.post('/addArticle',     handlers.postAddArticle);
router.post('/update',         handlers.postUpdateArticle);
router.post('/deleteArticle',  handlers.postDeleteArticle);

module.exports = router;
