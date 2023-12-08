const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { 
    type: String,  
    required: [true, 'Please provide your email'],
    unique: true,
    lowerCase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please provide a valid email address',
    ],
  },
  password: { 
    type: String, 
    required: [true, 'Please provide a password']
  },
  name: { 
    type: String, 
    required: [true, 'Please provide your name'] 
  },
});

const User = mongoose.model('User', userSchema);

async function find() {
  return User.find({});
}

async function findByEmail(email) {
  return User.findOne({ email });
}

async function create(user) {
  return User.create(user);
}

module.exports = {
  User,
  userSchema,
  find,
  findByEmail,
  create,
};
