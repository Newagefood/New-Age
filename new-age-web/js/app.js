/* ==========================================================================
   NEW AGE - PREMIUM NUTRITION
   LÓGICA JAVASCRIPT PRINCIPAL
   ========================================================================== */

// Base de Datos de Productos
const productsData = {
    "proteina": {
        id: "proteina",
        name: "Proteína New Age",
        subtitle: "Premium Adult Protein",
        price: 40000,
        image: "assets/images/protein_new_age.jpg",
        theme: "blue",
        description: "Suplemento alimentario premium a base de proteína de suero de leche de alta pureza (Whey Protein), enriquecido con calcio, vitamina D y magnesio. Diseñado científicamente para prevenir la pérdida de masa muscular (sarcopenia), acelerar la recuperación física y mejorar la vitalidad y fuerza diaria en adultos y adultos mayores.",
        nutrition: [
            { component: "Energía", unit: "kcal", per100g: "309", perPortion: "142", ddr: "" },
            { component: "Proteína", unit: "g", per100g: "39,3", perPortion: "18,1", ddr: "" },
            { component: "Grasa total", unit: "g", per100g: "4,5", perPortion: "2,1", ddr: "" },
            { component: "Hidratos de carbono", unit: "g", per100g: "27,7", perPortion: "12,8", ddr: "" },
            { component: "Azúcares", unit: "g", per100g: "5,6", perPortion: "2,6", ddr: "" },
            { component: "Fibra", unit: "g", per100g: "8,4", perPortion: "3,9", ddr: "" },
            { component: "Sodio", unit: "mg", per100g: "84", perPortion: "38,8", ddr: "" },
            { component: "Carbonato de calcio", unit: "mg", per100g: "2.389", perPortion: "1.100", ddr: "" },
            { component: "Calcio elemental", unit: "mg", per100g: "957", perPortion: "440", ddr: "55,1%", isSub: true },
            { component: "Citrato de potasio", unit: "mg", per100g: "824", perPortion: "380", ddr: "" },
            { component: "Citrato de Magnesio", unit: "mg", per100g: "1.412", perPortion: "650", ddr: "" },
            { component: "Magnesio elemental", unit: "mg", per100g: "219", perPortion: "101", ddr: "33,6%", isSub: true },
            { component: "Vitamina C", unit: "mg", per100g: "130", perPortion: "60", ddr: "100%" },
            { component: "Sulfato de zinc", unit: "mg", per100g: "98", perPortion: "45", ddr: "" },
            { component: "Zinc elemental", unit: "mg", per100g: "21", perPortion: "9", ddr: "63%", isSub: true },
            { component: "Vitamina E", unit: "mg", per100g: "22", perPortion: "10", ddr: "50%" },
            { component: "Fumarato ferroso", unit: "mg", per100g: "39", perPortion: "18", ddr: "" },
            { component: "Hierro elemental", unit: "mg", per100g: "13", perPortion: "6", ddr: "42,3%", isSub: true },
            { component: "Vitamina A", unit: "mcg", per100g: "1.085", perPortion: "500", ddr: "62,5%" },
            { component: "Vitamina B9", unit: "mcg", per100g: "434", perPortion: "200", ddr: "100%" },
            { component: "Selenito de Sodio", unit: "mcg", per100g: "87", perPortion: "40", ddr: "" },
            { component: "Selenio elemental", unit: "mcg", per100g: "40", perPortion: "18", ddr: "0,3%", isSub: true },
            { component: "Vitamina D3", unit: "mcg", per100g: "16", perPortion: "8", ddr: "150%" },
            { component: "Vitamina B12", unit: "mcg", per100g: "5", perPortion: "2", ddr: "240%" }
        ]
    },
    "creatina": {
        id: "creatina",
        name: "Creatina New Age",
        subtitle: "100% Pure Micronized Creatine",
        price: 20000,
        image: "assets/images/creatine_new_age.jpg",
        theme: "green",
        description: "Creatina monohidratada de máxima pureza con proceso de micronización para una disolución óptima y fácil digestión. Científicamente comprobada para incrementar la fuerza física, mejorar el rendimiento cognitivo, proporcionar energía celular rápida y actuar como un potente apoyo contra el deterioro muscular relacionado con la edad.",
        nutrition: [
            { component: "Energía", unit: "kcal", per100g: "0", perPortion: "0", ddr: "0%" },
            { component: "Proteína", unit: "g", per100g: "0", perPortion: "0", ddr: "0%" },
            { component: "Grasa total", unit: "g", per100g: "0", perPortion: "0", ddr: "0%" },
            { component: "Grasas saturadas", unit: "g", per100g: "0", perPortion: "0", ddr: "0%", isSub: true },
            { component: "Hidratos de carbono", unit: "g", per100g: "0", perPortion: "0", ddr: "0%" },
            { component: "Azúcares totales", unit: "g", per100g: "0", perPortion: "0", ddr: "0%", isSub: true },
            { component: "Sodio", unit: "mg", per100g: "0", perPortion: "0", ddr: "0%" },
            { component: "Creatina monohidratada", unit: "mg", per100g: "100.000", perPortion: "5.000", ddr: "+" }
        ]
    }
};

