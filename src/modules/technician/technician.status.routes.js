const express = require('express')
const router = express.Router()

const controller = require('./technician.status.controller')

/*
ONLINE OFFLINE STATUS
*/

router.post('/status', controller.updateStatus)

module.exports = router
