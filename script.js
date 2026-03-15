const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    primaryNav.classList.toggle('is-open');
  });

  primaryNav.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
      primaryNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const chips = document.querySelectorAll('.chip');
const projects = document.querySelectorAll('.project-card');

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((button) => button.classList.remove('is-active'));
    chip.classList.add('is-active');
    const filter = chip.dataset.filter;

    projects.forEach((project) => {
      const match = filter === 'all' || project.dataset.category === filter;
      project.hidden = !match;
    });
  });
});

const blogSearch = document.getElementById('blogSearch');
const blogCategory = document.getElementById('blogCategory');
const blogCards = document.querySelectorAll('.blog-card');

function filterBlogs() {
  const query = blogSearch.value.toLowerCase().trim();
  const category = blogCategory.value;

  blogCards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    const categoryMatch = category === 'all' || card.dataset.category === category;
    const queryMatch = text.includes(query);
    card.hidden = !(categoryMatch && queryMatch);
  });
}

blogSearch?.addEventListener('input', filterBlogs);
blogCategory?.addEventListener('change', filterBlogs);

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

function closeLightbox() {
  if (!lightbox) return;
  lightbox.hidden = true;
  if (lightboxImage) lightboxImage.removeAttribute('src');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-lightbox]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = button.dataset.lightbox;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !lightbox.hidden) {
    closeLightbox();
  }
});

const numbers = document.querySelectorAll('.number');
const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.target);
      let current = 0;
      const increment = Math.max(1, Math.round(target / 40));

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = `${target}+`;
          clearInterval(timer);
        } else {
          element.textContent = current;
        }
      }, 24);

      observer.unobserve(element);
    });
  },
  { threshold: 0.5 }
);

numbers.forEach((number) => counterObserver.observe(number));

document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    if (button) {
      const original = button.textContent;
      button.textContent = 'Sent ✓';
      button.disabled = true;
      setTimeout(() => {
        button.textContent = original;
        button.disabled = false;
        form.reset();
      }, 1500);
    }
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
