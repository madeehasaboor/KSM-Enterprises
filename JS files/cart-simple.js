// Simplified Cart functionality for Auto Champain
console.log('Loading simplified cart.js...');

// Global cart variable
let cart = [];

// Initialize cart from localStorage
function initializeCart() {
    try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            console.log('Cart loaded from localStorage:', cart);
        } else {
            cart = [];
            console.log('No saved cart found, starting with empty cart');
        }
    } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        cart = [];
    }
}

// Save cart to localStorage
function saveCart() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Cart saved to localStorage:', cart);
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
    }
}

// Update cart count display
function updateCartCount() {
    try {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
            cartCount.textContent = totalItems;
            console.log('Cart count updated to:', totalItems);
        } else {
            console.warn('Cart count element not found');
        }
    } catch (error) {
        console.error('Error updating cart count:', error);
    }
}

// Add product to cart
function addToCart(productData) {
    try {
        console.log('Adding to cart:', productData);
        
        // Check if product already exists
        const existingItem = cart.find(item => item.name === productData.name);
        
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
            console.log('Product quantity increased:', existingItem);
        } else {
            const newItem = {
                id: Date.now() + Math.random(),
                name: productData.name,
                description: productData.description || '',
                price: productData.price,
                image: productData.image || '',
                quantity: 1
            };
            cart.push(newItem);
            console.log('New product added to cart:', newItem);
        }
        
        // Save and update display
        saveCart();
        updateCartCount();
        
        // Show success message
        showNotification('Product added to cart!', 'success');
        
        return true;
    } catch (error) {
        console.error('Error adding to cart:', error);
        showNotification('Error adding product to cart!', 'error');
        return false;
    }
}

// Remove product from cart
function removeFromCart(productId) {
    try {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartCount();
        
        if (typeof displayCart === 'function') {
            displayCart();
        }
        
        console.log('Product removed from cart, new cart:', cart);
        return true;
    } catch (error) {
        console.error('Error removing from cart:', error);
        return false;
    }
}

// Update product quantity
function updateQuantity(productId, change) {
    try {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, (item.quantity || 1) + change);
            
            if (item.quantity <= 0) {
                removeFromCart(productId);
            } else {
                saveCart();
                updateCartCount();
                
                if (typeof displayCart === 'function') {
                    displayCart();
                }
            }
            
            console.log('Quantity updated for product:', item);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error updating quantity:', error);
        return false;
    }
}

// Display cart items
function displayCart() {
    try {
        const cartContainer = document.getElementById('cartItems');
        const totalItemsSpan = document.getElementById('totalItems');
        const totalAmountSpan = document.getElementById('totalAmount');
        
        if (!cartContainer || !totalItemsSpan || !totalAmountSpan) {
            console.error('Required cart elements not found');
            return;
        }
        
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p class="empty-cart">Your Auto Champain cart is empty</p>';
            totalItemsSpan.textContent = '0';
            totalAmountSpan.textContent = 'Rs. 0';
            console.log('Cart is empty, displayed empty message');
            return;
        }
        
        cartContainer.innerHTML = '';
        let totalItems = 0;
        let totalAmount = 0;
        
        cart.forEach(item => {
            const cartItem = createCartItem(item);
            cartContainer.appendChild(cartItem);
            totalItems += item.quantity || 1;
            totalAmount += item.price * (item.quantity || 1);
        });
        
        totalItemsSpan.textContent = totalItems;
        totalAmountSpan.textContent = `Rs. ${totalAmount.toLocaleString()}`;
        
        console.log('Cart displayed successfully, total:', totalAmount);
    } catch (error) {
        console.error('Error displaying cart:', error);
    }
}

// Create cart item HTML
function createCartItem(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    
    cartItem.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image || 'https://via.placeholder.com/100x100?text=Product'}" 
                 alt="${item.name}" 
                 onerror="this.src='https://via.placeholder.com/100x100?text=Auto+Champain+Product'">
        </div>
        <div class="cart-item-details">
            <h4>${item.name}</h4>
            <p class="cart-item-price">Rs. ${item.price.toLocaleString()}</p>
            <div class="quantity-controls">
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity || 1}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
        </div>
        <div class="cart-item-total">
            <p>Rs. ${((item.price || 0) * (item.quantity || 1)).toLocaleString()}</p>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    return cartItem;
}

// Show notification
function showNotification(message, type = 'info') {
    try {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;
        
        // Add styles if not already present
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #333;
                    color: white;
                    padding: 15px 20px;
                    border-radius: 5px;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                }
                .notification.show {
                    transform: translateX(0);
                }
                .notification.success { background: #28a745; }
                .notification.error { background: #dc3545; }
                .notification button {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    font-size: 18px;
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
        
        console.log('Notification shown:', message);
    } catch (error) {
        console.error('Error showing notification:', error);
        // Fallback to alert
        alert(message);
    }
}

// Checkout and Order Functions
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your Auto Champain cart is empty!', 'error');
        return;
    }
    
    // Show customer form if not already visible
    const customerForm = document.getElementById('customerForm');
    if (customerForm && customerForm.style.display === 'none') {
        customerForm.style.display = 'block';
        // Scroll to form
        customerForm.scrollIntoView({ behavior: 'smooth' });
        
        // Show WhatsApp button
        const whatsappBtn = document.querySelector('.whatsapp-order-btn');
        if (whatsappBtn) {
            whatsappBtn.style.display = 'inline-block';
        }
    }
    
    // Create order summary
    const orderSummary = createOrderSummary();
    console.log('Auto Champain Order Summary:', orderSummary);
}

