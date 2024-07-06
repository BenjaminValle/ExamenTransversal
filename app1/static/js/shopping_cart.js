let isClearingCart = false;

document.addEventListener("DOMContentLoaded", function () {
    loadCartFromLocalStorage();

    const buyButton = document.getElementById("buyButton");
    buyButton.addEventListener("click", function () {
        if (isAuthenticated) {
            // Procesar la compra directamente
            processPurchase();
        } else {
            // Mostrar el modal de compra sin registro
            $('#staticBackdrop').modal('show');
        }
    });

    document.querySelector('.shopping-cart-container-cart-icon').addEventListener('click', function () {
        const cartProducts = document.querySelector('.shopping-cart-container-cart-products');
        cartProducts.classList.toggle('hidden-cart');
    });

    document.addEventListener('click', function (event) {
        if (event.target.closest('.shopping-cart-icon-close')) {
            const productRow = event.target.closest('.shopping-cart-row-product');
            const productName = productRow.querySelector('.shopping-cart-titulo-producto-carrito').title;
            productRow.remove();
            removeProductFromCart(productName);
            updateCartCountAndTotal();
        }
    });

    updateCartCountAndTotal();
});

function showModalShippingCart() {
    const cartProducts = document.querySelector('.shopping-cart-container-cart-products');
    cartProducts.classList.remove('hidden-cart'); // Asegura que el carrito se muestre
}

function checkEmptyCart() {
    const productRows = document.querySelectorAll('.shopping-cart-row-product:not(.hidden)');
    const btnSale = document.querySelector('.shopping-cart-cart-button');
    const productList = document.querySelector('.shopping-cart-products-list');

    if (productRows.length === 0) {
        btnSale.classList.add('d-none');
        const emptyProductRow = document.createElement('div');
        emptyProductRow.className = 'shopping-cart-row-product empty-cart';
        emptyProductRow.innerHTML = `
            <div class="shopping-cart-cart-product">
                <div class="shopping-cart-info-cart-product">
                    <center>No hay artículos en el carro</center>
                </div>
            </div>
        `;
        productList.appendChild(emptyProductRow);

        // Evita la llamada recursiva infinita
        if (!isClearingCart) {
            isClearingCart = true;
            clearLocalStorage();
            isClearingCart = false;
        }
    } else {
        btnSale.classList.remove('d-none');
        const emptyRow = productList.querySelector('.empty-cart');
        if (emptyRow) {
            productList.removeChild(emptyRow);
        }
    }
}


function updateCartCountAndTotal() {
    const productRows = document.querySelectorAll('.shopping-cart-row-product:not(.hidden)');
    const cartCount = productRows.length;
    const totalAmount = Array.from(productRows).reduce((total, row) => {
        const priceElement = row.querySelector('.shopping-cart-precio-producto-carrito');
        if (priceElement) {
            const price = parseFloat(priceElement.textContent.replace('$', '').replace(/\./g, '')) || 0;
            return total + price;
        }
        return total;
    }, 0);

    document.getElementById('contador-productos').textContent = formatNumber(cartCount);
    document.querySelector('.shopping-cart-total-pagar').textContent = `$${formatNumber(totalAmount)}`;

    if (cartCount === 0) {
        document.querySelector('.shopping-cart-cart-total').classList.add('hidden');
    } else {
        document.querySelector('.shopping-cart-cart-total').classList.remove('hidden');
    }

    if (!isClearingCart) {
        checkEmptyCart();
    }
}

function addProductToCart(name, quantity, price, imageUrl, saveToLocalStorage = true) {
    const imgPath = document.getElementById("staticImgPath").value;
    const timestamp = Date.now();
    const productRow = document.createElement('div');
    productRow.className = 'shopping-cart-row-product';
    productRow.setAttribute('data-id', timestamp);
    productRow.innerHTML = `
        <div class="shopping-cart-cart-product">
            <div class="shopping-cart-image-container" style="position:relative; text-align:center;">
                <img src="${imgPath}/${imageUrl}" alt="${name}" title="${name}" class="shopping-cart-product-image" style="width: 50px; height: 50px; margin-right: 10px;">
            </div>
            <div class="shopping-cart-info-cart-product">
                <ul class="shopping-cart-product-details" style="list-style: none; padding: 0;">
                    <li class="shopping-cart-titulo-producto-carrito" title="${name}">${truncateString(name, 10)}</li>
                    <li class="shopping-cart-cantidad-producto-carrito">Cantidad: ${formatNumber(quantity)}</li>
                    <li>Precio: $<span class="shopping-cart-precio-producto-carrito">${formatNumber(price)}</span></li>
                </ul>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="shopping-cart-icon-close" onclick="removeProductFromCart(${timestamp})">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </div>
    `;

    const productList = document.querySelector('.shopping-cart-products-list');

    // Remove the "Vacío" row if it exists
    const emptyRow = productList.querySelector('.shopping-cart-row-product.empty-cart');
    if (emptyRow) {
        productList.removeChild(emptyRow);
    }

    productList.appendChild(productRow);
    updateCartCountAndTotal();

    showModalShippingCart();

    // Save to Local Storage
    if (saveToLocalStorage) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ id: timestamp, name, quantity, price, imageUrl });
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

function saveProductToLocalStorage(name, quantity, price, imageUrl) {
    const product = { name, quantity, price, imageUrl };
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(product => {
        addProductToCart(product.name, product.quantity, product.price, product.imageUrl, false);
    });
}

function removeProductFromCart(id) {
    const productRow = document.querySelector(`.shopping-cart-row-product[data-id='${id}']`);
    if (productRow) {
        productRow.remove();
        updateCartCountAndTotal();

        // Update Local Storage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(product => product.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

function formatNumber(number) {
    // Convertir el número a string y eliminar cualquier separador de miles o decimales
    let strNumber = number.toString().replace(/\./g, '').replace(/,/g, '');

    // Convertir nuevamente el string a número para asegurar el formato correcto
    let num = parseInt(strNumber, 10);

    // Formatear el número con el separador de miles como punto
    return num.toLocaleString('de-DE');
}

function truncateString(str, maxLength) {
    if (str.length > maxLength) {
        return str.substring(0, maxLength) + "...";
    }
    return str;
}

function clearLocalStorage() {
    localStorage.removeItem('cart');
    document.querySelector('.shopping-cart-products-list').innerHTML = '';
    // Llama a updateCartCountAndTotal solo si no estamos en el proceso de limpiar el carrito
    if (!isClearingCart) {
        updateCartCountAndTotal();
    }
}
