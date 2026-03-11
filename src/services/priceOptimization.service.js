function optimizePrice(basePrice, demand){

  let multiplier = 1;

  if(demand > 10){

    multiplier = 1.2;

  }

  if(demand > 20){

    multiplier = 1.4;

  }

  return Math.round(basePrice * multiplier);

}

module.exports = { optimizePrice };
