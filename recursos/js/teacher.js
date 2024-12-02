// teacher.js

document.addEventListener('DOMContentLoaded', () => {
    loadCourses();  // Llamamos a la función para cargar los cursos asignados al profesor

    // Inicializamos el botón y el menú de usuario
    const menuButton = document.querySelector('.user-menu-btn');
    const userMenu = document.getElementById('user-menu');
    
    if (menuButton && userMenu) {
        initUserMenu(menuButton, userMenu);
    }

    // Escuchamos clics fuera del menú para cerrarlo
    document.addEventListener('click', (event) => {
        if (userMenu.classList.contains('show') && !userMenu.contains(event.target) && !menuButton.contains(event.target)) {
            userMenu.classList.remove('show');
        }
    });
});

// Función para cargar los cursos asignados
function loadCourses() {
    const courses = [
        { name: "Matemáticas - Cuarto A" },
        { name: "Física - Segundo B" },
        { name: "Química - Primero C" }
    ];

    const coursesList = document.getElementById('courses-list');
    coursesList.innerHTML = '';

    if (courses.length > 0) {
        courses.forEach(course => {
            const courseItem = document.createElement('div');
            courseItem.classList.add('course-item');
            courseItem.innerHTML = `
                <p>${course.name}</p>
                <a href="asistencia.html?course=${encodeURIComponent(course.name)}" class="btn">Gestionar Asistencia</a>
            `;
            coursesList.appendChild(courseItem);
        });
    } else {
        coursesList.innerHTML = '<p>No tienes cursos asignados.</p>';
    }
}

// Función para inicializar el botón y el menú de usuario
function initUserMenu(menuButton, userMenu) {
    menuButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevenimos el cierre inmediato
        toggleUserMenu();
    });
}

function toggleUserMenu() {
    const menu = document.getElementById("user-menu");
    menu.classList.toggle("show");
}


