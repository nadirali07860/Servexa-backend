const pool = require('../core/database');

async function generateGrowthInsights(){

  const stats = await pool.query(`
    SELECT
      COUNT(*) as total_bookings
    FROM bookings
  `);

  console.log("Platform growth analytics:", stats.rows[0]);

}

module.exports = { generateGrowthInsights };
