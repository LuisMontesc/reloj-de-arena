// ===== FILTRO DE GALERÍA =====
function filtrarGaleria(categoria) {
    const items = document.querySelectorAll('.galeria-item');
    const botones = document.querySelectorAll('.filtro-btn');

    botones.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    items.forEach(item => {
        if (categoria === 'todos' || item.dataset.categoria === categoria) {
            item.classList.remove('oculto');
        } else {
            item.classList.add('oculto');
        }
    });
}

// ===== FORMULARIO DE CONTACTO =====
function enviarFormulario() {
    const nombre = document.querySelector('input[placeholder="Tu nombre"]').value;
    if (nombre.trim() === '') {
        alert('Por favor completa tu nombre.');
        return;
    }
    alert('¡Gracias ' + nombre + '! Tu mensaje fue enviado. Nos comunicaremos contigo pronto.');
}

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const backTop = document.getElementById('backTop');

    // Navbar con clase scrolled
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Botón volver arriba
    if (backTop) {
        if (window.scrollY > 400) {
            backTop.style.display = 'flex';
        } else {
            backTop.style.display = 'none';
        }
    }
});

// ===== NAVEGACIÓN SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function(e) {
        e.preventDefault();
        const destino = document.querySelector(this.getAttribute('href'));
        if (destino) {
            const offset = 75;
            const posicion = destino.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: posicion, behavior: 'smooth' });

            const menu = document.getElementById('menuPrincipal');
            if (menu.classList.contains('show')) {
                document.querySelector('.navbar-toggler').click();
            }
        }
    });
});

// ===== ANIMACIÓN AL HACER SCROLL =====
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Observar secciones
document.querySelectorAll('section').forEach(seccion => {
    seccion.classList.add('fade-in');
    observador.observe(seccion);
});

// Observar tarjetas individuales
document.querySelectorAll(
    '.taller-card, .mvv-card, .actividad-card, .equipo-card, .stat-card'
).forEach(card => {
    observador.observe(card);
});

// ===== LIGHTBOX GALERÍA =====
const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    autoplayVideos: false,
    openEffect: 'zoom',
    closeEffect: 'fade',
    slideEffect: 'slide',
    moreLength: 0,
    closeButton: true,
    touchFollowAxis: true,
    keyboardNavigation: true,
    draggable: true,
    dragToleranceX: 10,
    dragToleranceY: 10,
    dragAutoSnap: false,
    preload: true,
    descPosition: 'bottom',
    skin: 'clean'
});