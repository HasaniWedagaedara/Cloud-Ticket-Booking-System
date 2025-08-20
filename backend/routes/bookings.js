const express = require('express');
const pool = require('../db');
const { sendToQueue } = require('../rabbitmq');

const router = express.Router();

// Create a booking
router.post('/', async (req, res) => {
  const { user_id, event_id } = req.body;
  try {
    await pool.query(
      'INSERT INTO bookings (user_id, event_id) VALUES ($1, $2)',
      [user_id, event_id]
    );

    // Send async message to RabbitMQ
    sendToQueue({ user_id, event_id, timestamp: new Date() });

    res.json({ message: 'Booking successful - confirmation will be sent shortly' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
