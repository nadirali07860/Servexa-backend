const express = require('express');
const router = express.Router();

const dispatchController = require('./dispatch.controller');
const rejectController = require('./reject.controller');

/*
ASSIGN TECHNICIAN
*/
router.post('/assign', dispatchController.technicianReject);

/*
RETRY DISPATCH
*/
router.post('/retry', dispatchController.technicianReject);

/*
REJECT BOOKING
*/
router.post('/reject', rejectController.rejectBooking);

module.exports = router;
