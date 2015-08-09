var auth = require('authorized');

module.exports = function notAuthorized(err, req, res, next){
    if(err){
        res.status(401).send('Unauthorized');
    }else{
        next(err);  
    }
};