const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (role) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // 🔒 BLOCKED USER CHECK (✅ CORRECT PLACE)
      if (user.isBlocked) {
        return res.status(403).json({
          success: false,
          message: "Your account has been blocked by admin",
        });
      }

      if (role && user.role !== role) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = user; // ✅ VERY IMPORTANT
      next();
    } catch (err) {
      console.error("Auth error:", err);
      res.status(401).json({ message: "Auth failed" });
    }
  };
};
