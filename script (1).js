// Sample products data
const products = [
    { id: 1, name: 'Pizza Margherita', price: 12.99, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=150&fit=crop' },
    { id: 2, name: 'Burger Deluxe', price: 9.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=150&fit=crop' },
    { id: 3, name: 'Sushi Roll', price: 15.99, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&h=150&fit=crop' },
    { id: 4, name: 'Pasta Carbonara', price: 11.99, image: 'https://images.unsplash.com/photo-1551892370-c80a18e2e24d?w=200&h=150&fit=crop' },
    { id: 5, name: 'Sayap Ayam', price: 8.99, image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=200&h=150&fit=crop' },
    { id: 6, name: 'Es Krim Sundae', price: 5.99, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=200&h=150&fit=crop' }
];

// Cart data stored in localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM elements
const productGrid = document.getElementById('product-grid');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const cartToggle = document.getElementById('cart-toggle');
const cartSection = document.getElementById('cart');
const checkoutSection = document.getElementById('checkout');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutForm = document.getElementById('checkout-form');

// Render products
function renderProducts() {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <input type="number" min="1" value="1" id="qty-${product.id}">
            <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
        `;
        productGrid.appendChild(productDiv);
    });
}

// Add to cart
function addToCart(productId) {
    const quantity = parseInt(document.getElementById(`qty-${productId}`).value);
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    saveCart();
    updateCartDisplay();
    updateCartCount();
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
    updateCartCount();
}

// Update cart display
function updateCartDisplay() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <span>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${item.id})">Hapus</button>
        `;
        cartItems.appendChild(itemDiv);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Toggle cart visibility
cartToggle.addEventListener('click', () => {
    cartSection.classList.toggle('hidden');
    checkoutSection.classList.add('hidden');
});

// Proceed to checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong!');
        return;
    }
    cartSection.classList.add('hidden');
    checkoutSection.classList.remove('hidden');
});

// Handle checkout form submission
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Pembelian berhasil diselesaikan!');
    cart = [];
    saveCart();
    updateCartDisplay();
    updateCartCount();
    checkoutSection.classList.add('hidden');
    cartSection.classList.remove('hidden');
});

// Initialize
renderProducts();
updateCartDisplay();
updateCartCount();
