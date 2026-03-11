const pool = require('../core/database');

async function predictBookings48h(){

  const result = await pool.query(`
    SELECT
      society_id,
      COUNT(*) as bookings
    FROM bookings
    WHERE created_at > NOW() - INTERVAL '48 hours'
    GROUP BY society_id
  `);

  const prediction = result.rows.map(r => ({
    society_id: r.society_id,
    predicted_bookings: parseInt(r.bookings) * 1.5
  }));

  console.log("AI 48h booking prediction generated");

  return prediction;

}

module.exports = { predictBookings48h };
