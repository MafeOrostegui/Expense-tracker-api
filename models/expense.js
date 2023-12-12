const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
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

const Expense = mongoose.model('expense', expenseSchema);

async function findexpenses(userId) {
  return Expense.find({ userId });
}

async function findById(id, userId) {
  return Expense.findOne({ _id: id, userId });
}

async function editById(id, newData) {
  return Expense.findOneAndUpdate({ _id: id }, newData, {
    new: true,
    runValidators: true,
  });
}

async function deleteById(id) {
  return Expense.findOneAndDelete({ _id: id });
}

async function create(expense) {
  return Expense.create(expense);
}

module.exports = {
  expenseSchema,
  Expense,
  findexpenses,
  findById,
  editById,
  deleteById,
  create,
};
