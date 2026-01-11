const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const {
  createCategory,
  getAllCategories,
  createService,
  updateService,
  getServicesByCategory,
  blockUser,
} = require("../controllers/adminController");

/*
  ADMIN ROUTES
*/

// category
router.post("/category", auth("admin"), createCategory);
router.get("/categories", auth("admin"), getAllCategories);

// service
router.post("/service", auth("admin"), createService);
router.put("/service/:serviceId", auth("admin"), updateService);
router.get("/services/:categoryId", auth("admin"), getServicesByCategory);

// 🔒 block / unblock user
router.post("/block-user", auth("admin"), blockUser);

module.exports = router;
