const pool = require('../core/database');

async function learnDemandPatterns(){

  const demand = await pool.query(`
    SELECT
      society_id,
      COUNT(*) as bookings
    FROM bookings
    WHERE created_at > NOW() - INTERVAL '12 hours'
    GROUP BY society_id
  `);

  console.log("Demand pattern learning:", demand.rows);

}

module.exports = { learnDemandPatterns };
