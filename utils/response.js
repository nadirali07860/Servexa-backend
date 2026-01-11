exports.success = (res, message, data = {}) => {
  return res.json({
    success: true,
    message,
    data
  });
};

exports.failure = (res, message, errorCode = "ERROR", statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    errorCode,
    message
  });
};
