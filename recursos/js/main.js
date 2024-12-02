// main.js
document.addEventListener("DOMContentLoaded", function() {
    // Función para establecer la fecha actual en cualquier campo de fecha
    const dateFields = document.querySelectorAll(".current-date");
    dateFields.forEach(field => {
        field.value = new Date().toISOString().slice(0, 10);
    });

    // Función para redirigir al usuario según rol
    function redirectUser(role) {
        switch(role) {
            case 'admin':
                window.location.href = "/vistas/admin/dashboard.html";
                break;
            case 'profesor':
                window.location.href = "/vistas/profesor/dashboard.html";
                break;
            case 'estudiante':
                window.location.href = "/vistas/estudiante/dashboard.html";
                break;
            default:
                alert("Rol no válido");
        }
    }

    // Cargar y procesar el archivo XML de asistencia
    async function loadAttendanceXML() {
        try {
            const response = await fetch('/data/asistencia.xml');
            const textData = await response.text();

            // Parsear el XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(textData, "application/xml");

            // Procesar los datos de asistencia
            const asistencias = xmlDoc.getElementsByTagName("asistencia");
            asistencias.forEach(asistencia => {
                const estudiante = asistencia.getElementsByTagName("estudiante")[0].textContent;
                const fecha = asistencia.getElementsByTagName("fecha")[0].textContent;
                const estado = asistencia.getElementsByTagName("estado")[0].textContent;

                console.log(`Estudiante: ${estudiante}, Fecha: ${fecha}, Estado: ${estado}`);
            });
        } catch (error) {
            console.error("Error al cargar la asistencia:", error);
        }
    }

    // Llama a la función para cargar el XML al cargar la página
    loadAttendanceXML();

    // Manejo de confirmación para eliminación de usuario
    const deleteButtons = document.querySelectorAll(".btn-delete");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
                event.preventDefault();
            }
        });
    });
});