// Estado Global del Carrito
let cart = JSON.parse(localStorage.getItem('new_age_cart')) || [];

// Inicialización de la Aplicación
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollReveal();
    initProductTabs();
    initCart();
    initProductModals();
    updateCartUI();
});

/* --------------------------------------------------------------------------
   NAVEGACIÓN Y RESPONSIVIDAD
   -------------------------------------------------------------------------- */
function initNavigation() {
    const header = document.querySelector('.header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Header al hacer Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Toggle Menú Móvil
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            // Animación del ícono
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('open') ? 'rotate(45deg) translate(6px, 6px)' : 'none';
            spans[1].style.opacity = navMenu.classList.contains('open') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : 'none';
        });
    }

    // Cerrar Menú al clickear un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                // Reset ícono
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
}

/* --------------------------------------------------------------------------
   ANIMACIONES DE SCROLL (REVEAL)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });
}

/* --------------------------------------------------------------------------
   PESTAÑAS DE PRODUCTOS (TABS)
   -------------------------------------------------------------------------- */
function initProductTabs() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const tabButtons = card.querySelectorAll('.tab-btn');
        const tabPanes = card.querySelectorAll('.tab-pane');

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');

                // Quitar clase activa de todos los botones y paneles en ESTA tarjeta
                tabButtons.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

                // Añadir clase activa al botón y panel seleccionado
                btn.classList.add('active');
                card.querySelector(`.tab-pane[data-pane="${targetTab}"]`).classList.add('active');
            });
        });
    });
}

/* --------------------------------------------------------------------------
   LÓGICA DEL CARRITO DE COMPRAS
   -------------------------------------------------------------------------- */
