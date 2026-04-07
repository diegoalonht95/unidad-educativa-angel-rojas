// ===== MENÚ HAMBURGUESA =====
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('open');
}

// Cerrar menú al hacer clic en un link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// ===== SCROLL REVEAL CON EFECTOS =====
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, index) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }, index * 100);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// ===== NAV SCROLL EFFECT =====
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  lastScrollY = window.scrollY;
  
  navbar.style.background = 
    window.scrollY > 40 
      ? 'rgba(26,92,58,.98)' 
      : 'rgba(26,92,58,.97)';
  
  // Añadir sombra mejorada al scroll
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 32px rgba(0,0,0,.3)';
  } else {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,.25)';
  }
});

// ===== CONTADOR DE ESTADÍSTICAS ANIMADO =====
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  
  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current) + (target > 100 ? '' : '');
    }
  }, 16);
}

// Detectar cuando los stats son visibles
const statsBar = document.querySelector('.stats-bar');
let statsAnimated = false;

if (statsBar) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        document.querySelectorAll('.stat-num').forEach(stat => {
          const text = stat.textContent;
          const number = parseInt(text.replace(/\D/g, ''));
          animateCounter(stat, number);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statsObserver.observe(statsBar);
}

// ===== EFECTO PARALLAX MEJORADO =====
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.backgroundPosition = `center ${window.scrollY * 0.5}px`;
  }
});

// ===== FORMULARIO MEJORADO =====
function enviarFormulario(e) {
  e.preventDefault();
  
  const nombre = document.querySelector('.contact-form-wrap input[type="text"]').value;
  const email = document.querySelector('.contact-form-wrap input[type="email"]').value;
  const mensaje = document.querySelector('.contact-form-wrap textarea').value;
  
  if (!nombre || !email || !mensaje) {
    alert('Por favor completa todos los campos');
    return;
  }
  
  const msg = document.getElementById('form-msg');
  msg.style.display = 'block';
  msg.textContent = '✅ ¡Mensaje enviado correctamente! Te responderemos pronto.';
  
  // Limpiar formulario
  setTimeout(() => {
    document.querySelector('.contact-form-wrap').reset();
    msg.style.display = 'none';
  }, 3000);
}

// ===== EFECTO SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== EFECTO DE CARGA PROGRESIVA =====
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  document.querySelectorAll('img').forEach(img => {
    img.style.transition = 'opacity 0.3s ease';
  });
});

// ===== ANIMACIÓN DE HOVER EN TARJETAS =====
document.querySelectorAll('.news-card, .level-card, .team-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// ===== LAZY LOADING DE IMÁGENES =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===== EFECTO DE SCROLL PROGRESS =====
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #6b7280, #9ca3af);
  z-index: 1000;
  transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
  const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  scrollProgress.style.width = scrollPercent + '%';
});

// ===== EFECTOS DE SONIDO SUAVE (Opcional) =====
function playClickSound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 800;
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
}

// Agregar efecto click a botones
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    try {
      playClickSound();
    } catch(e) {
      // Silenciosamente ignorar si no está soportado
    }
  });
});

// ===== TOOLTIP FUNCIONAL =====
document.querySelectorAll('[title]').forEach(el => {
  el.addEventListener('mouseenter', function() {
    const tooltip = document.createElement('div');
    tooltip.textContent = this.title;
    tooltip.style.cssText = `
      position: fixed;
      background: rgba(26,92,58, 0.95);
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      z-index: 999;
      pointer-events: none;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = this.getBoundingClientRect();
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    tooltip.style.left = (rect.left + (rect.width - tooltip.offsetWidth) / 2) + 'px';
    
    this.addEventListener('mouseleave', () => {
      tooltip.remove();
    }, { once: true });
  });
});

// ===== DETECCIÓN DE MODO OSCURO Y SOPORTE =====
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.style.colorScheme = 'dark';
}

console.log('✅ Script cargado correctamente con todos los efectos y funcionalidades modernas');

