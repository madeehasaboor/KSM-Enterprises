// Main index.js file for Auto Champain E-commerce
// This file handles the main application logic

// Global variables
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    console.log('🚀 Auto Champain E-commerce initialized');
    setupEventListeners();
    loadProducts();
    updateCartCount();
    setupCategoryNavigation();
}

function setupEventListeners() {
    // Add navigation event listeners
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Handle navigation
            console.log('Navigation clicked:', this.href);
        });
    });
    
    // Add cart functionality
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');
    cartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            addToCart(this);
        });
    });
}

function setupCategoryNavigation() {
    // Setup category navigation if it exists
    const categoryButtons = document.querySelectorAll('.category-nav-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const categoryName = this.getAttribute('data-category') || this.textContent.toLowerCase().replace(/\s+/g, '-');
            showCategory(categoryName, this);
        });
    });
}

function loadProducts() {
    // Load products from products-data.js or API
    console.log('Loading Auto Champain products...');
}

function addToCart(button) {
    // Get product information from the button's parent element
    const productCard = button.closest('.product-card');
    if (!productCard) return;
    
    const productName = productCard.querySelector('h4')?.textContent || 'Product';
    const productPrice = parseInt(productCard.querySelector('.product-price')?.textContent.replace(/[^\d]/g, '')) || 0;
    const productImage = productCard.querySelector('img')?.src || '';
    const productDescription = productCard.querySelector('.product-description')?.textContent || '';
    
    const product = {
        id: Date.now() + Math.random(), // Generate unique ID
        name: productName,
        description: productDescription,
        price: productPrice,
        image: productImage,
        quantity: 1
    };
    
    // Check if product already exists in cart
    const existingProduct = cart.find(item => item.name === product.name);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show feedback
    showAddToCartFeedback(button);
}

function showAddToCartFeedback(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Added!';
    button.style.backgroundColor = '#28a745';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.backgroundColor = '';
    }, 1500);
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Category Navigation Functionality
function showCategory(categoryName, clickedButton) {
    // Get all category sections
    const categoryElements = document.querySelectorAll('.category-section');
    const navButtons = document.querySelectorAll('.category-nav-btn');
    
    // Remove active class from all buttons
    navButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
    
    if (categoryName === 'all') {
        // Show all categories
        categoryElements.forEach(section => {
            section.style.display = 'block';
        });
    } else {
        // Hide all categories first
        categoryElements.forEach(section => {
            section.style.display = 'none';
        });
        
        // Show only the selected category
        const selectedCategory = document.getElementById('category-' + categoryName);
        if (selectedCategory) {
            selectedCategory.style.display = 'block';
            
            // Smooth scroll to the category
            selectedCategory.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        addToCart,
        updateCartCount,
        showCategory,
        showNotification,
        showAddToCartFeedback
    };
} 