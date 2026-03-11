function calculateDispatchRadius(demand){

  let radius = 3;

  if(demand.bookings > demand.technicians){

    radius = 5;

  }

  if(demand.bookings > demand.technicians * 2){

    radius = 8;

  }

  return radius;

}

module.exports = { calculateDispatchRadius };
