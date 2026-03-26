const inputNumero = document.getElementById("name");
const tbody = document.querySelector("tbody");
const emptyState = document.getElementById("emptyState");
const form = document.getElementById("studentForm");

function esperarDosSegundos(numero) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Number.isNaN(numero)) {
        reject("Debes ingresar un número válido");
      } else {
        resolve(numero * 2);
      }
    }, 2000);
  });
}

async function calcularDoble(numero) {
  const resultado = await esperarDosSegundos(numero);
  return resultado;
}

async function addData() {
  const numero = Number(inputNumero.value);

  tbody.innerHTML = "";
  emptyState.classList.add("d-none");

  try {
    const doble = await calcularDoble(numero);
    tbody.innerHTML = `
      <tr>
        <td class="fw-bold text-success">${doble}</td>
      </tr>
    `;
  } catch (error) {
    tbody.innerHTML = "";
    emptyState.classList.remove("d-none");
    emptyState.innerHTML = `
      <div class="status-banner status-error">
        <i class="bi bi-exclamation-circle me-2"></i>${error}
      </div>
    `;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addData();
});
