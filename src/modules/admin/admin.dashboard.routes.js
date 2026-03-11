const express = require('express');
const router = express.Router();

const pool = require('../../core/database');

/*
ADMIN DASHBOARD STATS
*/

router.get('/dashboard', async (req, res) => {
  try {

    const bookings = await pool.query(
      'SELECT COUNT(*) FROM bookings'
    );

    const customers = await pool.query(
      "SELECT COUNT(*) FROM users WHERE role='customer'"
    );

    const technicians = await pool.query(
      'SELECT COUNT(*) FROM technicians'
    );

    return res.json({
      success: true,
      data: {
        bookings: bookings.rows[0].count,
        customers: customers.rows[0].count,
        technicians: technicians.rows[0].count
      }
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: 'Failed to load dashboard stats',
      error: error.message
    });

  }
});

module.exports = router;
