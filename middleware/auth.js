const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModel");
const Technician = require("../models/technicianModel");
const Admin = require("../models/adminModel");

module.exports = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "No token" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user = null;

      if (decoded.role === "customer") {
        user = await Customer.findById(decoded.id);
      } else if (decoded.role === "technician") {
        user = await Technician.findById(decoded.id);
      } else if (decoded.role === "admin") {
        user = await Admin.findById(decoded.id);
      }

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }

      req.user = user;
      req.role = decoded.role;
      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  };
};
