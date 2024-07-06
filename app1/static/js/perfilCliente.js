document.addEventListener("DOMContentLoaded", function () {

    // Inicializar comunas para la ciudad seleccionada por defecto
    const defaultCiudad = ciudadSelect.value;
    if (defaultCiudad) {
        ciudadSelect.dispatchEvent(new Event("change"));
        comunaSelect.value = "{{ cliente.comuna }}";
    }

    // Validación de contraseñas
    document.getElementById("perfilClienteForm").addEventListener("submit", function (event) {
        const password1 = document.getElementById("password1").value;
        const password2 = document.getElementById("password2").value;

        if (password1 !== password2) {
            alert("Las contraseñas no coinciden.");
            event.preventDefault();
        }
    });
});
