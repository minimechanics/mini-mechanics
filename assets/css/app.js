// app.js — minimal interactive layer: load products, filter, modal, contact stub
document.addEventListener('DOMContentLoaded', () => {
  const productGrid = document.getElementById('productGrid');
  const categorySelect = document.getElementById('categorySelect');
  const searchInput = document.getElementById('searchInput');
  const dioramaGallery = document.getElementById('dioramaGallery');
  const framedGrid = document.getElementById('framedGrid');
  const modal = document.getElementById('productModal');
  const modalContent = document.getElementById('modalContent');
  const yearSpan = document.getElementById('year');

  yearSpan.textContent = new Date().getFullYear();

  let products = [];

  // Load sample data
  fetch('data/products.json')
    .then(r => r.json())
    .then(data => {
      products = data.products;
      renderProducts(products);
      renderGalleries(data.dioramas, data.framed);
    })
    .catch(err => {
      console.error('Failed to load products.json', err);
      productGrid.innerHTML = '<p class="muted">Unable to load catalog — please try again later.</p>';
    });

  function renderProducts(list){
    productGrid.innerHTML = '';
    if (!list.length) {
      productGrid.innerHTML = '<p class="muted">No items match your search.</p>';
      return;
    }
    list.forEach(p => {
      const card = document.createElement('article');
      card.className = 'card';
      card.setAttribute('tabindex', 0);
      card.innerHTML = `
        <img src="${p.image || 'assets/images/placeholder-card.jpg'}" alt="${p.name}" loading="lazy">
        <h3>${p.name}</h3>
        <p>${p.short}</p>
        <div class="meta">
          <span class="badge">${p.category}</span>
          <button class="btn btn-ghost" data-id="${p.id}">View</button>
        </div>
      `;
      productGrid.appendChild(card);
    });
  }

  function renderGalleries(dioramas = [], framed = []){
    dioramaGallery.innerHTML = dioramas.map(d => `
      <div class="gallery-tile">
        <img src="${d.image}" alt="${d.title}">
        <div class="tile-caption"><strong>${d.title}</strong><div>${d.desc}</div></div>
      </div>
    `).join('');

    framedGrid.innerHTML = framed.map(f => `
      <div class="gallery-tile">
        <img src="${f.image}" alt="${f.title}">
        <div class="tile-caption"><strong>${f.title}</strong><div>${f.desc}</div></div>
      </div>
    `).join('');
  }

  // Filters
  categorySelect.addEventListener('change', applyFilters);
  searchInput.addEventListener('input', applyFilters);

  function applyFilters(){
    const cat = categorySelect.value;
    const q = (searchInput.value || '').trim().toLowerCase();
    const filtered = products.filter(p => {
      const matchCat = (cat === 'all') || (p.slug === cat) || (p.category.toLowerCase().includes(cat));
      const matchQuery = !q || (p.name.toLowerCase().includes(q) || p.short.toLowerCase().includes(q) || p.tags.join(' ').includes(q));
      return matchCat && matchQuery;
    });
    renderProducts(filtered);
  }

  // Delegated click for product view
  productGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-id]');
    if (btn) {
      const id = btn.getAttribute('data-id');
      openProductModal(products.find(p => p.id === id));
    }
  });
  productGrid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.matches('.card')) {
      const id = e.target.querySelector('button[data-id]')?.getAttribute('data-id');
      if (id) openProductModal(products.find(p => p.id === id));
    }
  });

  function openProductModal(product){
    if (!product) return;
    modal.setAttribute('aria-hidden', 'false');
    modalContent.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 320px;gap:1rem;">
        <div>
          <img src="${product.image}" alt="${product.name}" style="width:100%;height:360px;object-fit:cover;border-radius:8px">
          <h2 id="modalTitle">${product.name}</h2>
          <p style="color:var(--muted)">${product.long}</p>
        </div>
        <aside style="padding:1rem;background:linear-gradient(180deg,#0b0b0b,#0a0a0a);border-radius:8px;border:1px solid rgba(255,255,255,0.03)">
          <p><strong>Category</strong></p><p>${product.category}</p>
          <p><strong>Limited</strong></p><p>${product.limited ? product.limited : 'Standard'}</p>
          <p style="margin-top:1rem"><button class="btn btn-primary" id="inquireBtn">Inquire / Reserve</button></p>
        </aside>
      </div>
    `;
    document.querySelector('.modal-close').focus();
  }

  // Modal dismiss
  modal.addEventListener('click', (e) => {
    if (e.target.matches('[data-dismiss]') || e.target.classList.contains('modal-backdrop')) closeModal();
  });
  document.querySelector('.modal-close').addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  function closeModal(){
    modal.setAttribute('aria-hidden', 'true');
    modalContent.innerHTML = '';
  }

  // Contact form stub (replace with API integration)
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    // Basic validation & UX
    const name = data.get('name'), email = data.get('email'), message = data.get('message');
    if (!name || !email || !message) {
      alert('Please complete all fields.');
      return;
    }
    // Replace with your serverless endpoint or form backend
    alert('Thanks — your message has been noted. We will reply within 48 hours.');
    contactForm.reset();
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  menuToggle?.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    document.querySelector('.nav ul').classList.toggle('open');
  });
});
