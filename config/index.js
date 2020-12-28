const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  db_url:process.env.DATABASE_URL || 'mongodb://localhost:27017/pencil-db-test',
  deploy_env: process.env.NODE_ENV,
};
