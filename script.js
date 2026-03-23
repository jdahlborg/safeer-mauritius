/* ============================================================
   SAFEER MAURITIUS — Script
   ============================================================ */

// ── AOS Init ─────────────────────────────────────────────
AOS.init({
  duration: 700,
  once: true,
  offset: 60,
  easing: 'ease-out-cubic',
});

// ── Mobile menu toggle ────────────────────────────────────
const menuBtn   = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon  = document.getElementById('menu-icon');

menuBtn.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden');
  menuIcon.setAttribute('d',
    isOpen
      ? 'M4 6h16M4 12h16M4 18h16'               // hamburger
      : 'M6 18L18 6M6 6l12 12'                   // X
  );
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
  });
});

// ── Sticky header shadow ──────────────────────────────────
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 20) {
    header.classList.add('shadow-md');
  } else {
    header.classList.remove('shadow-md');
  }
}, { passive: true });

// ── Active nav highlighting ───────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('a.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        const active = link.getAttribute('href') === `#${id}`;
        link.style.color = active ? '#0077B6' : '';
      });
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(s => observer.observe(s));

// ── FAQ accordion ─────────────────────────────────────────
document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

    // Open clicked (toggle)
    if (!isOpen) item.classList.add('open');
  });
});

// Open first FAQ by default
const firstFaq = document.querySelector('.faq-item');
if (firstFaq) firstFaq.classList.add('open');

// ── Contact form ──────────────────────────────────────────
const form  = document.getElementById('contact-form');
const toast = document.getElementById('toast');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  // Simulate async send (replace with real fetch/API call)
  setTimeout(() => {
    form.reset();
    btn.textContent = 'Send Message — It\'s Free';
    btn.disabled = false;
    showToast();
  }, 1200);
});

function showToast() {
  toast.style.opacity = '1';
  toast.style.pointerEvents = 'auto';
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.pointerEvents = 'none';
  }, 4000);
}

// ── Smooth anchor scroll (for all internal links) ─────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80; // header height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
