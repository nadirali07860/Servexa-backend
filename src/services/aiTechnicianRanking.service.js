const pool = require('../core/database');

async function calculateTechnicianRanking(){

  const technicians = await pool.query(`
    SELECT
      user_id,
      reputation_score,
      average_rating,
      active_bookings
    FROM technicians
    WHERE is_approved = true
  `);

  const rankings = technicians.rows.map(t => {

    const score =
      (t.reputation_score || 0) +
      ((t.average_rating || 0) * 20) -
      ((t.active_bookings || 0) * 5);

    return {
      technician_id: t.user_id,
      score
    };

  });

  rankings.sort((a,b)=>b.score-a.score);

  console.log("AI Technician Rankings Generated");

  return rankings;

}

module.exports = { calculateTechnicianRanking };
