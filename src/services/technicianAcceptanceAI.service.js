function calculateAcceptanceScore(technician) {

  const acceptWeight = 3;
  const ratingWeight = 2;
  const distanceWeight = -0.5;
  const loadWeight = -1;

  const acceptScore = (technician.accept_rate || 0) * acceptWeight;
  const ratingScore = (technician.rating || 0) * ratingWeight;
  const distanceScore = (technician.distance || 0) * distanceWeight;
  const loadScore = (technician.active_bookings || 0) * loadWeight;

  const score =
    acceptScore +
    ratingScore +
    distanceScore +
    loadScore;

  return score;
}

function rankAcceptance(technicians) {

  const scored = technicians.map(t => ({
    ...t,
    acceptance_score: calculateAcceptanceScore(t)
  }));

  scored.sort((a, b) => b.acceptance_score - a.acceptance_score);

  return scored;
}

module.exports = {
  calculateAcceptanceScore,
  rankAcceptance
};
