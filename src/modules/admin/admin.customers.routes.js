const express = require('express');
const router = express.Router();

const pool = require('../../core/database');

const authenticate = require('../../core/middleware/authenticate');
const requirePermission = require('../../shared/middlewares/permission.middleware');

router.get(
  '/customers',
  authenticate,
  requirePermission('manage_users'),
  async (req, res) => {

    const { rows } = await pool.query(`
      SELECT
        id,
        name,
        phone,
        created_at
      FROM users
      WHERE role = 'customer'
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      data: rows
    });

  }
);

module.exports = router;
