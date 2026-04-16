const mongoose = require('mongoose');

const spaServiceSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  duration: Number, // minutes
  image: String,
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SpaService', spaServiceSchema);
