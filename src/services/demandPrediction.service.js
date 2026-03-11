const pool = require('../core/database');

async function predictDemand(){

  const result = await pool.query(`
    SELECT
      society_id,
      COUNT(*) as bookings
    FROM bookings
    WHERE created_at > NOW() - INTERVAL '2 hours'
    GROUP BY society_id
  `);

  const prediction = {};

  result.rows.forEach(r => {

    prediction[r.society_id] = {
      predicted_bookings: parseInt(r.bookings) * 1.3
    };

  });

  return prediction;

}

module.exports = { predictDemand };
