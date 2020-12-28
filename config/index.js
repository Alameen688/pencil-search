const dotenv = require('dotenv');
dotenv.config();

module.exports= {
    db_url: process.env.DATABASE_URL,
    deploy_env: process.env.NODE_ENV,
}