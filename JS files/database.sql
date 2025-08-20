-- Auto Champain Database Schema
-- Create database
CREATE DATABASE IF NOT EXISTS auto_champain_db;
USE auto_champain_db;

-- Products table
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    brand VARCHAR(100),
    image_url VARCHAR(500),
    stock_quantity INT DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_address TEXT NOT NULL,
    customer_email VARCHAR(255),
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    payment_method VARCHAR(50),
    payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Cart table
CREATE TABLE cart (
    id INT PRIMARY KEY AUTO_INCREMENT,
    session_id VARCHAR(255) NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_session_product (session_id, product_id)
);

-- Users table (for admin panel)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'staff') DEFAULT 'staff',
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('CAR POLISH & SHINNERS', 'Professional car polishing and shining products'),
('CAR PROTECTING SPRAYS', 'Protective sprays for car surfaces'),
('CAR SPRAY PAINTS', 'Automotive spray paints and coatings'),
('CAR WASH SHAMPOOS', 'Car washing and cleaning shampoos'),
('CAR WAX', 'Car waxing and protection products'),
('CLEANERS', 'Automotive cleaning products'),
('MICRO FIBER CLOTHES', 'Microfiber cleaning cloths and towels'),
('OTHERS', 'Other automotive care products'),
('RADIATOR COOLER', 'Radiator and cooling system products');

-- Insert sample products
INSERT INTO products (name, description, price, category, brand, image_url, stock_quantity) VALUES
('AIM Tire Gel 500ml', 'Professional tire gel for long-lasting shine', 850.00, 'CAR POLISH & SHINNERS', 'AIM', 'products/CAR POLISH & SHINNERS/aim tire gel 500ml.jpeg', 50),
('Formula 1 Protectant Spray', 'Advanced protectant spray for all surfaces', 1200.00, 'CAR PROTECTING SPRAYS', 'Formula 1', 'products/CAR PROTECTING SPRAYS/formula 1 protectant spray.jpeg', 30),
('AIM Spray Paint Red', 'High-quality automotive spray paint', 450.00, 'CAR SPRAY PAINTS', 'AIM', 'products/CAR SPRAY PAINTS/A-143 AIM SPRAY  PAINT RED.jpeg', 25),
('AIM Wash & Shampoo', 'Professional car wash shampoo', 650.00, 'CAR WASH SHAMPOOS', 'AIM', 'products/CAR WASH SHAMPOOS/AW-157 AIM WASH & SHAMPOO.jpeg', 40),
('Formula 1 Carnuba Wax', 'Premium carnauba wax for ultimate protection', 1800.00, 'CAR WAX', 'Formula 1', 'products/CAR WAX/F1-101 CARNAUBA WASH &WAX.jpeg', 20),
('AIM Glass Cleaner', 'Professional glass cleaning solution', 350.00, 'CLEANERS', 'AIM', 'products/CLEANERS/A-131 AIM GLASS CLEANER.jpeg', 60),
('Microfiber Towel Pack', 'Pack of 4 premium microfiber towels', 250.00, 'MICRO FIBER CLOTHES', 'Auto Champain', 'products/MICRO FIBER CLOTHES/MICROFIBER TOWEL PACK OF 4.jpeg', 100),
('WD-40 Multi-Use', 'Versatile lubricant and protectant', 400.00, 'OTHERS', 'WD-40', 'products/WD-40.jpg', 75),
('AIM Radiator Coolant', 'High-performance radiator coolant', 550.00, 'RADIATOR COOLER', 'AIM', 'products/RADIATOR COOLER/A-102 AIM RADIATOR COOLANT.jpeg', 35);

-- Insert admin user (password: admin123)
INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@autochampain.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_active ON products(active);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_cart_session ON cart(session_id); 