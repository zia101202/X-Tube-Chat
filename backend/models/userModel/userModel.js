const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
  },
  picture: {
    type: String,
  },
  password: {
    type: String,
  },
  dob: {
    type: Date,
  },
  education: {
    type: String,
  },
  resident: {
    type: String,
  },
  bio: {
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);
