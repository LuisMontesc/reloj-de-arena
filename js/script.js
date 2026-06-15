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

// ===== FORMULARIO DE CONTACTO CON EMAILJS =====
function enviarFormulario() {
    const nombre   = document.getElementById('form-nombre').value.trim();
    const correo   = document.getElementById('form-correo').value.trim();
    const asunto   = document.getElementById('form-asunto').value.trim();
    const mensaje  = document.getElementById('form-mensaje').value.trim();
    const btnEnviar = document.getElementById('btn-enviar');
    const respuesta = document.getElementById('form-respuesta');

    // Validaciones
    if (!nombre) {
        mostrarRespuesta('error', 'Por favor escribe tu nombre.');
        return;
    }
    if (!correo) {
        mostrarRespuesta('error', 'Por favor escribe tu correo.');
        return;
    }
    if (!asunto) {
        mostrarRespuesta('error', 'Por favor selecciona un asunto.');
        return;
    }
    if (!mensaje) {
        mostrarRespuesta('error', 'Por favor escribe tu mensaje.');
        return;
    }

    // Cambia el botón a estado cargando
    btnEnviar.disabled = true;
    btnEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    // Parámetros para EmailJS
    const parametros = {
        nombre:  nombre,
        correo:  correo,
        asunto:  asunto,
        mensaje: mensaje
    };

    emailjs.send('reloj_de_arena', 'template_reloj', parametros)
        .then(() => {
            mostrarRespuesta('exito', '¡Mensaje enviado! Nos comunicaremos contigo pronto.');
            document.getElementById('form-nombre').value = '';
            document.getElementById('form-correo').value = '';
            document.getElementById('form-asunto').value = '';
            document.getElementById('form-mensaje').value = '';
            btnEnviar.disabled = false;
            btnEnviar.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje';
        })
        .catch((error) => {
            mostrarRespuesta('error', 'Hubo un error al enviar. Intenta de nuevo o contáctanos por WhatsApp.');
            btnEnviar.disabled = false;
            btnEnviar.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje';
            console.error('EmailJS error:', error);
        });
}

function mostrarRespuesta(tipo, texto) {
    const respuesta = document.getElementById('form-respuesta');
    respuesta.innerHTML = `
        <div class="form-mensaje-${tipo}">
            <i class="fas fa-${tipo === 'exito' ? 'check-circle' : 'exclamation-circle'}"></i>
            ${texto}
        </div>
    `;
    setTimeout(() => { respuesta.innerHTML = ''; }, 5000);
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

// ===== CONTADOR ANIMADO =====
function animarContador(elemento) {
    const objetivo = parseInt(elemento.getAttribute('data-objetivo'));
    const inicio = parseInt(elemento.getAttribute('data-inicio'));
    const duracion = 2000;
    const pasos = 60;
    const incremento = (objetivo - inicio) / pasos;
    let actual = inicio;
    let paso = 0;

    const intervalo = setInterval(() => {
        paso++;
        actual += incremento;

        if (paso >= pasos) {
            elemento.textContent = objetivo;
            clearInterval(intervalo);
        } else {
            elemento.textContent = Math.floor(actual);
        }
    }, duracion / pasos);
}

const observadorContador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            const contadores = entrada.target.querySelectorAll('.contador');
            contadores.forEach(contador => {
                if (!contador.classList.contains('animado')) {
                    contador.classList.add('animado');
                    animarContador(contador);
                }
            });
        }
    });
}, { threshold: 0.5 });

const seccionNosotros = document.getElementById('nosotros');
if (seccionNosotros) {
    observadorContador.observe(seccionNosotros);
}

// ===== SECCIÓN ACTIVA EN NAVBAR =====
const secciones = document.querySelectorAll('section[id]');
const linksNav = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let seccionActual = '';
    const offset = 100;

    secciones.forEach(seccion => {
        const tope = seccion.offsetTop - offset;
        const altura = seccion.offsetHeight;

        if (window.scrollY >= tope && window.scrollY < tope + altura) {
            seccionActual = seccion.getAttribute('id');
        }
    });

    linksNav.forEach(link => {
        link.classList.remove('nav-activo');
        if (link.getAttribute('href') === '#' + seccionActual) {
            link.classList.add('nav-activo');
        }
    });
});

// ===== PRELOADER =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('oculto');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    }, 2500);
});