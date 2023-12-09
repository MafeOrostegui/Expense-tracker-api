const bcrypt = require('bcrypt');
const {
  findByEmail,
  findById,
  create,
  editByEmail,
  editById,
  deleteById,
  deleteByEmail,
} = require('../../models/user');

const getUser = async (req, res) => {
  const { uid } = req.params;

  try {
    let user;

    if (uid.includes('@')) {
      user = await findByEmail(uid);
    } else {
      user = await findById(uid);
    }

    if (!user) {
      return res.status(404).json();
    }

    return res.json(user);
  } catch (error) {
    console.error('Error in get user:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ err: 'Please provide the requested fields' });
    }

    const existingUser = await findByEmail(email);

    if (existingUser) {
      return res
        .status(409)
        .json({ err: 'Email already exists. Please try another one' });
    }

    const newUser = await create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Error in register:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const editUser = async (req, res) => {
  const { uid } = req.params;
  const newData = req.body;

  try {
    if (!newData.name && !newData.email && !newData.password) {
      return res
        .status(400)
        .json({ err: 'There are no changes in the fields' });
    }

    if (newData.password) {
      newData.password = bcrypt.hashSync(newData.password, 10);
    }

    let user;
    let modifiedUser;

    if (uid.includes('@')) {
      user = await findByEmail(uid);
      modifiedUser = await editByEmail(uid, newData);
    } else {
      user = await findById(uid);
      modifiedUser = await editById(uid, newData);
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json(modifiedUser);
  } catch (error) {
    console.error('Error in edit user:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  const { uid } = req.params;
  let user;

  try {
    if (uid.includes('@')) {
      user = await findByEmail(uid);

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      await deleteByEmail(uid);
    } else {
      user = await findById(uid);

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      await deleteById(uid);
    }
  } catch (error) {
    console.error('Error in delete user:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

module.exports = {
  registerUser,
  getUser,
  editUser,
  deleteUser,
};
