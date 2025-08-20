// Auto Champain Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', function() {
    displayCart();
    updateCartCount();
    
    // Add payment method change listeners
    setupPaymentMethodListeners();
});

function setupPaymentMethodListeners() {
    const codRadio = document.getElementById('cod');
    const jazzCashRadio = document.getElementById('jazzCash');
    const bankRadio = document.getElementById('bankTransfer');
    const codInfo = document.getElementById('codInfo');
    const jazzCashInfo = document.getElementById('jazzCashInfo');
    const bankInfo = document.getElementById('bankInfo');
    
    if (codRadio && jazzCashRadio && bankRadio) {
        codRadio.addEventListener('change', function() {
            if (this.checked) {
                codInfo.style.display = 'block';
                jazzCashInfo.style.display = 'none';
                bankInfo.style.display = 'none';
            }
        });
        
        jazzCashRadio.addEventListener('change', function() {
            if (this.checked) {
                codInfo.style.display = 'none';
                jazzCashInfo.style.display = 'block';
                bankInfo.style.display = 'none';
            }
        });
        
        bankRadio.addEventListener('change', function() {
            if (this.checked) {
                codInfo.style.display = 'none';
                jazzCashInfo.style.display = 'none';
                bankInfo.style.display = 'block';
            }
        });
    }
}

function displayCart() {
    const cartContainer = document.getElementById('cartItems');
    const totalItemsSpan = document.getElementById('totalItems');
    const totalAmountSpan = document.getElementById('totalAmount');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Your Auto Champain cart is empty</p>';
        totalItemsSpan.textContent = '0';
        totalAmountSpan.textContent = 'Rs. 0';
        return;
    }
    
    cartContainer.innerHTML = '';
    let totalItems = 0;
    let totalAmount = 0;
    
    cart.forEach(item => {
        const cartItem = createCartItem(item);
        cartContainer.appendChild(cartItem);
        totalItems += item.quantity;
        totalAmount += item.price * item.quantity;
    });
    
    totalItemsSpan.textContent = totalItems;
    totalAmountSpan.textContent = `Rs. ${totalAmount.toLocaleString()}`;
}

function createCartItem(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    
    cartItem.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/100x100?text=Auto+Champain+Product'">
        </div>
        <div class="cart-item-details">
            <h4>${item.name}</h4>
            <p class="cart-item-price">Rs. ${item.price}</p>
            <div class="quantity-controls">
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
        </div>
        <div class="cart-item-total">
            <p>Rs. ${(item.price * item.quantity).toLocaleString()}</p>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    return cartItem;
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
            updateCartCount();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Show customer form if not already visible
    const customerForm = document.getElementById('customerForm');
    if (customerForm.style.display === 'none') {
        customerForm.style.display = 'block';
        document.querySelector('.checkout-btn').textContent = 'Submit Order';
        return;
    }
    
    // Validate form
    const customerName = document.getElementById('customerName').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const customerAddress = document.getElementById('customerAddress').value.trim();
    const customerEmail = document.getElementById('customerEmail').value.trim();
    
    // Get payment method
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (!paymentMethod) {
        alert('Please select a payment method');
        return;
    }
    
    // Validate JazzCash fields if selected
    if (paymentMethod.value === 'jazzCash') {
        const jazzCashNumber = document.getElementById('jazzCashNumber').value.trim();
        if (!jazzCashNumber) {
            alert('Please enter your JazzCash number');
            return;
        }
        if (!jazzCashNumber.match(/^03\d{9}$/)) {
            alert('Please enter a valid JazzCash number (03XXXXXXXXX)');
            return;
        }
    }
    
    // Validate Bank Transfer fields if selected
    if (paymentMethod.value === 'bankTransfer') {
        const bankTransactionId = document.getElementById('bankTransactionId').value.trim();
        if (!bankTransactionId) {
            alert('Please enter the bank transaction ID or reference number');
            return;
        }
    }
    
    if (!customerName || !customerPhone || !customerAddress) {
        alert('Please fill in all required fields (Name, Phone, Address)');
        return;
    }
    
    // Create order summary
    const orderSummary = createOrderSummary();
    
    // Get additional payment details
    let paymentDetails = {};
    if (paymentMethod.value === 'jazzCash') {
        paymentDetails = {
            jazzCashNumber: document.getElementById('jazzCashNumber').value.trim(),
            transactionId: document.getElementById('transactionId').value.trim()
        };
    } else if (paymentMethod.value === 'bankTransfer') {
        paymentDetails = {
            bankTransactionId: document.getElementById('bankTransactionId').value.trim(),
            bankName: document.getElementById('bankName').value.trim()
        };
    }
    
    // Send email with order details
    sendOrderEmail(orderSummary, {
        name: customerName,
        phone: customerPhone,
        address: customerAddress,
        email: customerEmail,
        paymentMethod: paymentMethod.value,
        paymentDetails: paymentDetails
    });
    
    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
    
    // Reset form
    customerForm.style.display = 'none';
    document.querySelector('.checkout-btn').textContent = 'Proceed to Checkout';
    document.getElementById('customerName').value = '';
    document.getElementById('customerPhone').value = '';
    document.getElementById('customerAddress').value = '';
    document.getElementById('customerEmail').value = '';
    
    // Reset payment method fields
    if (document.getElementById('jazzCashNumber')) {
        document.getElementById('jazzCashNumber').value = '';
    }
    if (document.getElementById('transactionId')) {
        document.getElementById('transactionId').value = '';
    }
    
    alert('Order submitted! You will receive a confirmation email shortly.');
}

function createOrderSummary() {
    let totalAmount = 0;
    let itemsList = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;
        itemsList += `${item.name} x${item.quantity} - Rs. ${itemTotal.toLocaleString()}\n`;
    });
    
    return {
        items: itemsList,
        total: totalAmount,
        orderNumber: 'KSM-' + Date.now()
    };
}

