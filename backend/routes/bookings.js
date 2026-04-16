const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getBookings,
  getMyBookings,
  createBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController');

// GET /api/bookings - admin
router.get('/', protect, getBookings);

// GET /api/bookings/me - user
router.get('/me', protect, getMyBookings);

// POST /api/bookings
router.post('/', protect, createBooking);

// PUT /api/bookings/:id
router.put('/:id', protect, updateBooking);

// DELETE /api/bookings/:id
router.delete('/:id', protect, deleteBooking);

module.exports = router;
