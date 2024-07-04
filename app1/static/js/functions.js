
/*
* Funcion para generar titulos Animados
*/
function animateTitle(Title = "GYM Title", delay = 300) {
    let counter = 0;
    let direction = true;
    aniTitle = setInterval(function () {
        if (counter == Title.length)
            direction = false;
        if (counter == false)
            direction = true;
        counter = (direction == true) ? ++counter : --counter;
        newtitle = (counter == 0) ? Title : Title.slice(0, counter);
        document.title = newtitle;
    }, delay)
}

/*
* Funcion para recuperar el titulo de una pagina
 */
function obtenerTitulo() {
    return document.title;
}


/*
* Funcion para ejecutar de manera automatica al cargar
*/
(function () {
    animateTitle(obtenerTitulo(), 150);    
})();

/*
* Funcion para generar titulos Animados
*/
function animateTitle(Title = "GYM Title", delay = 300) {
    let counter = 0;
    let direction = true;
    aniTitle = setInterval(function () {
        if (counter == Title.length)
            direction = false;
        if (counter == false)
            direction = true;
        counter = (direction == true) ? ++counter : --counter;
        newtitle = (counter == 0) ? Title : Title.slice(0, counter);
        document.title = newtitle;
    }, delay)
}

/*
* Funcion para recuperar el titulo de una pagina
 */
function obtenerTitulo() {
    return document.title;
}


/*
* Funcion para ejecutar de manera automatica al cargar
*/
(function () {
    animateTitle(obtenerTitulo(), 150);    
})();



$(document).ready(function() {
    // Manejador del evento submit para el formulario de registro
    $('#modalRegisted').find('#registerForm').on('submit', function(event) {
        event.preventDefault();
        handleFormSubmission($(this));
    });

    // Manejador del evento submit para el formulario de inicio de sesión
    $('#modalLogin').find('form').on('submit', function(event) {
        event.preventDefault();
        handleFormSubmission($(this));
    });

    // Manejador del evento blur para los campos del formulario de registro
    $('#modalRegisted').find('#registerName, #registerEmail, #registerPassword, #registerNameAP, #registerNameAM, #CregisterPassword').on('blur', function() {
        validateField($(this));
        toggleSubmitButton($(this).closest('.modal'));
    });

    // Manejador del evento blur para los campos del formulario de inicio de sesión
    $('#modalLogin').find('input').on('blur', function() {
        validateField($(this));
        toggleSubmitButton($(this).closest('.modal'));
    });

    // Manejador del evento click para el botón "Registrarse"
    $('#modalRegisted').find('.modal-footer button[type="button"]').on('click', function(event) {
        handleButtonClick($(this), event);
    });

    // Manejador del evento click para el botón "Iniciar Sesión"
    $('#modalLogin').find('.modal-footer button[type="button"]').on('click', function(event) {
        handleButtonClick($(this), event);
    });

    function handleFormSubmission($form) {
        clearErrors($form);
        if (validateForm($form)) {
            alert('Formulario enviado correctamente.');
            clearForms()
            // Aquí puedes agregar la lógica para enviar el formulario
        }
    }

    function handleButtonClick($button, event) {
        var $form = $button.closest('.modal').find('form');
        if (!validateForm($form)) {
            alert('Por favor complete todos los campos.');
            event.preventDefault();
        } else {
            alert("Validacion exitosa, redirigiendo");
            clearForms()
        }
    }

    function clearForms() {
        $('#modalRegisted').find('input').val('');
        $('#modalLogin').find('input').val('');
    }
    

    function validateForm($form) {
        var isValid = true;
        $form.find('input').each(function() {
            if (!validateField($(this))) {
                isValid = false;
            }
        });
        toggleSubmitButton($form.closest('.modal'));
        return isValid;
    }

    function validateField_($field) {
        var value = $field.val().trim();
        var isValid = true;

        if (value === '') {
            showError($field, 'Por favor completa este campo.');
            isValid = false;
        } else {
            // Validar el formato del correo electrónico si el campo es el de correo electrónico
            if ($field.attr('type') === 'email' && !validateEmail(value)) {
                showError($field, 'Por favor ingresa un correo electrónico válido.');
                isValid = false;
            } else {
                clearError($field);
            }
        }

        return isValid;
    }

    function validateName(name) {
        // Expresión regular para validar el formato del nombre
        var namePattern = /^[^\d.,()<>[\]]+$/;
        return namePattern.test(name);
    }

    function validateField($field) {
        var value = $field.val().trim();
        var isValid = true;
    
        if (value === '') {
            showError($field, 'Por favor completa este campo.');
            isValid = false;
        } else {
            var fieldId = $field.attr('id');
            /* 
             * cada cese es el ID del campo que deseo validar por separado,
             * como son los nombres para no aceptar nuemros
             * o el mail por su formato
            */
            switch (fieldId) {
                case 'registerName':
                case 'registerNameAP':
                case 'registerNameAM':
                    if (!validateName(value)) {
                        showError($field, 'El campo debe contener solo letras, espacios y caracteres especiales.');
                        isValid = false;
                    } else {
                        clearError($field);
                    }
                    break;
                case 'registerEmail':
                    if (!validateEmail(value)) {
                        showError($field, 'Por favor ingresa un correo electrónico válido.');
                        isValid = false;
                    } else {
                        clearError($field);
                    }
                    break;
                // Agregar más casos según sea necesario
                default:
                    clearError($field);
            }
        }
    
        return isValid;
    }
    

    function validateEmail(email) {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }

    function showError($field, message) {
        var $error = $('<span class="error-message text-danger"></span>').text(message);
        $field.next('.error-message').remove();
        $field.after($error);
    }

    function clearError($field) {
        $field.next('.error-message').remove();
    }

    function clearErrors($form) {
        $form.find('.error-message').remove();
    }

    function toggleSubmitButton($modal) {
        var hasErrors = $modal.find('.error-message').length > 0;
        $modal.find('.modal-footer button[type="button"]').prop('disabled', hasErrors);
    }
});