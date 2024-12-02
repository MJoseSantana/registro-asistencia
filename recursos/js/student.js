document.addEventListener("DOMContentLoaded", function () {
    function loadStudentData() {
        fetch("../../data/estudiantes.json")
            .then(response => response.json())
            .then(data => {
                const estudiante = data.estudiante;

                // Cargar datos del dashboard
                if (document.body.contains(document.getElementById("total-cursos"))) {
                    const dashboardData = estudiante.dashboard;

                    document.getElementById("total-cursos").textContent = dashboardData.totalCursos;
                    document.getElementById("total-estudiantes").textContent = dashboardData.totalEstudiantes;
                    document.getElementById("total-justificaciones").textContent = dashboardData.totalJustificacionesPendientes;
                    document.getElementById("total-asistencias").textContent = dashboardData.totalAsistencias;
                }

                // Cargar datos de asistencias
                if (document.body.contains(document.getElementById("attendance-stats"))) {
                    const courses = estudiante.asistencias;
                    const coursesList = document.getElementById("attendance-stats");
                    coursesList.innerHTML = ''; // Limpia el contenido previo

                    courses.forEach(course => {
                        const courseItem = document.createElement("div");
                        courseItem.classList.add("course-item");

                        courseItem.innerHTML = `
                            <h4>${course.curso}</h4>
                            <p>Total de clases: ${course.totalClases}</p>
                            <p>Asistencias: ${course.asistencias}</p>
                            <p>Porcentaje de asistencia: ${course.porcentaje.toFixed(2)}%</p>
                        `;
                        coursesList.appendChild(courseItem);
                    });
                }

                // Cargar datos de justificaciones
                if (document.body.contains(document.getElementById("justifications-table"))) {
                    const justifications = estudiante.justificaciones;
                    const justificationsTableBody = document.getElementById("justifications-table").querySelector("tbody");
                    justificationsTableBody.innerHTML = ''; // Limpia el contenido previo

                    justifications.forEach(justification => {
                        const row = document.createElement("tr");

                        row.innerHTML = `
                            <td>${justification.fecha}</td>
                            <td>${justification.curso}</td>
                            <td>${justification.motivo}</td>
                            <td>${justification.estado}</td>
                        `;
                        justificationsTableBody.appendChild(row);
                    });
                }
            })
            .catch(error => {
                console.error("Error al cargar los datos del estudiante:", error);

                if (document.body.contains(document.getElementById("attendance-stats"))) {
                    document.getElementById("attendance-stats").innerHTML = "<p>Error al cargar las asistencias.</p>";
                }
                if (document.body.contains(document.getElementById("justifications-table"))) {
                    document.getElementById("justifications-table").querySelector("tbody").innerHTML = "<tr><td colspan='4'>Error al cargar las justificaciones.</td></tr>";
                }
                if (document.body.contains(document.getElementById("total-cursos"))) {
                    document.getElementById("dashboard-stats").innerHTML = "<p>Error al cargar el dashboard.</p>";
                }
            });
    }

    function handleUserMenu() {
        const userMenuBtn = document.querySelector(".user-menu-btn");
        const userMenu = document.querySelector(".user-menu");

        if (userMenuBtn) {
            userMenuBtn.addEventListener("click", function (event) {
                event.stopPropagation();
                userMenu.classList.toggle("show");
            });
        }

        document.addEventListener("click", function (event) {
            if (!userMenu.contains(event.target) && !userMenuBtn.contains(event.target)) {
                userMenu.classList.remove("show");
            }
        });
    }

    loadStudentData();
    handleUserMenu();
});
