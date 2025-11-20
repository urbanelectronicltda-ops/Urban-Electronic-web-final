// script.js

// Usar la variable PRODUCTS si existe (cargada desde products.js)
const products = window.PRODUCTS || [];
const imageModal = document.getElementById("imageModal");
const closeImageModalBtn = document.getElementById("closeImageModal");
const modalImage = document.getElementById("modalImage");
const imageModalTitle = document.getElementById("imageModalTitle");
const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearch");
const categoryButtons = Array.from(document.querySelectorAll(".category-btn"));
const resultsInfo = document.getElementById("resultsInfo");
const infoModal = document.getElementById("infoModal");
const closeInfoFormBtn = document.getElementById("closeInfoForm");
const cartDrawer = document.getElementById("cartDrawer");
const cartListEl = document.getElementById("cartList");
const cartTotalEl = document.getElementById("cartTotal");
const closeCartBtn = document.getElementById("closeCart");
const btnNequi = document.getElementById("btnNequi");
const googleLoginBtn = document.getElementById("googleLoginBtn");
// Apuntando a los nuevos elementos del header
const cartToggle = document.getElementById("headerCartButton"); 
const cartCountEl = document.getElementById("headerCartBadge"); 
const openInfoFormBtn = document.getElementById("openInfoFormBtn"); // Botón de Solicitar Info
const loginBtn = document.getElementById("loginBtn"); // NUEVO Botón de Iniciar Sesión

// Toast utils
let toastContainer = null;
function ensureToastContainer() {
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.className = "toast-container";
        document.body.appendChild(toastContainer);
    }
    return toastContainer;
}
function showToast(message, duration = 2200) {
    const container = ensureToastContainer();
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    container.appendChild(toast);
    const remove = () => {
        if (!toast.isConnected) return;
        toast.style.transition = "opacity 160ms ease, transform 160ms ease";
        toast.style.opacity = "0";
        toast.style.transform = "translateY(6px)";
        setTimeout(() => toast.remove(), 180);
    };
    setTimeout(remove, duration);
    toast.addEventListener("click", remove);
}

// Utilidades
const formatCOP = (value) =>
    value.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

// Overrides de imágenes por producto/slide (para la función de doble clic)
let imageOverrides = JSON.parse(localStorage.getItem("imageOverrides") || "{}");
const saveImageOverrides = () => localStorage.setItem("imageOverrides", JSON.stringify(imageOverrides));
const getImageFor = (id, fallback) => imageOverrides[id] || fallback;

