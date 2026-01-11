class AppError extends Error {
  constructor(message, statusCode = 400, errorCode = "APP_ERROR") {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;
  }
}

module.exports = AppError;
