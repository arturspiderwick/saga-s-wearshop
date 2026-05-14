// 1. ÜRÜN VERİLERİ (ERKEK - TÜM KOLEKSİYONLAR)
const products = [
    { id: 1, name: "Premium Slim-Fit Polo", price: "899 TL", img: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=600&q=80" },
    { id: 2, name: "Keten Karışımlı Blazer", price: "2450 TL", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80" },
    { id: 3, name: "Klasik Chino Pantolon", price: "1450 TL", img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80" },
    { id: 4, name: "Minimalist Gri Sweatshirt", price: "1100 TL", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80" }
];

const summerProducts = [
    { id: 101, name: "Oversize Keten Gömlek", price: "950 TL", img: "https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?auto=format&fit=crop&w=600&q=80" },
    { id: 102, name: "Deniz Şortu - Pastel Mavi", price: "750 TL", img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80" },
    { id: 103, name: "Safari Model Şapka", price: "450 TL", img: "https://images.unsplash.com/photo-1575424909138-46b05e5919ec?auto=format&fit=crop&w=600&q=80" },
    { id: 104, name: "Yazlık Rahat Ayakkabı", price: "1200 TL", img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80" }
];

const classicProducts = [
    { id: 201, name: "İtalyan Kesim Takım Elbise", price: "5200 TL", img: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=600&q=80" },
    { id: 202, name: "Oxford Beyaz Gömlek", price: "1250 TL", img: "https://images.unsplash.com/photo-1621072156002-e2fcced0b176?auto=format&fit=crop&w=600&q=80" }, // Güncellendi
    { id: 203, name: "Deri Klasik Ayakkabı", price: "2100 TL", img: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80" },
    { id: 204, name: "İpek Kravat - Lacivert", price: "450 TL", img: "https://images.unsplash.com/photo-1589756823851-411590f8947b?auto=format&fit=crop&w=600&q=80" } // Güncellendi
];

let cart = [];

// 2. ÜRÜNLERİ SAYFAYA BASMA
function createProductCard(product, type) {
    return `
        <div class="product-card">
            <div class="img-container">
                <img src="${product.img}" alt="${product.name}" onerror="this.src='https://placehold.co/600x800?text=Gorsel+Bulunamadi'">
            </div>
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id}, '${type}')">Sepete Ekle</button>
        </div>
    `;
}

function displayProducts() {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;
    productGrid.innerHTML = ''; 
    products.forEach(product => {
        productGrid.innerHTML += createProductCard(product, 'main');
    });
}

// 3. KOLEKSİYON YÖNETİMİ
function openCollection(type) {
    const mainSection = document.getElementById('main-products');
    const heroSection = document.getElementById('main-hero');
    const collectionList = document.getElementById('koleksiyon');
    const summerDetail = document.getElementById('summer-2026-detail');
    const classicDetail = document.getElementById('classic-detail');
    
    // Her şeyi temizle/gizle
    [heroSection, mainSection, collectionList, summerDetail, classicDetail].forEach(el => {
        if(el) el.style.display = 'none';
    });

    if (type === 'summer') {
        const summerGrid = document.getElementById('summer-product-grid');
        if(summerGrid) {
            summerGrid.innerHTML = '';
            summerProducts.forEach(p => summerGrid.innerHTML += createProductCard(p, 'summer'));
        }
        if(summerDetail) summerDetail.style.display = 'block';
    } else if (type === 'classic') {
        const classicGrid = document.getElementById('classic-product-grid');
        if(classicGrid) {
            classicGrid.innerHTML = '';
            classicProducts.forEach(p => classicGrid.innerHTML += createProductCard(p, 'classic'));
        }
        if(classicDetail) classicDetail.style.display = 'block';
    }
    window.scrollTo(0, 0);
}

function openSummerCollection() { openCollection('summer'); }
function openClassicCollection() { openCollection('classic'); }

function closeCollection() {
    ['summer-2026-detail', 'classic-detail'].forEach(id => {
        const el = document.getElementById(id);
        if(el) el.style.display = 'none';
    });
    
    if(document.getElementById('main-hero')) document.getElementById('main-hero').style.display = 'flex';
    if(document.getElementById('main-products')) document.getElementById('main-products').style.display = 'block';
    if(document.getElementById('koleksiyon')) document.getElementById('koleksiyon').style.display = 'block';
}

// 4. SEPET İŞLEMLERİ
function addToCart(productId, type) {
    let source = products;
    if (type === 'summer') source = summerProducts;
    else if (type === 'classic') source = classicProducts;

    const product = source.find(p => p.id === productId);
    if (product) {
        cart.push({...product});
        updateCartUI();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const cartContainer = document.getElementById('cart-items-container');
    const cartCount = document.getElementById('cart-count');
    const totalPriceElement = document.getElementById('total-price');
    
    if (!cartContainer || !cartCount || !totalPriceElement) return;

    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += parseInt(item.price.replace(/[^\d]/g, '')); // Sadece rakamları al
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}" onerror="this.src='https://placehold.co/100x100?text=Yok'">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price}</p>
                    <small style="color:red; cursor:pointer" onclick="removeFromCart(${index})">Kaldır</small>
                </div>
            </div>
        `;
    });

    cartCount.innerText = cart.length;
    totalPriceElement.innerText = total + " TL";
}

// 5. PANEL VE MODAL KONTROLLERİ
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    if(sidebar) sidebar.classList.toggle('active');
    if(overlay) overlay.classList.toggle('active');
}

function openCheckout() {
    if (cart.length === 0) { alert("Sepetiniz boş!"); return; }
    const checkoutTotal = document.getElementById('checkout-total');
    const totalPrice = document.getElementById('total-price');
    if(checkoutTotal && totalPrice) checkoutTotal.innerText = totalPrice.innerText;
    
    const modal = document.getElementById('checkout-modal');
    if(modal) modal.style.display = "block";
    toggleCart(); 
}

function closeCheckout() {
    const modal = document.getElementById('checkout-modal');
    if(modal) modal.style.display = "none";
}

// Event Listeners (Global Kontrol)
window.onload = () => {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) cartIcon.onclick = toggleCart;

    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert("SİMÜLASYON BAŞARILI: Gerçek ödeme alınmadı.");
            cart = []; 
            updateCartUI(); 
            closeCheckout();
        });
    }
    displayProducts();
};