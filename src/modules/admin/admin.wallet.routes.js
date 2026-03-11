const express = require('express');
const router = express.Router();

const controller = require('../technician/technician.admin.wallet.controller');

/*
ADMIN APPROVE TECHNICIAN WITHDRAW
*/
router.post('/wallet/approve-withdraw', controller.approveWithdraw);

module.exports = router;
