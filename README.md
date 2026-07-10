#Zamani Cash App

A Node.js web application for cryptocurrency wallet integration and secure withdrawals.

## Features

- 🔐 User authentication and account management
- 💰 Cryptocurrency wallet integration (Ethereum, Bitcoin, etc.)
- 💸 Secure withdrawal functionality
- 📊 Transaction history and balance tracking
- 🔒 Encrypted private key storage
- 📱 Responsive web interface
- ⚡ Real-time cryptocurrency price updates

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Cryptocurrency API keys (Infura, Alchemy, or similar)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/jamesmcgrew87-png/Zamani-.git
cd Zamani-
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`

5. Start the server:
```bash
npm run dev
```

The app will be available at `http://localhost:5000`

## Project Structure

```
Zamani-/
├── server.js              #Main server file
├── package.json           # Dependencies
├── .env.example           #Environment variables template
├── public/                # Frontend files
│   ├── index.html
│   ├── css/
│   └── js/
├── routes/                # API routes
│   ├── auth.js
│   ├── wallet.js
│   └── withdrawal.js
├── models/                # Database models
├── controllers/           # Business logic
└── utils/                 # Utility functions
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Wallet
- `GET /api/wallet/balance` - Get wallet balance
- `GET /api/wallet/address` - Get wallet address
- `POST /api/wallet/import` - Import existing wallet

### Withdrawal
- `POST /api/withdrawal/request` - Create withdrawal request
- `GET /api/withdrawal/history` - Get withdrawal history
- `GET /api/withdrawal/status/:id` - Check withdrawal status

## Security Considerations

⚠️ **Important:**
- Never commit `.env` file to Git
- Always use HTTPS in production
- Store private keys securely
- Implement rate limiting
- Add 2FA for user accounts
- Regular security audits

## Development

```bash
# Install dev dependencies
npm install --save-dev nodemon

# Run with auto-reload
npm run dev

# Run tests
npm test
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT

## Support

For issues or questions, please create an issue on GitHub.

---

**⚠️ Disclaimer:** This is a development project. Do not use with real cryptocurrency or sensitive data until properly audited and secured.
