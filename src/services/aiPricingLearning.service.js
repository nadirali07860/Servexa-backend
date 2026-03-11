const pool = require('../core/database');

async function learnPricing(){

  const services = await pool.query(`
    SELECT
      service_id,
      COUNT(*) as demand
    FROM bookings
    GROUP BY service_id
  `);

  console.log("Pricing learning data:", services.rows);

}

module.exports = { learnPricing };
