const mongoose = require('mongoose');

const database_url = 'mongodb://localhost:27017/pencil-db-test';

mongoose.connect(database_url, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    // poolSize: 5,
    // autoIndex: true
}).then(() => {
    console.log("Database connection successful");
}).catch(err => {
    console.log('Error connecting to database. Exiting now...', err);
    process.exit();
});

// mongoose.set('useFindAndModify', false);

module.exports = mongoose.connection;
