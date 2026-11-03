const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
menuToggle?.addEventListener('click', () => { const open = mainNav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', open); });
document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => { mainNav.classList.remove('open'); menuToggle?.setAttribute('aria-expanded','false'); }));
const filterButtons = document.querySelectorAll('.filter-button');
const portfolioCards = document.querySelectorAll('.portfolio-card');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-selected', item === button); });
  portfolioCards.forEach(card => { const visible = filter === 'todos' || card.dataset.category.includes(filter); card.classList.toggle('is-hidden', !visible); });
}));
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), {threshold:.12});
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
document.getElementById('year').textContent = new Date().getFullYear();

// Permite visualizar os trabalhos em tamanho maior sem sair da página.
const lightbox = document.querySelector('.image-lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const portfolioImages = document.querySelectorAll('.portfolio-card:not(.portfolio-card-placeholder) img');
let lastFocusedImage = null;

const closeLightbox = () => {
  if (!lightbox || lightbox.hidden) return;
  lightbox.hidden = true;
  document.body.classList.remove('lightbox-open');
  lastFocusedImage?.focus();
};

const openLightbox = (image) => {
  if (!lightbox || !lightboxImage) return;
  lastFocusedImage = image;
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightbox.hidden = false;
  document.body.classList.add('lightbox-open');
  lightboxClose?.focus();
};

portfolioImages.forEach(image => {
  image.addEventListener('click', () => openLightbox(image));
  image.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLightbox(image);
    }
  });
});

lightbox?.addEventListener('click', event => {
  if (event.target.matches('[data-lightbox-close]')) closeLightbox();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeLightbox();
});


// Exibe o atalho do WhatsApp assim que a pessoa começa a rolar a página.
const floatingWhatsApp = document.querySelector('.floating-whatsapp');
if (floatingWhatsApp) {
  const revealWhatsApp = () => {
    floatingWhatsApp.classList.toggle('is-visible', window.scrollY > 80);
  };
  window.addEventListener('scroll', revealWhatsApp, { passive: true });
  revealWhatsApp();
}
