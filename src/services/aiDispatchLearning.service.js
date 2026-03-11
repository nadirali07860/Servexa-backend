const pool = require('../core/database');

async function learnDispatchPatterns(){

  const result = await pool.query(`
    SELECT
      service_id,
      COUNT(*) as bookings
    FROM bookings
    WHERE created_at > NOW() - INTERVAL '6 hours'
    GROUP BY service_id
  `);

  console.log("AI dispatch pattern learning:", result.rows);

}

module.exports = { learnDispatchPatterns };
