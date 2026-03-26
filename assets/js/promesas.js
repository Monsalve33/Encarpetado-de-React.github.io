const inputTexto = document.getElementById("name");
const tbody = document.querySelector("tbody");
const emptyState = document.getElementById("emptyState");
const form = document.getElementById("studentForm");

function verificarVocal(cadena) {
  return new Promise((resolve, reject) => {
    if (!cadena || typeof cadena !== "string") {
      reject("Entrada inválida");
      return;
    }

    const ultimoCaracter = cadena.trim().slice(-1).toLowerCase();
    const vocales = ["a", "e", "i", "o", "u"];

    if (vocales.includes(ultimoCaracter)) {
      resolve(ultimoCaracter);
    } else {
      reject("El último carácter no es una vocal");
    }
  });
}

function mostrarResultado(vocal) {
  tbody.innerHTML = `
    <tr>
      <td class="fw-bold text-success text-uppercase">${vocal}</td>
    </tr>
  `;
  emptyState.classList.add("d-none");
}

function mostrarError(mensaje) {
  tbody.innerHTML = "";
  emptyState.classList.remove("d-none");
  emptyState.innerHTML = `
    <div class="status-banner status-error">
      <i class="bi bi-exclamation-circle me-2"></i>${mensaje}
    </div>
  `;
}

function addData() {
  const texto = inputTexto.value.trim();

  tbody.innerHTML = "";
  emptyState.classList.add("d-none");

  verificarVocal(texto)
    .then((vocal) => {
      mostrarResultado(vocal);
    })
    .catch((error) => {
      mostrarError(error);
    });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addData();
});
