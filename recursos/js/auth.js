document.addEventListener("DOMContentLoaded", function () {
    // Cargar usuarios desde JSON
    let usuarios = [];

    fetch("../../data/credenciales.json")
        .then(response => response.json())
        .then(data => {
            usuarios = data.usuarios; // Guardamos los usuarios en la variable global
        })
        .catch(error => console.error("Error al cargar el archivo JSON:", error));

    // Validación para el formulario de inicio de sesión
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        const emailField = document.getElementById("email");
        const passwordField = document.getElementById("password");

        // Validar los campos mientras se escribe
        emailField.addEventListener("input", function () {
            validateField(emailField, "emailError");
        });

        passwordField.addEventListener("input", function () {
            validateField(passwordField, "passwordError");
        });

        // Validar al enviar el formulario
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let valid = true;

            // Validar email y contraseña
            if (!validateEmail(emailField.value)) {
                showError("emailError");
                valid = false;
            } else {
                hideError("emailError");
            }

            if (!validatePassword(passwordField.value)) {
                showError("passwordError");
                valid = false;
            } else {
                hideError("passwordError");
            }

            if (valid) {
                const email = emailField.value;
                const password = passwordField.value;

                // Buscar el usuario en el JSON
                const usuario = usuarios.find(
                    user => user.email === email && user.contraseña === password
                );

                if (usuario) {
                    // Redirigir según el rol del usuario
                    if (usuario.rol === "admin") {
                        window.location.href = "vistas/admin/dashboard.html";
                    } else if (usuario.rol === "profesor") {
                        window.location.href = "vistas/profesor/dashboard.html";
                    } else if (usuario.rol === "estudiante") {
                        window.location.href = "vistas/estudiante/dashboard.html";
                    }
                } else {
                    alert("Credenciales incorrectas. Inténtalo de nuevo.");
                }
            }
        });
    }

    // Validación para el formulario de registro
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        const nameField = document.getElementById("name");
        const emailField = document.getElementById("email");
        const passwordField = document.getElementById("password");
        const repeatPasswordField = document.getElementById("repeatPassword");

        // Validar los campos mientras se escribe
        nameField.addEventListener("input", function () {
            validateField(nameField, "nameError");
        });

        emailField.addEventListener("input", function () {
            validateField(emailField, "emailError");
        });

        passwordField.addEventListener("input", function () {
            validateField(passwordField, "passwordError");
        });

        repeatPasswordField.addEventListener("input", function () {
            validateField(repeatPasswordField, "repeatPasswordError");
        });

        // Validar al enviar el formulario
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let valid = true;

            // Validar nombre, correo y contraseñas al enviar el formulario
            if (!validateName(nameField.value)) {
                showError("nameError");
                valid = false;
            } else {
                hideError("nameError");
            }

            if (!validateEmail(emailField.value)) {
                showError("emailError");
                valid = false;
            } else {
                hideError("emailError");
            }

            if (!validatePassword(passwordField.value)) {
                showError("passwordError");
                valid = false;
            } else {
                hideError("passwordError");
            }

            if (passwordField.value !== repeatPasswordField.value) {
                showError("repeatPasswordError");
                valid = false;
            } else {
                hideError("repeatPasswordError");
            }

            if (valid) {
                registerForm.submit(); // Enviar formulario si es válido
            }
        });
    }

    // Funciones de validación
    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@uleam\.edu\.ec$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        // La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un carácter especial
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>?,./\\|`~]).{6,}$/;
        return passwordRegex.test(password);
    }

    function validateName(name) {
        return name.trim().length > 0; // Validación simple de que no esté vacío
    }

    // Función para mostrar el mensaje de error
    function showError(errorId) {
        const errorMessage = document.getElementById(errorId);
        if (errorMessage) {
            errorMessage.style.display = "block"; // Mostrar el error
        }
    }

    // Función para ocultar el mensaje de error
    function hideError(errorId) {
        const errorMessage = document.getElementById(errorId);
        if (errorMessage) {
            errorMessage.style.display = "none"; // Ocultar el error
        }
    }

    // Función que valida un campo específico y muestra el error en tiempo real
    function validateField(field, errorId) {
        if (field.id === "email" && !validateEmail(field.value)) {
            showError(errorId);
        } else if (field.id === "password" && !validatePassword(field.value)) {
            showError(errorId);
        } else if (field.id === "name" && !validateName(field.value)) {
            showError(errorId);
        } else if (field.id === "repeatPassword" && field.value !== document.getElementById("password").value) {
            showError(errorId);
        } else {
            hideError(errorId);
        }
    }
});

