const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

let User = null;
try {
  User = mongoose.model('User', UserSchema);
} catch(e) {
  User = mongoose.model('User');
}

module.exports = User;