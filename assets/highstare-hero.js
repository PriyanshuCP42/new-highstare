class HighstareHeroSlideshow extends HTMLElement {
  connectedCallback() {
    this.slides = [...this.querySelectorAll('[data-slide]')];
    if (this.slides.length <= 1) return;

    this.current = 0;
    this.autoplayMs = Number(this.dataset.autoplay) || 5000;
    this.timer = null;
    this.isPaused = false;

    this.dots = [...this.querySelectorAll('[data-dot]')];
    this.prevBtn = this.querySelector('[data-prev]');
    this.nextBtn = this.querySelector('[data-next]');

    this.prevBtn?.addEventListener('click', () => this.goTo(this.current - 1));
    this.nextBtn?.addEventListener('click', () => this.goTo(this.current + 1));

    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goTo(index));
    });

    this.addEventListener('mouseenter', () => {
      this.isPaused = true;
      this.stopAutoplay();
    });

    this.addEventListener('mouseleave', () => {
      this.isPaused = false;
      this.startAutoplay();
    });

    this.addEventListener('focusin', () => {
      this.isPaused = true;
      this.stopAutoplay();
    });

    this.addEventListener('focusout', (event) => {
      if (!this.contains(event.relatedTarget)) {
        this.isPaused = false;
        this.startAutoplay();
      }
    });

    this.startAutoplay();
  }

  goTo(index) {
    const total = this.slides.length;
    this.current = ((index % total) + total) % total;
    this.update();
  }

  update() {
    this.slides.forEach((slide, index) => {
      const isActive = index === this.current;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });

    this.dots.forEach((dot, index) => {
      const isActive = index === this.current;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  next() {
    this.goTo(this.current + 1);
  }

  startAutoplay() {
    this.stopAutoplay();
    if (this.isPaused || this.slides.length <= 1) return;
    this.timer = window.setInterval(() => this.next(), this.autoplayMs);
  }

  stopAutoplay() {
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  }

  disconnectedCallback() {
    this.stopAutoplay();
  }
}

if (!customElements.get('highstare-hero-slideshow')) {
  customElements.define('highstare-hero-slideshow', HighstareHeroSlideshow);
}
