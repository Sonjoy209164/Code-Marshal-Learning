// src/middleware/requestLogger.js
export function requestLoggerMiddleware(req, res, next) {
  // Add minimal request logging useful in development
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
}
