function submitLoginForm() {
    const loginForm = document.getElementById("loginForm");
    const formData = new FormData(loginForm);

    fetch("/login/", {
        method: "POST",
        body: formData,
        headers: {
            "X-CSRFToken": "{{ csrf_token }}",
            "Accept": "application/json",
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Inicio de sesión exitoso");
            window.location.href = "/";  // Redirigir al usuario a la página principal o al dashboard
        } else {
            alert("Error en el inicio de sesión: " + JSON.stringify(data.errors));
        }
    })
    .catch(error => console.error("Error:", error));
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

document.addEventListener("DOMContentLoaded", function () {
    const btnLogin = document.getElementById("loginButton") || null;

    if (btnLogin)
        btnLogin.addEventListener("click", submitLoginForm);
});