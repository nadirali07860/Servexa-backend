const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (role = null) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Authorization header missing",
        });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      // ✅ status safe check
      if (user.status && user.status !== "active") {
        return res.status(403).json({
          success: false,
          message: "User inactive",
        });
      }

      // ✅ role based access
      if (role && user.role !== role) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error("AUTH ERROR:", err);
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
};
