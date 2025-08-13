const express = require('express');
const pool = require('../db');

const router = express.Router();

// Create a booking
router.post('/', async (req, res) => {
  const { user_id, event_id } = req.body;
  try {
    await pool.query(
      'INSERT INTO bookings (user_id, event_id) VALUES ($1, $2)',
      [user_id, event_id]
    );
    res.json({ message: 'Booking successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
