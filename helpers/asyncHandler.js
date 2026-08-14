/**
 * Async Handler Wrapper with Enhanced Logging
 * Wraps async route handlers to catch errors and pass them to Express error handling middleware
 * Includes request/response logging, timing, and request ID tracking for debugging and monitoring
 * 
 * @param {Function} fn - The async route handler function
 * @returns {Function} Express middleware function
 */
const { v4: uuid } = require('uuid');

const asyncHandler = (fn) => async (req, res, next) => {
  // Generate or use existing request ID for tracing
  const requestId = req.id || uuid();
  req.id = requestId;

  // Track request start time for duration calculation
  const startTime = Date.now();

  try {
    // Log incoming request
    console.log(`[${new Date().toISOString()}] [${requestId}] ${req.method} ${req.path}`, {
      userId: req.userId || 'anonymous',
      body: req.body,
      params: req.params,
      query: req.query
    });

    // Execute the route handler
    await fn(req, res, next);

    // Calculate response duration
    const duration = Date.now() - startTime;

    // Log successful response
    console.log(`[${new Date().toISOString()}] [${requestId}] Response sent: ${res.statusCode} ${req.method} ${req.path} (${duration}ms)`);
  } catch (error) {
    // Calculate error duration
    const duration = Date.now() - startTime;

    // Log error details
    console.error(`[${new Date().toISOString()}] [${requestId}] Error in ${req.method} ${req.path} (${duration}ms):`, {
      message: error.message,
      stack: error.stack,
      userId: req.userId || 'anonymous'
    });

    // Pass error to Express error handling middleware
    next(error);
  }
};

module.exports = asyncHandler;
