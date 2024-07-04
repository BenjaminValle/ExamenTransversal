const exchangeRates = {}; // Objeto que almacena las diferentes divisas con las que trabajaremos
const apiKey = 'df930c05e1836662449cb34e'; // Reemplaza con tu clave de API de ExchangeRate-API

function pathAPI(){    
    return`https://v6.exchangerate-api.com/v6/${apiKey}/latest/CLP`;
}

async function fetchExchangeRates() {    
    const response = await fetch(pathAPI());
    const data = await response.json();
    exchangeRates['CLP'] = data.conversion_rates.CLP;
    exchangeRates['USD'] = data.conversion_rates.USD;
    exchangeRates['EUR'] = data.conversion_rates.EUR;
    exchangeRates['GBP'] = data.conversion_rates.GBP;
    exchangeRates['JPY'] = data.conversion_rates.JPY;
}

function updatePrice() {

    // Eliminar los puntos del precio y convertirlo a un número
    const priceText = document.getElementById('productPrice').innerText.replace(/\./g, ''); // Eliminar los puntos del precio
    const valuePrice = parseFloat(priceText); // Convertir el precio a un número

    const basePriceCLP = valuePrice;
    const selectedCurrency = document.getElementById('currencySelect').value;
    const conversionRate = exchangeRates[selectedCurrency];
    const convertedPrice = basePriceCLP * conversionRate;
    

    document.getElementById('finalCurrencySelect').innerText = selectedCurrency;

    // Formatear el precio con separador de miles de acuerdo a la configuración regional de Chile
    const formattedPrice = convertedPrice.toLocaleString('es-CL');
    document.getElementById('finalCurrencyValue').innerText = formattedPrice;
}

function mostrarAPI(){
    console.info( pathAPI() )
}

/*
* Funcion para ejecutar de manera automatica al cargar
*/
(function () {
    fetchExchangeRates();
})();
