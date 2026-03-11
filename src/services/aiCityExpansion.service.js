const pool = require('../core/database');

async function suggestCityExpansion(){

  const cities = await pool.query(`
    SELECT
      city_id,
      COUNT(*) as bookings
    FROM bookings
    GROUP BY city_id
  `);

  const expansion = cities.rows.filter(c => parseInt(c.bookings) > 100);

  console.log("AI city expansion suggestions:", expansion);

  return expansion;

}

module.exports = { suggestCityExpansion };
