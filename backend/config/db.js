const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ention';
    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(mongoURI, {
      // Removed deprecated options
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('MongoDB connected successfully');
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });
    
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Don't exit process, let it retry
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB; 