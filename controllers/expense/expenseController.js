const {
  findexpenses,
  findById,
  create,
  editById,
  deleteById,
} = require('../../models/expense');

const getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await findexpenses(userId);

    if (expenses.length <= 0) {
      return res.status(404).json({ message: 'expenses not found' });
    }

    return res.status(200).json(expenses);
  } catch (error) {
    console.error('Error in get expenses:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const getExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const expense = await findById(id, userId);

    if (!expense) {
      return res.status(404).json({ message: 'expense not found' });
    }

    return res.status(200).json(expense);
  } catch (error) {
    console.error('Error in get expense:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const createExpense = async (req, res) => {
  const data = req.body;
  data.userId = req.user.id;
  console.log('Data received:', data);

  try {
    if (Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ err: 'Please provide the requested fields' });
    }
    const newexpense = await create(data);
    return res.status(201).json(newexpense);
  } catch (error) {
    console.error('Error creating the expense:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const editExpense = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const expense = await findById(id, req.user.id);

    if (!expense) {
      return res.status(404).json({ message: 'expense not found' });
    }

    if (expense.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    const modifiedexpense = await editById(id, newData);
    return res.status(200).json(modifiedexpense);
  } catch (error) {
    console.error('Error in edit expense:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await findById(id, req.user.id);

    if (!expense) {
      return res.status(404).json({ message: 'expense not found' });
    }

    if (expense.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    await deleteById(id);
    return res.status(200).json({ message: 'expense deleted.' });
  } catch (error) {
    console.error('Error in delete expense:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  editExpense,
  deleteExpense,
};
