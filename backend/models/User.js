const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:           { type: String, required: true },
  email:          { type: String, required: true, unique: true },
  password:       { type: String, required: true },
  role:           { type: String, enum: ['admin', 'user'], default: 'user' },
  accountNumber:  { type: String, unique: true },
  balance:        { type: Number, default: 1000 },
  isActive:       { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
