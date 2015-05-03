// configuartion file"

var config = {
    // session secret
    sessionSecret : 'Your session secret',
    // database connection
    database      : 'Your database url',
    // helmet middleware: https://www.npmjs.com/package/helmet
    helmet         : {
        csp           : {},
        xssFilter     : {},
        frameguard    : {},
        hsts          : {},
        hidePoweredBy : {},
        noCache       : {},
        hpkp          : {}
        
    }
};

module.exports = config;
