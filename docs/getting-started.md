# Getting Started with Zamani Cash App

Welcome to Zamani Cash App! This guide will help you get up and running quickly.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** - [Local installation](https://docs.mongodb.com/manual/installation/) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

## Step 1: Clone the Repository

```bash
git clone https://github.com/jamesmcgrew87-png/Zamani-.git
cd Zamani-
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- **express** - Web framework
- **mongoose** - MongoDB object modeling
- **web3** & **ethers** - Blockchain interaction
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variables
- **cors** - Cross-origin requests
- **helmet** - Security headers
- **nodemon** - Development auto-reload

## Step 3: Set Up Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and configure the following variables:

   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/zamani
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/zamani
   
   # JWT Secret
   JWT_SECRET=your_super_secret_key_here_change_this
   JWT_EXPIRE=7d
   
   # Cryptocurrency APIs
   INFURA_API_KEY=your_infura_api_key
   ALCHEMY_API_KEY=your_alchemy_api_key
   
   # Ethereum Configuration
   ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY
   ETHEREUM_NETWORK=mainnet
   
   # Bitcoin Configuration
   BITCOIN_NETWORK=mainnet
   
   # Email Configuration (for notifications)
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   
   # Withdrawal Settings
   MIN_WITHDRAWAL=0.001
   MAX_WITHDRAWAL=10
   WITHDRAWAL_FEE_PERCENT=1
   ```

## Step 4: Start MongoDB

### If using local MongoDB:
```bash
# On macOS/Linux
mongod

# On Windows
"C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"
```

### If using MongoDB Atlas:
Ensure your connection string is in the `.env` file under `MONGODB_URI`

## Step 5: Run the Application

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The application will start and display:
```
Zamani Cash App server running on port 5000
```

## Step 6: Access the Application

Open your browser and navigate to:
```
http://localhost:5000
```

## First Steps in the App

### 1. Create an Account
- Click "Sign Up" or "Register"
- Enter your email and password
- Confirm your email (if verification is enabled)

### 2. Set Up Your Wallet
- Go to "Wallet" section
- Choose to create a new wallet or import an existing one
- **Create New**: Generates a new Ethereum wallet with secure private key storage
- **Import Wallet**: Use your existing private key or seed phrase

### 3. Fund Your Wallet
- Copy your wallet address from the dashboard
- Send cryptocurrency to this address from an external wallet
- Balance updates in real-time

### 4. Check Your Balance
- Navigate to "Dashboard" or "Wallet"
- View your current balance in USD and crypto
- See transaction history

### 5. Make a Withdrawal
- Go to "Withdrawal" section
- Enter the amount and destination address
- Review fees and confirm
- Track withdrawal status in real-time

## Project Structure

```
Zamani-/
├── server.js              # Main server entry point
├── package.json           # Dependencies and scripts
├── .env.example           # Environment variables template
├── .env                   # Your configuration (DO NOT COMMIT)
├── .gitignore             # Files to exclude from git
├── public/                # Frontend files
│   ├── index.html         # Main HTML file
│   ├── css/
│   │   └── styles.css     # Application styles
│   └── js/
│       ├── app.js         # Main app logic
│       ├── auth.js        # Authentication
│       ├── wallet.js      # Wallet operations
│       └── withdrawal.js  # Withdrawal logic
├── routes/                # API endpoints
│   ├── auth.js            # Authentication routes
│   ├── wallet.js          # Wallet routes
│   └── withdrawal.js      # Withdrawal routes
├── models/                # Database schemas
│   ├── User.js            # User model
│   ├── Wallet.js          # Wallet model
│   └── Transaction.js     # Transaction model
├── controllers/           # Business logic
│   ├── authController.js
│   ├── walletController.js
│   └── withdrawalController.js
├── utils/                 # Utility functions
│   ├── encryption.js      # Encryption utilities
│   ├── validation.js      # Input validation
│   └── blockchain.js      # Blockchain interactions
└── docs/                  # Documentation
    ├── getting-started.md # This file
    ├── api-reference.md   # API documentation
    ├── wallet-setup.md    # Wallet guide
    └── security.md        # Security best practices
```

## Common Commands

```bash
# Install dependencies
npm install

# Run in development mode (with auto-reload)
npm run dev

# Run in production mode
npm start

# Run tests
npm test

# Install dev dependencies
npm install --save-dev <package-name>
```

## Troubleshooting

### Port Already in Use
If port 5000 is already in use:
```bash
# Change the port in .env file
PORT=3000
```

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running. Start `mongod` service.

### Missing Environment Variables
```
Error: JWT_SECRET is not defined
```
**Solution**: Check your `.env` file and ensure all required variables are set.

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution**: Run `npm install` to install dependencies.

### Blockchain API Errors
- Verify your Infura or Alchemy API keys are correct
- Check your internet connection
- Ensure you're using the correct network (mainnet vs testnet)

## Next Steps

- Read the [API Reference](./api-reference.md) for detailed endpoint documentation
- Check the [Wallet Setup Guide](./wallet-setup.md) for wallet configuration
- Review [Security Best Practices](./security.md) before deployment

## Support

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review [GitHub Issues](https://github.com/jamesmcgrew87-png/Zamani-/issues)
3. Create a new issue with:
   - Error message
   - Steps to reproduce
   - Your environment details (Node.js version, OS, etc.)

## Development Tips

- Use `nodemon` for automatic server restart during development
- Check browser console (F12) for frontend errors
- Use `console.log()` or a debugger for backend debugging
- MongoDB Compass is helpful for viewing database records

---

**Happy coding! 🚀**
