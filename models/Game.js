const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  description: String,
  name: String,
  author: String,
  link: String
});

module.exports = mongoose.model('Game', gameSchema);