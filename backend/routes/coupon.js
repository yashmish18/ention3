const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  // Implement coupon logic here
  res.status(200).json({ message: 'Coupon checked' });
});

module.exports = router; 