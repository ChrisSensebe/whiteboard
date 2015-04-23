function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next();
    }
    req.flash('warning', 'You must be logged to do that');
    res.redirect('/login');
}

module.exports = ensureAuthenticated;