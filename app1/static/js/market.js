/*
* Funcion de manupulacion modal de los cursos
*/
function handleButtonClick(row, col) {
    const card = document.querySelector(`body > div.container.mt-4.tienda > div:nth-child(${row}) > div:nth-child(${col}) > div`);

    // Obtenemos los elementos dentro de la tarjeta
    const img = card.querySelector("img");
    const title = card.querySelector(".card-title");
    const description = card.querySelector(".card-text");
    const price = card.querySelector(".card-price");

    // Obtenemos los valores de los atributos correspondientes
    const titleText = title.innerText;

    // Aquí establecemos los valores predeterminados o los obtenemos de otra fuente
    const imagePath = img.src; // Se asume que la ruta de la imagen está en el atributo src de la etiqueta <img>
    const descriptionText = description.innerText; // Se obtiene el texto de la descripción directamente

    // Eliminar los puntos del precio y convertirlo a un número
    const priceText = price.innerText.replace(/\./g, ''); // Eliminar los puntos del precio
    const valuePrice = parseFloat(priceText); // Convertir el precio a un número

    // Llamamos a la función para modificar el contenido del modal
    modalContentChange({ titleText, imagePath, descriptionText, valuePrice });

    // Finalmente, abrimos el modal
    $('#modalProducto').modal('show');
}


/*
* Funcion para cambiar el contenido de un modal
*/
function modalContentChange(options = {}) {
    // Obtenemos los elementos del modal
    const modalTitle = document.querySelector("#modalProducto #modalProductoLabel");
    const imgElement = document.querySelector("#modalProducto .left-side img");
    const descriptionElement = document.querySelector("#modalProducto .left-side p");
    const priceElement = document.querySelector("#productPrice");

    // Extraemos las opciones del objeto o establecemos valores predeterminados
    const {
        titleText = "",
        imagePath = "",
        descriptionText = "",
        valuePrice = 0
    } = options;

    // Actualizamos los elementos del modal si se proporcionan nuevas opciones
    if (titleText) modalTitle.innerText = titleText;
    if (imagePath) imgElement.src = imagePath;
    if (descriptionText) descriptionElement.innerText = descriptionText;
    if (valuePrice) {
        // Formatear el precio con separador de miles de acuerdo a la configuración regional de Chile
        const formattedPrice = valuePrice.toLocaleString('es-CL');
        priceElement.innerText = formattedPrice;
    }

    document.getElementById('currencySelect').selectedIndex = 0;
    updatePrice()
}

function cerrarModalProducto() {
    $('body').removeClass('modal-open');
    $('#modalProducto').modal('hide');
    $('.modal-backdrop').remove();
}