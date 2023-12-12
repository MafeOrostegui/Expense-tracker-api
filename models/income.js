const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  amount: {
    type: Number,
    required: [true, 'Please provide the ammount'],
    min: 0,
  },
  description: { type: String, required: false },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Income = mongoose.model('Income', incomeSchema);

async function findIncomes(userId) {
  return Income.find({ userId });
}

async function findById(id, userId) {
  return Income.findOne({ _id: id, userId });
}

async function editById(id, newData) {
  return Income.findOneAndUpdate({ _id: id }, newData, {
    new: true,
    runValidators: true,
  });
}

async function deleteById(id) {
  return Income.findOneAndDelete({ _id: id });
}

async function create(income) {
  return Income.create(income);
}

module.exports = {
  incomeSchema,
  Income,
  findIncomes,
  findById,
  editById,
  deleteById,
  create,
};
