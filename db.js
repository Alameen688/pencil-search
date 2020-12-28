const mongoose = require('mongoose');

const database_url = 'mongodb://localhost:27017/pencil-db-test';

mongoose.connect(database_url, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {
    console.log("Database connection successful");
}).catch(err => {
    console.log('Error connecting to database. Exiting now...', err);
    process.exit();
});

module.exports = mongoose.connection;
