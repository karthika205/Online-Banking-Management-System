const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  sender:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount:      { type: Number, required: true },
  type:        { type: String, enum: ['deposit', 'withdrawal', 'transfer'], required: true },
  description: { type: String, default: '' },
  status:      { type: String, enum: ['success', 'failed', 'pending'], default: 'success' },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
