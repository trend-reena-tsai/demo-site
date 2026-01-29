// ===== Demo Site JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavigation();
  initProductGallery();
  initProductFilters();
  initContactForm();
  initScrollAnimations();
});

// ===== Mobile Navigation =====
function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  }
  
  // Active link highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ===== Product Gallery (for product detail page) =====
function initProductGallery() {
  const mainImage = document.querySelector('.product-main-image img');
  const thumbnails = document.querySelectorAll('.product-thumbnail');
  
  if (mainImage && thumbnails.length > 0) {
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        // Update main image
        const newSrc = thumb.querySelector('img').src;
        mainImage.src = newSrc;
        
        // Update active state
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
    
    // Set first thumbnail as active
    thumbnails[0]?.classList.add('active');
  }
}

// ===== Product Filters =====
function initProductFilters() {
  const categoryFilter = document.getElementById('category-filter');
  const sortFilter = document.getElementById('sort-filter');
  const featuredToggle = document.getElementById('featured-toggle');
  const productCards = document.querySelectorAll('.product-card');
  
  if (categoryFilter) {
    categoryFilter.addEventListener('change', filterProducts);
  }
  
  if (sortFilter) {
    sortFilter.addEventListener('change', sortProducts);
  }
  
  if (featuredToggle) {
    featuredToggle.addEventListener('change', filterProducts);
  }
  
  function filterProducts() {
    const selectedCategory = categoryFilter ? categoryFilter.value.toLowerCase() : 'all';
    const showFeaturedOnly = featuredToggle ? featuredToggle.checked : false;
    
    productCards.forEach(card => {
      const cardCategory = card.dataset.category?.toLowerCase() || '';
      const isFeatured = card.querySelector('.product-badge') !== null;
      
      const matchesCategory = selectedCategory === 'all' || cardCategory === selectedCategory;
      const matchesFeatured = !showFeaturedOnly || isFeatured;
      
      if (matchesCategory && matchesFeatured) {
        card.style.display = 'block';
        setTimeout(() => card.style.opacity = '1', 10);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  }
  
  function sortProducts() {
    const sortBy = sortFilter.value;
    const grid = document.querySelector('.products-grid');
    const cards = Array.from(productCards);
    
    cards.sort((a, b) => {
      const priceA = parseFloat(a.dataset.price) || 0;
      const priceB = parseFloat(b.dataset.price) || 0;
      const nameA = a.dataset.name || '';
      const nameB = b.dataset.name || '';
      
      switch (sortBy) {
        case 'price-low':
          return priceA - priceB;
        case 'price-high':
          return priceB - priceA;
        case 'name-az':
          return nameA.localeCompare(nameB);
        case 'name-za':
          return nameB.localeCompare(nameA);
        default:
          return 0;
      }
    });
    
    // Re-append sorted cards
    cards.forEach(card => grid.appendChild(card));
  }
}

// ===== Contact Form =====
function initContactForm() {
  const form = document.getElementById('contact-form');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Simple validation
      let isValid = true;
      const requiredFields = ['name', 'email', 'message'];
      
      requiredFields.forEach(field => {
        const input = form.querySelector(`[name="${field}"]`);
        if (!data[field]?.trim()) {
          isValid = false;
          input.style.borderColor = '#e74c3c';
        } else {
          input.style.borderColor = '';
        }
      });
      
      // Email validation
      const emailInput = form.querySelector('[name="email"]');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (data.email && !emailRegex.test(data.email)) {
        isValid = false;
        emailInput.style.borderColor = '#e74c3c';
      }
      
      if (isValid) {
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          alert('Thank you for your message! We will get back to you soon.');
          form.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 1500);
      }
    });
  }
}

// ===== Scroll Animations =====
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements with animation classes
  document.querySelectorAll('.product-card, .feature-card, .category-card, .team-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Add animation class styles dynamically
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// ===== Utility Functions =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Header scroll effect
window.addEventListener('scroll', debounce(() => {
  const header = document.querySelector('.header');
  if (header) {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 12px rgba(45, 36, 32, 0.12)';
    } else {
      header.style.boxShadow = '0 2px 4px rgba(45, 36, 32, 0.08)';
    }
  }
}, 10));
