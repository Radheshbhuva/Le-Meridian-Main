const express = require('express');
const SpaService = require('../models/SpaService');
const router = express.Router();
const { protect } = require('../middleware/auth');

// GET / - Get spa services
router.get('/', async (req, res) => {
  try {
    const services = await SpaService.find({ isAvailable: true }).sort({ price: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /
router.post('/', protect('admin'), async (req, res) => {
  try {
    const service = new SpaService(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

// PUT /:id
router.put('/:id', protect('admin'), async (req, res) => {
  try {
    const updated = await SpaService.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Service not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Invalid update' });
  }
});

// DELETE /:id
router.delete('/:id', protect('admin'), async (req, res) => {
  try {
    const deleted = await SpaService.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
