/* Middleware to check authentication */

var isAuthenticated = function(req, res, next){
    
    // user is authenticated, call next()
    if(req.isAuthenticated()){
        return next();
    }
    // if not redirect to login
    res.redirect('/login');
    
};

module.exports = isAuthenticated;