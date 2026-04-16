const express = require('express');
const DiningItem = require('../models/DiningItem');
const router = express.Router();
const { protect } = require('../middleware/auth');

// GET / - Get all dining items
router.get('/', async (req, res) => {
  try {
    const { category, available } = req.query;
    let query = {};
    if (category) query.category = category;
    if (available !== undefined) query.isAvailable = available === 'true';

    const items = await DiningItem.find(query).sort({ category: 1, name: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST / - Create dining item (admin)
router.post('/', protect('admin'), async (req, res) => {
  try {
    const item = new DiningItem(req.body);
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
});

// PUT /:id - Update dining item
router.put('/:id', protect('admin'), async (req, res) => {
  try {
    const updatedItem = await DiningItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Invalid update', error: error.message });
  }
});

// DELETE /:id - Delete dining item
router.delete('/:id', protect('admin'), async (req, res) => {
  try {
    const deletedItem = await DiningItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
