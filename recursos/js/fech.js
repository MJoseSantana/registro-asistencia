const fs = require('fs');

// Función para cargar los datos desde el archivo JSON
function loadStudentData() {
    fs.readFile("../../data/estudiantes.json", "utf-8", (err, data) => {
        if (err) {
            console.error("Error al cargar el archivo JSON:", err);
            return;
        }

        try {
            const jsonData = JSON.parse(data); // Parsear los datos JSON
            console.log("Datos cargados con éxito:", jsonData);

            // Mostrar un mensaje de éxito en la consola
            console.log("Datos cargados correctamente");

        } catch (error) {
            console.error("Error al analizar los datos JSON:", error);
        }
    });
}

// Llamar a la función para cargar los datos
loadStudentData();
