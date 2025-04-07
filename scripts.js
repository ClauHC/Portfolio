// -------------------- TOP HOVER MANOS-AMPERSAND ------------------------


// const CONTAINER = document.querySelector('.container');
// const LEFT_ZONE = document.querySelector('.left');
// const RIGHT_ZONE = document.querySelector('.right');

// LEFT_ZONE.addEventListener('mouseover', () => {
//     CONTAINER.classList.add('hover_left');
//     CONTAINER.classList.remove('hover_right');
// });

// RIGHT_ZONE.addEventListener('mouseover', () => {
//     CONTAINER.classList.add('hover_right');
//     CONTAINER.classList.remove('hover_left');
// });

// CONTAINER.addEventListener('mouseleave', () => {
//     CONTAINER.classList.remove('hover_left');
//     CONTAINER.classList.remove('hover_right');
// });

// //función para ocultar imagen rota y aplicar un degradado
// function handleAmpersandError(img) {
//     // Oculta la imagen rota
//     img.style.display = 'none';

//     // Aplica un degradado al contenedor de la imagen
//     const parent = img.parentElement;
//     parent.style.background = 'linear-gradient(90deg, black, transparent)'; // Cambia los colores según tu diseño
//     parent.style.backgroundSize = 'cover'; // Asegura que el degradado ocupe todo el espacio
//     parent.style.backgroundPosition = 'center';
//     parent.style.transition = 'transform 0.3s ease'; // Sincroniza la transición con el hover
// }


/* ------- TOP HOVER MANOS-AMPERSAND Mantiene PC y TABLET, cambia en MOVIL ------- */


document.addEventListener('DOMContentLoaded', () => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const container = document.querySelector('.container');
    const center = document.querySelector('.center');
    const leftZone = document.querySelector('.left');
    const rightZone = document.querySelector('.right');

    function handleAmpersandView(e) {
        if (e.matches) {
            // Cambios para móviles
            container.style.display = 'inline-block';
            container.style.flexDirection = '';
            container.style.justifyContent = '';
            container.style.alignItems = '';
            container.style.height = 'auto';
            container.style.backgroundColor = 'black'; // Fondo negro

            // Elimina las clases de hover
            container.classList.remove('hover_left');
            container.classList.remove('hover_right');

            // Elimina los eventos de hover
            leftZone.removeEventListener('mouseover', handleHoverLeft);
            rightZone.removeEventListener('mouseover', handleHoverRight);
            container.removeEventListener('mouseleave', handleMouseLeave);

            // Cambiar la imagen del centro
            center.innerHTML = '<img src="img/manos_ampersand_opcional_white.png" alt="Ampersand móvil">';

            // Mostrar solo el primer y segundo hijos de .content
            const contents = document.querySelectorAll('.content');
            contents.forEach(content => {
                Array.from(content.children).forEach((child, index) => {
                    if (index >= 2) {
                        child.style.display = 'none'; // Oculta hijos a partir del tercero
                    } else {
                        child.style.display = 'block'; // Asegura que los dos primeros sean visibles
                    }
                });
            });
        } else {
            // Restaurar el comportamiento original en tablets y PC
            container.style.display = 'flex';
            container.style.flexDirection = '';
            container.style.justifyContent = '';
            container.style.alignItems = '';
            container.style.height = '';
            container.style.backgroundColor = '';

            // Restaurar las animaciones de hover
            leftZone.addEventListener('mouseover', handleHoverLeft);
            rightZone.addEventListener('mouseover', handleHoverRight);
            container.addEventListener('mouseleave', handleMouseLeave);

            // Cambiar la imagen del centro
            center.innerHTML = '<img src="img/manos_ampersand.png" alt="Ampersand PC/Tablet">';

            // Restaurar visibilidad de todos los hijos de .content
            const contents = document.querySelectorAll('.content');
            contents.forEach(content => {
                Array.from(content.children).forEach(child => {
                    child.style.display = ''; // Restaura el estilo original
                });
            });
        }
    }

    // Funciones para manejar el hover
    function handleHoverLeft() {
        container.classList.add('hover_left');
        container.classList.remove('hover_right');
    }

    function handleHoverRight() {
        container.classList.add('hover_right');
        container.classList.remove('hover_left');
    }

    function handleMouseLeave() {
        container.classList.remove('hover_left');
        container.classList.remove('hover_right');
    }

    // Escuchar cambios en la media query
    mediaQuery.addEventListener('change', handleAmpersandView);

    // Ejecutar la función inicial según el tamaño de la pantalla
    handleAmpersandView(mediaQuery);
});


// -------------------- SCROLL TO PROYECTS ------------------------

