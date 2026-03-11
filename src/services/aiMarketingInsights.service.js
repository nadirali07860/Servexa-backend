const pool = require('../core/database');

async function generateMarketingInsights(){

  const result = await pool.query(`
    SELECT
      society_id,
      COUNT(*) as bookings
    FROM bookings
    GROUP BY society_id
  `);

  const insights = result.rows.map(r => ({
    society_id: r.society_id,
    potential: parseInt(r.bookings) * 2
  }));

  console.log("AI marketing insights generated");

  return insights;

}

module.exports = { generateMarketingInsights };
