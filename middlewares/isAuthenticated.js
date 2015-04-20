/* Middleware to check authentication */

exports.isAuthenticated = function isAuthenticated(req, res, next){
    // user is authenticated, call next()
    if(req.session.username){
        return next();
    }
    // if not redirect tologin
    res.redirect('/login');
};