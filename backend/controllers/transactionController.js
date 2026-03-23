const Transaction = require('../models/Transaction');
const User = require('../models/User');

// @POST /api/transactions/deposit
exports.deposit = async (req, res) => {
  try {
    const { amount, description } = req.body;
    const user = await User.findById(req.user.id);
    user.balance += Number(amount);
    await user.save();
    const txn = await Transaction.create({ receiver: user._id, amount, type: 'deposit', description });
    res.json({ message: 'Deposit successful', balance: user.balance, transaction: txn });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// @POST /api/transactions/withdraw
exports.withdraw = async (req, res) => {
  try {
    const { amount, description } = req.body;
    const user = await User.findById(req.user.id);
    if (user.balance < amount) return res.status(400).json({ message: 'Insufficient balance' });
    user.balance -= Number(amount);
    await user.save();
    const txn = await Transaction.create({ sender: user._id, amount, type: 'withdrawal', description });
    res.json({ message: 'Withdrawal successful', balance: user.balance, transaction: txn });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// @POST /api/transactions/transfer
exports.transfer = async (req, res) => {
  try {
    const { accountNumber, amount, description } = req.body;
    const sender = await User.findById(req.user.id);
    const receiver = await User.findOne({ accountNumber });
    if (!receiver) return res.status(404).json({ message: 'Receiver account not found' });
    if (sender.balance < amount) return res.status(400).json({ message: 'Insufficient balance' });
    sender.balance -= Number(amount);
    receiver.balance += Number(amount);
    await sender.save(); await receiver.save();
    const txn = await Transaction.create({ sender: sender._id, receiver: receiver._id, amount, type: 'transfer', description });
    res.json({ message: 'Transfer successful', balance: sender.balance, transaction: txn });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// @GET /api/transactions/history
exports.history = async (req, res) => {
  try {
    const txns = await Transaction.find({ $or: [{ sender: req.user.id }, { receiver: req.user.id }] })
      .populate('sender receiver', 'name accountNumber')
      .sort({ createdAt: -1 });
    res.json(txns);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
