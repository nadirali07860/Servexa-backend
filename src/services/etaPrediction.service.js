function estimateETA(distance){

  const avgSpeed = 25;

  const eta = (distance / avgSpeed) * 60;

  return Math.round(eta);

}

module.exports = { estimateETA };
