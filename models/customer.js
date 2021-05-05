const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: Number,
    required: true
  }

})

const Customerdb = mongoose.model('customers', customerSchema)
module.exports = Customerdb