function createProductCard(p) {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
    <div class="product-image-wrap">
        <img class="product-image" data-pid="${p.id}" src="${getImageFor(p.id, p.image)}" alt="${p.name}" loading="lazy">
    </div>
    <div class="product-info">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-meta">
        <span class="product-price">${formatCOP(p.price)}</span>
        <span class="product-tag">${capitalize(p.category)}</span>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
        <button class="btn add-to-cart" data-id="${p.id}">Comprar</button>
        </div>
    </div>
    `;
    return card;
}

function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function renderProducts(list) {
    if (!productsGrid) return;
    productsGrid.innerHTML = "";
    if (!list.length) {
        const empty = document.createElement("div");
        empty.style.gridColumn = "1/-1";
        empty.style.color = "#5a6472";
        empty.textContent = "No se encontraron productos con los filtros aplicados.";
        productsGrid.appendChild(empty);
        return;
    }
    const fragment = document.createDocumentFragment();
    list.forEach(p => fragment.appendChild(createProductCard(p)));
    productsGrid.appendChild(fragment);
}

// Filtros
let activeCategory = "todos";
let searchTerm = "";

function applyFilters() {
    let filtered = products.slice();

    if (activeCategory !== "todos") {
        filtered = filtered.filter(p => p.category === activeCategory);
    }
    if (searchTerm.trim()) {
        const q = searchTerm.trim().toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.desc.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        );
    }

    renderProducts(filtered);

    const catLabel = activeCategory === "todos" ? "todos los productos" : `categoría: ${capitalize(activeCategory)}`;
    const searchLabel = searchTerm.trim() ? ` | búsqueda: "${searchTerm.trim()}"` : "";
    if (resultsInfo) {
        resultsInfo.textContent = `Mostrando ${catLabel}${searchLabel} (${filtered.length})`;
    }
}

// Eventos de Categorías (solo si estamos en la página del catálogo)
if (productsGrid) {
    categoryButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            categoryButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeCategory = btn.dataset.category;
            applyFilters();
        });
    });
}

// Debounce para el buscador
let debounceTimer = null;
searchInput?.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        searchTerm = searchInput.value;
        applyFilters(); // Ahora siempre filtra, ya que todo está en una página
    }, 150);
});

clearSearchBtn?.addEventListener("click", () => {
    searchInput.value = "";
    searchTerm = "";
    if (productsGrid) {
        applyFilters();
    }
});


// Eventos de botones de formulario y modales
document.getElementById("contactForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Gracias por contactarnos. Te responderemos pronto.");
});

// Evento para el botón "Solicitar Información"
openInfoFormBtn?.addEventListener("click", () => {
    infoModal.classList.add("open");
    infoModal.setAttribute("aria-hidden", "false");
});

// Evento para el nuevo botón "Iniciar Sesión"
loginBtn?.addEventListener("click", () => {
    // --- script.js ---

// 1. DEFINICIÓN DE VARIABLES (Agrégalas al inicio junto con las otras const)
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeLoginBtn = document.getElementById("closeLogin");
const loginForm = document.getElementById("loginForm");

// 2. LÓGICA DEL LOGIN (Pega esto donde manejas los eventos, reemplazando el alert anterior)

// Abrir modal al hacer clic en "Iniciar Sesión"
loginBtn?.addEventListener("click", () => {
    // Si ya está logueado (simulado), cerramos sesión
    if (loginBtn.classList.contains("is-logged-in")) {
        const confirmLogout = confirm("¿Deseas cerrar sesión?");
        if (confirmLogout) {
            loginBtn.innerHTML = "👤 Iniciar Sesión";
            loginBtn.classList.remove("is-logged-in");
            showToast("Sesión cerrada correctamente");
        }
        return;
    }
    // Si no, abrimos modal
    loginModal.classList.add("open");
    loginModal.setAttribute("aria-hidden", "false");
});

// Cerrar modal
closeLoginBtn?.addEventListener("click", () => {
    loginModal.classList.remove("open");
    loginModal.setAttribute("aria-hidden", "true");
});

// Cerrar al dar clic fuera
loginModal?.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal__backdrop")) {
        loginModal.classList.remove("open");
        loginModal.setAttribute("aria-hidden", "true");
    }
});

// PROCESAR EL LOGIN (Simulación)
loginForm?.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que la página se recargue
    
    const email = document.getElementById("loginEmail").value;
    // Aquí podrías validar contraseña real si tuvieras backend
    
    if (email) {
        // Simular éxito
        showToast(`¡Bienvenido, ${email.split('@')[0]}!`);
        
        // Cambiar el botón del header
        loginBtn.innerHTML = `👤 Hola, ${email.split('@')[0]}`;
        loginBtn.classList.add("is-logged-in");
        
        // Cerrar modal
        loginModal.classList.remove("open");
        loginModal.setAttribute("aria-hidden", "true");
        
        // Limpiar formulario
        loginForm.reset();
    }
});
});

googleLoginBtn?.addEventListener("click", () => {
    // Simulamos un tiempo de espera como si conectara con Google
    const originalText = googleLoginBtn.innerHTML;
    googleLoginBtn.innerHTML = "Conectando...";
    
    setTimeout(() => {
        // Simular éxito
        showToast("¡Sesión iniciada con Google!");
        
        // Cambiar el botón del header usando un nombre simulado
        // (En una app real, Google te daría el nombre del usuario)
        if(loginBtn) {
            loginBtn.innerHTML = `👤 Hola, Usuario Google`;
            loginBtn.classList.add("is-logged-in");
        }

        // Cerrar modal
        if(loginModal) {
            loginModal.classList.remove("open");
            loginModal.setAttribute("aria-hidden", "true");
        }

        // Restaurar texto del botón por si se vuelve a abrir
        googleLoginBtn.innerHTML = originalText;
        
    }, 1000); // 1 segundo de "carga"
});

closeInfoFormBtn?.addEventListener("click", () => {
    infoModal.classList.remove("open");
    infoModal.setAttribute("aria-hidden", "true");
});

infoModal?.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal__backdrop")) {
        infoModal.classList.remove("open");
        infoModal.setAttribute("aria-hidden", "true");
    }
});

document.getElementById("infoForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Solicitud enviada. Te contactaremos pronto.");
    infoModal.classList.remove("open");
    infoModal.setAttribute("aria-hidden", "true");
});

// Inicialización del catálogo
if (productsGrid) {
    renderProducts(products);
    applyFilters();
}

// Carrito
let cart = JSON.parse(localStorage.getItem("cart") || "[]");
const saveCart = () => localStorage.setItem("cart", JSON.stringify(cart));
const getById = (id) => products.find(p => p.id == id) || cart.find(i => i.id == id && i.price);

function addToCart(id) {
    const numId = Number(id);
    const item = cart.find(i => i.id == numId);
    if (item) {
        item.qty++;
    } else {
        cart.push({ id: numId, qty: 1 });
    }
    saveCart();
    renderCart();
    showToast(`${getById(numId).name} agregado al carrito`);
}

function addCustomToCart(item) {
    const { id, name, price } = item;
    const found = cart.find(i => i.id === id);
    if (found) {
        found.qty++;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }
    saveCart();
    renderCart();
    showToast(`${name} agregado al carrito`);
}

function changeQty(id, d) {
    const i = cart.find(i => i.id == id);
    if (!i) return;
    i.qty += d;
    if (i.qty <= 0) cart = cart.filter(x => x.id != id);
    saveCart();
    renderCart();
}

function renderCart() {
    if (cartCountEl) {
        cartCountEl.textContent = cart.reduce((a, b) => a + b.qty, 0);
    }

    if (!cartListEl) return;
    cartListEl.innerHTML = cart.length ? "" : "Tu carrito está vacío.";
    let total = 0;
    cart.forEach(c => {
        const p = getById(c.id);
        if (!p) return;
        total += p.price * c.qty;
        const row = document.createElement("div");
        row.className = "cart-item";
        row.innerHTML = `<span>${p.name}</span><span>${formatCOP(p.price)}</span><div><button class="btn qty" data-id="${c.id}" data-d="-1">-</button><span>${c.qty}</span><button class="btn qty" data-id="${c.id}" data-d="1">+</button></div><button class="btn remove" data-id="${c.id}">Eliminar</button>`;
        cartListEl.appendChild(row);
    });
    if (cartTotalEl) cartTotalEl.textContent = formatCOP(total);
}

productsGrid?.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-to-cart");
    const img = e.target.closest(".product-image"); // Nuevo: detectar clic en la imagen
    
    if (btn) {
        addToCart(btn.dataset.id);
    } else if (img) { // Si se hizo clic en una imagen de producto
        openImageModal(img.src, img.alt);
    }
});

cartListEl?.addEventListener("click", (e) => {
    const q = e.target.closest(".qty");
    const r = e.target.closest(".remove");
    const id = q?.dataset.id || r?.dataset.id;
    if (q) {
        changeQty(id, Number(q.dataset.d));
    }
    if (r) {
        changeQty(id, -9999);
    }
});

cartToggle?.addEventListener("click", () => {
    cartDrawer.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    renderCart();
});

closeCartBtn?.addEventListener("click", () => {
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
});

cartDrawer?.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal__backdrop")) {
        cartDrawer.classList.remove("open");
        cartDrawer.setAttribute("aria-hidden", "true");
    }
});

document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    if (!cart.length) {
        alert("Tu carrito está vacío.");
        return;
    }
});

btnNequi?.addEventListener("click", function () {
    const qr = document.getElementById("qrNequi");
    if (qr) {
        qr.style.display = qr.style.display === "none" ? "block" : "none";
    }
});


// Discount slider (descuento.html)
(function initDiscountSlider() {
    const slider = document.querySelector("#descuento .discount-slider");
    if (!slider) return;

    slider.querySelectorAll("img[data-discount-id]").forEach(img => {
        const k = img.dataset.discountId; img.src = getImageFor(k, img.src);
    });

    const track = slider.querySelector(".slider-track");
    const slides = Array.from(slider.querySelectorAll(".slide"));
    const btnPrev = slider.querySelector(".slider-btn.prev");
    const btnNext = slider.querySelector(".slider-btn.next");
    const dotsWrap = slider.querySelector(".slider-dots");
    let index = 0;

    if (slides.length === 0) return;

    slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "slider-dot" + (i === 0 ? " active" : "");
        dot.setAttribute("aria-label", `Ir al slide ${i + 1}`);
        dot.addEventListener("click", () => goTo(i));
        dotsWrap.appendChild(dot);
    });

    function update() {
        track.style.transform = `translateX(-${index * 100}%)`;
        const dots = Array.from(dotsWrap.children);
        dots.forEach((d, i) => d.classList.toggle("active", i === index));
    }

    function goTo(i) {
        index = (i + slides.length) % slides.length;
        update();
    }

    btnPrev.addEventListener("click", () => goTo(index - 1));
    btnNext.addEventListener("click", () => goTo(index + 1));

    let autoplay = setInterval(() => goTo(index + 1), 5000);
    slider.addEventListener("mouseenter", () => { clearInterval(autoplay); });
    slider.addEventListener("mouseleave", () => { autoplay = setInterval(() => goTo(index + 1), 5000); });

    window.addEventListener("resize", update);
    update();
})();

// Doble clic en cualquier imagen para cambiar URL y guardar
document.addEventListener("dblclick", (e) => {
    const img = e.target.closest("img[data-pid], img[data-discount-id]");
    if (!img) return;
    const key = img.dataset.pid || img.dataset.discountId;
    const url = prompt("Pega la URL de la imagen:", imageOverrides[key] || img.src);
    if (url) { imageOverrides[key] = url; saveImageOverrides(); img.src = url; showToast("Imagen actualizada"); }
});

// --- script.js (Reemplazar el listener del slider de descuentos) ---

document.querySelector("#descuento .discount-slider")?.addEventListener("click", (e) => {
    // 1. Lógica para el botón "Comprar"
    const btn = e.target.closest(".buy-discount");
    if (btn) {
        addCustomToCart({ 
            id: btn.dataset.id, 
            name: btn.dataset.name, 
            price: Number(btn.dataset.price) 
        });
        return; // Terminamos aquí si fue un botón
    }

    // 2. Lógica para la Imagen (NUEVO)
    const img = e.target.closest(".slide-media img");
    if (img) {
        // Usamos la misma función que creamos para el catálogo
        openImageModal(img.src, img.alt || "Oferta especial");
    }
});

// Cargar el estado inicial del carrito (contador) al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

// Función para abrir el modal de imagen
function openImageModal(src, alt) {
    modalImage.src = src;
    modalImage.alt = alt;
    imageModalTitle.textContent = alt; // Establecer el título del modal
    imageModal.classList.add("open");
    imageModal.setAttribute("aria-hidden", "false");
}

// Cerrar el modal de imagen al hacer clic en el botón
closeImageModalBtn?.addEventListener("click", () => {
    imageModal.classList.remove("open");
    imageModal.setAttribute("aria-hidden", "true");
});

// Cerrar el modal de imagen al hacer clic en el backdrop
imageModal?.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal__backdrop")) {
        imageModal.classList.remove("open");
        imageModal.setAttribute("aria-hidden", "true");
    }
});