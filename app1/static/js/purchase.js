document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("purchaseForm").addEventListener("submit", function(event) {
        event.preventDefault();  // Prevenir el envío del formulario
        processPurchaseNoRegister();
    });
});

function processPurchaseNoRegister() {
    const productos = obtenerProductosDelCarrito();
    const formData = {
        nombre: document.getElementById("purchaseName").value,
        apellidos: document.getElementById("purchaseLastName").value,
        email: document.getElementById("purchaseEmail").value,
        direccion: document.getElementById("purchaseAddress").value,
        ciudad: document.getElementById("purchaseCity").value,
        comuna: document.getElementById("purchaseComuna").value,
        fono: document.getElementById("purchasePhone").value,
        productos: productos,
    };

    // Validaciones
    if (!formData.nombre || !formData.apellidos || !formData.email || !formData.direccion || !formData.ciudad || !formData.comuna || !formData.fono) {
        alert("Todos los campos del formulario son obligatorios.");
        return;
    }

    if (productos.length === 0) {
        alert("Debe haber al menos un producto en el carrito.");
        return;
    }

    fetch("/process_purchase/", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]").value,
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Compra procesada con éxito.");
            // Limpiar LocalStorage
            clearLocalStorage()
            // Limpiar el formulario
            document.getElementById("purchaseForm").reset();
            // Cerrar el modal
            $('#staticBackdrop').modal('hide');
            // Aquí puedes redirigir o actualizar la página según sea necesario
        } else {
            alert("Error en el procesamiento de la compra: " + data.message);
        }
    })
    .catch(error => console.error("Error:", error));
}

function processPurchase() {
    const productos = obtenerProductosDelCarrito();
    const formData = {
        productos: productos,
    };

    if (productos.length === 0) {
        alert("Debe haber al menos un producto en el carrito.");
        return;
    }

    fetch("/process_purchase/", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]").value,
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Limpiar LocalStorage
            clearLocalStorage()
            alert("Compra procesada con éxito.");
            // Aquí puedes redirigir o actualizar la página según sea necesario
        } else {
            alert("Error en el procesamiento de la compra: " + data.message);
        }
    })
    .catch(error => console.error("Error:", error));
}

function obtenerProductosDelCarrito() {
    const productos = [];
    const productRows = document.querySelectorAll(".shopping-cart-row-product");

    productRows.forEach(row => {
        const tituloElemento = row.querySelector(".shopping-cart-titulo-producto-carrito");
        const cantidadElemento = row.querySelector(".shopping-cart-cantidad-producto-carrito");
        const precioElemento = row.querySelector(".shopping-cart-precio-producto-carrito");
        const imagenElemento = row.querySelector(".shopping-cart-product-image");

        const nombre_articulo = tituloElemento ? tituloElemento.getAttribute("title") : "";
        const cantidad = cantidadElemento ? parseInt(cantidadElemento.textContent.replace("Cantidad: ", "")) : 0;
        const valor_unitario = precioElemento ? parseFloat(precioElemento.textContent.replace(".", "").replace(",", ".")) : 0;
        const valor_total = cantidad * valor_unitario;
        
        // Obtener el nombre y la extensión de la imagen
        const imagenSrc = imagenElemento ? imagenElemento.getAttribute("src") : "";
        const imagenNombreExt = imagenSrc ? imagenSrc.split('/').pop() : "";

        productos.push({
            nombre_articulo,
            cantidad,
            valor_unitario,
            valor_total            
        });
    });

    return productos;
}
