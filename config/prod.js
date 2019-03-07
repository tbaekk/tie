require('dotenv').config();

module.exports = {
  DB_URI: process.env.DB_URI,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY
};