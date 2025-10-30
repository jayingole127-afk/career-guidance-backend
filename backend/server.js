const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection Function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB Connected Successfully!');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Connect to Database
connectDB();

// Import Routes
const authRoutes = require('./routes/auth');
const assessmentRoutes = require('./routes/assessment');
const careerRoutes = require('./routes/career');
const aiRoutes = require("./routes/aiRoutes"); // ✅ Added AI route import

// Test Route
app.get('/', (req, res) => {
  res.json({
    message: 'Career Guidance AI System API',
    status: 'running',
    endpoints: {
      auth: '/api/auth/register, /api/auth/login',
      assessment: '/api/assessment',
      career: '/api/career/recommendations',
      ai: '/api/ai/recommendations' // ✅ Added AI route info
    }
  });
});

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/career', careerRoutes);
app.use("/api/ai", aiRoutes); // ✅ Added AI route

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}`);
});