function sendOrderEmail(orderSummary, customerInfo) {
    // Show loading state
    const checkoutBtn = document.querySelector('.checkout-btn');
    const originalText = checkoutBtn.textContent;
    checkoutBtn.textContent = 'Processing Order...';
    checkoutBtn.disabled = true;

    // Send email using backend API
    fetch('https://api.ksmenterprises.sbs/api/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            orderSummary,
            customerInfo
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            console.log('Email sent successfully');
            alert(`Order submitted successfully!\n\nOrder Number: ${orderSummary.orderNumber}\nCustomer: ${customerInfo.name}\nPhone: ${customerInfo.phone}\n\nOrder details have been sent to saboormadiha@gmail.com`);
        } else {
            throw new Error('Email sending failed: ' + (data.message || 'Unknown error'));
        }
    })
    .catch(error => {
        console.error('Email sending failed:', error);
        
        // Fallback to WhatsApp with improved message formatting
        let paymentMethodText = '';
        let paymentDetailsText = '';
        
        if (customerInfo.paymentMethod === 'cod') {
            paymentMethodText = '💵 Cash on Delivery (COD)';
        } else if (customerInfo.paymentMethod === 'jazzCash') {
            paymentMethodText = '📱 JazzCash';
            if (customerInfo.paymentDetails && customerInfo.paymentDetails.jazzCashNumber) {
                paymentDetailsText = `%0A• Customer JazzCash: ${customerInfo.paymentDetails.jazzCashNumber}`;
                if (customerInfo.paymentDetails.transactionId) {
                    paymentDetailsText += `%0A• Transaction ID: ${customerInfo.paymentDetails.transactionId}`;
                }
            }
        } else {
            paymentMethodText = '🏦 Bank Transfer';
        }
        
        const whatsappMessage = `🛒 *NEW ORDER* - ${orderSummary.orderNumber}%0A%0A👤 *Customer Details:*%0A• Name: ${customerInfo.name}%0A• Phone: ${customerInfo.phone}%0A• Address: ${customerInfo.address}${customerInfo.email ? `%0A• Email: ${customerInfo.email}` : ''}%0A%0A💳 *Payment Method:* ${paymentMethodText}${paymentDetailsText}%0A%0A📦 *Order Details:*%0A${orderSummary.items.replace(/\n/g, '%0A')}%0A%0A💰 *Total Amount: Rs. ${orderSummary.total.toLocaleString()}*%0A%0A📅 Date: ${new Date().toLocaleDateString()}%0A⏰ Time: ${new Date().toLocaleTimeString()}`;
        
        const whatsappLink = `https://wa.me/+923234890184?text=${whatsappMessage}`;
        
        // Try to open WhatsApp
        try {
            window.open(whatsappLink, '_blank');
            alert(`✅ Order submitted successfully!\n\n📋 Order Number: ${orderSummary.orderNumber}\n👤 Customer: ${customerInfo.name}\n📱 Phone: ${customerInfo.phone}\n\n📱 Order details have been sent to WhatsApp.\nPlease check your WhatsApp for complete order information.\n\nIf WhatsApp didn't open automatically, please manually send the order details to +923234890184`);
        } catch (whatsappError) {
            console.error('WhatsApp fallback failed:', whatsappError);
            alert(`✅ Order submitted successfully!\n\n📋 Order Number: ${orderSummary.orderNumber}\n👤 Customer: ${customerInfo.name}\n📱 Phone: ${customerInfo.phone}\n\n⚠️ Please manually send order details to WhatsApp: +923234890184\n\nOrder Details:\n${orderSummary.items}\n\nTotal: Rs. ${orderSummary.total.toLocaleString()}`);
        }
    })
    .finally(() => {
        // Reset button state
        checkoutBtn.textContent = originalText;
        checkoutBtn.disabled = false;
    });
}

// Debug function to test order process
function testOrderProcess() {
    console.log('Testing order process...');
    
    // Test cart data
    const testCart = [
        {
            id: 1,
            name: 'Test Product',
            price: 1000,
            quantity: 2,
            image: 'test.jpg'
        }
    ];
    
    // Test customer info
    const testCustomerInfo = {
        name: 'Test Customer',
        phone: '+923234890184',
        address: 'Test Address',
        email: 'test@example.com'
    };
    
    // Test order summary
    const testOrderSummary = {
        items: 'Test Product x2 - Rs. 2,000\n',
        total: 2000,
        orderNumber: 'KSM-TEST-' + Date.now()
    };
    
    console.log('Test data:', {
        cart: testCart,
        customerInfo: testCustomerInfo,
        orderSummary: testOrderSummary
    });
    
    // Test WhatsApp message
    const whatsappMessage = `🛒 *NEW ORDER* - ${testOrderSummary.orderNumber}%0A%0A👤 *Customer Details:*%0A• Name: ${testCustomerInfo.name}%0A• Phone: ${testCustomerInfo.phone}%0A• Address: ${testCustomerInfo.address}%0A• Email: ${testCustomerInfo.email}%0A%0A📦 *Order Details:*%0A${testOrderSummary.items}%0A💰 *Total Amount: Rs. ${testOrderSummary.total.toLocaleString()}*%0A%0A📅 Date: ${new Date().toLocaleDateString()}%0A⏰ Time: ${new Date().toLocaleTimeString()}`;
    
    console.log('WhatsApp message:', whatsappMessage);
    console.log('WhatsApp link:', `https://wa.me/+923234890184?text=${whatsappMessage}`);
    
    alert('Test completed! Check console for details.');
}

// Add test function to window for easy access
 