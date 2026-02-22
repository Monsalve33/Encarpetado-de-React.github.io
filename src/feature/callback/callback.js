// Bases de datos
const baseDatos1 = ['Canada', 'EUA', 'Mexico', 'Ecuador', 'Brazil', 'Argentina', 'Uruguay'];
const baseDatos2 = ['Japón', 'Irán', 'Corea del Sur', 'Alemania', 'Croacia', 'España', 'Inglaterra'];

// Elementos del DOM
const inputPais = document.getElementById('name');
const tbody = document.querySelector('tbody');
const emptyState = document.getElementById('emptyState');

// Callback cuando el país es encontrado
function encontrado(pais) {
    tbody.innerHTML = `
        <tr>
            <td class="text-success fw-bold">${pais}</td>
        </tr>
    `;
    emptyState.classList.add('d-none');
}

// Callback para búsqueda en baseDatos2
function busquedaBaseDatos2(pais, callbackEncontrado) {
    if (baseDatos2.includes(pais)) {
        callbackEncontrado(pais);
    } else {
        mostrarNoEncontrado();
    }
}

// Función principal con callbacks
function busquedaBaseDatos1(pais, callbackEncontrado, callbackBusqueda2) {
    if (baseDatos1.includes(pais)) {
        callbackEncontrado(pais);
    } else {
        callbackBusqueda2(pais, callbackEncontrado);
    }
}

// Mostrar mensaje cuando no se encuentra
function mostrarNoEncontrado() {
    tbody.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.innerHTML = `
        <p class="text-danger fw-bold mb-0">
             Dato no encontrado
        </p>
    `;
}

// Función que se ejecuta al hacer clic en Buscar
function addData() {
    const pais = inputPais.value.trim();

    if (pais === '') {
        alert('Por favor ingrese un país');
        return;
    }

    // Limpiar tabla antes de buscar
    tbody.innerHTML = '';

    busquedaBaseDatos1(
        pais,
        encontrado,
        busquedaBaseDatos2
    );
}
