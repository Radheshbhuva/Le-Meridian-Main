const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const roomsRoutes = require('./routes/rooms');
const bookingsRoutes = require('./routes/bookings');
const { protect } = require('./middleware/auth');
const dashboardRoutes = require('./routes/dashboard');
const diningRoutes = require('./routes/dining');
const eventsRoutes = require('./routes/events');
const offersRoutes = require('./routes/offers');
const spaRoutes = require('./routes/spa');
const galleryRoutes = require('./routes/gallery');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
  origin: function (origin, callback) {
    const allowed = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://le-meridian-main.vercel.app',
    ];
    // Allow all Vercel preview deployments (*.vercel.app) and null (curl/Postman)
    if (!origin || allowed.includes(origin) || /\.vercel\.app$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/bookings', protect, bookingsRoutes);
app.use('/api/dashboard', protect, dashboardRoutes);
app.use('/api/dining', diningRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/offers', offersRoutes);
app.use('/api/spa', spaRoutes);
app.use('/api/gallery', galleryRoutes);

// Error middleware
const errorHandler = require('./middleware/errorHandler');

// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


