// Jest setup file - runs before all tests
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_secret_key_for_testing_only';
process.env.MONGODB_URI = 'mongodb://localhost:27017/zamani-test';

// Suppress console errors during tests (optional)
// global.console.error = jest.fn();
// global.console.warn = jest.fn();
