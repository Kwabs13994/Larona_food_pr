/* =========================
   CART SYSTEM (WITH SAVE)
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    let item = cart.find(i => i.name === name);
    if (item) {
        item.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    saveCart();
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems) return;

    cartItems.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;
        count += item.qty;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} x${item.qty} - GHS ${item.price * item.qty}
            <button onclick="removeItem(${index})">❌</button>
        `;
        cartItems.appendChild(li);
    });

    cartCount.textContent = count;
    cartTotal.textContent = total;
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

function clearCart() {
    cart = [];
    saveCart();
    updateCart();
}

function toggleCart() {
    document.getElementById("cart").classList.toggle("open");
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {
    document.querySelector("nav").classList.toggle("show");
}

/* =========================
   HERO SLIDESHOW
========================= */

let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlides() {
    slides.forEach(s => s.classList.remove("active"));
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add("active");
}

setInterval(showSlides, 3000);

/* =========================
   WHATSAPP CHECKOUT
========================= */

function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    let message = "Hello, I want to order:%0A";
    let total = 0;

    cart.forEach(item => {
        message += `${item.name} x${item.qty} = GHS ${item.price * item.qty}%0A`;
        total += item.price * item.qty;
    });

    message += `%0ATotal: GHS ${total}`;

    window.open(`https://wa.me/233548896708?text=${message}`, "_blank");
}

/* INIT */
updateCart();
