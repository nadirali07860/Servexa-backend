const mongoose = require("mongoose");

module.exports = (param = "id") => {
  return (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params[param])) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    next();
  };
};
