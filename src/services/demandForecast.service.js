const pool = require('../core/database');

async function forecastDemand(){

  const result = await pool.query(`
    SELECT society_id, COUNT(*) as bookings
    FROM bookings
    WHERE created_at > NOW() - INTERVAL '24 hours'
    GROUP BY society_id
  `);

  const forecast = {};

  result.rows.forEach(r => {

    forecast[r.society_id] = {
      tomorrow_demand: parseInt(r.bookings) * 1.4
    };

  });

  console.log("📊 Demand forecast generated");

  return forecast;

}

module.exports = { forecastDemand };
