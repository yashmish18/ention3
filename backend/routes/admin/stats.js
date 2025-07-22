const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  // Implement admin stats logic here
  res.status(200).json({ stats: {} });
});

module.exports = router; 