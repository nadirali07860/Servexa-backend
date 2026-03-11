const express = require('express');
const router = express.Router();

const pool = require('../../core/database');

const authenticate = require('../../core/middleware/authenticate');
const requirePermission = require('../../shared/middlewares/permission.middleware');

router.get(
  '/technicians',
  authenticate,
  requirePermission('manage_users'),
  async (req, res) => {

    const { rows } = await pool.query(`
      SELECT
        t.user_id,
        u.name,
        u.phone,
        t.approved,
        t.active_bookings
      FROM technicians t
      JOIN users u
      ON t.user_id = u.id
      ORDER BY u.created_at DESC
    `);

    res.json({
      success: true,
      data: rows
    });

  }
);

module.exports = router;
