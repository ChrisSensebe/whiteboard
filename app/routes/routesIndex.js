var express         = require('express'),
    handlers        = require('./routesHandlers'),
    passport        = require('passport'),
    isAuthenticated = require('../middlewares/ensureAuthenticated'),
    auth            = require('../authorization/accesControl'),
    canModify       = auth.can('modify article'),
    router          = express.Router();

// Unprotected routes
router.get('/',            handlers.getHome);
router.get('/article/:id', handlers.getArticleById);
router.get('/login',       handlers.getLogin);
router.get('/signup',      handlers.getSignup);
router.get('/about',       handlers.getAbout);
router.post('/signup',     passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/signup',
    failureFlash    : true
}));
router.post('/login',      passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash    : true
}));

router.all('/app/*', isAuthenticated);

// Protected routes
router.get('/app/logout',          handlers.getLogout);
router.get('/app/edit',            handlers.getEdit);
router.get('/app/addArticle',      handlers.getAddArticle);
router.get('/app/editArticle/:id', canModify, handlers.getEditArticleById);
router.get('/app/upload',          handlers.getUpload);
router.get('/app/profile',         handlers.getProfile);
router.post('/app/updateProfile',  handlers.postUpdateProfile);
router.post('/app/addArticle',     handlers.postAddArticle);
router.post('/app/update',         canModify, handlers.postUpdateArticle);
router.post('/app/deleteArticle',  canModify, handlers.postDeleteArticle);
router.post('/app/upload',         handlers.postUpload);

// 404
router.get('/*', handlers.get404);

module.exports = router;
