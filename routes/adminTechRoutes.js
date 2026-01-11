const express = require("express");
const router = express.Router();
const Technician = require("../models/technicianModel");

router.get("/technicians", async (req, res) => {
  const techs = await Technician.find().select("_id name phone isBlocked");
  res.json(techs);
});

module.exports = router;
