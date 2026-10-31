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


// Exibe o atalho do WhatsApp assim que a pessoa começa a rolar a página.
const floatingWhatsApp = document.querySelector('.floating-whatsapp');
if (floatingWhatsApp) {
  const revealWhatsApp = () => {
    floatingWhatsApp.classList.toggle('is-visible', window.scrollY > 80);
  };
  window.addEventListener('scroll', revealWhatsApp, { passive: true });
  revealWhatsApp();
}
