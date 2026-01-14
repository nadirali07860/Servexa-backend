const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

// ✅ basic technician profile route
router.get("/me", auth, (req, res) => {
  res.json({
    success: true,
    technician: {
      id: req.user.id,
      role: req.user.role,
    },
  });
});

module.exports = router;
