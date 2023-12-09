const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
  },
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
    required: [true, 'Please provide a password'],
  },
});

const User = mongoose.model('User', userSchema);

async function findByEmail(email) {
  return User.findOne({ email });
}

async function findById(id) {
  return User.findById(id);
}

async function editById(id, newData) {
  return User.findByIdAndUpdate({ _id: id }, newData, {
    new: true,
    runValidators: true,
  });
}

async function editByEmail(email, newData) {
  return User.findOneAndUpdate({ email }, newData, {
    new: true,
    runValidators: true,
  });
}

async function deleteById(id) {
  return User.findByIdAndDelete({ _id: id });
}

async function deleteByEmail(email) {
  return User.findOneAndDelete({ email });
}

async function create(user) {
  return User.create(user);
}

module.exports = {
  userSchema,
  User,
  findByEmail,
  findById,
  editById,
  editByEmail,
  deleteById,
  deleteByEmail,
  create,
};
