// Auto Champain Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', function() {
    displayCart();
    updateCartCount();
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
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your Auto Champain cart is empty!');
        return;
    }
    
    // Show customer form if not already visible
    const customerForm = document.getElementById('customerForm');
    if (customerForm && customerForm.style.display === 'none') {
        customerForm.style.display = 'block';
    }
    
    // Create order summary
    const orderSummary = createOrderSummary();
    console.log('Auto Champain Order Summary:', orderSummary);
}

function createOrderSummary() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    return {
        items: cart,
        totalItems: totalItems,
        totalAmount: totalAmount,
        orderDate: new Date().toISOString(),
        company: 'Auto Champain'
    };
} 