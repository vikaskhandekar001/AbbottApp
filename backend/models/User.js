const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'UserDetails' },
  refreshToken: String, // optional
});

module.exports = mongoose.model('User', UserSchema);