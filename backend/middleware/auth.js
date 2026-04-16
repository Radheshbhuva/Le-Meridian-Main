const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect middleware - verifies JWT and attaches user to req. Supports role param protect('admin')
// Can be used as protect() or protect('admin')
const protect = (roleOrReq, maybeRes, maybeNext) => {
  // If called as middleware directly: protect(req, res, next)
  if (roleOrReq && typeof roleOrReq === 'object' && roleOrReq.headers) {
    return protectMiddleware(null)(roleOrReq, maybeRes, maybeNext);
  }

  // If called as factory: protect('admin') or protect()
  return protectMiddleware(roleOrReq);
};

const protectMiddleware = (role) => async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from token
    req.user = await User.findById(decoded.userId).select('-password');
    
    if (req.user) {
      // Role check
      if (role && req.user.role !== role) {
        return res.status(403).json({ message: 'Access denied - insufficient role' });
      }
      next();
    } else {
      res.status(401).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};

module.exports = { protect };
