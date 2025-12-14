const mongoose = require('mongoose');

const SweetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Sweet', SweetSchema);
