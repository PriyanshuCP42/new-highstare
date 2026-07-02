document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('[data-hs-menu-toggle]');
  const mobileNav = document.querySelector('[data-hs-mobile-nav]');
  const header = document.querySelector('.hs-header');

  toggle?.addEventListener('click', () => {
    const isOpen = mobileNav?.hasAttribute('hidden') === false;
    if (isOpen) {
      mobileNav?.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      mobileNav?.removeAttribute('hidden');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  let lastScroll = 0;
  window.addEventListener(
    'scroll',
    () => {
      if (!header) return;
      const current = window.scrollY;
      header.classList.toggle('is-scrolled', current > 8);
      lastScroll = current;
    },
    { passive: true }
  );
});
