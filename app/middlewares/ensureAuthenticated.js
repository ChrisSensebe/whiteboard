function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        req.flash('warning', 'You must be logged to do that');
        res.redirect('/login');
    }
}

module.exports = ensureAuthenticated;