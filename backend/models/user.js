const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  name: String,
  image: String,
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  privilege: {
    type: String,
    default: 'User'
  }
});

module.exports =  mongoose.model('User', userSchema)