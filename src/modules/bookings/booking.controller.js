const asyncHandler = require('../../shared/utils/asyncHandler');
const bookingService = require('./booking.service');

exports.createBooking = asyncHandler(async (req, res) => {

  res.json(await bookingService.createBooking(req.user, req.body));

});

exports.acceptBooking = asyncHandler(async (req, res) => {

  res.json(await bookingService.acceptBooking(
    req.body.booking_id,
    req.user.id
  ));

});

exports.startBooking = asyncHandler(async (req, res) => {

  res.json(await bookingService.startBooking(
    req.body.booking_id,
    req.user.id
  ));

});

exports.completeBooking = asyncHandler(async (req, res) => {

  res.json(await bookingService.completeBooking(
    req.body.booking_id,
    req.user.id
  ));

});

exports.rejectBooking = asyncHandler(async (req, res) => {

  res.json(await bookingService.rejectBooking(
    req.body.booking_id,
    req.user.id
  ));

});

exports.getAllBookings = asyncHandler(async (req, res) => {

  const bookings = await bookingService.getAllBookings();

  res.json({
    success: true,
    data: bookings
  });

});
