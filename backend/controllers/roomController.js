const Room = require('../models/Room');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// @desc    Get all rooms
// @route   GET /api/rooms
const getRooms = asyncHandler(async (req, res) => {
  // Use .populate with strictPopulate: false as an extra safety measure
  const rooms = await Room.find({}).populate({ path: 'bookings', strictPopulate: false });
  
  res.status(200).json({
    success: true,
    count: rooms.length,
    data: rooms
  });
});

// @desc    Create room
// @route   POST /api/rooms
const createRoom = [
  body('name').trim().notEmpty().withMessage('Name required'),
  body('type').trim().notEmpty().withMessage('Type required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be positive'),
  body('status').optional().custom(val => {
    return ['available', 'occupied', 'maintenance', 'Available', 'Occupied', 'Maintenance'].includes(val);
  }).withMessage('Invalid status'),
  body('image').optional().isString(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const room = new Room(req.body);
    const savedRoom = await room.save();
    res.status(201).json({
      success: true,
      data: savedRoom,
      message: 'Room created'
    });
  })
];

// @desc    Update room
// @route   PUT /api/rooms/:id
const updateRoom = [
  body('price').optional().isFloat({ min: 0 }),
  body('status').optional().isIn(['available', 'occupied', 'maintenance']),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    res.json({
      success: true,
      data: room,
      message: 'Room updated'
    });
  })
];

// @desc    Delete room
// @route   DELETE /api/rooms/:id
const deleteRoom = asyncHandler(async (req, res) => {
  const room = await Room.findByIdAndDelete(req.params.id);
  
  if (!room) {
    return res.status(404).json({
      success: false,
      message: 'Room not found'
    });
  }

  res.json({
    success: true,
    message: 'Room deleted',
    data: { id: req.params.id }
  });
});

module.exports = {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom
};
