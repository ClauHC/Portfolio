// -------------------- TOP HOVER MANOS-AMPERSAND ------------------------

const CONTAINER = document.querySelector('.container');
const LEFT_ZONE = document.querySelector('.left');
const RIGHT_ZONE = document.querySelector('.right');

LEFT_ZONE.addEventListener('mouseover', () => {
    CONTAINER.classList.add('hover_left');
    CONTAINER.classList.remove('hover_right');
});

RIGHT_ZONE.addEventListener('mouseover', () => {
    CONTAINER.classList.add('hover_right');
    CONTAINER.classList.remove('hover_left');
});

CONTAINER.addEventListener('mouseleave', () => {
    CONTAINER.classList.remove('hover_left');
    CONTAINER.classList.remove('hover_right');
});

//función para ocultar imagen rota y aplicar un degradado
function handleAmpersandError(img) {
    // Oculta la imagen rota
    img.style.display = 'none';

    // Aplica un degradado al contenedor de la imagen
    const parent = img.parentElement;
    parent.style.background = 'linear-gradient(90deg, black, transparent)'; // Cambia los colores según tu diseño
    parent.style.backgroundSize = 'cover'; // Asegura que el degradado ocupe todo el espacio
    parent.style.backgroundPosition = 'center';
    parent.style.transition = 'transform 0.3s ease'; // Sincroniza la transición con el hover
}

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

//Función para manejar errores de carga de imágenes
function handleImageError(img) {
    // Oculta la imagen rota
    img.style.display = 'none';

    // Aplica un fondo de color al contenedor de la imagen
    const parent = img.parentElement;
    parent.style.backgroundColor = 'var(--soft-primary)';
    parent.style.display = 'flex';
    parent.style.alignItems = 'center';
    parent.style.justifyContent = 'center';
    parent.style.height = '100%'; // Asegura que ocupe todo el espacio del contenedor

    // Asegura de que el texto Descúbrelo permanezca en su lugar
    const discoverText = parent.querySelector('span');
    discoverText.style.position = 'absolute';
    discoverText.style.bottom = '2rem';
    discoverText.style.left = '50%';
    discoverText.style.transform = 'translateX(-50%)';
    discoverText.style.zIndex = '2';

    // Agrega un nuevo elemento para Imagen no disponible
    const errorText = document.createElement('span');
    errorText.textContent = 'Imagen no disponible';
    errorText.style.fontSize = '0.8rem'; // Tamaño más pequeño
    errorText.style.color = 'var(--text-suport)';
    errorText.style.zIndex = '3'; // Asegura de que esté por encima del fondo
    errorText.style.textAlign = 'center';
    errorText.style.position = 'absolute';
    errorText.style.top = '50%';
    errorText.style.left = '50%';
    parent.appendChild(errorText);
}


document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 4; // --> Para que solo cargue cuatro al inicio
    const LOAD_BUTTON = document.getElementById('loadMoreGraph');
    const GRAPH_RESUL_CONTAINER = document.getElementById('graphResultContainer');
    const NO_MORE_RESULTS = document.getElementById('noMoreResults');

    // Función para cargar proyectos
    function loadProjects(startIndex, endIndex) {
        fetch('json/projects.json')
            .then(response => response.json())
            .then(data => {
                const projectsToShow = data.slice(startIndex, endIndex);

                projectsToShow.forEach(project => {
                    let projectHTML = '';
                    if (project.id % 2 === 0) {
                        // Si el id es par  
                        projectHTML = `
                            <div class="image_column">
                                <a href="${project.link}">
                                    <div class="image_overlay">
                                        <img src="${project.imagen}" alt="${project.nombre}" onerror="handleImageError(this)">
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
                        // Si el id es impar
                        projectHTML = `
                            <div class="text_column position_column_2">
                                <h3>${project.nombre}</h3>
                                <h4>${project.tipologia}</h4>
                                <p>${project.descripcion}</p>
                            </div>
                            <div class="image_column">
                                <a href="${project.link}">
                                    <div class="image_overlay">
                                        <img src="${project.imagen}" alt="${project.nombre}" onerror="handleImageError(this)">
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
    

    

    // Función para cargar más proyectos
    function loadMoreProjects() {
        loadProjects(currentIndex, currentIndex + 4);
        currentIndex += 4;
    }

    // Función para ver menos proyectos
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

    // Cargar los primeros proyectos al cargar la página
    loadProjects(0, 4);

    LOAD_BUTTON.addEventListener('click', loadMoreProjects);

});
//----------------------- Imagen no disponible About --------------------

function handlePersonalPhotoError(img) {
    // Oculta la imagen rota
    img.style.display = 'none';

    // Aplica un degradado al contenedor de la imagen
    const parent = img.parentElement;
    parent.style.backgroundColor = 'var(--soft-primary)'; 
    parent.style.minHeight = '300px'; 
}

// -------------------- Validación del teléfono ------------------------
document.querySelector('form').addEventListener('submit', function(e) {
    const phoneInput = document.getElementById('phone');
    const phoneRegex = /^[0-9]{9}$/; // Acepta 9 dígitos sin espacios
    
    if (!phoneRegex.test(phoneInput.value)) {
        e.preventDefault();
        alert('Por favor, introduce un número de teléfono válido (9 dígitos)');
        phoneInput.focus();
    }
});


