const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config({ path: './production.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// Production middleware
app.use(cors({
    origin: ['https://www.ksmenterprises.sbs', 'https://ksmenterprises.sbs'],
    credentials: true
}));

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
});

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/brand logos', express.static(path.join(__dirname, 'brand logos')));
app.use('/products', express.static(path.join(__dirname, 'products')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/shop', (req, res) => {
    res.sendFile(path.join(__dirname, 'shop.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'cart.html'));
});

// API routes (if needed)
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', environment: 'production', domain: process.env.DOMAIN });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Production Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`🚀 Production server running on port ${PORT}`);
    console.log(`🌐 Domain: ${process.env.DOMAIN}`);
    console.log(`📱 Access your site at: https://${process.env.DOMAIN}`);
    console.log(`🛍️  API available at: https://${process.env.DOMAIN}/api`);
}); 