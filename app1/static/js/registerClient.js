document.addEventListener("DOMContentLoaded", function() {
    const ciudades = {
        "Santiago": ["Quilicura", "Conchali", "Huechuraba","Las Condes", "Providencia", "La Reina", "Vitacura", "Ñuñoa"],
        "Valparaíso": ["Viña del Mar", "Quilpué", "Villa Alemana", "Concón", "Quintero"],
        "Concepción": ["Talcahuano", "San Pedro de la Paz", "Chiguayante", "Penco", "Hualpén"],
        "La Serena": ["Coquimbo", "Ovalle", "Vicuña", "Andacollo", "Illapel"],
        "Antofagasta": ["Mejillones", "Tocopilla", "Calama", "Taltal", "María Elena"]
    };

    const ciudadSelect = document.getElementById("registerCiudad");
    const comunaSelect = document.getElementById("registerComuna");

    ciudadSelect.addEventListener("change", function() {
        const ciudad = ciudadSelect.value;
        const comunas = ciudades[ciudad];

        comunaSelect.innerHTML = "";
        comunas.forEach(function(comuna) {
            const option = document.createElement("option");
            option.value = comuna;
            option.textContent = comuna;
            comunaSelect.appendChild(option);
        });
    });
    
    const ciudadSelectPurchase = document.getElementById("purchaseCity");
    const comunaPurchase = document.getElementById("purchaseComuna");

    ciudadSelectPurchase.addEventListener("change", function() {
        const ciudad = ciudadSelectPurchase.value;
        const comunas = ciudades[ciudad];

        comunaPurchase.innerHTML = "";
        comunas.forEach(function(comuna) {
            const option = document.createElement("option");
            option.value = comuna;
            option.textContent = comuna;
            comunaPurchase.appendChild(option);
        });
    });

    // Inicializar comunas para la ciudad seleccionada por defecto
    ciudadSelect.dispatchEvent(new Event("change"));
    ciudadSelectPurchase.dispatchEvent(new Event("change"));
});

function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^(\+56)?9\d{8}$/;
    return phoneRegex.test(phoneNumber);
}

function submitRegisterForm() {
    const registerForm = document.getElementById("registerForm");
    const formData = new FormData(registerForm);
    const telefono = formData.get("fono");

    // Validar teléfono
    if (!validatePhoneNumber(telefono)) {
        alert("Por favor ingresa un número de teléfono válido. Debe tener el formato +569xxxxxxxx o 9xxxxxxxx.");
        return;
    }

    // Mostrar modal de procesamiento
   //  $('#modalProcessing').modal('show');
    $('#modalRegisted').modal('hide');

    fetch("/registro/", {
        method: "POST",
        body: formData,
        headers: {
            "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]").value,
            "Accept": "application/json",
        },
    })
    .then(response => response.json())
    .then(data => {
        // Ocultar modal de procesamiento
       //  $('#modalProcessing').modal('hide');

        if (data.success) {
            // Mostrar modal de éxito
           //  $('#modalProcessing').modal('hide');
            $('#modalSuccess').modal('show');
           //  $('#modalProcessing').modal('hide');
            // Limpiar formulario
            registerForm.reset();
            // Prellenar email en el formulario de login
            document.getElementById("loginEmail").value = formData.get("email");
        } else {
            // Mostrar modal de registro con errores
            $('#modalRegisted').modal('show');
            alert("Error en el registro: " + JSON.stringify(data.errors));
        }
    })
    .catch(error => {
        // Ocultar modal de procesamiento y mostrar de nuevo el formulario de registro en caso de error
       //  $('#modalProcessing').modal('hide');
        $('#modalRegisted').modal('show');
        console.error("Error:", error);
    });
}

function openLoginModal() {
    $('#modalSuccess').modal('hide');
    $('#modalLogin').modal('show');
    document.getElementById("loginPassword").focus();
}