function createOrderSummary() {
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    const totalAmount = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    
    return {
        items: cart,
        totalItems: totalItems,
        totalAmount: totalAmount,
        orderDate: new Date().toISOString(),
        company: 'Auto Champain'
    };
}

// WhatsApp Integration Functions
function sendOrderToWhatsApp() {
    try {
        if (cart.length === 0) {
            showNotification('Your cart is empty!', 'error');
            return;
        }
        
        const customerName = document.getElementById('customerName')?.value;
        const customerPhone = document.getElementById('customerPhone')?.value;
        const customerAddress = document.getElementById('customerAddress')?.value;
        const customerEmail = document.getElementById('customerEmail')?.value;
        
        if (!customerName || !customerPhone || !customerAddress) {
            showNotification('Please fill in all required customer information!', 'error');
            return;
        }
        
        const orderSummary = createOrderSummary();
        const whatsappMessage = formatOrderForWhatsApp(orderSummary, {
            name: customerName,
            phone: customerPhone,
            address: customerAddress,
            email: customerEmail
        });
        
        // WhatsApp Business number for order notifications
        const whatsappNumber = '+923234890184'; // Your helpline number with country code
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Show loading notification
        showNotification('Opening WhatsApp...', 'info');
        
        // Open WhatsApp in new tab
        const whatsappWindow = window.open(whatsappURL, '_blank');
        
        if (whatsappWindow) {
            // Success - WhatsApp opened
            showNotification('WhatsApp opened successfully! Order details sent.', 'success');
            
            // Store order in localStorage for reference
            const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
            orderHistory.push({
                orderNumber: 'AC-' + Date.now().toString().slice(-6),
                date: new Date().toISOString(),
                items: cart,
                customer: { name: customerName, phone: customerPhone, address: customerAddress, email: customerEmail },
                total: orderSummary.totalAmount
            });
            localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
            
            // Clear cart after successful order
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            displayCart();
            
        } else {
            // WhatsApp didn't open (popup blocked)
            showNotification('WhatsApp popup was blocked. Please manually send the order.', 'warning');
            
            // Show manual instructions
            const manualMessage = `Please manually send this order to WhatsApp: +923234890184\n\nOrder Details:\n${whatsappMessage}`;
            alert(manualMessage);
        }
        
    } catch (error) {
        console.error('Error sending order to WhatsApp:', error);
        showNotification('Error sending order. Please try again.', 'error');
    }
}

function formatOrderForWhatsApp(orderSummary, customerInfo) {
    const items = orderSummary.items.map(item => 
        `• ${item.name} x${item.quantity || 1} - Rs. ${((item.price || 0) * (item.quantity || 1)).toLocaleString()}`
    ).join('\n');
    
    const orderNumber = 'AC-' + Date.now().toString().slice(-6);
    const currentDate = new Date().toLocaleDateString('en-PK');
    const currentTime = new Date().toLocaleTimeString('en-PK');
    
    const message = `🛒 *NEW ORDER RECEIVED* 🛒

📋 *Order Number:* ${orderNumber}
📅 *Date:* ${currentDate}
⏰ *Time:* ${currentTime}

👤 *Customer Information:*
• *Name:* ${customerInfo.name}
• *Phone:* ${customerInfo.phone}
• *Address:* ${customerInfo.address}
${customerInfo.email ? `• *Email:* ${customerInfo.email}` : ''}

📦 *Order Items:*
${items}

💰 *Order Summary:*
• Total Items: ${orderSummary.totalItems}
• Total Amount: *Rs. ${orderSummary.totalAmount.toLocaleString()}*

🏢 *Auto Champain*
Pakistan's leading car care distribution company
40 years of excellence

🚚 *Delivery Information:*
• Cash on Delivery Available
• Free Delivery on orders above Rs. 2000
• Same Day Delivery Available

Please process this order and confirm receipt.
Thank you! 🚗✨`;
    
    return message;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing cart...');
    
    try {
        initializeCart();
        updateCartCount();
        
        // If we're on the cart page, display the cart
        if (document.getElementById('cartItems')) {
            displayCart();
        }
        
        console.log('Cart initialization completed successfully');
    } catch (error) {
        console.error('Error during cart initialization:', error);
    }
});

// Make functions globally available
window.cartFunctions = {
    addToCart,
    removeFromCart,
    updateQuantity,
    updateCartCount,
    displayCart,
    showNotification,
    proceedToCheckout,
    sendOrderToWhatsApp,
    createOrderSummary,
    formatOrderForWhatsApp
};

// Also make them directly available for backward compatibility
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.updateCartCount = updateCartCount;
window.displayCart = displayCart;
window.showNotification = showNotification;
window.proceedToCheckout = proceedToCheckout;
window.sendOrderToWhatsApp = sendOrderToWhatsApp;
window.createOrderSummary = createOrderSummary;
window.formatOrderForWhatsApp = formatOrderForWhatsApp;

console.log('Simplified cart.js loaded successfully'); 