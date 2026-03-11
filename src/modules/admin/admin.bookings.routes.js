const express = require('express');
const router = express.Router();

const pool = require('../../core/database');

const authenticate = require('../../core/middleware/authenticate');
const requirePermission = require('../../shared/middlewares/permission.middleware');

router.get(
  '/bookings',
  authenticate,
  requirePermission('manage_bookings'),
  async (req, res) => {

    const { rows } = await pool.query(`
      SELECT
        b.id,
        b.status,
        b.created_at,

        cu.name as customer,
        te.name as technician,

        s.name as service

      FROM bookings b

      LEFT JOIN users cu
      ON b.customer_id = cu.id

      LEFT JOIN users te
      ON b.technician_id = te.id

      LEFT JOIN services s
      ON b.service_id = s.id

      ORDER BY b.created_at DESC
    `);

    res.json({
      success: true,
      data: rows
    });

  }
);

module.exports = router;
