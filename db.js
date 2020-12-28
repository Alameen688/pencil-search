const mongoose = require('mongoose');
const config = require('./config');

mongoose
  .connect(config.db_url, {
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
