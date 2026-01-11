module.exports = (err, req, res, next) => {
  console.error("🔥 ERROR:", err.message);

  // Agar response already send ho chuka ho
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
