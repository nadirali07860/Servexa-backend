const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { submitRating } = require("../controllers/ratingController");

// Customer submits rating
router.post("/", auth("customer"), submitRating);

module.exports = router;
