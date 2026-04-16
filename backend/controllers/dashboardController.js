const Booking = require('../models/Booking');
const Room = require('../models/Room');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');

// @desc Get dashboard stats
// @route GET /api/dashboard/stats
const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalRooms,
    totalBookings,
    totalUsers,
    confirmedBookings
  ] = await Promise.all([
    Room.countDocuments(),
    Booking.countDocuments(),
    User.countDocuments(),
    Booking.countDocuments({ status: 'confirmed' })
  ]);

  const totalRevenue = await Booking.aggregate([
    { $match: { status: 'confirmed' } },
    { $group: { _id: null, total: { $sum: '$totalPrice' } } }
  ]);

  const revenue = totalRevenue[0]?.total || 0;

  const stats = {
    totalRooms,
    totalBookings,
    totalUsers,
    confirmedBookings,
    pendingBookings: totalBookings - confirmedBookings,
    totalRevenue: revenue,
    avgOccupancy: totalRooms ? Math.round((confirmedBookings / totalRooms) * 100) : 0
  };

  res.json({
    success: true,
    data: stats
  });
});

module.exports = { getDashboardStats };
