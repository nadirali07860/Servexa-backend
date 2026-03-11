function calculateSurge(demand, technicians){

  let multiplier = 1;

  if(demand > technicians){

    multiplier = 1.2;

  }

  if(demand > technicians * 2){

    multiplier = 1.5;

  }

  return multiplier;

}

module.exports = { calculateSurge };
