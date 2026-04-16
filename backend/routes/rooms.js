const express = require('express');
const router = express.Router();
const {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom
} = require('../controllers/roomController');
const { protect } = require('../middleware/auth');

// GET /api/rooms - public
router.get('/', getRooms);

// POST /api/rooms - admin protected
router.post('/', protect('admin'), createRoom);

// PUT /api/rooms/:id - admin
router.put('/:id', protect('admin'), updateRoom);

// DELETE /api/rooms/:id - admin
router.delete('/:id', protect('admin'), deleteRoom);

module.exports = router;
