/**
 * Async Handler Wrapper with Enhanced Logging
 * Wraps async route handlers to catch errors and pass them to Express error handling middleware
 * Includes request/response logging for debugging and monitoring
 * 
 * @param {Function} fn - The async route handler function
 * @returns {Function} Express middleware function
 */
const asyncHandler = (fn) => async (req, res, next) => {
  try {
    // Log incoming request
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`, {
      userId: req.userId || 'anonymous',
      body: req.body,
      params: req.params,
      query: req.query
    });

    // Execute the route handler
    await fn(req, res, next);

    // Log successful response
    console.log(`[${new Date().toISOString()}] Response sent: ${res.statusCode} ${req.method} ${req.path}`);
  } catch (error) {
    // Log error details
    console.error(`[${new Date().toISOString()}] Error in ${req.method} ${req.path}:`, {
      message: error.message,
      stack: error.stack,
      userId: req.userId || 'anonymous'
    });

    // Pass error to Express error handling middleware
    next(error);
  }
};

module.exports = asyncHandler;
