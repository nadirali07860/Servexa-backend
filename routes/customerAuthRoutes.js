const express = require("express");
const router = express.Router();
const controller = require("../controllers/customerAuthController");

router.post("/register", controller.registerCustomer);
router.post("/login", controller.loginCustomer);

module.exports = router;
