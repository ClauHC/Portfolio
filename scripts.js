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
                                        <img src="${project.imagen}" alt="${project.nombre}">
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
                                        <img src="${project.imagen}" alt="${project.nombre}">
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


