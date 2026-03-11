const pool = require('../core/database');

async function calculateDemandHeatmap(){

  const demand = await pool.query(`
    SELECT
      society_id,
      COUNT(*) as bookings
    FROM bookings
    WHERE created_at > NOW() - INTERVAL '30 minutes'
    GROUP BY society_id
  `);

  const technicians = await pool.query(`
    SELECT
      sa.society_id,
      COUNT(*) as technicians
    FROM service_availability sa
    JOIN technicians t
    ON sa.technician_id = t.user_id
    WHERE t.is_online = true
    GROUP BY sa.society_id
  `);

  const map = {};

  demand.rows.forEach(d => {

    const tech = technicians.rows.find(
      t => t.society_id === d.society_id
    );

    map[d.society_id] = {
      bookings: parseInt(d.bookings),
      technicians: tech ? parseInt(tech.technicians) : 0
    };

  });

  return map;

}

module.exports = { calculateDemandHeatmap };
