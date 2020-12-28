const mongoose = require('mongoose');
const config = require('./config');

const DATABASE_URL =
  config.deploy_env === 'production'
    ? config.db_url
    : 'mongodb://localhost:27017/pencil-db-test';

mongoose
  .connect(DATABASE_URL, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.log('Error connecting to database. Exiting now...', err);
    process.exit();
  });

module.exports = mongoose.connection;