function initCart() {
    const cartTrigger = document.getElementById('cart-trigger');
    const cartBackdrop = document.getElementById('cart-backdrop');
    const cartClose = document.getElementById('cart-close');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const checkoutBtn = document.getElementById('cart-checkout');

    // Abrir Carrito
    if (cartTrigger && cartBackdrop) {
        cartTrigger.addEventListener('click', () => {
            cartBackdrop.classList.add('open');
        });
    }

    // Cerrar Carrito (Backdrop y Botón Cerrar)
    if (cartBackdrop && cartClose) {
        cartClose.addEventListener('click', () => {
            cartBackdrop.classList.remove('open');
        });
        
        cartBackdrop.addEventListener('click', (e) => {
            if (e.target === cartBackdrop) {
                cartBackdrop.classList.remove('open');
            }
        });
    }

    // Botones de Añadir al Carrito desde el Catálogo
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = btn.getAttribute('data-id');
            addToCart(productId);
            
            // Animación temporal en el botón
            const originalText = btn.innerHTML;
            btn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ¡Añadido!
            `;
            btn.style.opacity = '0.9';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
            }, 1500);

            // Abrir el carrito automáticamente para mejorar experiencia de conversión
            setTimeout(() => {
                cartBackdrop.classList.add('open');
            }, 500);
        });
    });

    // Botón de Checkout por WhatsApp
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            sendWhatsAppOrder();
        });
    }
}

// Agregar producto
function addToCart(productId) {
    const product = productsData[productId];
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            subtitle: product.subtitle,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
}

// Remover producto
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

// Modificar cantidad
function changeQuantity(productId, amount) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartUI();
    }
}

// Guardar en LocalStorage
function saveCart() {
    localStorage.setItem('new_age_cart', JSON.stringify(cart));
}

// Formatear precio en CLP (ej: $40.000)
function formatCLP(value) {
    return '$' + value.toLocaleString('es-CL');
}

// Actualizar Interfaz del Carrito
function updateCartUI() {
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalElement = document.getElementById('cart-total');
    const cartFooter = document.getElementById('cart-footer');

    // Calcular totales
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;
    });

    // Actualizar insignias del Header
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
        cartCountElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartCountElement.style.transform = 'scale(1)';
        }, 200);
    }

    // Renderizar artículos
    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="cart-empty">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <p>Tu carrito está vacío</p>
                </div>
            `;
            if (cartFooter) cartFooter.style.display = 'none';
        } else {
            if (cartFooter) cartFooter.style.display = 'flex';
            
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <div class="cart-item-price">${formatCLP(item.price)} c/u</div>
                        <div class="cart-item-actions">
                            <div class="qty-control">
                                <button class="qty-btn" onclick="changeQuantity('${item.id}', -1)">-</button>
                                <span class="qty-val">${item.quantity}</span>
                                <button class="qty-btn" onclick="changeQuantity('${item.id}', 1)">+</button>
                            </div>
                            <button class="item-remove" onclick="removeFromCart('${item.id}')">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                                Quitar
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Actualizar total monetario
    if (cartTotalElement) {
        cartTotalElement.textContent = formatCLP(totalPrice);
    }
}

// Generar pedido de WhatsApp
function sendWhatsAppOrder() {
    if (cart.length === 0) return;

    let total = 0;
    let orderDetail = "";

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        orderDetail += `• *${item.quantity}x ${item.name}* (${item.subtitle}) - ${formatCLP(itemTotal)}\n`;
    });

    const formattedMessage = 
