const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'auto_champain_db',
  port: process.env.DB_PORT || 3306
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('✅ Connected to MySQL database');
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/shop', (req, res) => {
  res.sendFile(path.join(__dirname, 'shop.html'));
});

app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'cart.html'));
});

// API Routes for Products
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM products WHERE active = 1';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/products/:category', (req, res) => {
  const category = req.params.category;
  const query = 'SELECT * FROM products WHERE category = ? AND active = 1';
  db.query(query, [category], (err, results) => {
    if (err) {
      console.error('Error fetching products by category:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(results);
  });
});

// API Routes for Orders
app.post('/api/orders', (req, res) => {
  const { customerName, customerPhone, customerAddress, customerEmail, items, totalAmount } = req.body;
  
  const orderQuery = `
    INSERT INTO orders (customer_name, customer_phone, customer_address, customer_email, total_amount, status, created_at) 
    VALUES (?, ?, ?, ?, ?, 'pending', NOW())
  `;
  
  db.query(orderQuery, [customerName, customerPhone, customerAddress, customerEmail, totalAmount], (err, result) => {
    if (err) {
      console.error('Error creating order:', err);
      res.status(500).json({ error: 'Failed to create order' });
      return;
    }
    
    const orderId = result.insertId;
    
    // Insert order items
    const itemsQuery = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';
    
    const insertPromises = items.map(item => {
      return new Promise((resolve, reject) => {
        db.query(itemsQuery, [orderId, item.id, item.quantity, item.price], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    });
    
    Promise.all(insertPromises)
      .then(() => {
        res.json({ 
          success: true, 
          orderId: orderId,
          message: 'Order created successfully' 
        });
      })
      .catch(err => {
        console.error('Error inserting order items:', err);
        res.status(500).json({ error: 'Failed to create order items' });
      });
  });
});

// API Routes for Cart
app.get('/api/cart/:sessionId', (req, res) => {
  const sessionId = req.params.sessionId;
  const query = 'SELECT * FROM cart WHERE session_id = ?';
  db.query(query, [sessionId], (err, results) => {
    if (err) {
      console.error('Error fetching cart:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(results);
  });
});

app.post('/api/cart', (req, res) => {
  const { sessionId, productId, quantity, price } = req.body;
  
  const query = `
    INSERT INTO cart (session_id, product_id, quantity, price, created_at) 
    VALUES (?, ?, ?, ?, NOW())
    ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
  `;
  
  db.query(query, [sessionId, productId, quantity, price], (err, result) => {
    if (err) {
      console.error('Error adding to cart:', err);
      res.status(500).json({ error: 'Failed to add to cart' });
      return;
    }
    res.json({ success: true, message: 'Added to cart' });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Auto Champain server running on port ${PORT}`);
  console.log(`📱 Access your site at: http://localhost:${PORT}`);
  console.log(`🛍️  API available at: http://localhost:${PORT}/api`);
}); 