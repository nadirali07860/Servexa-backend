function calculateDispatchScore(technician){

  const distanceScore = technician.distance * -0.35;

  const ratingScore = (technician.average_rating || 0) * 2;

  const reputationScore = (technician.reputation_score || 0) * 0.02;

  const loadScore = (technician.active_bookings || 0) * -1;

  const etaScore = (technician.eta || 0) * -0.5;

  const score =
    distanceScore +
    ratingScore +
    reputationScore +
    loadScore +
    etaScore;

  return score;

}

module.exports = { calculateDispatchScore };