`🇨🇱 *¡Hola New Age!* Me gustaría realizar un pedido de suplementos a través de la web:

🛒 *DETALLE DE LA COMPRA:*
----------------------------------------
${orderDetail}----------------------------------------
💰 *TOTAL PEDIDO:* ${formatCLP(total)}

📍 Deseo coordinar el pago por transferencia y la entrega/despacho a mi dirección. ¿Me podrían indicar los datos bancarios?

🌐 _Pedido generado desde newagefood.cl_`;

    const encodedMessage = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/56928498190?text=${encodedMessage}`;
    
    // Abrir enlace en pestaña nueva
    window.open(whatsappUrl, '_blank');
}

/* --------------------------------------------------------------------------
   MODAL DE PRODUCTOS (VISTA RÁPIDA)
   -------------------------------------------------------------------------- */
function initProductModals() {
    const modalBackdrop = document.getElementById('product-modal-backdrop');
    const modalClose = document.getElementById('modal-close');
    const productModal = document.getElementById('product-modal');
    const viewProductBtns = document.querySelectorAll('.view-product-btn');

    // Cerrar modal
    if (modalBackdrop && modalClose) {
        modalClose.addEventListener('click', closeModal);
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) closeModal();
        });
        // Cerrar con Escape
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
                closeModal();
            }
        });
    }

    // Abrir Modal
    viewProductBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = btn.getAttribute('data-id');
            openProductModal(productId);
        });
    });

    function openProductModal(productId) {
        const product = productsData[productId];
        if (!product) return;

        // Modificar contenido del modal
        const modalContainer = document.getElementById('product-modal');
        const modalImg = document.getElementById('modal-img');
        const modalTitle = document.getElementById('modal-title');
        const modalSubtitle = document.getElementById('modal-subtitle');
        const modalDesc = document.getElementById('modal-desc');
        const modalNutritionTable = document.getElementById('modal-nutrition-table');
        const modalActionContainer = document.getElementById('modal-action-container');

        // Configurar tema visual en base al producto
        if (product.theme === 'green') {
            modalContainer.className = 'product-modal green-theme-modal';
        } else {
            modalContainer.className = 'product-modal';
        }

        // Llenar datos
        modalImg.src = product.image;
        modalImg.alt = product.name;
        modalTitle.textContent = product.name;
        modalSubtitle.textContent = product.subtitle;
        modalDesc.textContent = product.description;

        // Llenar tabla nutricional
        const portionText = product.id === 'proteina' 
            ? 'Porción: 1 Scoop aprox. (46,05 g) | Porciones por envase: 26' 
            : 'Porción: 1 Scoop (5 g) | Porciones por envase: 60';
            
        modalNutritionTable.innerHTML = `
            <thead>
                <tr>
                    <th style="text-align: left; padding: 8px 10px;">Componente</th>
                    <th style="text-align: center; padding: 8px 10px;">u.m.</th>
                    <th style="text-align: right; padding: 8px 10px;">100 g</th>
                    <th style="text-align: right; padding: 8px 10px;">Porción</th>
                    <th style="text-align: right; padding: 8px 10px;">%DDR*</th>
                </tr>
            </thead>
            <tbody>
                <tr style="font-weight: bold; background: rgba(0,0,0,0.03); border-bottom: 2px solid #ddd;">
                    <td colspan="5" style="text-align: left; padding: 8px 10px; font-size: 0.8rem;">
                        ${portionText}
                    </td>
                </tr>
                ${product.nutrition.map(item => `
                    <tr style="border-bottom: 1px solid rgba(0,0,0,0.05); ${item.isSub ? 'background-color: rgba(0,0,0,0.01);' : ''}">
                        <td style="text-align: left; padding: 6px 10px; font-size: 0.8rem; ${item.isSub ? 'padding-left: 20px; font-style: italic; color: var(--text-secondary);' : 'font-weight: 500;'}">
                            ${item.isSub ? '• ' + item.component : item.component}
                        </td>
                        <td style="text-align: center; padding: 6px 10px; font-size: 0.8rem; color: var(--text-secondary);">${item.unit || '-'}</td>
                        <td style="text-align: right; padding: 6px 10px; font-size: 0.8rem; color: var(--text-secondary);">${item.per100g || '-'}</td>
                        <td style="text-align: right; padding: 6px 10px; font-size: 0.8rem; font-weight: 600; color: var(--text-primary);">${item.perPortion || '-'}</td>
                        <td style="text-align: right; padding: 6px 10px; font-size: 0.8rem; font-weight: 500; color: var(--text-primary);">${item.ddr || '-'}</td>
                    </tr>
                `).join('')}
                <tr style="background: transparent;">
                    <td colspan="5" style="text-align: left; padding: 6px 10px; font-size: 0.7rem; color: var(--text-secondary); font-style: italic; border: none;">
                        (*) % Dosis Diaria Recomendada según la NCh para adultos.
                    </td>
                </tr>
            </tbody>
        `;

        // Configurar botón del modal
        const buttonClass = product.theme === 'green' ? 'btn-primary-green' : 'btn-primary-blue';
        modalActionContainer.innerHTML = `
            <div class="price-box">
                <span>Precio unitario</span>
                <div class="price">${formatCLP(product.price)}</div>
            </div>
            <button class="btn ${buttonClass}" onclick="addFromModal('${product.id}')">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Añadir al Carrito
            </button>
        `;

        // Mostrar Backdrop
        modalBackdrop.classList.add('open');
    }

    function closeModal() {
        modalBackdrop.classList.remove('open');
    }
}

// Función global llamada desde el botón dinámico del modal
window.addFromModal = function(productId) {
    addToCart(productId);
    
    // Cerrar modal
    const modalBackdrop = document.getElementById('product-modal-backdrop');
    if (modalBackdrop) modalBackdrop.classList.remove('open');

    // Abrir carrito
    const cartBackdrop = document.getElementById('cart-backdrop');
    if (cartBackdrop) {
        setTimeout(() => {
            cartBackdrop.classList.add('open');
        }, 300);
    }
};

// Exponer funciones necesarias globalmente para llamadas en los onclick del HTML dinámico
window.changeQuantity = changeQuantity;
window.removeFromCart = removeFromCart;
