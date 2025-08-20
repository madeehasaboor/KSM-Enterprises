# Auto Champain E-commerce Website

A modern e-commerce platform for Auto Champain car care products, built with Node.js, Express, and MySQL.

## 🚀 Features

- **Modern E-commerce Platform** with shopping cart functionality
- **Product Management** with categories and inventory
- **Order Processing** with customer information
- **Responsive Design** with black and yellow theme
- **MySQL Database** for data persistence
- **RESTful API** for frontend-backend communication

## 🛠️ Technology Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Frontend:** HTML, CSS, JavaScript
- **Authentication:** JWT (JSON Web Tokens)
- **File Upload:** Multer

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd auto-champain-ecommerce
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup

#### Option A: Using MySQL Command Line
```bash
mysql -u root -p < database.sql
```

#### Option B: Using MySQL Workbench
1. Open MySQL Workbench
2. Connect to your MySQL server
3. Open the `database.sql` file
4. Execute the script

### 4. Environment Configuration
Create a `.env` file in the root directory:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=auto_champain_db
DB_PORT=3306

# Server Configuration
PORT=3000

# JWT Secret
JWT_SECRET=your_secret_key_here

# Environment
NODE_ENV=development
```

### 5. Start the Server

#### Development Mode (with auto-reload)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

## 🌐 Access the Application

- **Main Site:** http://localhost:3000
- **API Endpoints:** http://localhost:3000/api
- **Admin Panel:** http://localhost:3000/admin (coming soon)

## 📁 Project Structure

```
auto-champain-ecommerce/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── database.sql           # Database schema
├── env.example           # Environment variables template
├── css/                  # Stylesheets
│   └── styles.css
├── index/                # Main pages
│   ├── index.html
│   ├── about.html
│   └── contact.html
├── products/             # Product images
├── brand logos/          # Brand logos
└── README.md
```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:category` - Get products by category

### Orders
- `POST /api/orders` - Create new order

### Cart
- `GET /api/cart/:sessionId` - Get cart items
- `POST /api/cart` - Add item to cart

## 🗄️ Database Schema

### Tables
- **products** - Product information
- **categories** - Product categories
- **orders** - Customer orders
- **order_items** - Order line items
- **cart** - Shopping cart items
- **users** - Admin users

## 🎨 Customization

### Theme Colors
The site uses a black and yellow theme:
- **Primary:** #000000 (Black)
- **Secondary:** #FFD700 (Gold)
- **Accent:** #FFA500 (Orange)

### Branding
- **Company Name:** Auto Champain
- **Tagline:** Premium Car Care
- **Location:** Pakistan

## 🔧 Development

### Adding New Products
1. Add product image to `products/` directory
2. Insert product data into MySQL database
3. Update product listing in frontend

### Modifying Styles
Edit `css/styles.css` for theme changes

### Database Changes
1. Modify `database.sql` for schema changes
2. Run the updated SQL script
3. Update API endpoints if needed

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production Deployment
1. Set `NODE_ENV=production` in `.env`
2. Configure production database
3. Use PM2 or similar process manager
4. Set up reverse proxy (nginx)

## 📞 Support

- **Sales:** 04237103750 - 1
- **24/7 Helpline:** +923234890184
- **Email:** ksmenterprises22@gmail.com
- **Address:** Badami Bagh Centre, Badami Bagh, Lahore

## 📄 License

This project is proprietary software owned by Auto Champain.

---

**Auto Champain** - Premium Car Care Distribution Since 1984 🚗✨ 