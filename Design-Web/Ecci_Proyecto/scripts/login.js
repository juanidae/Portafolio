document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener valores
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Obtener los elementos de error
    var emailError = document.getElementById('emailError');
    var passwordError = document.getElementById('passwordError');

    // Limpiar errores anteriores
    emailError.textContent = "";
    passwordError.textContent = "";

    // Validación básica
    if (!email) {
        emailError.textContent = "El correo es obligatorio.";
        return;
    }

    if (!password) {
        passwordError.textContent = "La contraseña es obligatoria.";
        return;
    }

    // Enviar datos al backend (Node-RED)
    fetch("http://localhost:1880/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);

        if (data.mensaje === "¡Ingreso por página web!") {
            window.location.href = "home.html";  // Redirige si es correcto
        } else {
            // Mostrar error en el campo password y limpiar el campo
            passwordError.textContent = "Credenciales incorrectas.";
            document.getElementById('password').value = ""; // Limpiar el campo de contraseña
        }
    })
    .catch(error => {
        console.error("Error al autenticar:", error);
        passwordError.textContent = "Error de conexión con el servidor.";
    });
});
