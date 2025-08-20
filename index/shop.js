// Comprehensive Shop functionality with all products
let products = [
    // Formula 1 Products
    {
        id: 1,
        name: "Formula 1 Car Wash",
        price: 850,
        category: "formula1",
        image: "../products/1.jpeg",
        description: "Professional car wash solution for superior cleaning and shine",
        volume: "1 Liter"
    },
    {
        id: 2,
        name: "Formula 1 Wax",
        price: 950,
        category: "formula1",
        image: "../products/4.jpeg",
        description: "Premium car wax protection with long-lasting shine and protection",
        volume: "500ml"
    },
    {
        id: 3,
        name: "Formula 1 Protectant Spray",
        price: 425,
        category: "formula1",
        image: "../products/CAR PROCTING SPRAYS/formulla 1 protectant spray 295ml.jpeg",
        description: "Shines, protects & freshens with Cherry Fragrance",
        volume: "295ml"
    },
    {
        id: 4,
        name: "Formula 1 Interior Cleaner",
        price: 650,
        category: "formula1",
        image: "../products/photo (10).jpeg",
        description: "Complete interior cleaning and protection solution",
        volume: "500ml"
    },
    {
        id: 5,
        name: "Formula 1 Tire Shine",
        price: 550,
        category: "formula1",
        image: "../products/photo (11).jpeg",
        description: "Professional tire dressing for showroom finish",
        volume: "400ml"
    },

    // AIM Car Care Products
    {
        id: 6,
        name: "AIM Car Polish",
        price: 1200,
        category: "aim",
        image: "../products/2.jpeg",
        description: "High-quality car polish for showroom finish and protection",
        volume: "500ml"
    },
    {
        id: 7,
        name: "AIM Interior Cleaner",
        price: 750,
        category: "aim",
        image: "../products/5.jpeg",
        description: "Professional interior cleaning solution for all surfaces",
        volume: "500ml"
    },
    {
        id: 8,
        name: "AIM Microfiber Towel Pack",
        price: 650,
        category: "aim",
        image: "../products/MICRO FIBER CLOTHES/MICROFIBER TOWEL PACK OF 4.jpeg",
        description: "Value Pack! Pack of 4 - High Performance Microfiber Towels",
        volume: "4 Pack"
    },
    {
        id: 9,
        name: "AIM Tire Gel",
        price: 550,
        category: "aim",
        image: "../products/CAR POLISH & SHINNERS/aim tire gel 500ml.jpeg",
        description: "Moistening, lustrous, durable - Creates long lasting high gloss wet look",
        volume: "500ml"
    },
    {
        id: 10,
        name: "AIM Glass Cleaner",
        price: 450,
        category: "aim",
        image: "../products/photo (12).jpeg",
        description: "Streak-free glass cleaning solution for crystal clear visibility",
        volume: "500ml"
    },
    {
        id: 11,
        name: "AIM Dashboard Polish",
        price: 600,
        category: "aim",
        image: "../products/photo (13).jpeg",
        description: "Professional dashboard cleaning and protection",
        volume: "400ml"
    },

    // WD-40 Products
    {
        id: 12,
        name: "WD-40 Multi-Purpose",
        price: 450,
        category: "wd40",
        image: "../products/3.jpeg",
        description: "Versatile lubricant and cleaner for multiple uses",
        volume: "200ml"
    },
    {
        id: 13,
        name: "WD-40 Specialist",
        price: 550,
        category: "wd40",
        image: "../products/photo (6).jpeg",
        description: "Specialized cleaning formula for tough jobs",
        volume: "300ml"
    },
    {
        id: 14,
        name: "WD-40 Multi-Function Product",
        price: 450,
        category: "wd40",
        image: "../products/1.jpeg",
        description: "Eliminates squeaks, displaces moisture, cleans & protects",
        volume: "200ml"
    },
    {
        id: 15,
        name: "WD-40 Contact Cleaner",
        price: 650,
        category: "wd40",
        image: "../products/photo (14).jpeg",
        description: "Precision cleaning for electrical contacts and components",
        volume: "250ml"
    },

    // DTR Products
    {
        id: 16,
        name: "DTR Engine Cleaner",
        price: 800,
        category: "dtr",
        image: "../products/photo (15).jpeg",
        description: "Professional engine cleaning and degreasing solution",
        volume: "500ml"
    },
    {
        id: 17,
        name: "DTR Brake Cleaner",
        price: 600,
        category: "dtr",
        image: "../products/photo (16).jpeg",
        description: "High-performance brake system cleaner and degreaser",
        volume: "400ml"
    },
    {
        id: 18,
        name: "DTR Contact Cleaner",
        price: 450,
        category: "dtr",
        image: "../products/photo (17).jpeg",
        description: "Precision cleaning for electrical contacts and sensitive components",
        volume: "200ml"
    },
    {
        id: 19,
        name: "DTR Carburetor Cleaner",
        price: 550,
        category: "dtr",
        image: "../products/photo (18).jpeg",
        description: "Professional carburetor cleaning and maintenance solution",
        volume: "300ml"
    },

    // Areon Products
    {
        id: 20,
        name: "Areon Air Freshener",
        price: 350,
        category: "areon",
        image: "../products/photo (20).jpeg",
        description: "Long-lasting car air freshener with pleasant fragrance",
        volume: "100ml"
    },
    {
        id: 21,
        name: "Areon Interior Spray",
        price: 400,
        category: "areon",
        image: "../products/photo (21).jpeg",
        description: "Interior freshening and deodorizing spray",
        volume: "150ml"
    },
    {
        id: 22,
        name: "Areon Fabric Freshener",
        price: 450,
        category: "areon",
        image: "../products/photo (22).jpeg",
        description: "Fabric freshening and odor elimination spray",
        volume: "200ml"
    },

    // Premium Bundles
    {
        id: 23,
        name: "Complete Car Care Kit",
        price: 2500,
        category: "bundles",
        image: "../Complete Car Care Kit.jpg",
        description: "Professional grade car care solution for complete vehicle maintenance",
        volume: "Complete Kit"
    },
    {
        id: 24,
        name: "Premium Detailing Kit",
        price: 3200,
        category: "bundles",
        image: "../Premium Detailing Kit.jpg",
        description: "Ultimate detailing solution for showroom finish results",
        volume: "Premium Kit"
    },
    {
        id: 25,
        name: "Engine Care Combo",
        price: 1800,
        category: "bundles",
        image: "../Engine Care Combo.jpg",
        description: "Complete engine maintenance and protection package",
        volume: "Engine Kit"
    },
    {
        id: 26,
        name: "Interior Care Package",
        price: 1500,
        category: "bundles",
        image: "../Interior Care Package.jpg",
        description: "Comprehensive interior cleaning and protection solution",
        volume: "Interior Kit"
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize shop
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    updateCartCount();
});

function displayProducts(productsToShow) {
    const container = document.getElementById('shopProducts');
    container.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/320x250?text=Product'">
        <div class="product-info">
            <h3>${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">Rs. ${product.price.toLocaleString()}</p>
            <p class="product-volume">${product.volume}</p>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
        </div>
    `;
    
    return card;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const filteredProducts = category ? products.filter(p => p.category === category) : products;
    displayProducts(filteredProducts);
}

function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.description.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
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