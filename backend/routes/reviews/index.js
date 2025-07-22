const express = require('express');
const router = express.Router();
const Review = require('../../models/Review'); // Assume this exists or will be created
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/review_files'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    // Accept images and videos only
    if (!file.mimetype.startsWith('image/') && !file.mimetype.startsWith('video/')) {
      return cb(new Error('Only image and video files are allowed!'), false);
    }
    cb(null, true);
  }
});

// GET /api/reviews?productId=E3
router.get('/', async (req, res) => {
  try {
    const { productId } = req.query;
    const filter = productId ? { productId } : {};
    const reviews = await Review.find(filter).lean();
    res.status(200).json({ reviews });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST /api/reviews
router.post('/', upload.array('files', 5), async (req, res) => {
  try {
    const { productId, user, rating, topic, text } = req.body;
    if (!productId || !user || !rating || !text) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const files = req.files ? req.files.map(f => `/uploads/review_files/${f.filename}`) : [];
    const review = new Review({
      productId,
      user,
      rating: Number(rating),
      topic,
      text,
      files,
      createdAt: new Date()
    });
    await review.save();
    res.status(201).json({ review });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit review', details: err.message });
  }
});

module.exports = router; 