const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
  address: String,
  pincode: String,
  mobileNumber: String,
  occupation: String,
  age: Number,
  sex: String,
});

module.exports = mongoose.model('UserDetails', userDetailsSchema);
