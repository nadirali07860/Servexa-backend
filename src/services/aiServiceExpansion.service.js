const pool = require('../core/database');

async function detectServiceExpansion(){

  const services = await pool.query(`
    SELECT
      service_id,
      COUNT(*) as demand
    FROM bookings
    GROUP BY service_id
  `);

  const expansion = services.rows.filter(s => parseInt(s.demand) > 20);

  console.log("AI Service Expansion Opportunities:", expansion);

  return expansion;

}

module.exports = { detectServiceExpansion };
