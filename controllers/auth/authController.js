const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { findByEmail } = require('../../models/user');

const config = require('../../config');

const { secret } = config;

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ err: 'Invalid email or password' });
    }

    const user = await findByEmail(email);

    if (!user) {
      return res.status(400).json({ err: 'User not found' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ err: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      secret,
    );
    return res.json({ accessToken: token, user });
  } catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

module.exports = { login };
