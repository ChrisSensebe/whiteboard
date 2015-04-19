/* Middleware to check authentication */

var isAuthenticated = function(req, res, next){
    console.log(req.session.username);
    // user is authenticated, call next()
    if(req.session.username){
        return next();
    }
    // if not redirect home
    res.redirect('/login');
    
};

module.exports = isAuthenticated;