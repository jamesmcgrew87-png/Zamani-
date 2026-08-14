const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const asyncHandler = require('../helpers/asyncHandler');

// Mock withdrawal storage - Replace with MongoDB in production
const withdrawals = [];

/**
 * Middleware to verify JWT token
 */
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default_secret_key'
    );
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ 
      message: 'Invalid token', 
      error: error.message 
    });
  }
};

/**
 * POST /api/withdrawal/request
 * Create a new withdrawal request
 */
router.post('/request', verifyToken, asyncHandler(async (req, res) => {
  const { amount, toAddress, currency } = req.body;

  // Validation
  if (!amount || !toAddress || !currency) {
    return res.status(400).json({ 
      message: 'Amount, toAddress, and currency are required' 
    });
  }

  if (amount <= 0) {
    return res.status(400).json({ 
      message: 'Amount must be greater than 0' 
    });
  }

  // Validate Ethereum address format
  if (!toAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
    return res.status(400).json({ 
      message: 'Invalid Ethereum address format' 
    });
  }

  // Create withdrawal request
  const withdrawal = {
    id: Date.now().toString(),
    userId: req.userId,
    amount: parseFloat(amount),
    toAddress,
    currency: currency.toUpperCase(),
    status: 'pending',
    transactionHash: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    fee: parseFloat(amount) * 0.001, // 0.1% fee
    estimatedTime: '5-30 minutes'
  };

  withdrawals.push(withdrawal);

  res.status(201).json({
    message: 'Withdrawal request created successfully',
    withdrawal: {
      id: withdrawal.id,
      amount: withdrawal.amount,
      toAddress: withdrawal.toAddress,
      currency: withdrawal.currency,
      fee: withdrawal.fee,
      totalAmount: withdrawal.amount + withdrawal.fee,
      status: withdrawal.status,
      createdAt: withdrawal.createdAt
    }
  });
}));

/**
 * GET /api/withdrawal/history
 * Get user's withdrawal history
 */
router.get('/history', verifyToken, asyncHandler(async (req, res) => {
  const userWithdrawals = withdrawals.filter(w => w.userId === req.userId);

  if (userWithdrawals.length === 0) {
    return res.status(200).json({
      message: 'No withdrawal history found',
      withdrawals: []
    });
  }

  res.status(200).json({
    message: 'Withdrawal history retrieved successfully',
    count: userWithdrawals.length,
    withdrawals: userWithdrawals.map(w => ({
      id: w.id,
      amount: w.amount,
      currency: w.currency,
      toAddress: w.toAddress,
      status: w.status,
      fee: w.fee,
      transactionHash: w.transactionHash,
      createdAt: w.createdAt,
      updatedAt: w.updatedAt
    }))
  });
}));

/**
 * GET /api/withdrawal/status/:id
 * Check withdrawal status
 */
router.get('/status/:id', verifyToken, asyncHandler(async (req, res) => {
  const { id } = req.params;

  const withdrawal = withdrawals.find(
    w => w.id === id && w.userId === req.userId
  );

  if (!withdrawal) {
    return res.status(404).json({ 
      message: 'Withdrawal not found' 
    });
  }

  res.status(200).json({
    withdrawal: {
      id: withdrawal.id,
      amount: withdrawal.amount,
      currency: withdrawal.currency,
      toAddress: withdrawal.toAddress,
      status: withdrawal.status,
      fee: withdrawal.fee,
      transactionHash: withdrawal.transactionHash,
      estimatedTime: withdrawal.estimatedTime,
      createdAt: withdrawal.createdAt,
      updatedAt: withdrawal.updatedAt
    }
  });
}));

/**
 * POST /api/withdrawal/cancel/:id
 * Cancel a pending withdrawal
 */
router.post('/cancel/:id', verifyToken, asyncHandler(async (req, res) => {
  const { id } = req.params;

  const withdrawal = withdrawals.find(
    w => w.id === id && w.userId === req.userId
  );

  if (!withdrawal) {
    return res.status(404).json({ 
      message: 'Withdrawal not found' 
    });
  }

  if (withdrawal.status !== 'pending') {
    return res.status(400).json({ 
      message: `Cannot cancel withdrawal with status: ${withdrawal.status}` 
    });
  }

  withdrawal.status = 'cancelled';
  withdrawal.updatedAt = new Date();

  res.status(200).json({
    message: 'Withdrawal cancelled successfully',
    withdrawal: {
      id: withdrawal.id,
      status: withdrawal.status,
      updatedAt: withdrawal.updatedAt
    }
  });
}));

/**
 * GET /api/withdrawal/fees
 * Get withdrawal fees information
 */
router.get('/fees', verifyToken, asyncHandler(async (req, res) => {
  res.status(200).json({
    fees: {
      standard: {
        percentage: 0.1,
        estimatedTime: '5-30 minutes'
      },
      priority: {
        percentage: 0.2,
        estimatedTime: '1-5 minutes'
      },
      economy: {
        percentage: 0.05,
        estimatedTime: '30-60 minutes'
      }
    },
    minimumWithdrawal: 0.001,
    maximumWithdrawal: 100,
    currency: 'ETH'
  });
}));

/**
 * POST /api/withdrawal/confirm/:id
 * Confirm and process a withdrawal
 */
router.post('/confirm/:id', verifyToken, asyncHandler(async (req, res) => {
  const { id } = req.params;

  const withdrawal = withdrawals.find(
    w => w.id === id && w.userId === req.userId
  );

  if (!withdrawal) {
    return res.status(404).json({ 
      message: 'Withdrawal not found' 
    });
  }

  if (withdrawal.status !== 'pending') {
    return res.status(400).json({ 
      message: `Cannot confirm withdrawal with status: ${withdrawal.status}` 
    });
  }

  // Update status to processing
  withdrawal.status = 'processing';
  withdrawal.transactionHash = '0x' + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2);
  withdrawal.updatedAt = new Date();

  // In production, this would send the actual transaction to blockchain
  // For demo, we'll simulate it completing after 30 seconds
  setTimeout(() => {
    withdrawal.status = 'completed';
    withdrawal.updatedAt = new Date();
  }, 30000);

  res.status(200).json({
    message: 'Withdrawal processing started',
    withdrawal: {
      id: withdrawal.id,
      status: withdrawal.status,
      transactionHash: withdrawal.transactionHash,
      estimatedTime: withdrawal.estimatedTime,
      updatedAt: withdrawal.updatedAt
    }
  });
}));

module.exports = router;
