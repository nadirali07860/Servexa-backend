module.exports = {
  up: async (pool) => {

    await pool.query(`
      CREATE TABLE dispatch_decision_logs (

        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

        booking_id UUID NOT NULL,

        technician_id UUID NOT NULL,

        score NUMERIC,

        distance NUMERIC,

        rating NUMERIC,

        active_bookings INTEGER,

        reason TEXT,

        created_at TIMESTAMP DEFAULT NOW()

      );
    `);

  },

  down: async (pool) => {

    await pool.query(`
      DROP TABLE IF EXISTS dispatch_decision_logs
    `);

  }
};
