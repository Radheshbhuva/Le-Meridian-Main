const express = require('express');
const Offer = require('../models/Offer');
const router = express.Router();
const { protect } = require('../middleware/auth');

// GET / - Get active offers
router.get('/', async (req, res) => {
  try {
    const offers = await Offer.find({ isActive: true }).sort({ validFrom: -1 });
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST / - Create offer
router.post('/', protect('admin'), async (req, res) => {
  try {
    const offer = new Offer(req.body);
    const savedOffer = await offer.save();
    res.status(201).json(savedOffer);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

// PUT /:id
router.put('/:id', protect('admin'), async (req, res) => {
  try {
    const updated = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Offer not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Invalid update' });
  }
});

// DELETE /:id
router.delete('/:id', protect('admin'), async (req, res) => {
  try {
    const deleted = await Offer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Offer not found' });
    res.json({ message: 'Offer deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
