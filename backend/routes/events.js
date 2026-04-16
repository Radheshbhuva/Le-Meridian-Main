const express = require('express');
const Event = require('../models/Event');
const router = express.Router();
const { protect } = require('../middleware/auth');

// GET / - Get all events
router.get('/', async (req, res) => {
  try {
    const { active } = req.query;
    let query = {};
    if (active !== undefined) query.isActive = active === 'true';

    const events = await Event.find(query).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST / - Create event
router.post('/', protect('admin'), async (req, res) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
});

// PUT /:id
router.put('/:id', protect('admin'), async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Invalid update', error: error.message });
  }
});

// DELETE /:id
router.delete('/:id', protect('admin'), async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
