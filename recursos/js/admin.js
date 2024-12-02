document.addEventListener("DOMContentLoaded", function() {
    // Verificar si el botón y el menú de usuario existen
    const userMenuBtn = document.querySelector('.user-menu-btn');  // Seleccionar por clase
    const userMenu = document.querySelector('.user-menu');  // Seleccionar por clase

    // Inicializar la funcionalidad del botón y menú si existen
    if (userMenuBtn && userMenu) {
        initUserMenu(userMenuBtn, userMenu);
    }

    // Cargar estadísticas de asistencia general
    loadAttendanceStats();

    // Función para cargar estadísticas de asistencia
    function loadAttendanceStats() {
        const stats = {
            curso1: 75,
            curso2: 80,
            curso3: 90
        };

        const statsDiv = document.getElementById('attendanceStats');
        if (statsDiv) {
            statsDiv.innerHTML = `
                <ul>
                    <li>Curso 1: ${stats.curso1}%</li>
                    <li>Curso 2: ${stats.curso2}%</li>
                    <li>Curso 3: ${stats.curso3}%</li>
                </ul>
            `;
        }
    }

    // Función para inicializar el botón y el menú de usuario
    function initUserMenu(menuButton, menu) {
        // Agregar funcionalidad para mostrar/ocultar el menú de usuario
        menuButton.addEventListener('click', function(event) {
            event.stopPropagation();  // Evita que el evento se propague al documento
            menu.classList.toggle('show');  // Alterna la clase 'show' en userMenu
        });

        // Cerrar el menú si se hace clic fuera de él
        document.addEventListener('click', function(event) {
            if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
                menu.classList.remove('show');  // Oculta el menú si se hace clic fuera de él
            }
        });
    }

    // Función para cargar los usuarios pendientes
    function loadPendingUsers() {
        // Aquí cargarías los usuarios pendientes de aprobación
    }

    // Función para cargar los usuarios activos
    function loadActiveUsers() {
        // Aquí cargarías los usuarios activos
    }

    // Función para cargar el reporte de asistencia por curso
    function loadAttendanceReport(courseId) {
        // Aquí cargarías el reporte de asistencia del curso seleccionado
    }

    // Manejar la acción de descargar el reporte
    const downloadBtn = document.getElementById('downloadReport');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const courseId = document.getElementById('courseSelect').value;
            if (courseId) {
                loadAttendanceReport(courseId);
            } else {
                alert("Por favor, seleccione un curso.");
            }
        });
    }
});
