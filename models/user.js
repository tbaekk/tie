const mongoose = require('mongoose');
const faker = require('faker');
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

const savedFakeUsers = [];

UserSchema.statics.generateFakeUsers = function (n = 50) {
  const fakeUsers = [];
  for ( let i = 0; i < n; i++ ) {
    fakeUsers.push({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  }
  this.insertMany(fakeUsers)
    .then(bulkUsers => {
      savedFakeUsers.push(...bulkUsers.insertedIds);
    })
    .catch(err => console.log(err));
}

UserSchema.statics.clearFakeUsers = function () {
  let id;
  while (savedFakeUsers.length !== 0) {
    id = savedFakeUsers.pop();
    this.deleteOne({
      _id: id
    });
  }
}

let User = null;
try {
  User = mongoose.model('User', UserSchema);
} catch(e) {
  User = mongoose.model('User');
}

// Test
User.generateFakeUsers(10);

module.exports = User;