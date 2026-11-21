/**
 * ============================================================================
 * MOBILOOK — Lógica Interactiva (Vanilla JS · Cero dependencias)
 * ============================================================================
 */

(function () {
  'use strict';

  const cfg = window.MOBILOOK_CONFIG;
  if (!cfg) return;

  const STORAGE_KEY = 'mobilook_cart_v1';

  const state = {
    selectedBrand: '',
    selectedModel: '',
    activeCategory: 'todos',
    activePillar: 'todos',
    searchQuery: '',
    sortBy: 'featured',
    selectedColors: {},
    cart: loadCart(),
    studio: {
      brand: 'Samsung',
      model: cfg.deviceCatalog.Samsung[0],
      caseId: cfg.studioOptions.cases[0].id,
      finishId: cfg.studioOptions.finishes[0].id,
      micaId: cfg.studioOptions.micas[0].id,
      extraId: cfg.studioOptions.extras[0].id
    }
  };

  // Inicializar color por defecto de cada producto
  cfg.products.forEach((p) => {
    state.selectedColors[p.id] = p.colors[0].name;
  });

  // Referencias DOM
  const dom = {
    heroForm: document.getElementById('hero-device-form'),
    heroBrand: document.getElementById('hero-brand-select'),
    heroModel: document.getElementById('hero-model-select'),
    quickBrands: document.querySelectorAll('[data-quick-brand]'),
    pillarShortcuts: document.querySelectorAll('[data-filter-pillar]'),
    activeDeviceBar: document.getElementById('active-device-bar'),
    activeDeviceLabel: document.getElementById('active-device-label'),
    clearDeviceBtn: document.getElementById('clear-device-btn'),
    categoryTabs: document.querySelectorAll('.filter-tab'),
    pillarPills: document.querySelectorAll('.pillar-pill'),
    searchInput: document.getElementById('catalog-search'),
    sortSelect: document.getElementById('catalog-sort'),
    productGrid: document.getElementById('product-grid'),
    catalogEmpty: document.getElementById('catalog-empty'),
    resetFiltersBtn: document.getElementById('reset-filters-btn'),
    // Studio
    studioBrand: document.getElementById('studio-brand'),
    studioModel: document.getElementById('studio-model'),
    studioDeviceBadge: document.getElementById('studio-device-badge'),
    studioCaseOptions: document.getElementById('studio-case-options'),
    studioFinishOptions: document.getElementById('studio-finish-options'),
    studioFinishName: document.getElementById('studio-finish-name'),
    studioMicaOptions: document.getElementById('studio-mica-options'),
    studioExtraOptions: document.getElementById('studio-extra-options'),
    studioRawPrice: document.getElementById('studio-raw-price'),
    studioSavings: document.getElementById('studio-savings'),
    studioFinalPrice: document.getElementById('studio-final-price'),
    studioAddBtn: document.getElementById('studio-add-btn'),
    phoneMockup: document.getElementById('phone-mockup'),
    studioStyleVal: document.getElementById('studio-style-val'),
    studioStyleBar: document.getElementById('studio-style-bar'),
    studioProtVal: document.getElementById('studio-prot-val'),
    studioProtBar: document.getElementById('studio-prot-bar'),
    // Carrito & Modales
    cartCount: document.getElementById('cart-count'),
    openCartBtn: document.getElementById('open-cart-btn'),
    closeCartBtn: document.getElementById('close-cart-btn'),
    cartDrawer: document.getElementById('cart-drawer'),
    drawerBackdrop: document.getElementById('drawer-backdrop'),
    cartItemsContainer: document.getElementById('cart-items-container'),
    cartFooter: document.getElementById('cart-footer'),
    cartTotalPrice: document.getElementById('cart-total-price'),
    cartDelivery: document.getElementById('cart-delivery-select'),
    cartPayment: document.getElementById('cart-payment-select'),
    checkoutWaBtn: document.getElementById('checkout-whatsapp-btn'),
    copyOrderBtn: document.getElementById('copy-order-btn'),
    // Quick View
    qvModal: document.getElementById('quickview-modal'),
    qvBackdrop: document.getElementById('quickview-backdrop'),
    qvContent: document.getElementById('qv-content'),
    closeQvBtn: document.getElementById('close-qv-btn'),
    // Mobile menu & toast
    menuToggle: document.getElementById('menu-toggle'),
    mobileMenu: document.getElementById('mobile-menu'),
    toast: document.getElementById('toast')
  };

  /* ========================================================================
     UTILIDADES
     ======================================================================== */
  function formatPrice(amount) {
    return `${cfg.brand.currencySymbol} ${Math.round(amount)}`;
  }

  function loadCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
    } catch {
      // Silencioso si el navegador bloquea storage
    }
  }

  function getActiveDeviceLabel() {
    if (state.selectedModel) return `${state.selectedBrand} ${state.selectedModel}`;
    if (state.selectedBrand) return state.selectedBrand;
    return 'Por confirmar por WhatsApp';
  }

  let toastTimer;
  function showToast(message) {
    if (!dom.toast) return;
    dom.toast.textContent = message;
    dom.toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      dom.toast.hidden = true;
    }, 2800);
  }

  function buildWhatsAppUrl(message) {
    const cleanPhone = cfg.brand.whatsappNumber.replace(/\D/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  }

  /* ========================================================================
     HIDRATACIÓN DE DATOS DE TIENDA (config.js)
     ======================================================================== */
  function hydrateStoreInfo() {
    const addr = document.getElementById('store-address-text');
    const hrs = document.getElementById('store-hours-text');
    const maps = document.getElementById('store-maps-link');
    const waDisp = document.getElementById('footer-whatsapp-display');
    const yearEl = document.getElementById('current-year');

    if (addr) addr.textContent = cfg.brand.address;
    if (hrs) hrs.textContent = cfg.brand.hours;
    if (maps) maps.href = cfg.brand.mapsUrl;
    if (waDisp) waDisp.textContent = cfg.brand.whatsappDisplay;
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    document.querySelectorAll('[data-direct-whatsapp]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const deviceInfo = state.selectedModel
          ? ` para mi ${state.selectedBrand} ${state.selectedModel}`
          : state.selectedBrand
            ? ` para un celular ${state.selectedBrand}`
            : '';
        const text = `Hola MOBILOOK Ancón, quiero consultar stock de fundas y micas${deviceInfo}.`;
        window.open(buildWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
      });
    });
  }

  /* ========================================================================
     BUSCADOR DE MODELO (HERO + SYNC GLOBAL)
     ======================================================================== */
  function populateModels(selectEl, brand, includePlaceholder) {
    selectEl.innerHTML = '';
    if (includePlaceholder) {
      const opt = document.createElement('option');
      opt.value = '';
      opt.textContent = brand ? `Todos (${brand})` : 'Modelo';
      selectEl.appendChild(opt);
    }
    const list = brand ? cfg.deviceCatalog[brand] || [] : [];
    list.forEach((model) => {
      const opt = document.createElement('option');
      opt.value = model;
      opt.textContent = model;
      selectEl.appendChild(opt);
    });
  }

  function syncDeviceSelection(brand, model) {
    state.selectedBrand = brand || '';
    state.selectedModel = model || '';

    // Sincronizar Hero selects
    if (dom.heroBrand) {
      dom.heroBrand.value = state.selectedBrand;
      populateModels(dom.heroModel, state.selectedBrand, true);
      dom.heroModel.value = state.selectedModel;
    }

    // Sincronizar chips rápidos de marca
    dom.quickBrands.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.quickBrand === state.selectedBrand);
    });

    // Banner en catálogo
    if (state.selectedBrand) {
      dom.activeDeviceBar.hidden = false;
      dom.activeDeviceLabel.textContent = state.selectedModel
        ? `${state.selectedBrand} ${state.selectedModel}`
        : `celulares ${state.selectedBrand}`;
    } else {
      dom.activeDeviceBar.hidden = true;
    }

    // Sincronizar Studio si eligió marca
    if (state.selectedBrand && cfg.deviceCatalog[state.selectedBrand]) {
      state.studio.brand = state.selectedBrand;
      state.studio.model = state.selectedModel || cfg.deviceCatalog[state.selectedBrand][0];
      dom.studioBrand.value = state.studio.brand;
      populateModels(dom.studioModel, state.studio.brand, false);
      dom.studioModel.value = state.studio.model;
      renderStudioState();
    }

    renderCatalog();
  }

  function initDeviceFinder() {
    dom.heroBrand.addEventListener('change', () => {
      populateModels(dom.heroModel, dom.heroBrand.value, true);
    });

    dom.heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      syncDeviceSelection(dom.heroBrand.value, dom.heroModel.value);
      document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
      if (dom.heroBrand.value) {
        showToast(`Catálogo filtrado para ${getActiveDeviceLabel()}`);
      }
    });

    dom.quickBrands.forEach((btn) => {
      btn.addEventListener('click', () => {
        syncDeviceSelection(btn.dataset.quickBrand, '');
        document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
      });
    });

    dom.clearDeviceBtn.addEventListener('click', () => {
      syncDeviceSelection('', '');
    });
  }

  /* ========================================================================
     CATÁLOGO INTERACTIVO
     ======================================================================== */
  function getFilteredProducts() {
    let list = cfg.products.slice();

    if (state.selectedBrand) {
      list = list.filter((p) => p.brands.includes(state.selectedBrand));
    }
    if (state.activeCategory !== 'todos') {
      list = list.filter((p) => p.category === state.activeCategory);
    }
    if (state.activePillar !== 'todos') {
      list = list.filter((p) => p.pillar === state.activePillar);
    }
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q) ||
          p.brands.some((b) => b.toLowerCase().includes(q)) ||
          p.colors.some((c) => c.name.toLowerCase().includes(q))
      );
    }

    if (state.sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (state.sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (state.sortBy === 'protection-desc') list.sort((a, b) => b.protection - a.protection);

    return list;
  }

  function renderProtectionBars(level) {
    let bars = '';
    for (let i = 1; i <= 5; i += 1) {
      bars += `<span class="prot-bar ${i <= level ? 'is-on' : ''}"></span>`;
    }
    return `<span class="prot-bars" title="Nivel de protección ${level} de 5" aria-label="Protección ${level} de 5">${bars}</span>`;
  }

  function renderCatalog() {
    const items = getFilteredProducts();
    dom.productGrid.innerHTML = '';

    if (items.length === 0) {
      dom.catalogEmpty.hidden = false;
      return;
    }
    dom.catalogEmpty.hidden = true;

    const fragment = document.createDocumentFragment();

    items.forEach((product) => {
      const chosenColor = state.selectedColors[product.id] || product.colors[0].name;
      const card = document.createElement('article');
      card.className = 'product-card';

      const swatchesHtml = product.colors
        .map(
          (c) => `
          <button
            type="button"
            class="swatch-btn ${c.name === chosenColor ? 'is-active' : ''}"
            style="background:${c.hex}"
            title="${c.name}"
            aria-label="Color ${c.name}"
            data-swatch-product="${product.id}"
            data-swatch-color="${c.name}"
          ></button>`
        )
        .join('');

      card.innerHTML = `
        <div class="product-card__media">
          <img
            src="${product.image}"
            alt="${product.name} - MOBILOOK Perú"
            width="600"
            height="600"
            loading="lazy"
            decoding="async"
            class="product-card__img"
          >
          <span class="product-card__badge product-card__badge--${product.badgeType}">${product.badge}</span>
          <button type="button" class="product-card__quickview" data-quickview="${product.id}" aria-label="Ver detalles de ${product.name}">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
        <div class="product-card__body">
          <div class="product-card__meta">
            <span class="product-card__pillar">${product.pillar === 'estilo' ? 'Estilo' : 'Protección'}</span>
            ${renderProtectionBars(product.protection)}
          </div>
          <h3 class="product-card__title">${product.name}</h3>
          <p class="product-card__desc">${product.shortDesc}</p>
          <div class="swatch-row">
            ${swatchesHtml}
            <span class="swatch-name" data-swatch-label="${product.id}">${chosenColor}</span>
          </div>
          <div class="product-card__foot">
            <div class="price-block">
              ${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ''}
              <span class="price-now">${formatPrice(product.price)}</span>
            </div>
            <button type="button" class="btn btn--primary btn--sm" data-add-product="${product.id}">
              + Agregar
            </button>
          </div>
        </div>
      `;

      fragment.appendChild(card);
    });

    dom.productGrid.appendChild(fragment);
  }

  function initCatalogEvents() {
    dom.categoryTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        state.activeCategory = tab.dataset.cat;
        dom.categoryTabs.forEach((t) => {
          const active = t === tab;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', String(active));
        });
        renderCatalog();
      });
    });

    dom.pillarPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        setPillarFilter(pill.dataset.pillar);
      });
    });

    dom.pillarShortcuts.forEach((btn) => {
      btn.addEventListener('click', () => {
        setPillarFilter(btn.dataset.filterPillar);
        document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
      });
    });

    dom.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderCatalog();
    });

    dom.sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderCatalog();
    });

    dom.resetFiltersBtn.addEventListener('click', () => {
      state.activeCategory = 'todos';
      state.activePillar = 'todos';
      state.searchQuery = '';
      state.sortBy = 'featured';
      dom.searchInput.value = '';
      dom.sortSelect.value = 'featured';
      dom.categoryTabs.forEach((t) => t.classList.toggle('is-active', t.dataset.cat === 'todos'));
      dom.pillarPills.forEach((p) => p.classList.toggle('is-active', p.dataset.pillar === 'todos'));
      syncDeviceSelection('', '');
    });

    // Delegación de eventos dentro del grid
    dom.productGrid.addEventListener('click', (e) => {
      const swatchBtn = e.target.closest('[data-swatch-product]');
      if (swatchBtn) {
        const pid = swatchBtn.dataset.swatchProduct;
        const color = swatchBtn.dataset.swatchColor;
        state.selectedColors[pid] = color;
        const card = swatchBtn.closest('.product-card');
        card.querySelectorAll('[data-swatch-product]').forEach((b) => {
          b.classList.toggle('is-active', b === swatchBtn);
        });
        const label = card.querySelector(`[data-swatch-label="${pid}"]`);
        if (label) label.textContent = color;
        return;
      }

      const addBtn = e.target.closest('[data-add-product]');
      if (addBtn) {
        addProductToCart(addBtn.dataset.addProduct);
        return;
      }

      const qvBtn = e.target.closest('[data-quickview]');
      if (qvBtn) {
        openQuickView(qvBtn.dataset.quickview);
      }
    });

    // Botones rápidos de la guía de micas
    document.querySelectorAll('[data-quick-add]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const pid = btn.dataset.quickAdd;
        const forcedColor = btn.dataset.quickColor;
        if (forcedColor) state.selectedColors[pid] = forcedColor;
        addProductToCart(pid);
        openCart();
      });
    });
  }

  function setPillarFilter(pillar) {
    state.activePillar = pillar;
    dom.pillarPills.forEach((p) => {
      p.classList.toggle('is-active', p.dataset.pillar === pillar);
    });
    renderCatalog();
  }

  /* ========================================================================
     STUDIO INTERACTIVO: "ARMA TU MOBILOOK"
     ======================================================================== */
  function initStudio() {
    // Poblar marcas
    Object.keys(cfg.deviceCatalog).forEach((brand) => {
      const opt = document.createElement('option');
      opt.value = brand;
      opt.textContent = brand;
      dom.studioBrand.appendChild(opt);
    });
    dom.studioBrand.value = state.studio.brand;
    populateModels(dom.studioModel, state.studio.brand, false);
    dom.studioModel.value = state.studio.model;

    dom.studioBrand.addEventListener('change', () => {
      state.studio.brand = dom.studioBrand.value;
      populateModels(dom.studioModel, state.studio.brand, false);
      state.studio.model = dom.studioModel.value;
      renderStudioState();
    });

    dom.studioModel.addEventListener('change', () => {
      state.studio.model = dom.studioModel.value;
      renderStudioState();
    });

    // Opciones de funda
    dom.studioCaseOptions.innerHTML = cfg.studioOptions.cases
      .map(
        (c) => `
        <button type="button" class="studio-opt" data-studio-case="${c.id}" role="radio">
          <span class="studio-opt__top"><span>${c.name}</span><span>${formatPrice(c.price)}</span></span>
          <span class="studio-opt__tag">${c.tag}</span>
        </button>`
      )
      .join('');

    // Acabados / colores
    dom.studioFinishOptions.innerHTML = cfg.studioOptions.finishes
      .map(
        (f) => `
        <button
          type="button"
          class="studio-swatch"
          style="background:${f.body}"
          title="${f.name}"
          aria-label="${f.name}"
          data-studio-finish="${f.id}"
          role="radio"
        ></button>`
      )
      .join('');

    // Micas
    dom.studioMicaOptions.innerHTML = cfg.studioOptions.micas
      .map(
        (m) => `
        <button type="button" class="studio-radio-row" data-studio-mica="${m.id}" role="radio">
          <span>${m.name}</span>
          <strong>${formatPrice(m.price)}</strong>
        </button>`
      )
      .join('');

    // Extras
    dom.studioExtraOptions.innerHTML = cfg.studioOptions.extras
      .map(
        (ex) => `
        <button type="button" class="studio-radio-row" data-studio-extra="${ex.id}" role="radio">
          <span>${ex.name}</span>
          <strong>${ex.price > 0 ? `+${formatPrice(ex.price)}` : 'Incluido: S/ 0'}</strong>
        </button>`
      )
      .join('');

    // Listeners delegados
    dom.studioCaseOptions.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-studio-case]');
      if (!btn) return;
      state.studio.caseId = btn.dataset.studioCase;
      renderStudioState();
    });

    dom.studioFinishOptions.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-studio-finish]');
      if (!btn) return;
      state.studio.finishId = btn.dataset.studioFinish;
      renderStudioState();
    });

    dom.studioMicaOptions.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-studio-mica]');
      if (!btn) return;
      state.studio.micaId = btn.dataset.studioMica;
      renderStudioState();
    });

    dom.studioExtraOptions.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-studio-extra]');
      if (!btn) return;
      state.studio.extraId = btn.dataset.studioExtra;
      renderStudioState();
    });

    dom.studioAddBtn.addEventListener('click', () => {
      const { caseOpt, finishOpt, micaOpt, extraOpt, finalPrice, savings } = computeStudioBundle();
      const extraText = extraOpt.price > 0 ? ` + ${extraOpt.name.split(' (+')[0]}` : '';
      const key = `combo_${state.studio.brand}_${state.studio.model}_${caseOpt.id}_${finishOpt.id}_${micaOpt.id}_${extraOpt.id}`;

      addItemToCart({
        key,
        name: `Combo MOBILOOK (-15%)`,
        variant: `${caseOpt.name} (${finishOpt.name}) + ${micaOpt.name}${extraText}`,
        device: `${state.studio.brand} ${state.studio.model}`,
        price: finalPrice,
        isCombo: true,
        savings
      });
      openCart();
    });

    renderStudioState();
  }

  function computeStudioBundle() {
    const caseOpt = cfg.studioOptions.cases.find((c) => c.id === state.studio.caseId);
    const finishOpt = cfg.studioOptions.finishes.find((f) => f.id === state.studio.finishId);
    const micaOpt = cfg.studioOptions.micas.find((m) => m.id === state.studio.micaId);
    const extraOpt = cfg.studioOptions.extras.find((e) => e.id === state.studio.extraId);

    const rawPrice = caseOpt.price + micaOpt.price + extraOpt.price;
    const savings = Math.round(rawPrice * cfg.brand.comboDiscountRate);
    const finalPrice = rawPrice - savings;

    const protTotal = Math.min(100, caseOpt.protectionScore + micaOpt.protectionBoost + (extraOpt.id === 'extra-lens' ? 4 : 0));
    const styleTotal = Math.min(100, caseOpt.styleScore + (extraOpt.id === 'extra-lens' ? 4 : 0));

    return { caseOpt, finishOpt, micaOpt, extraOpt, rawPrice, savings, finalPrice, protTotal, styleTotal };
  }

  function renderStudioState() {
    const { caseOpt, finishOpt, micaOpt, extraOpt, rawPrice, savings, finalPrice, protTotal, styleTotal } = computeStudioBundle();

    dom.studioDeviceBadge.textContent = `${state.studio.brand} ${state.studio.model}`;
    dom.studioFinishName.textContent = finishOpt.name;

    // Actualizar mockup visual en tiempo real
    dom.phoneMockup.dataset.case = caseOpt.id;
    dom.phoneMockup.style.setProperty('--case-body', finishOpt.body);
    dom.phoneMockup.style.setProperty('--case-edge', finishOpt.edge);
    dom.phoneMockup.style.setProperty('--case-accent', finishOpt.accent);
    dom.phoneMockup.classList.toggle('is-light-case', !finishOpt.textLight);
    dom.phoneMockup.classList.toggle('has-lens-guard', extraOpt.id === 'extra-lens');

    // Medidores
    dom.studioStyleVal.textContent = `${styleTotal}%`;
    dom.studioStyleBar.style.width = `${styleTotal}%`;
    dom.studioProtVal.textContent = `${protTotal}%`;
    dom.studioProtBar.style.width = `${protTotal}%`;

    // Estados activos
    dom.studioCaseOptions.querySelectorAll('[data-studio-case]').forEach((el) => {
      const on = el.dataset.studioCase === caseOpt.id;
      el.classList.toggle('is-active', on);
      el.setAttribute('aria-checked', String(on));
    });

    dom.studioFinishOptions.querySelectorAll('[data-studio-finish]').forEach((el) => {
      const on = el.dataset.studioFinish === finishOpt.id;
      el.classList.toggle('is-active', on);
      el.setAttribute('aria-checked', String(on));
    });

    dom.studioMicaOptions.querySelectorAll('[data-studio-mica]').forEach((el) => {
      const on = el.dataset.studioMica === micaOpt.id;
      el.classList.toggle('is-active', on);
      el.setAttribute('aria-checked', String(on));
    });

    dom.studioExtraOptions.querySelectorAll('[data-studio-extra]').forEach((el) => {
      const on = el.dataset.studioExtra === extraOpt.id;
      el.classList.toggle('is-active', on);
      el.setAttribute('aria-checked', String(on));
    });

    dom.studioRawPrice.textContent = formatPrice(rawPrice);
    dom.studioSavings.textContent = formatPrice(savings);
    dom.studioFinalPrice.textContent = formatPrice(finalPrice);
  }

  /* ========================================================================
     CARRITO + CHECKOUT WHATSAPP
     ======================================================================== */
  function addProductToCart(productId) {
    const product = cfg.products.find((p) => p.id === productId);
    if (!product) return;

    const chosenColor = state.selectedColors[product.id] || product.colors[0].name;
    const device = getActiveDeviceLabel();
    const key = `${product.id}_${chosenColor}_${device}`;

    addItemToCart({
      key,
      name: product.name,
      variant: chosenColor,
      device,
      price: product.price,
      image: product.image,
      isCombo: false
    });
  }

  function addItemToCart(item) {
    const existing = state.cart.find((i) => i.key === item.key);
    if (existing) {
      existing.qty += 1;
    } else {
      state.cart.push({ ...item, qty: 1 });
    }
    saveCart();
    renderCart();
    showToast(`✓ Agregado: ${item.name}`);
  }

  function updateItemQty(key, delta) {
    const idx = state.cart.findIndex((i) => i.key === key);
    if (idx === -1) return;
    state.cart[idx].qty += delta;
    if (state.cart[idx].qty <= 0) {
      state.cart.splice(idx, 1);
    }
    saveCart();
    renderCart();
  }

  function renderCart() {
    const totalCount = state.cart.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = state.cart.reduce((sum, i) => sum + i.price * i.qty, 0);

    dom.cartCount.textContent = String(totalCount);
    dom.cartTotalPrice.textContent = formatPrice(totalPrice);

    if (state.cart.length === 0) {
      dom.cartFooter.hidden = true;
      dom.cartItemsContainer.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty__icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
          <p><strong>Tu pedido está vacío</strong></p>
          <p>Explora el catálogo o arma tu combo en el Studio para obtener 15% OFF.</p>
          <button type="button" class="btn btn--primary btn--sm" id="cart-go-catalog">Ver accesorios</button>
        </div>
      `;
      const goBtn = document.getElementById('cart-go-catalog');
      if (goBtn) {
        goBtn.addEventListener('click', () => {
          closeCart();
          document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
        });
      }
      return;
    }

    dom.cartFooter.hidden = false;
    dom.cartItemsContainer.innerHTML = state.cart
      .map(
        (item) => `
        <div class="cart-item">
          ${
            item.isCombo
              ? `<div class="cart-item__badge-thumb">COMBO<br>-15%</div>`
              : `<img src="${item.image}" alt="${item.name}" class="cart-item__thumb" width="62" height="62">`
          }
          <div>
            <p class="cart-item__title">${item.name}</p>
            <p class="cart-item__meta">${item.variant}<br>Equipo: <strong>${item.device}</strong></p>
            <div class="cart-item__bottom">
              <div class="qty-control">
                <button type="button" data-qty-key="${item.key}" data-qty-delta="-1" aria-label="Disminuir cantidad">−</button>
                <span>${item.qty}</span>
                <button type="button" data-qty-key="${item.key}" data-qty-delta="1" aria-label="Aumentar cantidad">+</button>
              </div>
              <span class="cart-item__price">${formatPrice(item.price * item.qty)}</span>
              <button type="button" class="cart-item__remove" data-remove-key="${item.key}">Quitar</button>
            </div>
          </div>
        </div>
      `
      )
      .join('');
  }

  function buildOrderMessage() {
    const lines = [
      'Hola *MOBILOOK Ancón*, quiero coordinar este pedido:',
      ''
    ];
    state.cart.forEach((item, idx) => {
      lines.push(`${idx + 1}. *${item.qty}x ${item.name}*`);
      lines.push(`   - Opción: ${item.variant}`);
      lines.push(`   - Celular: ${item.device}`);
      lines.push(`   - Subtotal: ${formatPrice(item.price * item.qty)}`);
    });
    const total = state.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    lines.push('');
    lines.push(`*Total estimado:* ${formatPrice(total)}`);
    lines.push(`*Entrega:* ${dom.cartDelivery.value}`);
    lines.push(`*Medio de pago:* ${dom.cartPayment.value}`);
    lines.push('');
    lines.push('¿Me confirmas disponibilidad para coordinar? Muchas gracias.');
    return lines.join('\n');
  }

  function openCart() {
    dom.cartDrawer.hidden = false;
    dom.drawerBackdrop.hidden = false;
    dom.openCartBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    dom.cartDrawer.hidden = true;
    dom.drawerBackdrop.hidden = true;
    dom.openCartBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function initCartEvents() {
    dom.openCartBtn.addEventListener('click', openCart);
    dom.closeCartBtn.addEventListener('click', closeCart);
    dom.drawerBackdrop.addEventListener('click', closeCart);

    dom.cartItemsContainer.addEventListener('click', (e) => {
      const qtyBtn = e.target.closest('[data-qty-key]');
      if (qtyBtn) {
        updateItemQty(qtyBtn.dataset.qtyKey, Number(qtyBtn.dataset.qtyDelta));
        return;
      }
      const removeBtn = e.target.closest('[data-remove-key]');
      if (removeBtn) {
        const key = removeBtn.dataset.removeKey;
        state.cart = state.cart.filter((i) => i.key !== key);
        saveCart();
        renderCart();
      }
    });

    dom.checkoutWaBtn.addEventListener('click', () => {
      if (state.cart.length === 0) return;
      window.open(buildWhatsAppUrl(buildOrderMessage()), '_blank', 'noopener,noreferrer');
    });

    dom.copyOrderBtn.addEventListener('click', async () => {
      if (state.cart.length === 0) return;
      try {
        await navigator.clipboard.writeText(buildOrderMessage());
        showToast('Resumen copiado. Pégalo en tu WhatsApp.');
      } catch {
        showToast('Usa el botón verde para abrir directo en WhatsApp.');
      }
    });
  }

  /* ========================================================================
     MODAL VISTA RÁPIDA DE PRODUCTO
     ======================================================================== */
  function openQuickView(productId) {
    const p = cfg.products.find((item) => item.id === productId);
    if (!p) return;

    const selectedColor = state.selectedColors[p.id] || p.colors[0].name;
    dom.qvContent.innerHTML = `
      <div class="qv-media">
        <img src="${p.image}" alt="${p.name}" width="600" height="600">
      </div>
      <div>
        <span class="section-kicker">${p.pillar === 'estilo' ? 'Colección Estilo' : 'Colección Protección'}</span>
        <h2 id="qv-title" style="margin:0 0 0.5rem; font-family:var(--font-display); font-size:2rem; line-height:1.05; text-transform:uppercase;">${p.name}</h2>
        <p style="margin:0 0 0.75rem; color:var(--ink-secondary); font-size:0.92rem;">${p.shortDesc}</p>
        <div class="price-block" style="margin-bottom:0.75rem;">
          ${p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ''}
          <span class="price-now">${formatPrice(p.price)}</span>
        </div>
        <p style="margin:0 0 0.5rem; font-size:0.82rem; color:var(--ink-muted);">Compatible con: <strong>${p.brands.join(', ')}</strong></p>
        <p style="margin:0; font-size:0.82rem; color:var(--ink-muted);">Acabado seleccionado: <strong>${selectedColor}</strong></p>
        <ul class="qv-specs">
          ${p.specs.map((s) => `<li>${s}</li>`).join('')}
        </ul>
        <button type="button" class="btn btn--primary btn--block" id="qv-add-btn">Agregar al Pedido · ${formatPrice(p.price)}</button>
      </div>
    `;

    dom.qvModal.hidden = false;
    dom.qvBackdrop.hidden = false;
    document.body.style.overflow = 'hidden';

    document.getElementById('qv-add-btn').addEventListener('click', () => {
      addProductToCart(p.id);
      closeQuickView();
      openCart();
    });
  }

  function closeQuickView() {
    dom.qvModal.hidden = true;
    dom.qvBackdrop.hidden = true;
    document.body.style.overflow = '';
  }

  /* ========================================================================
     MENÚ MÓVIL, ESCAPE Y SCROLL REVEAL
     ======================================================================== */
  function initUIExtras() {
    dom.closeQvBtn.addEventListener('click', closeQuickView);
    dom.qvBackdrop.addEventListener('click', closeQuickView);

    dom.menuToggle.addEventListener('click', () => {
      const open = dom.mobileMenu.hidden;
      dom.mobileMenu.hidden = !open;
      dom.menuToggle.setAttribute('aria-expanded', String(open));
    });

    dom.mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        dom.mobileMenu.hidden = true;
        dom.menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (!dom.cartDrawer.hidden) closeCart();
        if (!dom.qvModal.hidden) closeQuickView();
      }
    });

    // IntersectionObserver para entradas suaves
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      reveals.forEach((el) => io.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add('is-visible'));
    }
  }

  /* ========================================================================
     ARRANQUE
     ======================================================================== */
  hydrateStoreInfo();
  initDeviceFinder();
  initCatalogEvents();
  initStudio();
  initCartEvents();
  initUIExtras();
  renderCatalog();
  renderCart();
})();
