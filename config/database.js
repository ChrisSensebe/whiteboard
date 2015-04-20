var mongoose = require('mongoose');

function dbConnect(databaseUrl){
    mongoose.connect(databaseUrl);
    
    var database = mongoose.connection;
    database.on('error', console.error.bind(console, 'connection error'));
    database.once('open', function(){
        console.log('Mongoose connected at: ' + databaseUrl + '.');
    });
}

module.exports = dbConnect;