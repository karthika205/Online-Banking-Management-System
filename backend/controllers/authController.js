const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

// @POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const accountNumber = 'ACC' + Date.now();
    const user = await User.create({ name, email, password: hashed, role, accountNumber });

    res.status(201).json({ token: generateToken(user), user: { id: user._id, name, email, role: user.role, accountNumber, balance: user.balance } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: 'Invalid email or password' });

    res.json({ token: generateToken(user), user: { id: user._id, name: user.name, email, role: user.role, accountNumber: user.accountNumber, balance: user.balance } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
