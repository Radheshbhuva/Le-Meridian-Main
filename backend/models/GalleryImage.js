const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  alt: String,
  category: {
    type: String,
    enum: ['Rooms', 'Dining', 'Events', 'Spa', 'Exterior'],
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('GalleryImage', galleryImageSchema);
