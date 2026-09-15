/* Theme */
const theme = localStorage.getItem('theme') || 'dark';
document.documentElement.classList.toggle('dark', theme === 'dark');

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeIcons();
  updateHeader();
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  const sun = document.getElementById('icon-sun');
  const moon = document.getElementById('icon-moon');
  if (sun) sun.classList.toggle('hidden', isDark);
  if (moon) moon.classList.toggle('hidden', !isDark);
}

updateThemeIcons();

/* Header transparente → sólido no scroll */
const siteHeader = document.getElementById('site-header');
const logoLight = document.getElementById('logo-light');
const logoDark = document.getElementById('logo-dark');

function updateHeader() {
  if (!siteHeader) return;
  const scrolled = window.scrollY > 48;
  const isDark = document.documentElement.classList.contains('dark');

  siteHeader.classList.toggle('header-scrolled', scrolled);
  siteHeader.classList.toggle('bg-transparent', !scrolled);
  siteHeader.classList.toggle('border-transparent', !scrolled);
  siteHeader.classList.toggle('bg-cream/95', scrolled);
  siteHeader.classList.toggle('dark:bg-navy/95', scrolled);
  siteHeader.classList.toggle('backdrop-blur-xl', scrolled);
  siteHeader.classList.toggle('border-primary/10', scrolled);

  if (logoLight && logoDark) {
    const showDarkLogo = scrolled && !isDark;
    logoLight.classList.toggle('hidden', showDarkLogo);
    logoDark.classList.toggle('hidden', !showDarkLogo);
  }

  siteHeader.querySelectorAll('.header-nav-link').forEach((link) => {
    const isActive = link.classList.contains('nav-active');
    link.classList.toggle('text-primary', isActive);
    link.classList.toggle('text-white', !scrolled && !isActive);
    link.classList.toggle('text-navy', scrolled && !isActive);
    link.classList.toggle('dark:text-white', scrolled && !isActive);
  });

  siteHeader.querySelectorAll('.header-icon-btn').forEach((btn) => {
    btn.classList.toggle('text-white', !scrolled);
    btn.classList.toggle('text-navy', scrolled);
    btn.classList.toggle('dark:text-white', scrolled);
  });

  const waBtn = siteHeader.querySelector('.header-wa-btn');
  if (waBtn) {
    waBtn.classList.toggle('border-white/40', !scrolled);
    waBtn.classList.toggle('border-primary/30', scrolled);
    waBtn.classList.toggle('text-white', !scrolled);
    waBtn.classList.toggle('text-navy', scrolled);
    waBtn.classList.toggle('dark:text-white', scrolled);
  }

  const hamburger = siteHeader.querySelector('#menu-toggle');
  if (hamburger) {
    hamburger.classList.toggle('text-white', !scrolled);
    hamburger.classList.toggle('text-navy', scrolled);
    hamburger.classList.toggle('dark:text-white', scrolled);
  }
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

/* Mobile menu */
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const overlay = document.getElementById('overlay');

function openMenu() {
  if (!mobileMenu || !overlay) return;
  mobileMenu.classList.remove('translate-x-full');
  overlay.classList.remove('hidden');
  setTimeout(() => overlay.classList.add('opacity-100'), 10);
  document.body.classList.add('overflow-hidden');
  const icon = menuToggle?.querySelector('i');
  if (icon) icon.classList.replace('fa-bars', 'fa-xmark');
}

function closeMenu() {
  if (!mobileMenu || !overlay) return;
  mobileMenu.classList.add('translate-x-full');
  overlay.classList.remove('opacity-100');
  setTimeout(() => overlay.classList.add('hidden'), 300);
  document.body.classList.remove('overflow-hidden');
  const icon = menuToggle?.querySelector('i');
  if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
}

if (menuToggle) {
  menuToggle.addEventListener('click', openMenu);
}
if (overlay) {
  overlay.addEventListener('click', closeMenu);
}
document.querySelectorAll('.mobile-link').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

/* LGPD */
function showLGPD() {
  if (localStorage.getItem('lgpd-accepted')) return;
  const popup = document.getElementById('lgpd-popup');
  if (!popup) return;
  setTimeout(() => {
    popup.classList.remove('translate-y-4', 'opacity-0');
    popup.classList.add('translate-y-0', 'opacity-100');
  }, 2000);
}

function acceptLGPD() {
  localStorage.setItem('lgpd-accepted', 'true');
  closeLGPD();
}

function closeLGPD() {
  const popup = document.getElementById('lgpd-popup');
  if (!popup) return;
  popup.classList.add('translate-y-4', 'opacity-0');
  popup.classList.remove('translate-y-0', 'opacity-100');
}

showLGPD();

/* Carousel genérico — crossfade + slide suave, sem estourar a altura da caixa */
function initCarousel(containerId, prevId, nextId, dotsClass) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const slides = Array.from(container.querySelectorAll('[data-slide]'));
  const dots = document.querySelectorAll(`.${dotsClass}`);
  let current = 0;
  let animating = false;

  container.style.position = 'relative';
  container.style.transition = 'height 400ms ease';
  container.style.overflow = 'hidden';
  slides.forEach((slide) => {
    slide.style.position = 'absolute';
    slide.style.top = '0';
    slide.style.left = '0';
    slide.style.width = '100%';
    slide.style.transition = 'opacity 400ms ease, transform 400ms ease';
  });

  function setHeight(slide) {
    container.style.height = `${slide.offsetHeight}px`;
  }

  function goTo(index, direction = 1) {
    if (animating) return;
    const next = (index + slides.length) % slides.length;
    if (next === current) return;
    animating = true;

    slides[next].classList.remove('hidden');
    slides[next].style.opacity = '0';
    slides[next].style.transform = `translateX(${direction * 24}px)`;
    setHeight(slides[next]);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        slides[current].style.opacity = '0';
        slides[current].style.transform = `translateX(${-direction * 24}px)`;
        slides[next].style.opacity = '1';
        slides[next].style.transform = 'translateX(0)';
      });
    });

    setTimeout(() => {
      slides[current].classList.add('hidden');
      current = next;
      animating = false;
    }, 400);

    dots.forEach((dot, i) => {
      dot.classList.toggle('bg-primary', i === next);
      dot.classList.toggle('bg-primary/30', i !== next);
      dot.classList.toggle('w-8', i === next);
      dot.classList.toggle('w-2', i !== next);
    });
  }

  const prev = document.getElementById(prevId);
  const next = document.getElementById(nextId);
  if (prev) prev.addEventListener('click', () => goTo(current - 1, -1));
  if (next) next.addEventListener('click', () => goTo(current + 1, 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i, i > current ? 1 : -1)));

  slides.forEach((slide, i) => {
    slide.classList.toggle('hidden', i !== 0);
    slide.style.opacity = i === 0 ? '1' : '0';
  });
  setHeight(slides[0]);
  dots.forEach((dot, i) => {
    dot.classList.toggle('bg-primary', i === 0);
    dot.classList.toggle('bg-primary/30', i !== 0);
    dot.classList.toggle('w-8', i === 0);
    dot.classList.toggle('w-2', i !== 0);
  });

  window.addEventListener('resize', () => setHeight(slides[current]));
}

