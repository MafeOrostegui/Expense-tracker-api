const {
  findAccounts,
  findById,
  create,
  editById,
  deleteById,
} = require('../../models/account');

const getAccounts = async (req, res) => {
  try {
    const userId = req.user.id;

    const accounts = await findAccounts({
      $or: [{ userId }, { userId: null }],
    });

    if (accounts.length <= 0) {
      return res.status(404).json({ message: 'Accounts not found' });
    }

    return res.status(200).json(accounts);
  } catch (error) {
    console.error('Error in get categories:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const getAccount = async (req, res) => {
  const { id } = req.params;

  try {
    const account = await findById(id);

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    return res.status(200).json(account);
  } catch (error) {
    console.error('Error in get account:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const createAccount = async (req, res) => {
  const data = req.body;
  data.userId = req.user.id;

  try {
    if (Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ err: 'Please provide the requested fields' });
    }

    const newAccount = await create(data);

    return res.status(201).json(newAccount);
  } catch (error) {
    console.error('Error creating the account:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const editAccount = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    if (Object.keys(newData).length === 0) {
      return res
        .status(400)
        .json({ err: 'There are no changes in the fields' });
    }

    const modifiedAccount = await editById(id, newData);

    if (!modifiedAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }

    return res.status(200).json(modifiedAccount);
  } catch (error) {
    console.error('Error in edit account:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const deleteAccount = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAccount = await deleteById(id);

    if (!deletedAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }

    return res.status(200).json({ message: 'Account deleted.' });
  } catch (error) {
    console.error('Error in delete Account:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

module.exports = {
  getAccounts,
  getAccount,
  createAccount,
  editAccount,
  deleteAccount,
};
