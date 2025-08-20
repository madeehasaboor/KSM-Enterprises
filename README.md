# KSM Enterprises E-commerce Backend

This is the backend server for KSM Enterprises e-commerce website that handles order email notifications.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Gmail App Password

To send emails, you need to set up Gmail App Password:

1. Go to your Google Account settings
2. Enable 2-Step Verification if not already enabled
3. Go to Security → App passwords
4. Generate a new app password for "Mail"
5. Copy the generated password

### 3. Update Email Configuration

Edit `server.js` and replace:
- `'saboormadiha@gmail.com'` with your email
- `'your-app-password'` with the app password you generated

### 4. Start the Server
```bash
npm start
```

The server will run on port 3000.

### 5. Deploy to Live Server

For production deployment, you can use:
- **Render** (free)
- **Railway** (free)
- **Heroku** (paid)
- **Vercel** (free)

## How it Works

1. Customer places order on website
2. Frontend sends order data to `/api/order` endpoint
3. Backend sends email to saboormadiha@gmail.com
4. If email fails, WhatsApp fallback is used

## Email Format

The email will contain:
- Order number
- Customer details (name, phone, address)
- Complete order items with quantities and prices
- Total amount
- Date and time of order

## Files

- `server.js` - Main backend server
- `package.json` - Dependencies
- `cart.js` - Frontend order handling
- All HTML files - Website pages 