const config = require('./config')
const mongoose = require('mongoose');
mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db successful connection');
    mongoose.set('useFindAndModify', false);
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useCreateIndex', true);
});