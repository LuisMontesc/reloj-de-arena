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

// ===== BOTÓN VOLVER ARRIBA =====
window.addEventListener('scroll', () => {
    const backTop = document.getElementById('backTop');
    if (backTop) {
        if (window.scrollY > 400) {
            backTop.style.display = 'flex';
        } else {
            backTop.style.display = 'none';
        }
    }
});

// ===== NAVBAR SCROLL (cambia color al bajar) =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(26,26,26,0.97)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
    } else {
        navbar.style.backgroundColor = 'var(--negro)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== NAVEGACIÓN SUAVE CON OFFSET (por el navbar fijo) =====
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function(e) {
        e.preventDefault();
        const destino = document.querySelector(this.getAttribute('href'));
        if (destino) {
            const offset = 70;
            const posicion = destino.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: posicion, behavior: 'smooth' });

            // Cierra el menú hamburguesa en móvil
            const menu = document.getElementById('menuPrincipal');
            if (menu.classList.contains('show')) {
                const toggler = document.querySelector('.navbar-toggler');
                toggler.click();
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

document.querySelectorAll('section').forEach(seccion => {
    seccion.classList.add('fade-in');
    observador.observe(seccion);
});