const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  // Implement reviews fetch logic here
  res.status(200).json({ reviews: [] });
});

module.exports = router; 