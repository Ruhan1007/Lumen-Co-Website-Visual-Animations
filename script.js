document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const navLinks = document.querySelectorAll('.site-nav a');

  menuToggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      menuToggle?.setAttribute('aria-label', 'Open menu');
    });
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Smooth reveal animations as sections enter the viewport.
  const revealItems = document.querySelectorAll('.reveal, .reveal-section, .reveal-stagger > *');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });
  revealItems.forEach(item => revealObserver.observe(item));

  // Gentle image parallax — intentionally restrained so the site stays fast and clean.
  const parallaxImages = document.querySelectorAll('.parallax-image');
  let ticking = false;
  const updateParallax = () => {
    const y = window.scrollY;
    parallaxImages.forEach(card => {
      const speed = Number(card.dataset.speed || 0.08);
      const rect = card.parentElement.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
      card.style.translate = `0 ${offset}px`;
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
  updateParallax();

  // Keep the header visually quiet while scrolling.
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    document.body.classList.toggle('scrolled', currentY > 12);
    document.body.classList.toggle('scrolling-down', currentY > lastY && currentY > 100);
    lastY = currentY;
  }, { passive: true });
});
