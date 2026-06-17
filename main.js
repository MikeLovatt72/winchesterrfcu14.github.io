// ── Mobile nav ─────────────────────────────────────────────────────────────
const navToggle  = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  mobileMenu.setAttribute('aria-hidden', String(!open));
});

function closeMobile() {
  mobileMenu.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
}

// Close on outside click
document.addEventListener('click', e => {
  if (!navToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeMobile();
  }
});

// ── Active nav highlight on scroll ────────────────────────────────────────
const sections = document.querySelectorAll('section[id], div[id="top"]');
const navLinks  = document.querySelectorAll('.nav-links a');

function updateNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 90) current = sec.id;
  });
  navLinks.forEach(a => {
    const active = a.getAttribute('href') === '#' + current;
    a.style.color = active ? '#ffffff' : '';
  });
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── Scroll-reveal ──────────────────────────────────────────────────────────
const revealTargets = document.querySelectorAll(
  '.info-card, .change-card, .camp-card-full, .resource-card, ' +
  '.contact-card, .phase, .subunit-card, .sys-phase, ' +
  '.news-card, .welfare-card, .aim'
);

if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.style.opacity  = '1';
          e.target.style.transform = 'translateY(0)';
        }, i * 40);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.06 });

  revealTargets.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    obs.observe(el);
  });
}
