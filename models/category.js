const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the name'],
  },
  type: {
    type: String,
    required: [true, 'Category must have a type'],
    enum: ['expenses', 'incomes'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Category = mongoose.model('Category', categorySchema);

async function findCategories() {
  return Category.find({});
}

async function findById(id) {
  return Category.findById(id);
}

async function editById(id, newData) {
  return Category.findByIdAndUpdate({ _id: id }, newData, {
    new: true,
    runValidators: true,
  });
}

async function deleteById(id) {
  return Category.findByIdAndDelete({ _id: id });
}

async function create(category) {
  return Category.create(category);
}

module.exports = {
  categorySchema,
  Category,
  findCategories,
  findById,
  editById,
  deleteById,
  create,
};
