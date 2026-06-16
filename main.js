// ── Mobile nav toggle ─────────────────────────────────────────────────────
const navToggle  = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

// ── Nav scroll highlight ───────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');

function updateNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) current = sec.id;
  });
  navAs.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? '#fff' : '';
  });
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── Scroll-reveal animations ───────────────────────────────────────────────
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.08 }
);

document.querySelectorAll(
  '.info-card, .change-card, .camp-card, .resource-card, .contact-card, .phase, .pathway-step'
).forEach(el => {
  el.style.opacity  = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(el);
});

document.addEventListener('animationend', () => {}, true);

// Trigger revealed class
const style = document.createElement('style');
style.textContent = '.revealed { opacity: 1 !important; transform: none !important; }';
document.head.appendChild(style);
