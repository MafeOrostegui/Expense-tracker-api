const {
  findIncomes,
  findById,
  create,
  editById,
  deleteById,
} = require('../../models/income');

const getIncomes = async (req, res) => {
  try {
    const userId = req.user.id;

    const incomes = await findIncomes(userId);

    if (incomes.length <= 0) {
      return res.status(404).json({ message: 'Incomes not found' });
    }

    return res.status(200).json(incomes);
  } catch (error) {
    console.error('Error in get incomes:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const getIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const income = await findById(id, userId);

    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }

    return res.status(200).json(income);
  } catch (error) {
    console.error('Error in get income:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const createIncome = async (req, res) => {
  const data = req.body;
  data.userId = req.user.id;
  console.log('Data received:', data);

  try {
    if (Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ err: 'Please provide the requested fields' });
    }
    const newIncome = await create(data);
    return res.status(201).json(newIncome);
  } catch (error) {
    console.error('Error creating the income:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const editIncome = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const income = await findById(id, req.user.id);

    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }

    if (income.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    const modifiedIncome = await editById(id, newData);
    return res.status(200).json(modifiedIncome);
  } catch (error) {
    console.error('Error in edit income:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const deleteIncome = async (req, res) => {
  const { id } = req.params;

  try {
    const income = await findById(id, req.user.id);

    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }

    if (income.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    await deleteById(id);
    return res.status(200).json({ message: 'Income deleted.' });
  } catch (error) {
    console.error('Error in delete Income:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

module.exports = {
  getIncomes,
  getIncome,
  createIncome,
  editIncome,
  deleteIncome,
};
