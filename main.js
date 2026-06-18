// ── Mobile nav ────────────────────────────────────────────────────────────
const navToggle  = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
  });
  document.addEventListener('click', e => {
    if (!navToggle.contains(e.target) && !mobileMenu.contains(e.target)) closeMobile();
  });
}
function closeMobile() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove('open');
  navToggle && navToggle.classList.remove('open');
  navToggle && navToggle.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
}

// ── Active nav highlight ──────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
function updateNav() {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 90) current = s.id; });
  navLinks.forEach(a => { a.style.color = a.getAttribute('href') === '#' + current ? '#fff' : ''; });
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── Zone tabs (subunit pages) ─────────────────────────────────────────────
document.querySelectorAll('.zone-tabs').forEach(tabGroup => {
  tabGroup.querySelectorAll('.zone-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.zone;
      const container = tabGroup.closest('.zone-section');
      container.querySelectorAll('.zone-tab').forEach(t => t.classList.remove('active'));
      container.querySelectorAll('.zone-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      container.querySelector('.zone-panel[data-zone="' + target + '"]').classList.add('active');
    });
  });
});

// ── Scroll-reveal ─────────────────────────────────────────────────────────
if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }, i * 35);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.06 });
  document.querySelectorAll(
    '.info-card,.change-card,.camp-card-full,.resource-card,.contact-card,.phase,' +
    '.pillar-card,.phil-card,.news-card,.welfare-major,.welfare-card,.pos-card,.su-nav-card'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = 'opacity .38s ease, transform .38s ease';
    obs.observe(el);
  });
}
