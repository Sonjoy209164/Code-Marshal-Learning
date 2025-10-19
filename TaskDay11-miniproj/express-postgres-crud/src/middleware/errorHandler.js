// src/middleware/errorHandler.js
export default function errorHandler(err, req, res, next) {
  // Keep a consistent error format
  console.error('❌ Error:', err.stack || err.message);

  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    status: 'error',
    message,
    timestamp: new Date().toISOString()
  });
}