const SCROLL_BUTTON = document.getElementById('scrollDown');

SCROLL_BUTTON.addEventListener('click', goToProjects);

function goToProjects() {
    const GO_TO_PROYECTS = document.getElementById('graphicProjects');
    if (GO_TO_PROYECTS) {
        GO_TO_PROYECTS.scrollIntoView({ behavior: 'smooth' });
    }
}

// -------------------- LOAD MORE JSON ------------------------

document.addEventListener('DOMContentLoaded', () => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const LOAD_BUTTON = document.getElementById('loadMoreGraph');
    const GRAPH_RESUL_CONTAINER = document.getElementById('graphResultContainer');
    const NO_MORE_RESULTS = document.getElementById('noMoreResults');
    let currentIndex = 4;

    // cargar proyectos en MOVIL
    function loadProjectsMovil(startIndex, endIndex) {
        fetch('json/projects.json')
            .then(response => response.json())
            .then(data => {
                const projectsToShow = data.slice(startIndex, endIndex);

                projectsToShow.forEach(project => {
                    const projectHTML = `
                        <div class="image_column">
                            <a href="${project.link}">
                                <div class="image_overlay">
                                    <img src="${project.imagen}" alt="${project.nombre}" onerror="handleProjectImageError(this)">
                                    <span>Descúbrelo</span>
                                </div>
                            </a>
                        </div>
                        <div class="text_column">
                            <h3>${project.nombre}</h3>
                            <h4>${project.tipologia}</h4>
                            <p>${project.descripcion}</p>
                        </div>
                    `;
                    GRAPH_RESUL_CONTAINER.innerHTML += projectHTML;
                });

                if (currentIndex >= data.length) {
                    NO_MORE_RESULTS.innerHTML += '<h4 class="no_more">No hay más proyectos por ahora :)</h4>';
                    LOAD_BUTTON.textContent = 'VER MENOS -';
                    LOAD_BUTTON.removeEventListener('click', loadMoreProjectsMovil);
                    LOAD_BUTTON.addEventListener('click', seeLessProjectsMovil);
                }
            });
    }

    // cargar más proyectos en MOVIL
    function loadMoreProjectsMovil() {
        loadProjectsMovil(currentIndex, currentIndex + 4);
        currentIndex += 4;
    }

    // ver menos proyectos en MOVIL
    function seeLessProjectsMovil() {
        currentIndex = 4;
        GRAPH_RESUL_CONTAINER.innerHTML = '';
        NO_MORE_RESULTS.innerHTML = '';
        loadProjectsMovil(0, 4);
        LOAD_BUTTON.textContent = 'VER MÁS +';
        LOAD_BUTTON.removeEventListener('click', seeLessProjectsMovil);
        LOAD_BUTTON.addEventListener('click', loadMoreProjectsMovil);

        // Subir hasta el último proyecto visible
        const LAST_PROJECT = document.querySelector('.grid_container > div:last-child');
        if (LAST_PROJECT) {
            LAST_PROJECT.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // cargar proyectos en PC
    function loadProjects(startIndex, endIndex) {
        fetch('json/projects.json')
            .then(response => response.json())
            .then(data => {
                const projectsToShow = data.slice(startIndex, endIndex);

                projectsToShow.forEach(project => {
                    let projectHTML = '';
                    if (project.id % 2 === 0) {
                        projectHTML = `
                            <div class="image_column">
                                <a href="${project.link}">
                                    <div class="image_overlay">
                                        <img src="${project.imagen}" alt="${project.nombre}" onerror="handleProjectImageError(this)"">
                                        <span>Descúbrelo</span>
                                    </div>
                                </a>
                            </div>
                            <div class="text_column">
                                <h3>${project.nombre}</h3>
                                <h4>${project.tipologia}</h4>
                                <p>${project.descripcion}</p>
                            </div>
                        `;
                    } else {
                        projectHTML = `
                            <div class="text_column position_column_2">
                                <h3>${project.nombre}</h3>
                                <h4>${project.tipologia}</h4>
                                <p>${project.descripcion}</p>
                            </div>
                            <div class="image_column">
                                <a href="${project.link}">
                                    <div class="image_overlay">
                                        <img src="${project.imagen}" alt="${project.nombre}" onerror="handleProjectImageError(this)"">
                                        <span>Descúbrelo</span>
                                    </div>
                                </a>
                            </div>
                        `;
                    }
                    GRAPH_RESUL_CONTAINER.innerHTML += projectHTML;
                });

                if (currentIndex >= data.length) {
                    NO_MORE_RESULTS.innerHTML += '<h4 class="no_more">No hay más proyectos por ahora :)</h4>';
                    LOAD_BUTTON.textContent = 'VER MENOS -';
                    LOAD_BUTTON.removeEventListener('click', loadMoreProjects);
                    LOAD_BUTTON.addEventListener('click', seeLessProjects);
                }
            });
    }

    // cargar más proyectos en PC
    function loadMoreProjects() {
        loadProjects(currentIndex, currentIndex + 4);
        currentIndex += 4;
    }

    // ver menos proyectos en PC
    function seeLessProjects() {
        currentIndex = 4;
        GRAPH_RESUL_CONTAINER.innerHTML = '';
        NO_MORE_RESULTS.innerHTML = '';
        loadProjects(0, 4);
        LOAD_BUTTON.textContent = 'VER MÁS +';
        LOAD_BUTTON.removeEventListener('click', seeLessProjects);
        LOAD_BUTTON.addEventListener('click', loadMoreProjects);

        // Subir hasta el último proyecto visible
        const LAST_PROJECT = document.querySelector('.grid_container > div:last-child');
        if (LAST_PROJECT) {
            LAST_PROJECT.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Detectar si el dispositivo tiene un ancho máximo de 768px
    function handleMediaQueryChange(e) {
        if (e.matches) {
            // si es móvil, usa loadProjectsMovil
            GRAPH_RESUL_CONTAINER.innerHTML = '';
            loadProjectsMovil(0, 4);
            LOAD_BUTTON.removeEventListener('click', loadMoreProjects);
            LOAD_BUTTON.addEventListener('click', loadMoreProjectsMovil);
        } else {
            // si no es móvil, usa el original loadProjects
            GRAPH_RESUL_CONTAINER.innerHTML = '';
            loadProjects(0, 4);
            LOAD_BUTTON.removeEventListener('click', loadMoreProjectsMovil);
            LOAD_BUTTON.addEventListener('click', loadMoreProjects);
        }
    }

    // Escuchar cambios en la media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Ejecutar la función inicial según el tamaño de la pantalla
    handleMediaQueryChange(mediaQuery);
});

//--------------------- Imagen no disponible Proyectos ------------------

function handleProjectImageError(img) {
    // Oculta la imagen rota
    img.style.display = 'none';

    // Crea un contenedor para el mensaje de error
    const errorContainer = document.createElement('div');
    errorContainer.style.backgroundColor = 'var(--soft-primary)'; 
    errorContainer.style.color = 'var(--light-primary)'; 
    errorContainer.style.display = 'flex'; 
    errorContainer.style.justifyContent = 'center'; //  horizontalmente
    errorContainer.style.alignItems = 'center'; // verticalmente
    errorContainer.style.fontSize = '0.8rem'; 
    errorContainer.style.textAlign = 'center'; 
    errorContainer.style.width = '100%';
    errorContainer.style.minHeight = '16.88rem'; // misma altura mínima del contenedor
    errorContainer.textContent = 'Imagen no disponible'; 
    errorContainer.style.transition = 'transform 0.3s ease'; 

    // Inserta el contenedor de error en el lugar de la imagen
    img.parentNode.insertBefore(errorContainer, img);
}

//----------------------- Imagen no disponible About --------------------

function handlePersonalPhotoError(img) {
    // Oculta la imagen rota
    img.style.display = 'none';

    // degradado en el contenedor de la imagen
    const parent = img.parentElement;
    parent.style.backgroundColor = 'var(--soft-primary)'; 
    parent.style.minHeight = '300px'; 
}

// -------------------- Validación del teléfono ------------------------
document.querySelector('form').addEventListener('submit', function(e) {
    const phoneInput = document.getElementById('phone');
    const phoneRegex = /^[0-9]{9}$/; // acepta 9 dígitos sin espacios
    
    if (!phoneRegex.test(phoneInput.value)) {
        e.preventDefault();
        alert('Por favor, introduce un número de teléfono válido (9 dígitos)');
        phoneInput.focus();
    }
});

//---------------------- Menu hamb ------------------------
document.addEventListener('DOMContentLoaded', () => {
    const menuHamburger = document.getElementById('menu_hamburger');
    const fullscreenMenu = document.getElementById('fullscreen_menu');

    menuHamburger.addEventListener('click', () => {
        fullscreenMenu.classList.toggle('active'); // saca/oculta menú
    });

    // cierra menú al hacer clic en un enlace
    fullscreenMenu.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            fullscreenMenu.classList.remove('active');
        }
    });
});

//---------------------- Send Button ------------------------
document.getElementById('contact_button').addEventListener('click', () => {
    window.location.href = '#contact';
});

