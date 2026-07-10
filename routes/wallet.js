const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { ethers } = require('ethers');

// Mock wallet storage - Replace with MongoDB in production
const wallets = {};

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
 * POST /api/wallet/create
 * Create a new cryptocurrency wallet
 */
router.post('/create', verifyToken, (req, res) => {
  try {
    // Check if user already has a wallet
    if (wallets[req.userId]) {
      return res.status(409).json({ 
        message: 'User already has a wallet' 
      });
    }

    // Create new Ethereum wallet
    const newWallet = ethers.Wallet.createRandom();

    // Store wallet (encrypted in production)
    wallets[req.userId] = {
      address: newWallet.address,
      privateKey: newWallet.privateKey,
      publicKey: newWallet.publicKey,
      mnemonic: newWallet.mnemonic.phrase,
      createdAt: new Date(),
      balance: '0'
    };

    res.status(201).json({
      message: 'Wallet created successfully',
      wallet: {
        address: newWallet.address,
        publicKey: newWallet.publicKey
      },
      mnemonic: newWallet.mnemonic.phrase,
      warning: '⚠️ Save your mnemonic phrase in a secure location. You will need it to recover your wallet.'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating wallet', 
      error: error.message 
    });
  }
});

/**
 * GET /api/wallet/address
 * Get user's wallet address
 */
router.get('/address', verifyToken, (req, res) => {
  try {
    const wallet = wallets[req.userId];

    if (!wallet) {
      return res.status(404).json({ 
        message: 'No wallet found for this user. Create a wallet first.' 
      });
    }

    res.status(200).json({
      address: wallet.address,
      createdAt: wallet.createdAt
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error retrieving wallet address', 
      error: error.message 
    });
  }
});

/**
 * GET /api/wallet/balance
 * Get wallet balance
 */
router.get('/balance', verifyToken, async (req, res) => {
  try {
    const wallet = wallets[req.userId];

    if (!wallet) {
      return res.status(404).json({ 
        message: 'No wallet found for this user' 
      });
    }

    // In production, connect to real blockchain provider
    // const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_API_KEY);
    // const balance = await provider.getBalance(wallet.address);
    
    // For demo, return mock balance
    const mockBalance = ethers.utils.parseEther('0.5'); // 0.5 ETH

    res.status(200).json({
      address: wallet.address,
      balance: ethers.utils.formatEther(mockBalance),
      balanceInWei: mockBalance.toString(),
      currency: 'ETH'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error retrieving wallet balance', 
      error: error.message 
    });
  }
});

/**
 * POST /api/wallet/import
 * Import existing wallet using private key
 */
router.post('/import', verifyToken, (req, res) => {
  try {
    const { privateKey } = req.body;

    if (!privateKey) {
      return res.status(400).json({ 
        message: 'Private key is required' 
      });
    }

    // Check if user already has a wallet
    if (wallets[req.userId]) {
      return res.status(409).json({ 
        message: 'User already has a wallet' 
      });
    }

    // Import wallet from private key
    const importedWallet = new ethers.Wallet(privateKey);

    // Store imported wallet
    wallets[req.userId] = {
      address: importedWallet.address,
      privateKey: importedWallet.privateKey,
      publicKey: importedWallet.publicKey,
      imported: true,
      importedAt: new Date(),
      balance: '0'
    };

    res.status(200).json({
      message: 'Wallet imported successfully',
      wallet: {
        address: importedWallet.address,
        publicKey: importedWallet.publicKey
      }
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error importing wallet. Invalid private key.', 
      error: error.message 
    });
  }
});

/**
 * GET /api/wallet/details
 * Get complete wallet details
 */
router.get('/details', verifyToken, (req, res) => {
  try {
    const wallet = wallets[req.userId];

    if (!wallet) {
      return res.status(404).json({ 
        message: 'No wallet found for this user' 
      });
    }

    res.status(200).json({
      wallet: {
        address: wallet.address,
        publicKey: wallet.publicKey,
        imported: wallet.imported || false,
        createdAt: wallet.createdAt,
        importedAt: wallet.importedAt || null,
        balance: wallet.balance
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error retrieving wallet details', 
      error: error.message 
    });
  }
});

/**
 * POST /api/wallet/verify
 * Verify wallet ownership
 */
router.post('/verify', verifyToken, (req, res) => {
  try {
    const wallet = wallets[req.userId];

    if (!wallet) {
      return res.status(404).json({ 
        message: 'No wallet found for this user' 
      });
    }

    res.status(200).json({
      verified: true,
      address: wallet.address,
      message: 'Wallet verified successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error verifying wallet', 
      error: error.message 
    });
  }
});

module.exports = router;