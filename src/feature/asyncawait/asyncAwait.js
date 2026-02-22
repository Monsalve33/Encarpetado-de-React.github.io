// Elementos del DOM
const inputNumero = document.getElementById('name');
const tbody = document.querySelector('tbody');
const emptyState = document.getElementById('emptyState');

// Función que retorna una promesa después de 2 segundos
function esperarDosSegundos(numero) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isNaN(numero)) {
                reject("Debe ingresar un número válido");
            } else {
                resolve(numero * 2);
            }
        }, 2000);
    });
}

// Función asincrónica usando async/await
async function calcularDoble(numero) {
    try {
        const resultado = await esperarDosSegundos(numero);
        return resultado;
    } catch (error) {
        throw error;
    }
}

// Función del botón
async function addData() {
    const numero = Number(inputNumero.value);

    tbody.innerHTML = '';
    emptyState.classList.add('d-none');

    try {
        const doble = await calcularDoble(numero);

        tbody.innerHTML = `
            <tr>
                <td class="text-success fw-bold">
                    ${doble}
                </td>
            </tr>
        `;
    } catch (error) {
        tbody.innerHTML = '';
        emptyState.classList.remove('d-none');
        emptyState.innerHTML = `
            <p class="text-danger fw-bold mb-0">
                Error: ${error} ${error}
            </p>
        `;
    }
}
