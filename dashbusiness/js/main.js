/* ============================================================
   Dash Business — main.js
   Baseado no portfólio de Dany Pinheiro. Dark mode fixo.
   ============================================================ */

/* ---------- NAV ------------------------------------------- */
function initNav() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('nav-hamburger');
  const mobile    = document.getElementById('nav-mobile');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  if (hamburger && mobile) {
    hamburger.addEventListener('click', () => mobile.classList.toggle('open'));
    mobile.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobile.classList.remove('open'));
    });
  }
}

/* ---------- NAV ACTIVE LINK ON SCROLL --------------------- */
function initNavActiveScroll() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  if (!navLinks.length || !sections.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  });
}

/* ---------- SCROLL ANIMATIONS ----------------------------- */
function initScrollAnimations() {
  const targets = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = [...entry.target.parentElement.children];
        const delay    = siblings.indexOf(entry.target) * 80;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(t => observer.observe(t));
}

/* ---------- FEATURED PROJECTS ----------------------------- */
function initFeaturedProjects() {
  if (typeof renderProjectCards === 'undefined') return;
  renderProjectCards('featured-projects-grid', { featured: true, contactUrl: '#contato' });
}

/* ---------- HERO ENTRANCE ANIMATION ----------------------- */
function initHeroAnimation() {
  const items = document.querySelectorAll(
    '.hero-greeting, .hero-name, .hero-title, .hero-phrase, .hero-ctas, .hero-visual-wrap'
  );
  items.forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`;
    setTimeout(() => {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    }, 100 + i * 100);
  });
}

/* ---------- SMOOTH SCROLL --------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
}

/* ---------- BACK TO TOP ----------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------- BOOT ------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initNavActiveScroll();
  initBackToTop();
  initHeroAnimation();
  initFeaturedProjects();
  initScrollAnimations();
  initSmoothScroll();
});
