var mongoose = require('mongoose');
let mongoDB =  process.env.mongo;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.set('debug', true);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
if(db) {
    console.log("DB Connected");
}
