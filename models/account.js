const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Please provide the account type'],
    enum: [
      'Cash',
      'Checking',
      'Savings',
      'Credit Card',
      'Investment',
      'Retirement',
      'Loan',
      'Mortgage',
      'Other',
    ],
  },
  name: {
    type: String,
    required: [true, 'Please provide the account name'],
  },
  balance: {
    type: Number,
    validate: {
      validator(value) {
        return value >= 0;
      },
      message: 'Balance must not be negative',
    },
    default: 0,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Account = mongoose.model('Account', accountSchema);

async function findAccounts() {
  return Account.find({});
}

async function findById(id) {
  return Account.findById(id);
}

async function editById(id, newData) {
  return Account.findByIdAndUpdate({ _id: id }, newData, {
    new: true,
    runValidators: true,
  });
}

async function deleteById(id) {
  return Account.findByIdAndDelete({ _id: id });
}

async function create(account) {
  return Account.create(account);
}

module.exports = {
  accountSchema,
  Account,
  findAccounts,
  findById,
  editById,
  deleteById,
  create,
};
