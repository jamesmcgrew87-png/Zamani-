/**
 * Async Handler Wrapper
 * Wraps async route handlers to catch errors and pass them to Express error handling middleware
 * 
 * This eliminates the need for try-catch blocks in every route handler
 * @param {Function} fn - The async route handler function
 * @returns {Function} Express middleware function
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
