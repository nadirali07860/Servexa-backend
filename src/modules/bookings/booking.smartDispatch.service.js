const pool = require('../../core/database');

async function smartDispatch(serviceId, societyId, latitude, longitude) {

  const { rows: technicians } = await pool.query(
    `
    SELECT
      t.user_id,
      t.active_bookings,
      t.average_rating,
      t.reputation_score,
      l.latitude,
      l.longitude,

      (
        6371 *
        acos(
          cos(radians($3)) *
          cos(radians(l.latitude)) *
          cos(radians(l.longitude) - radians($4)) +
          sin(radians($3)) *
          sin(radians(l.latitude))
        )
      ) AS distance

    FROM technicians t

    JOIN technician_locations l
    ON l.technician_id = t.user_id

    JOIN service_availability sa
    ON sa.society_id = $2

    WHERE sa.service_id = $1
    AND sa.is_active = true
    AND t.is_approved = true
    AND t.is_online = true
    AND t.status = 'AVAILABLE'
    AND t.active_bookings < 2
    `,
    [serviceId, societyId, latitude, longitude]
  );

  if (!technicians.length) return [];

  const ranked = technicians
    .map(t => {

      const distanceScore = (t.distance || 0) * -0.35;
      const ratingScore = (t.average_rating || 0) * 2;
      const reputationScore = (t.reputation_score || 0) * 0.02;
      const loadScore = (t.active_bookings || 0) * -1;

      const score =
        distanceScore +
        ratingScore +
        reputationScore +
        loadScore;

      return {
        ...t,
        score,
        distanceScore,
        ratingScore,
        reputationScore,
        loadScore
      };

    })
    .sort((a,b) => b.score - a.score);

  const topCandidates = ranked.slice(0,5);

  /*
  DISPATCH DECISION LOGGING
  */

  for (const tech of topCandidates) {

    await pool.query(
      `
      INSERT INTO dispatch_decision_logs
      (booking_id, technician_id, score, distance, rating, active_bookings, reason)
      VALUES (NULL,$1,$2,$3,$4,$5,$6)
      `,
      [
        tech.user_id,
        tech.score,
        tech.distance,
        tech.average_rating,
        tech.active_bookings,
        'AUTO_DISPATCH_SCORING'
      ]
    );

  }

  return topCandidates.map(t => t.user_id);

}

module.exports = { smartDispatch };
