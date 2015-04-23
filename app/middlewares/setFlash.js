function setFlash(req, res, next){
    res.locals.message = {
        notice  : req.flash('notice'),
        warning : req.flash('warning')
    };
    next();
}

module.exports = setFlash;