initCarousel('depoimentos-carousel', 'dep-prev', 'dep-next', 'dep-dot');
initCarousel('projetos-carousel', 'proj-prev', 'proj-next', 'proj-dot');

/* Formulário de contato → grava lead no Google Sheets (Apps Script) e abre WhatsApp */
const WEBHOOK_DO_PROJETO = 'https://script.google.com/macros/s/AKfycbzrCUZW6XviaIMgF66zlWztg5hS4XF-r8FFm0mhktdRo9FP9wh25R3KYRimYIaIS_Vx/exec';

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    const data = Object.fromEntries(new FormData(contactForm));
    data.url = window.location.href;

    try {
      await fetch(WEBHOOK_DO_PROJETO, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(data),
        mode: 'no-cors',
      });
    } catch (err) {
      console.error(err);
    }

    const linhas = [
      `Olá, vim pelo site Do Valle Engenharia.`,
      `Nome: ${data.nome || ''}`,
      `E-mail: ${data.email || ''}`,
      `Telefone: ${data.telefone || ''}`,
      data.empresa ? `Empresa: ${data.empresa}` : null,
      `Mensagem: ${data.mensagem || ''}`,
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/5541999974479?text=${encodeURIComponent(linhas)}`, '_blank', 'noopener,noreferrer');

    contactForm.reset();
    btn.disabled = false;
    btn.innerHTML = original;
  });
}

/* Vídeo institucional — carrega só quando o visitante pede play */
document.querySelectorAll('[data-video-wrap]').forEach((wrap) => {
  const video = wrap.querySelector('[data-video]');
  const botao = wrap.querySelector('[data-video-play]');
  if (!video || !botao) return;

  botao.addEventListener('click', () => {
    video.setAttribute('controls', '');
    video.play();
    botao.classList.add('hidden');
  });

  video.addEventListener('pause', () => {
    if (video.currentTime === 0 || video.ended) botao.classList.remove('hidden');
  });
});

/* Galeria de projetos + lightbox */
(function initGaleria() {
  const galeria = document.getElementById('galeria');
  const lightbox = document.getElementById('lightbox');
  if (!galeria || !lightbox) return;

  const itens = Array.from(galeria.querySelectorAll('[data-galeria-item]'));
  const img = document.getElementById('lightbox-img');
  const legenda = document.getElementById('lightbox-caption');
  const btnMais = document.getElementById('galeria-mais');
  let atual = 0;

  function mostrar(index) {
    atual = (index + itens.length) % itens.length;
    const item = itens[atual];
    img.src = item.dataset.full;
    img.alt = item.dataset.caption;
    legenda.textContent = item.dataset.caption;
  }

  function abrir(index) {
    mostrar(index);
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.classList.add('overflow-hidden');
  }

  function fechar() {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
    img.src = '';
  }

  itens.forEach((item, i) => item.addEventListener('click', () => abrir(i)));
  document.getElementById('lightbox-close').addEventListener('click', fechar);
  document.getElementById('lightbox-prev').addEventListener('click', () => mostrar(atual - 1));
  document.getElementById('lightbox-next').addEventListener('click', () => mostrar(atual + 1));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) fechar();
  });
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') fechar();
    if (e.key === 'ArrowLeft') mostrar(atual - 1);
    if (e.key === 'ArrowRight') mostrar(atual + 1);
  });

  if (btnMais) {
    const escondidas = galeria.querySelectorAll('[data-galeria-extra]');
    if (!escondidas.length) {
      btnMais.classList.add('hidden');
    } else {
      btnMais.addEventListener('click', () => {
        escondidas.forEach((el) => {
          el.hidden = false;
        });
        btnMais.classList.add('hidden');
        if (typeof AOS !== 'undefined') AOS.refresh();
      });
    }
  }
})();

/* AOS */
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
  });
}
