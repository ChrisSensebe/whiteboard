var express         = require('express');
var authentication  = require('../middlewares/isAuthenticated');
var handlers        = require("./routesHandlers");
var router          = express.Router();

// Unprotected routes
router.get('/',            handlers.getHome);
router.get('/article/:id', handlers.getArticleById);
router.get('/login',       handlers.getLogin);
router.get('/signup',      handlers.getSignup);
router.post('/login',      handlers.postLogin);

// Ensure authentication
router.all('/*', authentication.isAuthenticated);

// Protected routes
router.get('/logout',          handlers.getLogout);
router.get('/edit',            handlers.getEdit);
router.get('/addArticle',      handlers.getAddArticle);
router.get('/editArticle/:id', handlers.getEditArticleById);
router.get('/about',           handlers.getAbout);
router.post('/addArticle',     handlers.postAddArticle);
router.post('/update',         handlers.postUpdateArticle);
router.post('/deleteArticle',  handlers.postDeleteArticle);

module.exports = router;
