const express = require('express');
const GalleryImage = require('../models/GalleryImage');
const router = express.Router();
const { protect } = require('../middleware/auth');

// GET / - Get gallery images
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = category ? { category } : {};
    const images = await GalleryImage.find(query).sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /
router.post('/', protect('admin'), async (req, res) => {
  try {
    const image = new GalleryImage(req.body);
    await image.save();
    res.status(201).json(image);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

// PUT /:id
router.put('/:id', protect('admin'), async (req, res) => {
  try {
    const updated = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Image not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Invalid update' });
  }
});

// DELETE /:id
router.delete('/:id', protect('admin'), async (req, res) => {
  try {
    const deleted = await GalleryImage.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Image not found' });
    res.json({ message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
