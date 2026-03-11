const express = require('express')
const router = express.Router()
const controller = require('./technician.location.controller')

/*
UPDATE TECHNICIAN LOCATION
*/

router.post('/location', controller.updateLocation)

module.exports = router
