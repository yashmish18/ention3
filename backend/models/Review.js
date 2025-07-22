const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  user: { type: String, required: true }, // or userId if you have user accounts
  rating: { type: Number, required: true },
  topic: { type: String },
  text: { type: String, required: true },
  files: [{ type: String }], // Array of file URLs
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema); 