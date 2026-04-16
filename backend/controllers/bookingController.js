const Booking = require('../models/Booking');
const Room = require('../models/Room');
const asyncHandler = require('../middleware/asyncHandler');
const { body, validationResult, param } = require('express-validator');

// @desc Get all bookings
const getBookings = [
  // Query validation later
  asyncHandler(async (req, res) => {
    const { status, dateFrom, dateTo } = req.query;
    let query = {};

    if (status) query.status = status;
    if (dateFrom || dateTo) {
      query.checkInDate = {};
      if (dateFrom) query.checkInDate.$gte = new Date(dateFrom);
      if (dateTo) query.checkInDate.$lte = new Date(dateTo);
    }

    const bookings = await Booking.find(query)
      .populate('userId', 'name email')
      .populate('roomId', 'name type price status')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  })
];

// @desc Get my bookings
const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ userId: req.user._id })
    .populate('roomId', 'name type price status')
    .sort({ checkInDate: 1 });
  res.json({
    success: true,
    data: bookings
  });
});

// @desc Create booking
const createBooking = [
  body('guestEmail').isEmail().withMessage('Valid email required'),
  body('checkInDate', 'Valid date required').isISO8601().toDate(),
  body('checkOutDate', 'Valid date required').isISO8601().toDate(),
  body('totalPrice').isFloat({ min: 0 }).withMessage('Valid price required'),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    let { userId, roomType, roomId, guestEmail, checkInDate, checkOutDate, totalPrice } = req.body;

    // VERY robust check for req.user
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required - req.user is undefined despite protect middleware.' });
    }

    // Attach inferred userId from the authenticated user
    if (!userId) {
      userId = req.user._id || req.user.id;
    }

    if (!userId) {
      return res.status(401).json({ message: 'Failed to extract user ID from authenticated token.' });
    }

    // Map roomType
    if (roomType && !roomId) {
      const room = await Room.findOne({ $or: [{ type: roomType }, { name: roomType }] });
      if (!room) {
        return res.status(400).json({
          success: false,
          message: 'Room type not found'
        });
      }
      roomId = room._id;
    }

    const booking = await Booking.create({
      userId,
      roomId,
      guestEmail,
      checkInDate,
      checkOutDate,
      totalPrice
    });

    res.status(201).json({
      success: true,
      data: booking
    });
  })
];

// @desc Update booking
const updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).populate('userId', 'name email').populate('roomId', 'name type');

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: 'Booking not found'
    });
  }

  res.json({
    success: true,
    data: booking
  });
});

// @desc Delete booking
const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: 'Booking not found'
    });
  }

  res.json({
    success: true,
    message: 'Booking deleted'
  });
});

module.exports = {
  getBookings,
  getMyBookings,
  createBooking,
  updateBooking,
  deleteBooking
};
