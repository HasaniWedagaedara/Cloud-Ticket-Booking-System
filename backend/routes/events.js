const express = require('express');
const pool = require('../db');

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
